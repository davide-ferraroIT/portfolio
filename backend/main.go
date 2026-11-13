package main

import (
	"bytes"
	"context"
	"crypto/tls"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html"
	"log"
	"net"
	"net/http"
	"net/mail"
	"net/smtp"
	"os"
	"os/signal"
	"regexp"
	"strings"
	"sync"
	"syscall"
	"time"
)

type Config struct {
	Port                 string
	SMTPHost             string
	SMTPPort             string
	SMTPUser             string
	SMTPPass             string
	ContactReceiverEmail string
	SMTPFromName         string
}

func loadConfig() Config {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	smtpHost := os.Getenv("SMTP_HOST")
	if smtpHost == "" {
		smtpHost = "authsmtp.register.it"
	}

	smtpPort := os.Getenv("SMTP_PORT")
	if smtpPort == "" {
		smtpPort = "465"
	}

	smtpUser := os.Getenv("SMTP_USER")
	if smtpUser == "" {
		smtpUser = "info@davide-ferraro.it"
	}

	smtpPass := os.Getenv("SMTP_PASS")

	receiver := os.Getenv("CONTACT_RECEIVER_EMAIL")
	if receiver == "" {
		receiver = smtpUser
	}

	fromName := os.Getenv("SMTP_FROM_NAME")
	if fromName == "" {
		fromName = "Davide Ferraro"
	}

	return Config{
		Port:                 port,
		SMTPHost:             smtpHost,
		SMTPPort:             smtpPort,
		SMTPUser:             smtpUser,
		SMTPPass:             smtpPass,
		ContactReceiverEmail: receiver,
		SMTPFromName:         fromName,
	}
}

// In-Memory Rate Limiter (Zero disk writes, thread-safe, auto-expiring)
type RateLimiter struct {
	mu      sync.Mutex
	limits  map[string][]time.Time
	maxHits int
	window  time.Duration
}

func NewRateLimiter(maxHits int, window time.Duration) *RateLimiter {
	rl := &RateLimiter{
		limits:  make(map[string][]time.Time),
		maxHits: maxHits,
		window:  window,
	}
	go rl.cleanupLoop(15 * time.Minute)
	return rl
}

func (rl *RateLimiter) Allow(ip string) bool {
	rl.mu.Lock()
	defer rl.mu.Unlock()

	now := time.Now()
	cutoff := now.Add(-rl.window)

	var valid []time.Time
	for _, t := range rl.limits[ip] {
		if t.After(cutoff) {
			valid = append(valid, t)
		}
	}

	if len(valid) >= rl.maxHits {
		rl.limits[ip] = valid
		return false
	}

	valid = append(valid, now)
	rl.limits[ip] = valid
	return true
}

func (rl *RateLimiter) cleanupLoop(interval time.Duration) {
	ticker := time.NewTicker(interval)
	for range ticker.C {
		rl.mu.Lock()
		now := time.Now()
		cutoff := now.Add(-rl.window)
		for ip, timestamps := range rl.limits {
			var valid []time.Time
			for _, t := range timestamps {
				if t.After(cutoff) {
					valid = append(valid, t)
				}
			}
			if len(valid) == 0 {
				delete(rl.limits, ip)
			} else {
				rl.limits[ip] = valid
			}
		}
		rl.mu.Unlock()
	}
}

func getClientIP(r *http.Request) string {
	if xRealIP := strings.TrimSpace(r.Header.Get("X-Real-IP")); xRealIP != "" {
		return xRealIP
	}
	if xff := strings.TrimSpace(r.Header.Get("X-Forwarded-For")); xff != "" {
		parts := strings.Split(xff, ",")
		if len(parts) > 0 {
			ip := strings.TrimSpace(parts[0])
			if ip != "" {
				return ip
			}
		}
	}
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err == nil {
		return host
	}
	return r.RemoteAddr
}

type ContactRequest struct {
	Name     string `json:"name"`
	Email    string `json:"email"`
	Message  string `json:"message"`
	Website  string `json:"website"`   // Honeypot field
	BotField string `json:"bot-field"` // Honeypot field fallback
}

var emailRegex = regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)

