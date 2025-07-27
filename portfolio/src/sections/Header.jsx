// src/sections/Header.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Gamepad2 } from 'lucide-react'; // Import the Gamepad2 icon
import { portfolioData } from '../data';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // --- ADDED "Game" to the navLinks array ---
    const navLinks = ["About", "Skills", "Projects", "Game", "Contact"];

    const scrollToSection = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-white/80 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'}`}>
            {/* --- INCREASED NAVBAR HEIGHT AND PADDING --- */}
            <div className="container mx-auto my-0 px-6 py-2 ">
                <div className="flex items-center justify-between">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl md:text-4xl font-bold text-gray-800">
                        {portfolioData.name.split(' ')[1]}<span className="text-sky-500">.</span>
                    </motion.div>
                    <div className="flex items-center space-x-4">
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <button 
                                    key={link} 
                                    onClick={() => scrollToSection(link)} 
                                    // --- INCREASED FONT SIZE AND ADDED ICON FOR GAME ---
                                    className="text-lg text-gray-600 hover:text-sky-500 transition-colors flex items-center gap-2"
                                >
                                    {link === "Game" && <Gamepad2 size={20} />}
                                    {link}
                                </button>
                            ))}
                        </nav>
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:hidden bg-white/95">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        {navLinks.map((link) => (
                            <button key={link} onClick={() => scrollToSection(link)} className="text-xl text-gray-700 hover:text-sky-500 w-full py-2 transition-colors flex items-center justify-center gap-2">
                                {link === "Game" && <Gamepad2 size={22} />}
                                {link}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;
