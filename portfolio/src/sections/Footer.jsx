// src/sections/Footer.jsx
import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import { portfolioData } from '../data';

const Footer = () => {
    return (
        <footer className="py-12">
            <div className="container mx-auto px-6 text-center text-gray-500">
                <div className="flex justify-center items-center space-x-6 mb-4">
                    <a href={`mailto:${portfolioData.contact.email}`} className="hover:text-sky-500 transition-transform duration-300 hover:scale-110">
                        <Mail size={24} />
                    </a>
                    <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-transform duration-300 hover:scale-110">
                        <Linkedin size={24} />
                    </a>
                    <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-transform duration-300 hover:scale-110">
                        <Github size={24} />
                    </a>
                </div>
                <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
                <p className="text-sm mt-2">Designed & Built by Mohammed Adil.</p>
            </div>
        </footer>
    );
};

export default Footer;
