// src/App.jsx
import React from 'react';

// Import all your section components
import Header from './sections/Header';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import Game from './sections/Game';
import Footer from './sections/Footer';

export default function App() {
  return (
    <>
      <style>{`
        body { font-family: 'Inter', sans-serif; }
        .blueprint-bg {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          /* --- UPDATED BACKGROUND COLOR --- */
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
      `}</style>
      
      <div className="antialiased text-gray-800">
        <div className="blueprint-bg"></div>
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
                 <Game />
            <Contact />
       
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
