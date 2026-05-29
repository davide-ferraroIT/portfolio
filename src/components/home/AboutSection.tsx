'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';


export default function AboutSection() {
  return (
    <section className="bg-white text-hero py-20 px-8 md:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-center md:items-start">
            <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter"
            >
            Chi sono?
            </motion.h2>
            
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="space-y-6 text-lg md:text-xl text-slate-700 leading-relaxed"
            >
            <p>
                Sviluppatore software guidato da una solida curiosità tecnica e da un obiettivo chiaro: utilizzare la tecnologia per risolvere problemi reali ed eliminare l'inefficienza. Il mio background mi consente di muovermi con autonomia sia sulla costruzione di esperienze utente reattive e moderne, sia sulla logica di backend e sull'integrazione di sistemi automatizzati.
            </p>
            <p>
                Credo che un buon software debba essere non solo performante, ma anche strategico per il flusso di lavoro di chi lo utilizza. Per questo motivo, porto nei team in cui lavoro precisione tecnica, capacità di mappare flussi complessi e una costante attitudine all'aggiornamento, pronto a collaborare per superare gli obiettivi tecnologici aziendali.
            </p>
            </motion.div>

            {/* Contenitore della CTA allineato a destra */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            className="w-full flex justify-end mt-12"
            >
            <a 
                href="/about-me" 
                className="group flex items-center gap-4 cursor-pointer" 
                aria-label="Scopri di più su di me"
            >
                {/* Testo della CTA */}
                <span className="text-lg md:text-xl font-medium text-slate-700 group-hover:text-hover transition-colors duration-300">
                Scopri il mio percorso
                </span>
                
                {/* Pulsante freccia */}
                <div className="w-16 h-16 bg-hero/10 text-hero rounded-full flex items-center justify-center group-hover:bg-hover group-hover:text-white transition-all duration-300">
                <ArrowRight size={32} className="group-hover:translate-x-1 transition-transform" />
                </div>
            </a>
            </motion.div>
        </div>
    </section>
  );
}