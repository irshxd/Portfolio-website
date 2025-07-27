import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Sparkles } from 'lucide-react';
import { portfolioData } from '../data';

const ResumeSection = ({ title, children, onAiExplain }) => (
  <div className="mb-6">
    <h3 className="text-xl font-bold text-sky-600 border-b-2 border-sky-200 pb-2 mb-3">
      {title}
    </h3>
    <div className="text-gray-700 space-y-3 prose prose-sm max-w-none">
        {children}
    </div>
    <button onClick={() => onAiExplain(title)} className="mt-3 text-sm text-sky-600 font-semibold flex items-center gap-1 hover:underline">
      <Sparkles size={14} /> Ask AI to elaborate
    </button>
  </div>
);

const ResumeModal = ({ onClose }) => {
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAiExplain = async (sectionTitle) => {
    setIsLoading(true);
    setAiResponse('');
    try {
      const prompt = `
        You are an AI assistant summarizing a section of Mohammed Adil's resume for a recruiter.
        The section is "${sectionTitle}".
        Here is the relevant data from his resume:
        - Summary: ${portfolioData.summary}
        - Projects: ${portfolioData.projects.map(p => `${p.title}: ${p.description}`).join('\n')}
        - Experience: ${portfolioData.experience.map(e => `${e.role} at ${e.company}: ${e.description}`).join('\n')}
        
        Your task is to elaborate on the "${sectionTitle}" section in 2-3 concise, professional sentences.
        If the user asks about Projects, highlight the most impressive technologies used.
        If the user asks about Experience, emphasize leadership and impact.
      `;
      
      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
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
      
      const text = result.candidates[0].content.parts[0].text;
      setAiResponse(text);

    } catch (error) {
      setAiResponse(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between p-4 border-b bg-gray-50 flex-shrink-0">
          <h2 className="font-bold text-lg text-gray-800">Mohammed Adil's Resume</h2>
          <div className="flex items-center gap-4">
            <a href={portfolioData.resumeUrl} download="Mohammed_Adil_Resume.pdf" className="flex items-center gap-2 text-sm font-semibold bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors">
              <Download size={16} /> Download PDF
            </a>
            <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-200"><X size={20} /></button>
          </div>
        </div>
        <div className="flex-grow p-8 overflow-y-auto">
          <ResumeSection title="Summary" onAiExplain={handleAiExplain}>
            <p>{portfolioData.summary}</p>
          </ResumeSection>
          <ResumeSection title="Projects" onAiExplain={handleAiExplain}>
            <ul>{portfolioData.projects.map((p, i) => <li key={i}><strong>{p.title}:</strong> {p.description}</li>)}</ul>
          </ResumeSection>
          <ResumeSection title="Experience" onAiExplain={handleAiExplain}>
            {portfolioData.experience.map((e, i) => <div key={i} className="mb-2"><p><strong>{e.role}</strong> - {e.company}</p><p className="text-sm text-gray-600">{e.description}</p></div>)}
          </ResumeSection>
          
          <AnimatePresence>
            {(isLoading || aiResponse) && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-6">
                <div className="bg-sky-50 border border-sky-200 p-4 rounded-lg">
                  <h4 className="font-bold text-sky-800 flex items-center gap-2 mb-2"><Sparkles size={16}/> AI Elaboration</h4>
                  <div className="text-sky-900 text-sm">
                    {isLoading ? 'Generating insights...' : aiResponse}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ResumeModal;
