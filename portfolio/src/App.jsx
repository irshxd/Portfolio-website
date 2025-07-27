// src/App.jsx
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Game from './sections/Game';
import Footer from './sections/Footer';
import ResumeModal from './components/ResumeModal';
import CommandPalette from './components/CommandPalette';
import CursorTrail from './components/CursorTrail';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .blueprint-bg {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-color: #fafafa; 
          background-image:
            linear-gradient(rgba(229, 231, 235, 0.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(229, 231, 235, 0.7) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: -1;
          animation: pan-grid 60s linear infinite;
        }
        @keyframes pan-grid {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        
        /* --- NEW: THEMED SCROLLBAR --- */
        /* This works on Chrome, Edge, and Safari */
        ::-webkit-scrollbar {
          width: 12px;
        }
        ::-webkit-scrollbar-track {
          background: #e5e7eb; /* Light grey track */
        }
        ::-webkit-scrollbar-thumb {
          background-color: #0ea5e9; /* Blueprint blue thumb */
          border-radius: 20px;
          border: 3px solid #e5e7eb; /* Creates padding around thumb */
        }
      `}</style>
      
      <div className="antialiased text-gray-800">
        <CursorTrail />
        <div className="blueprint-bg"></div>
        <div className="relative z-10">
          <CommandPalette onResumeOpen={() => setIsResumeOpen(true)} />
          <Header onResumeOpen={() => setIsResumeOpen(true)} />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
            <Game />
          </main>
          <Footer />
        </div>
        
        <AnimatePresence>
          {isResumeOpen && <ResumeModal onClose={() => setIsResumeOpen(false)} />}
        </AnimatePresence>
      </div>
    </>
  );
}
