'use client';

import { Briefcase } from 'lucide-react';
import { motion, MotionProps } from 'framer-motion';

interface ExperienceCardProps {
  fadeInUp: MotionProps;
}

const experiences = [
  {
    role: "IT Support Specialist",
    company: "Fucix (GVM Care & Research)",
    period: "05/2025 — Attuale",
    description: "Riferimento IT in ambiente multi-sede ad alta criticità. Gestione Help Desk I/II Livello, troubleshooting avanzato (hardware/software), amministrazione accessi e manutenzione periferiche sanitarie. Gestione escalation e partecipazione attiva a progetti di sviluppo software interni."
  },
  {
    role: "Supporto allo studio",
    company: "Autonomo",
    period: "12/2024 — 08/2025",
    description: "Supporto didattico in Informatica, Sistemi e Reti. Creazione di piani di studio personalizzati con focus sulla semplificazione di concetti complessi e lo sviluppo del problem solving nello studente."
  },
  {
    role: "Logistica, Vendita & Volontariato",
    company: "Varie Esperienze",
    period: "2017 — 2024",
    description: "Gestione autonoma del ciclo di vendita e della clientela in ambito fieristico. Precedente esperienza in Protezione Civile (Radio Club Levante) per il monitoraggio in contesti di emergenza. Esperienze fondamentali per lo sviluppo di teamwork, multitasking e resistenza allo stress."
  }
];

export default function ExperienceCard({ fadeInUp }: ExperienceCardProps) {
  return (
    <motion.section 
      {...fadeInUp}
      className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl hover:border-hover/40 transition-all duration-500 group"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-hover/10 rounded-2xl text-hover group-hover:scale-110 transition-transform">
          <Briefcase size={28} />
        </div>
        <h2 className="text-3xl font-bold">Le mie esperienze</h2>
      </div>
      
      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-8 pb-10 last:pb-0 border-l border-white/10 group-hover:border-hover/30 transition-colors duration-500">
            {/* CONNETTORE */}
            <div className="absolute w-3 h-3 bg-slate-700 rounded-full -left-[6.5px] top-2 transition-all duration-500 group-hover:bg-hover group-hover:shadow-[0_0_15px_#A855F7] group-hover:scale-125"></div>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
              <h3 className="text-xl font-bold text-white group-hover:text-hover transition-colors duration-500">{exp.role}</h3>
              <span className="text-slate-500 group-hover:text-hover/80 font-mono text-sm transition-colors duration-500">{exp.period}</span>
            </div>
            <h4 className="text-slate-300 font-medium mb-3">{exp.company}</h4>
            <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}