func validateContactRequest(req *ContactRequest) error {
	// SMTP Header injection prevention
	if strings.ContainsAny(req.Name, "\r\n") {
		return fmt.Errorf("il campo nome contiene caratteri non validi")
	}
	if strings.ContainsAny(req.Email, "\r\n") {
		return fmt.Errorf("il campo email contiene caratteri non validi")
	}

	req.Name = strings.TrimSpace(req.Name)
	if req.Name == "" {
		return fmt.Errorf("il nome è obbligatorio")
	}
	if len(req.Name) > 100 {
		return fmt.Errorf("il nome supera il limite di 100 caratteri")
	}

	req.Email = strings.TrimSpace(req.Email)
	if req.Email == "" {
		return fmt.Errorf("l'email è obbligatoria")
	}
	if len(req.Email) > 150 {
		return fmt.Errorf("l'email supera il limite di 150 caratteri")
	}
	if _, err := mail.ParseAddress(req.Email); err != nil {
		return fmt.Errorf("formato email non valido")
	}
	if !emailRegex.MatchString(req.Email) {
		return fmt.Errorf("formato email non valido")
	}

	req.Message = strings.TrimSpace(req.Message)
	if req.Message == "" {
		return fmt.Errorf("il messaggio è obbligatorio")
	}
	if len(req.Message) > 5000 {
		return fmt.Errorf("il messaggio supera il limite di 5000 caratteri")
	}

	return nil
}

func sendMailSMTP(cfg Config, to string, replyTo string, subject string, htmlBody string) error {
	addr := net.JoinHostPort(cfg.SMTPHost, cfg.SMTPPort)
	auth := smtp.PlainAuth("", cfg.SMTPUser, cfg.SMTPPass, cfg.SMTPHost)

	// RFC 2047 Base64 encoding for headers to guarantee clean UTF-8
	encodedSubject := fmt.Sprintf("=?UTF-8?B?%s?=", base64.StdEncoding.EncodeToString([]byte(subject)))
	encodedFromName := fmt.Sprintf("=?UTF-8?B?%s?=", base64.StdEncoding.EncodeToString([]byte(cfg.SMTPFromName)))

	var msg bytes.Buffer
	msg.WriteString(fmt.Sprintf("From: %s <%s>\r\n", encodedFromName, cfg.SMTPUser))
	msg.WriteString(fmt.Sprintf("To: %s\r\n", to))
	if replyTo != "" {
		msg.WriteString(fmt.Sprintf("Reply-To: %s\r\n", replyTo))
	}
	msg.WriteString(fmt.Sprintf("Subject: %s\r\n", encodedSubject))
	msg.WriteString(fmt.Sprintf("Date: %s\r\n", time.Now().Format(time.RFC1123Z)))
	msg.WriteString("MIME-Version: 1.0\r\n")
	msg.WriteString("Content-Type: text/html; charset=\"UTF-8\"\r\n")
	msg.WriteString("Content-Transfer-Encoding: base64\r\n")
	msg.WriteString("\r\n")

	// Base64 encode the body with standard 76 chars line splitting
	b64Body := base64.StdEncoding.EncodeToString([]byte(htmlBody))
	for i := 0; i < len(b64Body); i += 76 {
		end := i + 76
		if end > len(b64Body) {
			end = len(b64Body)
		}
		msg.WriteString(b64Body[i:end] + "\r\n")
	}

	tlsConfig := &tls.Config{
		ServerName: cfg.SMTPHost,
		MinVersion: tls.VersionTLS12,
	}
	dialer := &net.Dialer{Timeout: 5 * time.Second}

	var client *smtp.Client
	if cfg.SMTPPort == "465" {
		conn, err := tls.DialWithDialer(dialer, "tcp", addr, tlsConfig)
		if err != nil {
			return fmt.Errorf("tls.Dial to %s failed: %w", addr, err)
		}
		conn.SetDeadline(time.Now().Add(10 * time.Second))
		c, err := smtp.NewClient(conn, cfg.SMTPHost)
		if err != nil {
			conn.Close()
			return fmt.Errorf("smtp.NewClient failed: %w", err)
		}
		client = c
	} else {
		conn, err := dialer.Dial("tcp", addr)
		if err != nil {
			return fmt.Errorf("smtp.Dial to %s failed: %w", addr, err)
		}
		conn.SetDeadline(time.Now().Add(10 * time.Second))
		c, err := smtp.NewClient(conn, cfg.SMTPHost)
		if err != nil {
			conn.Close()
			return fmt.Errorf("smtp.NewClient failed: %w", err)
		}
		if ok, _ := c.Extension("STARTTLS"); !ok {
			c.Close()
			return fmt.Errorf("il server SMTP non supporta STARTTLS")
		}
		if err := c.StartTLS(tlsConfig); err != nil {
			c.Close()
			return fmt.Errorf("StartTLS failed: %w", err)
		}
		client = c
	}
	defer client.Close()

	if err := client.Auth(auth); err != nil {
		return fmt.Errorf("SMTP auth failed: %w", err)
	}

	if err := client.Mail(cfg.SMTPUser); err != nil {
		return fmt.Errorf("SMTP MAIL FROM failed: %w", err)
	}

	if err := client.Rcpt(to); err != nil {
		return fmt.Errorf("SMTP RCPT TO failed for %s: %w", to, err)
	}

	w, err := client.Data()
	if err != nil {
		return fmt.Errorf("SMTP DATA failed: %w", err)
	}

	if _, err := w.Write(msg.Bytes()); err != nil {
		return fmt.Errorf("SMTP writing payload failed: %w", err)
	}

	if err := w.Close(); err != nil {
		return fmt.Errorf("SMTP closing DATA failed: %w", err)
	}

	return client.Quit()
}

