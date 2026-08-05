'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Funzione per chiudere il menu quando si clicca un link
  const closeMenu = () => setIsOpen(false);

  // Scorre in cima se siamo già in homepage
  const handleHomeClick = () => {
    closeMenu();
    if (pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scorre al form dei contatti se siamo già in homepage
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (pathname === '/') {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-navbar text-white border-b border-slate-500 backdrop-blur-sm bg-opacity-95">
      <div className="flex justify-between items-center min-h-[80px] px-8 md:px-10 w-full">
  
        {/* LOGO - Centrato forzando il flex sul Link */}
        <div className="flex items-center justify-center">
          <Link href="/" onClick={handleHomeClick} className="flex items-center justify-center">
            <Image 
              src="/icon.png"       
              alt="Davide Ferraro Logo" 
              width={40}            
              height={40}           
              className="hover:opacity-80 transition-opacity rounded-full object-cover border-2 border-white/20 hover:border-hover"
            />
          </Link>
        </div>
        
        {/* DESKTOP MENU (Invariato, ma eredita il padding del padre) */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-base font-medium">
            <li><Link href="/" onClick={handleHomeClick} className="hover:text-hover transition-colors">Home</Link></li>
            <li><Link href="/projects" onClick={closeMenu} className="hover:text-hover transition-colors">Progetti</Link></li>
            <li><Link href="/about-me" className="hover:text-hover transition-colors">Chi Sono</Link></li>
          </ul>
          <Link 
            href="/#contact" 
            onClick={handleContactClick}
            className="bg-hover text-white px-5 py-2 rounded-full font-bold hover:bg-hover transition-all duration-300 shadow-lg hover:scale-105"
          >
            Contattami
          </Link>
        </div>

        {/* MOBILE TRIGGER - Sincronizzato con l'altezza del logo */}
        <button 
          className="md:hidden text-white focus:outline-none flex items-center justify-center p-0 m-0 h-[40px] w-[40px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* MOBILE MENU (Apertura a tendina) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-navbar border-t border-slate-500 overflow-hidden"
          >
            <ul className="flex flex-col gap-6 p-6 text-lg font-medium">
              <li>
                <Link href="/" onClick={handleHomeClick} className="block hover:text-hover">Home</Link>
              </li>
              <li>
                <Link href="/projects" onClick={closeMenu} className="block hover:text-hover">Progetti</Link>
              </li>
              <li>
                <Link href="/about-me" onClick={closeMenu} className="block hover:text-hover">Chi Sono</Link>
              </li>
              <li>
                <Link 
                  href="/#contact" 
                  onClick={handleContactClick}
                  className="inline-block bg-hover text-white px-6 py-3 rounded-full font-bold text-center w-full"
                >
                  Contattami
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}