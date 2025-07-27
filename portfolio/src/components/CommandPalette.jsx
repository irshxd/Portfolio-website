// src/components/CommandPalette.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CornerDownLeft, Hash, Gamepad2, FileText } from 'lucide-react';

const CommandPalette = ({ onResumeOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  // --- Define all available commands ---
  const allCommands = [
    { name: 'About', section: 'about', icon: Hash },
    { name: 'Skills', section: 'skills', icon: Hash },
    { name: 'Projects', section: 'projects', icon: Hash },
    { name: 'Game', section: 'game', icon: Gamepad2 },
    { name: 'View Resume', action: onResumeOpen, icon: FileText },
  ];

  const filteredCommands = query
    ? allCommands.filter(cmd => cmd.name.toLowerCase().includes(query.toLowerCase()))
    : allCommands;

  // --- Keyboard listeners ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Open with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Handle navigation within the palette
      if (isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex(prev => (prev + 1) % filteredCommands.length);
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        }
        if (e.key === 'Enter') {
          e.preventDefault();
          executeCommand(filteredCommands[activeIndex]);
        }
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, activeIndex]);
  
  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const executeCommand = (command) => {
    if (!command) return;
    if (command.section) {
      document.getElementById(command.section)?.scrollIntoView({ behavior: 'smooth' });
    }
    if (command.action) {
      command.action();
    }
    setIsOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white rounded-xl shadow-2xl w-full max-w-xl border border-gray-200"
          >
            <div className="flex items-center p-4 border-b">
              <Search className="text-gray-400 mr-3" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Navigate to a section or action..."
                className="w-full bg-transparent focus:outline-none text-lg text-gray-800"
              />
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => {
                  const Icon = command.icon;
                  return (
                    <div
                      key={command.name}
                      onClick={() => executeCommand(command)}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                        activeIndex === index ? 'bg-sky-100 text-sky-700' : 'text-gray-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        <span>{command.name}</span>
                      </div>
                      {activeIndex === index && <CornerDownLeft size={16} />}
                    </div>
                  );
                })
              ) : (
                <p className="p-4 text-center text-gray-500">No results found.</p>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
