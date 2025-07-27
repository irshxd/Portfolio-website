// src/sections/Header.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, FileText, Gamepad2 } from 'lucide-react';
import { portfolioData } from '../data';

// We now accept an `onResumeOpen` prop from App.jsx
const Header = ({ onResumeOpen }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = ["About", "Skills", "Projects", "Game", "Contact"];

    const scrollToSection = (id) => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-white/80 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-3 md:py-4">
                <div className="flex items-center justify-between">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-2xl md:text-3xl font-bold text-gray-800">
                        {portfolioData.name.split(' ')[1]}<span className="text-sky-500">.</span>
                    </motion.div>
                    <div className="flex items-center space-x-4">
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <button key={link} onClick={() => scrollToSection(link)} className="text-lg text-gray-600 hover:text-sky-500 transition-colors flex items-center gap-2">
                                    {link === "Game" && <Gamepad2 size={20} />}
                                    {link}
                                </button>
                            ))}
                         
                           <button 
                                onClick={onResumeOpen} 
                                className="flex items-center gap-2 text-gray-600 font-semibold bg-gray-100 px-4 py-2 rounded-lg hover:bg-sky-100 hover:text-sky-600 transition-colors"
                            >
                                <FileText size={16} /> Resume
                            </button>
                        </nav>
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:hidden bg-white/95">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        {navLinks.map((link) => (
                            <button key={link} onClick={() => scrollToSection(link)} className="text-lg text-gray-700 hover:text-sky-500 w-full py-2 transition-colors flex items-center justify-center gap-2">
                                {link === "Game" && <Gamepad2 size={22} />}
                                {link}
                            </button>
                        ))}
                          <button onClick={onResumeOpen} className="text-gray-700 hover:text-sky-500 w-full py-2 transition-colors font-semibold">
                            View Resume
                        </button>
                      
                    </div>
                </motion.div>
            )}
        </header>
    );
};

export default Header;