// src/components/ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight, Sparkles } from 'lucide-react';

// Reusable animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// We now accept an `onAskAi` prop
const ProjectCard = ({ project, onAskAi }) => {
    return (
      <motion.div 
        variants={fadeInUp}
        className="bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group"
      >
        <div className="overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/334155?text=Project+Image'; }}
          />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="bg-sky-100 text-sky-800 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between">
            {/* Links on the left */}
            <div className="flex items-center space-x-4">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-sky-600 hover:text-sky-800 font-semibold transition-colors duration-300"
                >
                  Live Demo <ArrowUpRight className="ml-1" size={18} />
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 font-semibold transition-colors duration-300"
                >
                  <Github className="mr-2" size={20} /> Code
                </a>
              )}
            </div>
            {/* AI Button on the right */}
            <button 
              onClick={onAskAi}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-sky-600 transition-colors duration-300"
            >
              <Sparkles size={16} /> Ask AI
            </button>
          </div>
        </div>
      </motion.div>
    );
};

export default ProjectCard;
