'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Radio, ShieldCheck, Wifi } from 'lucide-react';

const featuredProject = {
  title: "AutoPass 🚗⚡",
  subtitle: "Sistema IoT su ESP32 per Automazione Cancelli via iBeacon & Wi-Fi OTA",
  description: "Sistema embedded basato su ESP32 e PlatformIO progettato per l'apertura automatica di cancelli o garage tramite rilevamento di prossimità di dispositivi iBeacon (smartphone, tag BLE o smartwatch), dotato di protezione anti-rimbalzo (cooldown) e aggiornamenti wireless del firmware via Wi-Fi.",
  tags: ["ESP32", "C++ / PlatformIO", "NimBLE-Arduino", "iBeacon BLE", "ArduinoOTA"],
  slug: "/projects/autopass"
};

export default function ProjectsSection() {
  return (
    <section className="bg-white text-hero py-20 px-6 md:px-24">
      <div className="max-w-6xl mx-auto">
        {/* INTESTAZIONE */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold mb-4 text-hero"
          >
            I miei progetti
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-slate-500 text-lg"
          >
            Esplora i miei progetti software e soluzioni IoT trasparenti e performanti.
          </motion.p>
        </div>

        {/* CARD PROGETTO IN EVIDENZA (AUTOPASS) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="relative bg-gradient-to-br from-hero via-hero to-[#180838] text-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-800 overflow-hidden group hover:border-hover/50 transition-all duration-500"
        >
          {/* Sfondo decorativo e bagliore */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-hover/20 rounded-full blur-3xl pointer-events-none group-hover:bg-hover/30 transition-all duration-700"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LATO TESTO */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-hover/20 border border-hover/40 rounded-full text-hover font-mono text-xs font-semibold tracking-wide">
                <Radio size={14} className="animate-pulse" /> PROGETTO OPEN SOURCE
              </div>

              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {featuredProject.title}
                </h3>
                <p className="text-slate-300 text-base md:text-lg font-medium">
                  {featuredProject.subtitle}
                </p>
              </div>

              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                {featuredProject.description}
              </p>

              {/* TAGS TECH */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA LINK */}
              <div className="pt-4">
                <Link
                  href={featuredProject.slug}
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-hover text-white font-bold rounded-full hover:bg-white hover:text-hero transition-all duration-300 shadow-lg hover:scale-105"
                >
                  Scopri i dettagli tecnici <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* LATO ICONE / SPEC HIGHLIGHTS */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-hover/20 rounded-xl text-hover">
                  <Radio size={22} />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Bluetooth Stack</span>
                  <span className="text-sm font-bold text-white">NimBLE (Scansione iBeacon)</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-hover/20 rounded-xl text-hover">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Protezione Relè</span>
                  <span className="text-sm font-bold text-white">Cooldown Anti-Rimbalzo</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-hover/20 rounded-xl text-hover">
                  <Wifi size={22} />
                </div>
                <div>
                  <span className="block text-xs text-slate-400">Firmware Update</span>
                  <span className="text-sm font-bold text-white">ArduinoOTA (Wi-Fi Local)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}