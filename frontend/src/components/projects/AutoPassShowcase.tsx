'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Radio,
  ShieldCheck,
  Zap,
  Cpu,
  Lock,
  Smartphone,
  Server,
  CheckCircle2,
  Send,
  Wifi,
  Github,
  Code2,
  Terminal,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function AutoPassShowcase() {
  const [activeTab, setActiveTab] = useState<'nimble' | 'cooldown' | 'ota' | 'security'>('nimble');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-hero text-white pt-28 pb-20 px-6 md:px-12 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* NAVIGAZIONE BREADCRUMB */}
        <motion.div {...fadeInUp} className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-slate-300 hover:text-white hover:border-hover transition-all duration-300 text-sm font-medium"
            >
              <ArrowLeft size={16} /> Torna alla Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-hover font-mono text-sm font-semibold">Progetti / AutoPass</span>
          </div>

          <a
            href="https://github.com/davide-ferraroIT/AutoPass"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white hover:bg-hover hover:border-hover transition-all duration-300 text-sm font-bold shadow-lg"
          >
            <Github size={18} /> Repository GitHub <ExternalLink size={14} />
          </a>
        </motion.div>

        {/* HERO HEADER PROGETTO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent border border-white/10 rounded-[2.5rem] p-8 md:p-14 overflow-hidden"
        >
          {/* Ambient Glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-hover/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-hover/20 border border-hover/40 rounded-full text-hover font-mono text-xs font-semibold uppercase tracking-wider">
                <Radio size={14} className="animate-pulse" /> ESP32 & Embedded Systems
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-slate-300 text-xs font-mono">
                PlatformIO & C++
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white flex items-center gap-3">
              AutoPass
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl font-light leading-relaxed">
              Sistema IoT basato su ESP32 per l&apos;apertura automatica di cancelli o garage tramite rilevamento di vicinanza iBeacon con supporto per aggiornamenti firmware Wi-Fi OTA.
            </p>

            {/* QUICK HIGHLIGHT METRICS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="block text-2xl md:text-3xl font-bold text-hover font-mono">NimBLE</span>
                <span className="text-xs text-slate-400">Bluetooth Stack Leggero</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="block text-2xl md:text-3xl font-bold text-hover font-mono">Wi-Fi OTA</span>
                <span className="text-xs text-slate-400">ArduinoOTA Wireless</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="block text-2xl md:text-3xl font-bold text-hover font-mono">Cooldown</span>
                <span className="text-xs text-slate-400">Protezione Anti-Rimbalzo</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="block text-2xl md:text-3xl font-bold text-hover font-mono">C++</span>
                <span className="text-xs text-slate-400">Framework Arduino / PIO</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* IL PROBLEMA E LA SOLUZIONE REALE */}
        <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* PROBLEMA */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 hover:border-red-500/30 transition-all duration-300">
            <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-2xl flex items-center justify-center">
              <Zap size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">La Sfida</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Aprire il cancello di casa o del garage richiede tipicamente la ricerca di un telecomando dedicato o l&apos;interazione manuale con uno smartphone. Questo genera distrazioni alla guida, attese davanti al varco e la necessità di riprogrammare l&apos;hardware via cavo USB ogni volta che si desidera aggiornare il firmware.
            </p>
          </div>

          {/* SOLUZIONE */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 hover:border-hover/40 transition-all duration-300">
            <div className="w-12 h-12 bg-hover/20 text-hover rounded-2xl flex items-center justify-center">
              <Radio size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">La Soluzione AutoPass</h2>
            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
              Un microcontrollore ESP32 esegue una scansione BLE in background ad alte prestazioni tramite la libreria leggera <strong className="font-bold text-white">NimBLE</strong>. Riconosce i dispositivi iBeacon (smartphone, smartwatch o tag) ed aziona il relè in prossimità. Integra un timer di cooldown anti-rimbalzo e la libreria <strong className="font-bold text-white">ArduinoOTA</strong> per aggiornare il codice via Wi-Fi in locale senza cavi.
            </p>
          </div>
        </motion.div>

        {/* CARATTERISTICHE E ARCHITETTURA TECNICA */}
        <motion.div {...fadeInUp} className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-white">Caratteristiche & Architettura Tecniche</h2>
              <p className="text-slate-400 text-sm">Esplora i moduli del firmware sviluppato in C++ su PlatformIO.</p>
            </div>

            {/* TAB CONTROLS */}
            <div className="flex flex-wrap gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('nimble')}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  activeTab === 'nimble' ? 'bg-hover text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                Scansione NimBLE
              </button>
              <button
                onClick={() => setActiveTab('cooldown')}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  activeTab === 'cooldown' ? 'bg-hover text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                Timer Anti-Rimbalzo
              </button>
              <button
                onClick={() => setActiveTab('ota')}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  activeTab === 'ota' ? 'bg-hover text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                Wi-Fi ArduinoOTA
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all ${
                  activeTab === 'security' ? 'bg-hover text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                Gestione Credenziali
              </button>
            </div>
          </div>

          {/* TAB CONTENT */}
          <AnimatePresence mode="wait">
            {activeTab === 'nimble' && (
              <motion.div
                key="nimble"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Radio className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Libreria NimBLE-Arduino</h3>
                  <p className="text-slate-400 text-sm">
                    Utilizzo dello stack BLE NimBLE, estremamente più leggero ed efficiente in termini di memoria RAM rispetto allo stack BLE di default di Arduino per ESP32.
                  </p>
                </div>
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Smartphone className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Advertising iBeacon & Parsing</h3>
                  <p className="text-slate-400 text-sm">
                    Analisi dei pacchetti di advertising BLE per identificare UUID, Major e Minor dei trasmettitori iBeacon (smartphone, smartwatch, tag dedicati).
                  </p>
                </div>
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Cpu className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Scansione in Background</h3>
                  <p className="text-slate-400 text-sm">
                    Ciclo di scansione continuo e non bloccante che intercetta immediatamente l&apos;arrivo dell&apos;utente nelle vicinanze dell&apos;ESP32.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'cooldown' && (
              <motion.div
                key="cooldown"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Clock className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Protezione Anti-Rimbalzo</h3>
                  <p className="text-slate-400 text-sm">
                    Implementazione di un timer di cooldown personalizzabile per bloccare scatti di relè ripetuti mentre l&apos;utente staziona davanti al cancello.
                  </p>
                </div>
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Zap className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Attuazione del Relè</h3>
                  <p className="text-slate-400 text-sm">
                    Pilotaggio a basso livello tramite i pin dell&apos;ESP32, interfacciandosi in modo sicuro con il circuito del cancello automatico.
                  </p>
                </div>
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <CheckCircle2 className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Prevenzione Falsi Positivi</h3>
                  <p className="text-slate-400 text-sm">
                    Evita riattivazioni a vuoto dovute a oscillazioni di segnale radio quando l&apos;utente si trova già all&apos;interno della proprietà.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'ota' && (
              <motion.div
                key="ota"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Wifi className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Aggiornamenti Wireless OTA</h3>
                  <p className="text-slate-400 text-sm">
                    Integrazione con la libreria ArduinoOTA per effettuare l&apos;upload dei nuovi firmware direttamente tramite la rete Wi-Fi di casa o aziendale.
                  </p>
                </div>
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Terminal className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Flashing Rapido PlatformIO</h3>
                  <p className="text-slate-400 text-sm">
                    Configurazione di `upload_protocol = espota` in `platformio.ini` per un workflow di sviluppo velocissimo via riga di comando.
                  </p>
                </div>
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Server className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Deploy Wireless & Zero Cavi</h3>
                  <p className="text-slate-400 text-sm">
                    Una volta installato l&apos;ESP32 nella scatola di derivazione del cancello, non è mai necessario smontarlo per aggiornare il codice.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Lock className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">File `config.h` Esternalizzato</h3>
                  <p className="text-slate-400 text-sm">
                    Credenziali Wi-Fi (SSID, Password) isolate in un file d&apos;intestazione separato dal codice sorgente principale.
                  </p>
                </div>
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <ShieldCheck className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Protezione Repository Git</h3>
                  <p className="text-slate-400 text-sm">
                    Utilizzo di `config.h.example` e regole `.gitignore` per evitare caricamenti involontari di informazioni sensibili o password su GitHub.
                  </p>
                </div>
                <div className="bg-black/30 border border-white/10 p-6 rounded-2xl space-y-3">
                  <Code2 className="text-hover" size={28} />
                  <h3 className="text-lg font-bold">Clean Code & Portabilità</h3>
                  <p className="text-slate-400 text-sm">
                    Struttura chiara, modulare e facilmente replicabile su qualsiasi altra installazione di domotica o cancello elettrico.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* STRUTTURA DEL PROGETTO E ISTRUZIONI DI COMPILAZIONE */}
        <motion.div {...fadeInUp} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4 overflow-hidden">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Code2 className="text-hover" size={24} /> Struttura del Progetto
            </h2>
            <pre className="bg-black/50 border border-white/10 p-4 rounded-2xl text-slate-300 font-mono text-xs overflow-hidden leading-relaxed">
{`AutoPass/
├── include/
│   └── config.h.example
├── src/
│   └── main.cpp
├── platformio.ini
└── README.md`}
            </pre>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Terminal className="text-hover" size={24} /> Compilazione & Flashing (PlatformIO)
            </h2>
            <div className="space-y-3 text-slate-300 text-sm font-mono">
              <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
                <span className="text-slate-500 block text-xs"># 1. Primo flashing via USB</span>
                <code className="text-hover">pio run -t upload</code>
              </div>

              <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
                <span className="text-slate-500 block text-xs"># 2. Configurazione OTA in platformio.ini</span>
                <code className="text-slate-200 block">upload_protocol = espota</code>
                <code className="text-slate-200 block">upload_port = IP_DEL_TUO_ESP32</code>
              </div>

              <div className="bg-black/50 border border-white/10 p-3 rounded-xl">
                <span className="text-slate-500 block text-xs"># 3. Deployment wireless via Wi-Fi</span>
                <code className="text-hover">pio run -t upload</code>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TECH STACK GRID */}
        <motion.div {...fadeInUp} className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Stack Tecnologico</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {['ESP32 MCU', 'PlatformIO', 'C++ / Arduino', 'NimBLE-Arduino', 'ArduinoOTA', 'iBeacon BLE'].map((tech) => (
              <div key={tech} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center hover:border-hover/50 transition-all">
                <span className="text-sm font-semibold text-slate-200">{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* RECRUITER / BUSINESS CTA SECTION */}
        <motion.div
          {...fadeInUp}
          className="bg-gradient-to-r from-hover/20 via-white/5 to-white/5 border border-hover/40 rounded-[2.5rem] p-8 md:p-12 text-center space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Esplora la repository su GitHub</h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-base">
            Puoi visionare liberamente il codice sorgente completo di AutoPass su GitHub oppure contattarmi per discutere di progetti in ambito IoT ed Embedded.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="https://github.com/davide-ferraroIT/AutoPass"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-hero font-bold rounded-full hover:bg-hover hover:text-white transition-all duration-300 shadow-xl hover:scale-105"
            >
              <Github size={20} /> Guarda su GitHub <ExternalLink size={16} />
            </a>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-hover text-white font-bold rounded-full hover:bg-white hover:text-hero transition-all duration-300 shadow-xl hover:scale-105"
            >
              Contattami <Send size={18} />
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
