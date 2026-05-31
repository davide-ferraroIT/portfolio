'use client';

import Image from "next/image";
import { motion } from 'framer-motion';

export default function AboutHero() {
  return (
    <motion.div 
      className="lg:col-span-5 h-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative h-[500px] w-full group rounded-3xl overflow-hidden border border-white/10 hover:border-hover/40 transition-all duration-500">
        <Image
          src="/fullDavide.webp"
          alt="Davide Ferraro"
          fill
          className="object-cover transition-all duration-700 scale-105 group-hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hero/80 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500"></div>
      </div>
    </motion.div>
  );
}