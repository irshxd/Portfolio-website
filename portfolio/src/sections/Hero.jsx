// src/sections/Hero.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Mail, RefreshCw } from 'lucide-react';
import { portfolioData } from '../data';

// Reusable animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [joke, setJoke] = useState("Click the refresh button to get a joke!");
  const [isLoading, setIsLoading] = useState(false);

  const fetchJoke = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setJoke("Brewing up a fresh joke...");

    try {
      const prompt = "Tell me a short, clever, and funny tech joke suitable for a software engineer's portfolio. Keep it to one or two sentences.";
      
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key is missing. Please check your .env.local file.");
      }

      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        throw new Error(result.error ? result.error.message : 'API request failed.');
      }
      
      const jokeText = result.candidates[0].content.parts[0].text;
      setJoke(jokeText);

    } catch (error) {
      console.error("Error fetching joke:", error);
      setJoke(`Oops! The AI is taking a coffee break. Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped && joke === "Click the refresh button to get a joke!") {
      fetchJoke();
    }
  };

  return (
    <section id="hero" className="relative h-screen max-h-[880px] flex items-center overflow-hidden">
      
      {/* --- BLUEPRINT POSITIONING CHANGED --- */}
      <motion.div
        // Changed `inset-0` to pin it to the bottom and adjusted justification
        className="absolute -bottom-[200px] left-0 right-20 z-0 flex items-end justify-center pointer-events-none h-1/2"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        <img 
          src="jet-blueprint.png" 
          alt="F1 Car Blueprint" 
          className="w-full h-full max-w-20xl object-contain opacity-25"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }} 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column: Text Content */}
          <div className="text-center md:text-left">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4">
              {portfolioData.name}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-sky-600 font-medium mb-8">
              {portfolioData.title}
            </motion.p>
            <motion.p variants={fadeInUp} className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0 mb-10">
              {portfolioData.slogan}
            </motion.p>
            <motion.div variants={fadeInUp} className="flex justify-center md:justify-start items-center space-x-5">
              <a href={`mailto:${portfolioData.contact.email}`} className="text-gray-500 hover:text-sky-500 transition-transform duration-300 hover:scale-110"><Mail size={28} /></a>
              <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-500 transition-transform duration-300 hover:scale-110"><Linkedin size={28} /></a>
              <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-500 transition-transform duration-300 hover:scale-110"><Github size={28} /></a>
            </motion.div>
          </div>

          {/* Right Column: Flippable Photo Card */}
          <motion.div variants={fadeInUp} className="flex justify-center" style={{ perspective: '1000px' }}>
            <motion.div
              className="relative w-80 h-80 md:w-96 md:h-96 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              onClick={handleCardClick}
            >
              {/* Front of the card (Photo) */}
              <div className="absolute w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
                <img 
                  src={portfolioData.photoUrl} 
                  alt="Mohammed Adil" 
                  className="relative rounded-full object-cover w-full h-full border-8 border-white shadow-2xl" 
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/384x384/e2e8f0/334155?text=Your+Photo'; }} 
                />
              </div>

              {/* Back of the card (Joke) */}
              <div 
                className="absolute w-full h-full bg-white border-8 border-white shadow-2xl rounded-full flex flex-col items-center justify-center p-8 text-center" 
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <p className="text-lg font-medium text-gray-700 flex-grow flex items-center">{joke}</p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    fetchJoke();
                  }}
                  className={`mt-4 p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors ${isLoading ? 'animate-spin' : ''}`}
                  disabled={isLoading}
                  aria-label="Get new joke"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
