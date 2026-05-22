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
          Sono un Tecnico IT junior con esperienza nel supporto di I/II livello e in attività di system administration, maturata operando nel complesso e critico settore sanitario per GVM Care & Research.
        </p>
        <p className="text-slate-400">
          Diplomato in Informatica all'ISS Majorana-Giorgi (81/100), attualmente frequento la Laurea Triennale in Informatica all'Università di Genova. Sono motivato da un forte desiderio di crescita, con l'obiettivo di specializzarmi nello sviluppo software e nell'implementazione di soluzioni ICT moderne.
        </p>
        <p className="text-slate-400">
          Mi distinguo per precisione, abilità nel problem solving e nel troubleshooting autonomo. Sono automunito e pienamente disponibile a trasferte sia sul territorio nazionale che internazionale.
        </p>
      </div>
    </motion.section>
  );
}