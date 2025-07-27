// src/sections/Contact.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import AnimatedSection from '../components/AnimatedSection';

// Reusable animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Contact = () => {
    return (
        <AnimatedSection id="contact" className="bg-white">
            <div className="max-w-2xl mx-auto text-center">
                <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-gray-900 mb-4">
                    Get In Touch
                </motion.h2>
                <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8">
                    I'm currently open to new opportunities and collaborations. Let's build something amazing together.
                </motion.p>
                <motion.a 
                    variants={fadeInUp}
                    href={`mailto:${portfolioData.contact.email}`}
                    className="inline-block bg-sky-500 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-sky-600 transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-sky-600/40 transform hover:scale-105"
                >
                    Say Hello
                </motion.a>
            </div>
        </AnimatedSection>
    );
};

export default Contact;
