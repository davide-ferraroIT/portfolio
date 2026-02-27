'use client';

import { useState } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  // Stati per gestire l'invio e il nome dinamico
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submittedName, setSubmittedName] = useState('');

  // Funzione per codificare i dati nel formato richiesto da Netlify [cite: 2026-02-27]
  const encode = (data: any) => {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    
    // 1. Catturiamo il nome per il messaggio di successo
    const name = formData.get('name') as string;
    setSubmittedName(name);

    const data = Object.fromEntries(formData);

    // 2. Invio AJAX a Netlify [cite: 2026-02-27]
    fetch("/form.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...data,
      }),
    })
      .then(() => setStatus('success'))
      .catch((error) => {
        console.error(error);
        setStatus('error');
      });
  };

  // INTERFACCIA DI SUCCESSO (Messaggio personalizzato)
  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-10 bg-slate-50 rounded-3xl border border-slate-200"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Send size={40} />
        </div>
        <h3 className="text-2xl font-bold text-hero mb-2">Grazie {submittedName}!</h3>
        <p className="text-slate-600">
          Il tuo messaggio è stato inviato correttamente. <br />
          Ti risponderò il prima possibile!!!.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="mt-8 text-hero underline font-semibold hover:text-hover transition-colors cursor-pointer"
        >
          Invia un altro messaggio
        </button>
      </motion.div>
    );
  }

  // INTERFACCIA DEL FORM
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false }}
      className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:p-12"
    >
      <form 
        className="space-y-6" 
        onSubmit={handleSubmit} 
        name="contact"
      >
        {/* Campo hidden per Netlify [cite: 2026-02-27] */}
        <input type="hidden" name="form-name" value="contact" />

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
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-hero focus:outline-none focus:border-hover transition-all"
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
              className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-hero focus:outline-none focus:border-hover transition-all"
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
            className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-hero focus:outline-none focus:border-hover transition-all resize-none"
          ></textarea>
        </div>

        {/* Bottone Invio */}
        <motion.button 
          type="submit"
          disabled={status === 'sending'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full md:w-max px-12 py-4 bg-hero text-white font-bold rounded-full shadow-lg hover:bg-hover hover:text-black transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? (
            'Invio in corso...'
          ) : (
            <>
              Invia Messaggio <Send size={20} />
            </>
          )}
        </motion.button>

        {/* Messaggio di Errore */}
        {status === 'error' && (
          <p className="text-red-500 text-sm text-center font-medium mt-4">
            Ops! Qualcosa è andato storto. Riprova più tardi.
          </p>
        )}
      </form>
    </motion.div>
  );
}