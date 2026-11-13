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
        <section className="relative overflow-hidden flex flex-col md:flex-row items-center justify-between p-6 md:p-12 gap-10 md:gap-1 bg-gradient-to-b from-[#0A001B] via-[#0D0321] to-[#16003B] min-h-[90vh]">
            {/* SFONDI DINAMICI E DECORATIVI */}
            <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-40 -left-40 w-96 h-96 bg-hover/40 rounded-full blur-[120px] pointer-events-none z-0"
            />
            <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/4 right-0 md:-right-20 w-[30rem] h-[30rem] bg-blue-600/30 rounded-full blur-[120px] pointer-events-none z-0"
            />
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-20 left-1/3 w-[25rem] h-[25rem] bg-purple-700/30 rounded-full blur-[120px] pointer-events-none z-0"
            />
            {/* BLOCCO TESTO */}
            <motion.div
                className="z-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="flex flex-col items-center gap-12">
                    <h1 className="flex flex-col items-center md:items-start font-bold tracking-tight">
                        <span className="text-6xl md:text-8xl mb-2 text-white">
                            Ciao, sono
                        </span>
                        <span className="text-hover text-3xl sm:text-4xl md:text-5xl lg:text-6xl whitespace-nowrap w-[300px] sm:w-[400px] md:w-[600px]">
                            <Typewriter
                                options={{
                                    strings: [
                                        'Davide Ferraro',
                                        'un Full Stack Developer',
                                        'un ICT Specialist',
                                        'un Software Engineer',
                                        'un Tech Problem Solver'
                                    ],
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
            <div className="flex flex-col items-center gap-8 z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
                    className="relative w-100 h-100 md:w-150 md:h-150"
                >
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="w-full h-full relative"
                    >
                        <Image
                            src="/davide.png"
                            alt="Davide Ferraro"
                            fill
                            className="object-contain p-7 drop-shadow-2xl"
                            priority
                        />
                    </motion.div>
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