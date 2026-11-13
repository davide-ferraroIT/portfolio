# Infrastruttura Home Server Debian — `davide-ferraro.it`

> **Panoramica:** Documentazione tecnica del server on-premise su hardware **Asus (Intel Atom Z3775, 2 GB RAM, 30 GB eMMC)** con **Debian 12 Bookworm (headless)**. L'intera architettura è progettata per **azzerare le scritture inutili sulla memoria eMMC** e **minimizzare l'impronta in RAM**, delegando tutte le operazioni di compilazione (Next.js e Docker) alla workstation principale Fedora Linux.

---

## 1. Specifiche Hardware, Rete e Ottimizzazioni eMMC

### Profilo Macchina
| Parametro | Valore / Configurazione |
| :--- | :--- |
| **Hardware** | Asus mini-PC / netbook — CPU Intel Atom Z3775 |
| **Memoria** | 2 GB RAM DDR3 \| 30 GB Storage eMMC (rev `0x6`) |
| **Sistema Operativo** | Debian 12 (Bookworm) headless |
| **IP Pubblico Router (WAN)** | `<PUBLIC_IP>` (puntato dai record DNS `A` di `davide-ferraro.it`) |
| **Rete Locale (LAN)** | IP statico/riservato `<LAN_IP>` (connessione Wi-Fi) |
| **Accesso Amministrativo** | SSH (`<SSH_USER>@<LAN_IP>`) |
| **Port Forwarding Router** | Porte esterne `80/TCP` e `443/TCP` su `<PUBLIC_IP>` inoltrate verso `<LAN_IP>` |

### Strategie Anti-Usura eMMC e Gestione RAM
Poiché le memorie eMMC hanno cicli di scrittura limitati e non espongono contatori SMART affidabili, il sistema è configurato per operare il più possibile in memoria volatile:

* **Mount in RAM (`tmpfs`):** Le directory `/tmp`, `/var/tmp` e `/var/log` sono montate su `tmpfs` in `/etc/fstab`, assorbendo file temporanei e log di sistema direttamente in RAM.
* **Mount root con `noatime`:** La partizione eMMC principale è montata con l'opzione `noatime` per evitare scritture su disco ad ogni semplice lettura di un file.
* **Kernel & Swap Tuning (`/etc/sysctl.conf`):** Impostati `vm.swappiness=10` e `vm.vfs_cache_pressure=50` per favorire la permanenza in RAM della *Page Cache* (mantenendo in memoria i file statici del sito serviti da Nginx) e ridurre al minimo lo swap su flash.
* **Log volatili (`journald` e Docker):** `systemd-journald` è configurato con storage volatile in RAM. Docker ha limiti di rotazione globale in `/etc/docker/daemon.json` (`max-size: 5m`, `max-file: 2`), mentre il container del backend utilizza direttamente `logging: driver: "journald"`.

---

## 2. Architettura e Flusso delle Richieste ("Rigiro" del Traffico)

```text
                        INTERNET (HTTPS :443 / HTTP :80)
                                       │
                                       ▼
                        ┌─────────────────────────────┐
                        │   Router Domestico (NAT)    │
                        │   IP WAN: <PUBLIC_IP>      │
                        │   Porte 80, 443 ─► <LAN_IP> │
                        └──────────────┬──────────────┘
                                       │
                                       ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│ SERVER DEBIAN (<LAN_IP>)                                                     │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐  │
│  │ NGINX (Reverse Proxy & Web Server)                                     │  │
│  │ • Porta 80  ─► Redirect 301 permanente verso HTTPS (:443)              │  │
│  │ • Porta 443 ─► Terminazione SSL/TLS (Certificati Let's Encrypt)        │  │
│  └───────────────┬────────────────────────────────────────┬───────────────┘  │
│                  │                                        │                  │
│         location / (File Statici)                location /api/ (JSON)       │
│                  │                               (Buffer 32KB in RAM)        │
│                  ▼                                        │                  │
│  ┌───────────────────────────────┐                        ▼                  │
│  │ /var/www/portfolio/           │      ┌─────────────────────────────────┐  │
│  │ Frontend Next.js Static Export│      │ DOCKER: portfolio-backend       │  │
│  │ (Servito dalla Page Cache RAM)│      │ • Binario Go statico (scratch)  │  │
│  └───────────────────────────────┘      │ • Ascolto: 127.0.0.1:3001       │  │
│                                         │ • FS read-only | RAM ~10 MB     │  │
│                                         └────────────────┬────────────────┘  │
└──────────────────────────────────────────────────────────┼───────────────────┘
                                                           │
                                              Connessione TLS (:465)
                                              Autenticazione SMTP PlainAuth
                                                           │
                                                           ▼
                                          ┌─────────────────────────────────┐
                                          │ SMTP REGISTER.IT                │
                                          │ authsmtp.securemail.pro:465     │
                                          └────────┬───────────────┬────────┘
                                                   │               │
                                       1. Notifica │               │ 2. Conferma
                                                   ▼               ▼
                                      info@davide-ferraro.it   Utente Mittente
```

### Dettaglio dei Flussi

