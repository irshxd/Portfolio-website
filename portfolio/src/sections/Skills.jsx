import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import AnimatedSection from '../components/AnimatedSection';

// Reusable animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Skills = () => {
    return (
        <AnimatedSection id="skills">
            <div className="max-w-5xl mx-auto">
                <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-4 text-gray-900">
                    Technical Skills
                </motion.h2>
                <motion.div variants={fadeInUp} className="w-24 h-1 bg-sky-500 mx-auto mb-16"></motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {Object.entries(portfolioData.skills).map(([category, { icon: Icon, items }]) => (
                        <motion.div 
                            key={category} 
                            variants={fadeInUp}
                            className="bg-white border border-gray-200 rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:border-sky-500/50 hover:-translate-y-2"
                        >
                            <div className="flex items-center mb-4">
                                <Icon className="text-sky-500 mr-4" size={28} />
                                <h3 className="text-xl font-bold text-gray-800">{category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {items.map(skill => (
                                    <div key={skill} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default Skills;