// Replica fedele del template HTML originario di submission-created.js
func buildVisitorConfirmationHTML(name, rawMessage, fromEmail string) string {
	escapedName := html.EscapeString(name)
	escapedMessage := strings.ReplaceAll(html.EscapeString(rawMessage), "\n", "<br/>")

	return fmt.Sprintf(`<!DOCTYPE html>
<html>
<head>
<style>
    .body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 30px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
    
    /* Header ridotto con allineamento immagine */
    .header { background-color: #0A001B; padding: 25px 20px; text-align: center; }
    
    /* Container dei Divider per evitare spazi bianchi */
    .divider { line-height: 0; font-size: 0; background-color: #ffffff; }
    
    .content { padding: 10px 40px 40px 40px; color: #0A001B; line-height: 1.6; background-color: #ffffff; }
    .footer { background-color: #0A001B; color: #ffffff; padding: 15px; text-align: center; font-size: 12px; }
    .button { display: inline-block; padding: 14px 30px; background-color: #A855F7; color: #0A001B !important; text-decoration: none; border-radius: 50px; font-weight: bold; margin-top: 20px; }
    .highlight { color: #A855F7; font-weight: bold; }
    .message-box { background-color: #f9f7ff; border-left: 4px solid #7C3AED; padding: 20px; margin: 25px 0; border-radius: 0 12px 12px 0; }
</style>
</head>
<body class="body">
<div class="container">
    
    <div class="header">
    <div style="display: inline-block; vertical-align: middle;">
        <img src="https://davide-ferraro.it/davide.png" alt="Logo" style="height: 40px; width: auto; vertical-align: middle; margin-right: 10px;">
        <span style="color: #ffffff; font-size: 20px; font-weight: bold; letter-spacing: -1px; vertical-align: middle;">
        Davide Ferraro
        </span>
    </div>
    </div>

    <div class="divider">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 0 1587 79" preserveAspectRatio="none" style="display: block; width: 100%%; height: 60px;">
        <path d="M-100 79C-100 79 218.416 23.165 693.5 23.165C1168.58 23.165 1487 79 1487 79V0H-100V79Z" fill="#0A001B"></path>
    </svg>
    </div>

    <div class="content">
    <h2 style="margin-top: 10px;">Ciao <span class="highlight">%s</span>!</h2>
    <p>Ho ricevuto correttamente il tuo messaggio. Ecco una copia per tuo riferimento:</p>
    
    <div class="message-box">
        <p style="margin: 0; font-style: italic; color: #4B5563;">"%s"</p>
    </div>

    <p>Ti risponderò molto presto. Nel frattempo, puoi visitare di nuovo il mio sito.</p>
    <a href="https://davide-ferraro.it" class="button">Torna al sito</a>
    </div>

    <div class="divider">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 0 1587 79" preserveAspectRatio="none" style="display: block; width: 100%%; height: 60px;">
        <path d="M-100 0C-100 0 218.416 55.835 693.5 55.835C1168.58 55.835 1487 0 1487 0V79H-100V0Z" fill="#0A001B"></path>
    </svg>
    </div>

    <div class="footer">
    <p style="margin: 0;">© 2026 Davide Ferraro — Sviluppatore</p>
    <p style="margin-top: 10px; opacity: 0.7;">Inviato da %s</p>
    </div>

</div>
</body>
</html>`, escapedName, escapedMessage, html.EscapeString(fromEmail))
}

