'use client'; // Rimettiamo use-client se usi le varianti di framer-motion qui

import { motion } from 'framer-motion';
import AboutHero from '@/components/about-me/AboutHero';
import BioCard from '@/components/about-me/BioCard';
import ExperienceCard from '@/components/about-me/ExperienceCard';
import SkillsCard from '@/components/about-me/SkillsCard';

export default function AboutMe() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <main className="min-h-screen bg-hero text-white pt-32 pb-20 px-6 md:px-12 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* TITOLO PRINCIPALE - Ripristinato sopra la griglia */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Chi <span className="text-hover">sono?</span>
          </h1>
        </motion.div>

        {/* GRIGLIA A 12 COLONNE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Foto (Occupa 5 colonne) */}
          <AboutHero />

          {/* Bio (Occupa 7 colonne) */}
          <BioCard fadeInUp={fadeInUp} />

          {/* Sezioni Full Width inferiori */}
          <div className="lg:col-span-12 grid gap-8 mt-4">
            <ExperienceCard fadeInUp={fadeInUp} />
            <SkillsCard fadeInUp={fadeInUp} />
          </div>

        </div>
      </div>
    </main>
  );
}