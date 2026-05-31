# 🖥️ Davide Ferraro — Personal Portfolio

Benvenuto nella repository del mio portfolio personale! Questo progetto è concepito come una vetrina digitale moderna, altamente interattiva e ottimizzata per presentare il mio percorso accademico, le mie competenze tecniche e le mie esperienze lavorative come sviluppatore software e specialista IT.

Sito Web: [davide-ferraro.it](https://davide-ferraro.it)

---

## 🚀 Caratteristiche Principali

*   **⚡ Next.js 16 (App Router)**: Sviluppato sfruttando le ultime convenzioni e ottimizzazioni del framework, inclusa la gestione asincrona dei server components.
*   **🎨 Design Premium & Dinamico**: Interfaccia utente curata, moderna e reattiva, arricchita da micro-animazioni fluide realizzate con **Framer Motion** e scorrimenti armoniosi.
*   **💨 Tailwind CSS v4**: Utilizzo dell'innovativo motore v4 con configurazione del tema integrata direttamente tramite `@theme inline` in `globals.css` per la massima performance di compilazione.
*   **🔒 Next.js 16 Proxy Middleware**: Implementazione del nuovo standard `src/proxy.ts` (che sostituisce il vecchio `middleware.ts`) per proteggere e gestire in modo reattivo le pagine in fase di lavorazione (reindirizzando a 404).
*   **📬 Netlify Forms Integration**: Modulo di contatto integrato tramite richieste AJAX asincrone con supporto per il recupero dati dinamico e sistema di honeypot anti-spam.
*   **✉️ Integrazione con Resend**: Predisposizione per l'invio e la gestione di email transazionali e notifiche tramite la piattaforma moderna **Resend**.
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
| **Resend** | Servizio di invio email per sviluppatori per comunicazioni transazionali rapide ed efficienti |
| **Lucide React** | Set di icone moderne e minimali in formato SVG |
| **Typewriter Effect** | Effetto di scrittura dinamica del titolo in Hero |

---

## 📂 Struttura del Progetto

```text
portfolio/
├── public/                  # Asset statici (immagini, loghi, file HTML)
│   ├── form.html            # Template HTML per l'integrazione di Netlify Forms
│   └── ...                  # Foto e loghi
├── src/
│   ├── app/                 # Pagine e rotte (Next.js App Router)
│   │   ├── about-me/        # Pagina "Chi Sono"
│   │   ├── projects/        # Rotta "Progetti" (in costruzione, protetta da proxy)
│   │   ├── globals.css      # Stili globali e configurazione Tailwind v4
│   │   └── layout.tsx       # Layout principale con caricamento font Geist
│   ├── components/          # Componenti modulari e riutilizzabili
│   │   ├── about-me/        # Componenti specifici per la sezione biografia/competenze
│   │   └── home/            # Componenti della Home Page (Navbar, Hero, Contact, ecc.)
│   └── proxy.ts             # Middleware di intercettazione rotte (Next.js 16)
├── tsconfig.json            # Configurazione TypeScript
├── next.config.ts           # Opzioni di build di Next.js (React Compiler abilitato)
└── package.json             # Dipendenze e script npm
```

---

## 💻 Come Avviare il Progetto Localmente

### 1. Prerequisiti
Assicurati di aver installato **Node.js** (versione 18 o superiore consigliata) e un gestore di pacchetti come `npm` o `yarn`.

### 2. Clonare la Repository
```bash
git clone https://github.com/davide-ferraroIT/portfolio.git
cd portfolio
```

### 3. Installare le Dipendenze
```bash
npm install
```

### 4. Avviare il Server di Sviluppo
```bash
npm run dev
```
Apri [http://localhost:3000](http://localhost:3000) sul tuo browser per visualizzare il sito in tempo reale.

### 5. Compilazione di Produzione
Per creare una build ottimizzata per la produzione:
```bash
npm run build
npm run start
```

---

## 🌐 Deploy su Netlify

Il progetto è ottimizzato per essere distribuito sulla piattaforma **Netlify**. 
Grazie all'integrazione di `form.html` all'interno della cartella `public/`, Netlify riconoscerà automaticamente i campi del form di contatto contrassegnati da `data-netlify="true"`, permettendoti di ricevere le email degli utenti direttamente nella tua dashboard senza bisogno di configurare alcun server di backend.

---

## 👤 Autore

**Davide Ferraro**
*   **Laurea Triennale**: Informatica presso l'Università di Genova
*   **Ruolo**: IT Support Specialist & Junior Software Developer
*   **GitHub**: [@davide-ferraroIT](https://github.com/davide-ferraroIT)
*   **LinkedIn**: [davideferraroIT](https://www.linkedin.com/in/davideferraroIT)
