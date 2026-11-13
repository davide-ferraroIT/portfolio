'use client';

import { motion } from 'framer-motion';
import ContactForm from '@/components/home/ContactForm';

export default function ContactSection() {
  return (
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
            Contattami
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg"
          >
            Sei alla ricerca di un profilo tecnico motivato per il tuo team o desideri approfondire le mie competenze? Non esitare a scrivermi.
          </motion.p>
        </div>

        {/* COMPONENTE FORM */}
        <ContactForm />
      </div>
    </section>
  );
}