// Notifica completa per il proprietario del sito con dettagli e Reply-To
func buildOwnerNotificationHTML(name, email, rawMessage, date string) string {
	escapedName := html.EscapeString(name)
	escapedEmail := html.EscapeString(email)
	escapedMessage := strings.ReplaceAll(html.EscapeString(rawMessage), "\n", "<br/>")

	return fmt.Sprintf(`<!DOCTYPE html>
<html>
<head>
<style>
    .body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); }
    .header { background-color: #0A001B; padding: 20px; text-align: center; color: #ffffff; }
    .content { padding: 30px; color: #1e293b; line-height: 1.6; }
    .meta-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 14px; }
    .meta-row { margin-bottom: 8px; }
    .meta-label { font-weight: bold; color: #475569; display: inline-block; width: 80px; }
    .message-box { background-color: #f5f3ff; border-left: 4px solid #8b5cf6; padding: 18px; margin: 20px 0; border-radius: 0 8px 8px 0; }
    .reply-btn { display: inline-block; padding: 12px 24px; background-color: #7c3aed; color: #ffffff !important; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px; }
    .footer { background-color: #f1f5f9; padding: 12px; text-align: center; font-size: 12px; color: #64748b; }
</style>
</head>
<body class="body">
<div class="container">
    <div class="header">
        <h2 style="margin: 0; font-size: 18px; letter-spacing: -0.5px;">Nuovo Messaggio dal Portfolio</h2>
    </div>
    <div class="content">
        <p style="margin-top: 0;">Hai ricevuto un nuovo contatto tramite il modulo del tuo portfolio:</p>
        <div class="meta-box">
            <div class="meta-row"><span class="meta-label">Mittente:</span> <strong>%s</strong></div>
            <div class="meta-row"><span class="meta-label">Email:</span> <a href="mailto:%s" style="color: #7c3aed; text-decoration: none;">%s</a></div>
            <div class="meta-row" style="margin-bottom: 0;"><span class="meta-label">Data:</span> %s</div>
        </div>
        <div class="message-box">
            <strong style="color: #6d28d9; display: block; margin-bottom: 6px;">Messaggio:</strong>
            <p style="margin: 0; color: #334155;">%s</p>
        </div>
        <a href="mailto:%s?subject=Re:%%20Contatto%%20dal%%20portfolio" class="reply-btn">Rispondi direttamente</a>
    </div>
    <div class="footer">
        Portfolio Backend • davide-ferraro.it
    </div>
</div>
</body>
</html>`, escapedName, escapedEmail, escapedEmail, html.EscapeString(date), escapedMessage, escapedEmail)
}

