'use client';

import { Github, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-hero text-white ">
            {/* CONTENUTO DEL FOOTER */}
            <div className="w-full px-8 md:px-16 lg:px-24 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* SINISTRA: Copyright */}
                <div className="text-slate-400 text-sm font-medium">
                    © {new Date().getFullYear()} davideferraro.com
                </div>

                {/* DESTRA: Icone Social */}
                <div className="flex items-center gap-6">
                    <a 
                        href="https://github.com/tuo-profilo" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                    >
                        <Github size={24} />
                    </a>
                    <a 
                        href="https://www.instagram.com/tuo_username" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-pink-500 transition-all duration-300 hover:scale-110"
                    >
                        <Instagram size={24} />
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/tuo-profilo" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                    >
                        <Linkedin size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
}