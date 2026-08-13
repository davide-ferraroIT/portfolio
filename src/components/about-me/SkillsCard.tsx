'use client';

import { Code2 } from 'lucide-react';
import { motion, MotionProps } from 'framer-motion';

interface SkillsCardProps {
  fadeInUp: MotionProps;
}

const softwareSkills = ["React", "Django", "PostgreSQL", "C/C++", "Java", "PHP", "MySQL", "JavaScript", "HTML", "CSS", "Git"];
const systemSkills = ["Docker & DevOps", "Networking", "System Admin", "Hardware Support", "IT Help Desk", "Gestione Accessi"];
const softSkills = ["Problem Solving", "Troubleshooting", "Inglese B1", "Gestione dello Stress", "Disponibilità Trasferte", "Patente A2 - B"];

export default function SkillsCard({ fadeInUp }: SkillsCardProps) {
  return (
    <motion.section 
      {...fadeInUp}
      className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-3xl hover:border-hover/40 transition-all duration-500 group"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-hover/10 rounded-2xl text-hover group-hover:scale-110 transition-transform">
          <Code2 size={28} />
        </div>
        <h2 className="text-3xl font-bold">Le mie Skill</h2>
      </div>
      
      {/* Modificato in grid-cols-3 per ospitare la nuova categoria */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sviluppo Software */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Sviluppo Software</h3>
          <div className="flex flex-wrap gap-2">
            {softwareSkills.map((s) => (
              <motion.span 
                key={s} 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-hero border border-white/10 rounded-xl text-xs font-semibold hover:border-hover hover:text-hover transition-all duration-300 cursor-default"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Sistemi & Reti */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Sistemi & Reti</h3>
          <div className="flex flex-wrap gap-2">
            {systemSkills.map((s) => (
              <motion.span 
                key={s} 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-hero border border-white/10 rounded-xl text-xs font-semibold hover:border-hover hover:text-hover transition-all duration-300 cursor-default"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Soft Skill & Altro */}
        <div>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Soft Skill & Info</h3>
          <div className="flex flex-wrap gap-2">
            {softSkills.map((s) => (
              <motion.span 
                key={s} 
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-hero border border-white/10 rounded-xl text-xs font-semibold hover:border-hover hover:text-hover transition-all duration-300 cursor-default"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </motion.section>
  );
}