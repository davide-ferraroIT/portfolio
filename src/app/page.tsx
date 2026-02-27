'use client';

import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, ArrowRight, Box, Instagram, Linkedin, Mail, Send, User, MessageSquare } from 'lucide-react';
import { useState } from 'react';


//array di card
const projects = [
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
  },
  {
    title: "Test",
    description: "test test test",
    image: "/test.webp",
    links: { github: "#", web: "#", package: "#" }
  }
];

export default function Home() {
  return (
    <main className="">
      
      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-10 md:gap-1 bg-hero min-h-[90vh]">
        
        {/* BLOCCO TESTO */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className=""
        >
          <h1 className="flex flex-col items-center md:items-start font-bold tracking-tight">
            <span className="text-6xl md:text-8xl mb-2 text-white">
              Ciao, sono
            </span>
            <span className="text-hover text-4xl md:text-6xl w-80 md:w-130">
              <Typewriter
                options={{
                  strings: ['Davide Ferraro', 'uno sviluppatore'],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </span>
          </h1>
        </motion.div>

        {/* IMMAGINE E BOTTONE */}
        <div className="flex flex-col items-center gap-8">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative w-100 h-100 md:w-150 md:h-150"
          >
            <Image 
              src="/davide.png" 
              alt="Davide Ferraro"
              fill
              className="object-contain p-7"
              priority 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <a 
              href="#contact" 
              className="inline-block px-10 py-4 bg-hover text-[#0A001B] font-bold rounded-full hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-hover/20 cursor-pointer"
            >
              Contattami
            </a>
          </motion.div>
        </div>
      </section>

      {/* DIVIDER CURVO */}
      <div className="relative w-full overflow-hidden leading-[0] bg-white">
        <svg
          viewBox="-100 0 1587 79"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[100px] fill-hero"
        >
          <path d="M-100 79C-100 79 218.416 23.165 693.5 23.165C1168.58 23.165 1487 79 1487 79V0H-100V79Z"></path>
        </svg>
      </div>

      {/* SEZIONE CHI SONO */}
      <section className="bg-white text-hero py-20 px-8 md:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-center md:items-start">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold mb-8 uppercase tracking-tighter"
          >
            Chi Sono?
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="space-y-6 text-lg md:text-xl text-slate-700 leading-relaxed"
          >
            <p>
              Qui puoi inserire la tua presentazione. Grazie allo sfondo bianco e al testo scuro, 
              questa sezione risulterà estremamente leggibile e professionale.
            </p>
            <p>
              Il passaggio dalla Dark Mode della Hero a questa sezione chiara crea quell'effetto 
              "stacco" che abbiamo visto nel tuo riferimento.
            </p>
          </motion.div>
          
        </div>
      </section>

      {/* SEZIONE PROGETTI */}         
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
            
            {/* primi 3 progetti (slice da 0 a 3) */}
            {projects.slice(0, 3).map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ delay: index * 0.25 }}
                className="group bg-white rounded-[2.5rem] border border-slate-100 hover:border-hover shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                {/* Immagine */}
                <div className="relative h-64 w-full bg-slate-50">
                  <Image src={project.image} alt={project.title} fill className="object-contain p-6" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>

                {/* Testo */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
                    {project.description}
                  </p>
                  {/* Icona */}
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-hero transition-colors w-fit">
                    <Github size={24} />
                  </a>
                </div>
              </motion.div>
            ))}

            {/* IL BOTTONE "MOSTRA DI PIÙ" (il quarto elemento) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.8 }} // Aumentato il delay per seguire le 3 card
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

      {/* FORM CONTTATAMI */}
      <section id="contact" className="bg-white scroll-mt-20 py-20 px-6 md:px-24">
        <div className="max-w-4xl mx-auto">
        
          {/* INTESTAZIONE */}
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              className="text-4xl md:text-5xl font-bold text-hero mb-4"
            >
              Lavoriamo Insieme
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-lg"
            >
              Hai un progetto in mente o vuoi semplicemente fare due chiacchiere? Mandami un messaggio!
            </motion.p>
          </div>

          {/* LA CARD DEL FORM */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-12"
          >
            <form className="space-y-6" data-netlify="true" name="contact" onSubmit={(e) => e.preventDefault()}>
              <input type="hidden" name="form-name" value="contact" /> {/* per permettere l'invio dei dati via js*/}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-hero ml-1 flex items-center gap-2">
                    <User size={16} /> Nome
                  </label>
                  <input 
                    name="name"
                    required
                    type="text" 
                    placeholder="Il tuo nome"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-hero focus:outline-none focus:border-hover focus:ring-1 focus:ring-hero transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-hero ml-1 flex items-center gap-2">
                    <Mail size={16} /> Email
                  </label>
                  <input 
                    name="email"
                    required
                    type="email" 
                    placeholder="esempio@mail.com"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-hero focus:outline-none focus:border-hover focus:ring-1 focus:ring-hero transition-all"
                  />
                </div>
              </div>

              {/* Messaggio */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-hero ml-1 flex items-center gap-2">
                  <MessageSquare size={16} /> Messaggio
                </label>
                <textarea 
                  name="message"
                  required
                  rows={5}
                  placeholder="Come posso aiutarti?"
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-hero focus:outline-none focus:border-hover focus:ring-1 focus:ring-hero transition-all resize-none"
                ></textarea>
              </div>

              {/* Bottone Invio */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full md:w-max px-12 py-4 bg-hero text-white font-bold rounded-full shadow-lg shadow-hero/20 hover:bg-hover hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
              >
                Invia Messaggio
                <Send size={20} />
              </motion.button>

            </form>
          </motion.div>
        </div>
      </section>

      {/* DIVIDER CURVO (Transizione da Bianco a Scuro) */}
        <div className="relative w-full overflow-hidden leading-[0] bg-white">
          <svg
            viewBox="-100 0 1587 79"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px] md:h-[100px] fill-[#0A001B]"
          >
            {/* Usiamo lo stesso path ma invertito/adattato per riempire il basso */}
            <path d="M-100 0C-100 0 218.416 55.835 693.5 55.835C1168.58 55.835 1487 0 1487 0V79H-100V0Z"></path>
          </svg>
        </div>

    </main>
    
  );
}