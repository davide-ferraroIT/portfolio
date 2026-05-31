'use client';

import Typewriter from 'typewriter-effect';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-10 md:gap-1 bg-hero min-h-[90vh]">
            {/* BLOCCO TESTO */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center gap-12">
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
                </div>
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
                    <Link
                        href="/#contact"
                        onClick={handleContactClick}
                        className="inline-block px-10 py-4 bg-hover text-[#0A001B] font-bold rounded-full hover:scale-110 active:scale-95 transition-all duration-300 shadow-lg shadow-hover/20 cursor-pointer"
                    >
                        Contattami
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}