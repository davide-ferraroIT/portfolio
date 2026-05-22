'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "Alzati Lazzaro World",
    description: "Rifacimento grafico del sito di una attività locale",
    image: "/alzatiLazzaro.jpeg",
    links: { github: "#", web: "#", package: "#" }
  },
  {
    title: "Test",
    description: "test test test",
    image: "/test.webp",
    links: { github: "#", web: "#", package: "#" }
  },
  {
    title: "Test",
    description: "test test test",
    image: "/test.webp",
    links: { github: "#", web: "#", package: "#" }
  }
];

export default function ProjectsSection() {
  return (
    <section className="bg-white text-hero py-20 px-6 md:px-24">
      <div className="max-w-7xl mx-auto">
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
            una piccola collezione dei miei progetti, scoprili tutti!
          </motion.p>
        </div>

        {/* GRIGLIA DINAMICA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: index * 0.25 }}
              className="group bg-white rounded-[2.5rem] border border-slate-100 hover:border-hover shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 w-full bg-slate-50">
                <Image src={project.image} alt={project.title} fill className="object-contain p-6" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-hero transition-colors w-fit">
                  <Github size={24} />
                </a>
              </div>
            </motion.div>
          ))}

          {/* BOTTONE "MOSTRA DI PIÙ" */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.8 }}
            className="relative group rounded-[2.5rem] border-2 border-dashed border-slate-200 flex items-center justify-center min-h-[400px] hover:border-hover transition-colors duration-300"
          >
            <Link
              href="/projects"
              className="flex flex-col items-center gap-4 text-center p-8 w-full h-full justify-center"
            >
              <div className="w-16 h-16 bg-hero/10 text-hero rounded-full flex items-center justify-center group-hover:bg-hover group-hover:text-white transition-all duration-300">
                <ArrowRight size={32} className="group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <span className="block text-2xl font-bold text-hero">Mostra di più</span>
                <span className="text-slate-500 text-sm">Guarda tutti i miei lavori</span>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}