1. **Navigazione Web (`GET /`):**
   * Il client risolve `davide-ferraro.it` (o `www.davide-ferraro.it`) sull'IP pubblico `<PUBLIC_IP>` e invia la richiesta sulla porta `443`.
   * Il router domestico inoltra il traffico verso `<LAN_IP>`.
   * Nginx gestisce l'handshake TLS tramite i certificati Let's Encrypt e risponde direttamente servendo i file HTML/CSS/JS statici da `/var/www/portfolio/`.
   * `access_log` è disattivato (`off`) e `error_log` registra solo eventi critici (`crit`) in `/var/log/nginx/error.log` (in `tmpfs`).
2. **Invio Form di Contatto (`POST /api/contact`):**
   * Il frontend invia un payload JSON a `/api/contact`.
   * Nginx intercetta il prefisso `location /api/`, trattiene l'intero body della richiesta in RAM (`client_body_buffer_size 32k`, evitando file temporanei su eMMC) e inoltra la chiamata via loopback locale a `http://127.0.0.1:3001`, aggiungendo gli header `X-Real-IP` e `X-Forwarded-For`.
   * Il microservizio **Go** verifica il campo anti-spam *honeypot*, applica il *rate-limiter* in memoria (massimo 3 invii ogni 10 minuti per IP) e sanifica i campi contro *SMTP/HTML Injection*.
   * Il backend apre una connessione TLS verso `authsmtp.securemail.pro:465` autenticandosi con le credenziali della casella Register.it e invia due email: la notifica a `info@davide-ferraro.it` (con header `Reply-To` impostato sull'email del visitatore) e l'email HTML di conferma al mittente.
3. **Rinnovo Certificati SSL:**
   * Il timer systemd `certbot.timer` verifica periodicamente la scadenza dei certificati Let's Encrypt e li rinnova automaticamente tramite il plugin Nginx.

---

## 3. Mappa dei File e Directory Principali

| Percorso sul Server Debian | Permessi / Proprietario | Funzione |
| :--- | :--- | :--- |
| `/var/www/portfolio/` | `<SSH_USER>:<SSH_USER>` (`755`) | Root del sito web; contiene l'export statico (`out/`) generato da Next.js. |
| `/home/<SSH_USER>/portfolio-backend/docker-compose.yml` | `<SSH_USER>:<SSH_USER>` (`644`) | Definizione del container backend (`read_only: true`, `mem_limit: 32m`, rete loopback `127.0.0.1:3001`). |
| `/home/<SSH_USER>/portfolio-backend/.env` | `<SSH_USER>:<SSH_USER>` (`600`) | Credenziali SMTP di Register.it (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_RECEIVER_EMAIL`). |
| `/etc/nginx/sites-available/portfolio` | `root:root` (`644`) | Configurazione Virtual Host Nginx (SSL porta 443, redirect porta 80, routing statico `/` e proxy `/api/`). |
| `/etc/nginx/sites-enabled/portfolio` | Symlink → `sites-available` | Collegamento simbolico che attiva il sito in Nginx. |
| `/etc/letsencrypt/live/davide-ferraro.it/` | `root:root` (`700`) | Certificati SSL/TLS attivi (`fullchain.pem` e `privkey.pem`) gestiti da Certbot. |
| `/etc/docker/daemon.json` | `root:root` (`644`) | Configurazione globale di Docker per limitare la dimensione dei log su disco. |
| `/etc/fstab` | `root:root` (`644`) | Tabella dei mount con `noatime` sulla eMMC e mount `tmpfs` in RAM per `/tmp`, `/var/tmp` e `/var/log`. |

---

## 4. Gestione dei Servizi e Comandi Operativi

### Gestione Nginx
```bash
# Verifica sintassi della configurazione prima di ogni modifica
sudo nginx -t

# Ricarica la configurazione senza interrompere le connessioni attive
sudo systemctl reload nginx

# Controlla stato del servizio
sudo systemctl status nginx
```

### Gestione Backend Docker (`portfolio-backend`)
Il container gira con **filesystem in sola lettura (`read_only: true`)**, immagine base `scratch` (~10-15 MB) e limite di memoria a `32 MB`:

```bash
# Entra nella directory del backend
cd ~/portfolio-backend

# Avvia o ricrea il container (obbligatorio --force-recreate dopo modifiche al file .env)
docker compose up -d --force-recreate

# Visualizza gli ultimi log (letti dal journald in RAM)
docker logs --tail 30 portfolio-backend

# Controlla consumo reale di CPU e RAM
docker stats --no-stream portfolio-backend

# Verifica rapida endpoint di healthcheck locale
curl -s http://127.0.0.1:3001/api/health
```

### Workflow di Aggiornamento (da Workstation Fedora)
Per evitare qualsiasi compilazione o scrittura superflua sulla eMMC del server Debian, gli aggiornamenti seguono questa pipeline:

```bash
# 1. Aggiornamento Frontend (trasferisce via rsync solo i file con hash modificato)
npm run build
rsync -av --checksum --delete out/ <SSH_USER>@<LAN_IP>:/var/www/portfolio/

# 2. Aggiornamento Backend Go (build locale su Fedora + caricamento in /tmp RAM su Debian)
docker build -t portfolio-backend:latest ./backend
docker save portfolio-backend:latest | gzip > /tmp/portfolio-backend.tar.gz
scp /tmp/portfolio-backend.tar.gz <SSH_USER>@<LAN_IP>:/tmp/ && rm -f /tmp/portfolio-backend.tar.gz

ssh <SSH_USER>@<LAN_IP> "docker load < /tmp/portfolio-backend.tar.gz && rm -f /tmp/portfolio-backend.tar.gz && cd ~/portfolio-backend && docker compose up -d"
```