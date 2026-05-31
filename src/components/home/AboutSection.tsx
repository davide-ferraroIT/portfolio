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
                Ciao, sono Davide. Prima di immergermi a tempo pieno nello sviluppo software, ho vissuto in prima persona cosa significa stare dietro al bancone e mandare avanti un&apos;attività a contatto con il pubblico. So bene che quando hai un negozio o un locale, ogni minuto è prezioso e l&apos;ultima cosa che vuoi è perdere tempo con strumenti digitali complicati. Ecco perché ho un obiettivo molto chiaro: costruire siti web e applicazioni che ti semplifichino davvero la vita.
            </p>
            <p>
                Il mio lavoro non è solo scrivere codice, ma ascoltare le tue esigenze e creare soluzioni su misura (come gestire ordini, vetrine online o flussi di lavoro) che ti tolgano il peso della tecnologia, lasciandoti libero di fare quello che ami: curare i tuoi clienti.
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