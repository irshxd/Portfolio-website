// src/sections/Experience.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data';
import AnimatedSection from '../components/AnimatedSection';

// Reusable animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Experience = () => {
    return (
        <AnimatedSection id="experience">
            <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-4 text-gray-900">
                Career Journey
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-24 h-1 bg-sky-500 mx-auto mb-16"></motion.div>
            <div className="max-w-3xl mx-auto">
                <div className="relative border-l-2 border-gray-200 pl-10">
                    {/* Experience Items */}
                    {portfolioData.experience.map((job, index) => (
                        <motion.div variants={fadeInUp} key={`job-${index}`} className="relative mb-12">
                            <div className="absolute -left-[46px] top-1 w-6 h-6 bg-sky-500 rounded-full border-4 border-gray-50 ring-4 ring-sky-200"></div>
                            <p className="text-sm text-gray-500 mb-1">{job.period}</p>
                            <h3 className="text-xl font-bold text-gray-800">{job.role}</h3>
                            <p className="text-lg text-sky-600 mb-2">{job.company}</p>
                            <p className="text-gray-600">{job.description}</p>
                        </motion.div>
                    ))}
                    {/* Education Item */}
                    <motion.div variants={fadeInUp} className="relative">
                        <div className="absolute -left-[46px] top-1 w-6 h-6 bg-sky-500 rounded-full border-4 border-gray-50 ring-4 ring-sky-200"></div>
                        <p className="text-sm text-gray-500 mb-1">{portfolioData.education.period}</p>
                        <h3 className="text-xl font-bold text-gray-800">{portfolioData.education.degree}</h3>
                        <p className="text-lg text-sky-600">{portfolioData.education.institution}</p>
                    </motion.div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default Experience;
