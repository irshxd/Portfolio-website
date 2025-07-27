import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import AnimatedSection from '../components/AnimatedSection';

// Reusable animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const About = () => {
    return (
        <AnimatedSection id="about" className="bg-white">
            <div className="max-w-4xl mx-auto text-center">
                <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4 text-gray-900">
                    About Me
                </motion.h2>
                <motion.div variants={fadeInUp} className="w-24 h-1 bg-sky-500 mx-auto mb-12"></motion.div>
                <motion.p variants={fadeInUp} className="text-lg text-gray-600 leading-relaxed">
                    {portfolioData.bio}
                </motion.p>
            </div>
        </AnimatedSection>
    );
};

export default About;
