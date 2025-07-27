import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import ChatBubble from './ChatBubble';

const AiChatModal = ({ project, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages([
      { from: 'ai', text: `I have the technical details for the "${project.title}" project. What would you like to know?` }
    ]);
  }, [project]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const finalPrompt = `
        You are an expert project analyst discussing Mohammed Adil's portfolio.
        You are speaking to a potential recruiter. Your tone is professional, knowledgeable, and concise.
        Here is the data for the project:
        - Title: ${project.title}
        - Description: ${project.description}
        - Technologies: ${project.tags.join(', ')}
        The user asks: "${currentInput}"
        Provide a helpful answer based ONLY on the project data. If the question is unrelated, politely decline.
      `;

      const payload = { contents: [{ role: "user", parts: [{ text: finalPrompt }] }] };
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
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
      
      const aiResponseText = result.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { from: 'ai', text: aiResponseText }]);

    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setMessages(prev => [...prev, { from: 'ai', text: `Sorry, an error occurred: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, y: 50, transition: { duration: 0.2, ease: 'easeIn' } }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-gray-100 rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden border border-gray-300"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <Sparkles className="text-sky-500" />
            <h2 className="font-bold text-lg text-gray-800">AI Project Analyst</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-200"><X size={20} /></button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          <AnimatePresence>
            {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
          </AnimatePresence>
          {isLoading && <ChatBubble message={{ from: 'ai', text: 'Analyzing...' }} />}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about challenges, tech choices, etc."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500"
              disabled={isLoading}
            />
            <button type="submit" className="bg-sky-500 text-white rounded-full p-3 hover:bg-sky-600 transition-colors disabled:bg-gray-300" disabled={isLoading}>
              <Send size={20} />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AiChatModal;
