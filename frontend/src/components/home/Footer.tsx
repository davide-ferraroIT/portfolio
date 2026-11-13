'use client';

import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-hero text-white">
            {/* CONTENUTO DEL FOOTER */}
            <div className="w-full px-8 md:px-16 lg:px-24 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
                
                {/* SINISTRA: Copyright */}
                <div className="text-slate-400 text-sm font-medium order-2 md:order-1">
                    © {new Date().getFullYear()} davide-ferraro.it
                </div>

                {/* DESTRA: Box Esterno Social + Mail */}
                <div className="flex flex-col items-center gap-4 order-1 md:order-2">
                    
                    {/* Riga Icone */}
                    <div className="flex items-center gap-6">
                        <a 
                            href="mailto:info@davide-ferraro.it" 
                            className="text-slate-400 hover:text-hover transition-all duration-300 hover:scale-110"
                            title="Scrivimi una mail"
                        >
                            <Mail size={24} />
                        </a>

                        <a 
                            href="https://github.com/davide-ferraroIT" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                        >
                            <Github size={24} />
                        </a>
                        
                        <a 
                            href="https://www.linkedin.com/in/davideferraroIT" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                        >
                            <Linkedin size={24} />
                        </a>
                    </div>

                    {/* Testo Email sotto le icone */}
                    <a 
                        href="mailto:info@davide-ferraro.it"
                        className="text-slate-400 hover:text-hover text-sm font-medium tracking-wide transition-colors duration-300"
                    >
                        Scrivimi su info@davide-ferraro.it
                    </a>
                </div>
            </div>
        </footer>
    );
}