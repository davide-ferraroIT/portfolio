'use client';

import { User } from 'lucide-react';
import { motion, MotionProps } from 'framer-motion';

interface BioCardProps {
  fadeInUp: MotionProps;
}

export default function BioCard({ fadeInUp }: BioCardProps) {
  return (
    <motion.section 
      {...fadeInUp}
      className="lg:col-span-7 bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl hover:border-hover/40 transition-all duration-500 group h-full flex flex-col justify-center"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-hover/10 rounded-2xl text-hover group-hover:scale-110 transition-transform">
          <User size={28} />
        </div>
        <h2 className="text-3xl font-bold">Mi presento!</h2>
      </div>
      <div className="space-y-4">
        <p className="text-slate-300 text-lg leading-relaxed">
          Sono un IT Support Specialist e Sviluppatore Junior con esperienza consolidata nell&apos;amministrazione di sistema e nel supporto di I/II livello all&apos;interno del complesso settore sanitario per GVM Care & Research.
        </p>
        <p className="text-slate-400">
          Recentemente ho arricchito il mio profilo assumendo un ruolo operativo nello sviluppo full-stack di applicativi web e nella gestione di ambienti DevOps. Questo percorso mi ha permesso di unire le solide basi teoriche del mio corso di Laurea in Informatica a spiccate doti pratiche nell&apos;implementazione di moderne soluzioni ICT.
        </p>
        <p className="text-slate-400">
          Diplomato all&apos;ISS Majorana-Giorgi e laureando in Informatica all&apos;Università di Genova, mi distinguo per precisione, efficacia nel problem solving e nel troubleshooting autonomo. Sono automunito e pienamente disponibile a trasferte.
        </p>
      </div>
    </motion.section>
  );
}