func main() {
	cfg := loadConfig()
	log.Printf("[INFO] Avvio backend portfolio su porta %s", cfg.Port)
	log.Printf("[INFO] Configurazione SMTP: Host=%s, Port=%s, User=%s, Receiver=%s", cfg.SMTPHost, cfg.SMTPPort, cfg.SMTPUser, cfg.ContactReceiverEmail)

	rateLimiter := NewRateLimiter(3, 10*time.Minute)

	mux := http.NewServeMux()

	// Health Check endpoint
	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	// Contact Form endpoint
	mux.HandleFunc("/api/contact", func(w http.ResponseWriter, r *http.Request) {
		// Handle CORS for preflight if needed
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}

		if r.Method != http.MethodPost {
			http.Error(w, `{"error":"Metodo non consentito"}`, http.StatusMethodNotAllowed)
			return
		}

		clientIP := getClientIP(r)

		// 1. Rate Limiting Check
		if !rateLimiter.Allow(clientIP) {
			log.Printf("[WARN] Rate limit superato per IP: %s", clientIP)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusTooManyRequests)
			w.Write([]byte(`{"error":"Hai inviato troppe richieste. Riprova tra qualche minuto."}`))
			return
		}

		// 2. Decode JSON Payload (limit to 32KB to protect RAM)
		r.Body = http.MaxBytesReader(w, r.Body, 32*1024)
		var req ContactRequest
		decoder := json.NewDecoder(r.Body)
		decoder.DisallowUnknownFields()
		if err := decoder.Decode(&req); err != nil {
			log.Printf("[WARN] Payload non valido da %s: %v", clientIP, err)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte(`{"error":"Formato dati non valido"}`))
			return
		}

		// 3. Honeypot check (anti-bot silente)
		if strings.TrimSpace(req.Website) != "" || strings.TrimSpace(req.BotField) != "" {
			log.Printf("[INFO] Honeypot catturato da IP %s. Ritorno 200 fittizio.", clientIP)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusOK)
			w.Write([]byte(`{"status":"success"}`))
			return
		}

		// 4. Validation
		if err := validateContactRequest(&req); err != nil {
			log.Printf("[WARN] Validazione fallita per IP %s: %v", clientIP, err)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadRequest)
			json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
			return
		}

		// 5. Send SMTP Emails
		// Check that password is set
		if cfg.SMTPPass == "" {
			log.Printf("[ERROR] SMTP_PASS non configurata!")
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadGateway)
			w.Write([]byte(`{"error":"Configurazione server di posta non valida"}`))
			return
		}

		nowStr := time.Now().Format("02/01/2006 15:04:05 MST")

		// Email 1: Notifica al proprietario
		ownerSubject := fmt.Sprintf("Nuovo messaggio dal portfolio da %s", req.Name)
		ownerBody := buildOwnerNotificationHTML(req.Name, req.Email, req.Message, nowStr)
		if err := sendMailSMTP(cfg, cfg.ContactReceiverEmail, req.Email, ownerSubject, ownerBody); err != nil {
			log.Printf("[ERROR] Invio notifica a %s fallito: %v", cfg.ContactReceiverEmail, err)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadGateway)
			w.Write([]byte(`{"error":"Impossibile inoltrare il messaggio tramite SMTP. Riprova più tardi."}`))
			return
		}

		// Email 2: Conferma automatica all'utente
		visitorSubject := fmt.Sprintf("Ciao %s, ho ricevuto il tuo messaggio!", req.Name)
		visitorBody := buildVisitorConfirmationHTML(req.Name, req.Message, cfg.SMTPUser)
		if err := sendMailSMTP(cfg, req.Email, cfg.ContactReceiverEmail, visitorSubject, visitorBody); err != nil {
			log.Printf("[ERROR] Invio email di conferma a %s fallito: %v", req.Email, err)
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusBadGateway)
			w.Write([]byte(`{"error":"Messaggio ricevuto, ma impossibile inviare l'email di conferma. Riprova più tardi."}`))
			return
		}

		log.Printf("[INFO] Messaggio inviato con successo da %s (%s) tramite IP %s", req.Name, req.Email, clientIP)

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"success","message":"Messaggio inviato correttamente"}`))
	})

	server := &http.Server{
		Addr:              ":" + cfg.Port,
		Handler:           mux,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       10 * time.Second,
		WriteTimeout:      30 * time.Second,
		IdleTimeout:       60 * time.Second,
	}

	// Graceful shutdown handling
	stopChan := make(chan os.Signal, 1)
	signal.Notify(stopChan, os.Interrupt, syscall.SIGTERM)

	go func() {
		log.Printf("[INFO] Server in ascolto su :%s", cfg.Port)
		if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("[FATAL] Errore del server HTTP: %v", err)
		}
	}()

	<-stopChan
	log.Println("[INFO] Ricevuto segnale di terminazione, arresto graceful...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := server.Shutdown(ctx); err != nil {
		log.Printf("[ERROR] Errore durante lo shutdown: %v", err)
	}

	log.Println("[INFO] Server terminato correttamente.")
}
