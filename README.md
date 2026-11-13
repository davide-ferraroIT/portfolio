# 🖥️ Davide Ferraro — Personal Portfolio

Benvenuto nella repository del mio portfolio personale! Questo progetto è concepito come una vetrina digitale moderna, altamente interattiva e ottimizzata per presentare il mio percorso accademico, le mie competenze tecniche e le mie esperienze lavorative come sviluppatore software e specialista IT.

Sito Web: [davide-ferraro.it](https://davide-ferraro.it)

---

## 🚀 Caratteristiche Principali

*   **⚡ Next.js 16 (App Router)**: Sviluppato sfruttando le ultime convenzioni e ottimizzazioni del framework, inclusa la gestione asincrona dei server components.
*   **🎨 Design Premium & Dinamico**: Interfaccia utente curata, moderna e reattiva, arricchita da micro-animazioni fluide realizzate con **Framer Motion** e scorrimenti armoniosi.
*   **💨 Tailwind CSS v4**: Utilizzo dell'innovativo motore v4 con configurazione del tema integrata direttamente tramite `@theme inline` in `globals.css` per la massima performance di compilazione.
*   **🔒 Next.js 16 Proxy**: Implementazione del nuovo standard `frontend/src/proxy.tsx` per la gestione delle rotte in fase di sviluppo locale (disabilitato nell'export statico).
*   **Modulo di Contatto Self-Hosted**: Form collegato a un microservizio Go con validazione, honeypot anti-spam e rate limiting in memoria.
*   **Invio Email SMTP**: Notifiche al proprietario e conferme automatiche ai visitatori inviate tramite il server SMTP autenticato di Register.it.
*   **🏷️ Tipizzazione Robusta**: Scritto interamente in **TypeScript** per garantire massima affidabilità e manutenibilità.

---

## 🛠️ Tech Stack & Librerie

| Tecnologia | Descrizione |
| :--- | :--- |
| **Next.js 16** | Framework React per applicazioni web moderne (App Router) |
| **React 19** | Libreria core per la gestione dell'interfaccia a componenti |
| **TypeScript** | Superset tipizzato di JavaScript |
| **Tailwind CSS v4** | Framework CSS utility-first per uno stile rapido e responsive |
| **Framer Motion** | Libreria per animazioni fluide e interazioni visive avanzate |
| **Go (standard library)** | Microservizio HTTP per l'invio email SMTP, compilato in un binario statico |
| **Lucide React** | Set di icone moderne e minimali in formato SVG |
| **Typewriter Effect** | Effetto di scrittura dinamica del titolo in Hero |

---

## 📂 Struttura del Progetto

```text
portfolio/
├── backend/                     # Microservizio Go per il modulo di contatto
│   ├── main.go                  # API, validazione, rate limiting e invio SMTP
│   ├── main_test.go             # Test unitari del backend
│   ├── .env.example             # Template delle variabili d'ambiente SMTP
│   ├── Dockerfile               # Build multi-stage con immagine finale scratch
│   └── docker-compose.yml       # Container read-only con limiti di memoria
├── frontend/                    # Applicazione Next.js con static export
│   ├── public/                  # Asset statici (immagini, loghi)
│   ├── src/                     # Pagine e componenti React
│   │   ├── app/                 # Pagine e rotte (Next.js App Router)
│   │   ├── components/          # Componenti modulari e riutilizzabili
│   │   └── proxy.tsx            # Gestione delle rotte in sviluppo locale
│   ├── next.config.ts           # Configurazione di build (output: export)
│   ├── package.json             # Dipendenze e script npm
│   └── tsconfig.json            # Configurazione TypeScript
├── .gitignore
└── README.md
```

---

## 💻 Come Avviare il Progetto Localmente

### 1. Prerequisiti

*   **Node.js 22 LTS o superiore** e `npm`
*   **Docker con Docker Compose** (consigliato per il backend) oppure **Go**, nella versione indicata in `backend/go.mod`

### 2. Clonare la Repository
```bash
git clone https://github.com/davide-ferraroIT/portfolio.git
cd portfolio
```

### 3. Avviare il Backend

Il modulo di contatto è un microservizio Go che espone `POST /api/contact` e `GET /api/health` sulla porta `3001`.

```bash
cd backend
cp .env.example .env
# Compila SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e CONTACT_RECEIVER_EMAIL
docker build -t portfolio-backend:latest .
docker compose up -d
```

In alternativa, senza Docker:
```bash
cd backend
cp .env.example .env
set -a && source .env && set +a
go run .
```

### 4. Installare le Dipendenze del Frontend
```bash
cd frontend
npm ci
```

Per collegare il form al backend locale, crea `frontend/.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Senza questa variabile il form chiama `/api/contact` sulla stessa origine, configurazione utilizzata in produzione dietro reverse proxy.

### 5. Avviare il Server di Sviluppo
```bash
npm run dev
```
Apri [http://localhost:3000](http://localhost:3000) sul tuo browser per visualizzare il sito in tempo reale.

### 6. Compilazione di Produzione
Dalla directory `frontend/`, la build genera il sito statico in `frontend/out/`:
```bash
npm run build
```

Il contenuto di `out/` può essere servito da qualsiasi web server. In produzione viene servito da Nginx, che inoltra le richieste `/api/` al backend Go.

---

## 👤 Autore

**Davide Ferraro**
*   **Laurea Triennale**: Informatica presso l'Università di Genova
*   **Ruolo**: IT Support Specialist & Junior Software Developer
*   **GitHub**: [@davide-ferraroIT](https://github.com/davide-ferraroIT)
*   **LinkedIn**: [davideferraroIT](https://www.linkedin.com/in/davideferraroIT)
