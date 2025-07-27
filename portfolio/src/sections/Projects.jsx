// src/sections/Projects.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data';
import AnimatedSection from '../components/AnimatedSection';
import ProjectCard from '../components/ProjectCard';
import AiChatModal from '../components/AiChatModal'; // Import the modal

// Reusable animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Projects = () => {
    // State to manage which project is selected for the AI chat
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <>
            <AnimatedSection id="projects" className="bg-white">
                <motion.h2 variants={fadeInUp} className="text-4xl font-bold text-center mb-4 text-gray-900">
                    Featured Projects
                </motion.h2>
                <motion.div variants={fadeInUp} className="w-24 h-1 bg-sky-500 mx-auto mb-16"></motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {portfolioData.projects.map((project, index) => (
                        <ProjectCard 
                            project={project} 
                            key={index}
                            // When the "Ask AI" button is clicked, set this project as the selected one
                            onAskAi={() => setSelectedProject(project)}
                        />
                    ))}
                </div>
            </AnimatedSection>

            {/* Conditionally render the AI Chat Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <AiChatModal 
                        project={selectedProject} 
                        // The onClose function simply clears the selected project, hiding the modal
                        onClose={() => setSelectedProject(null)} 
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Projects;
