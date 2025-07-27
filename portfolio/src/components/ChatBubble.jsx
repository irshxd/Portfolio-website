// src/components/ChatBubble.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';

const ChatBubble = ({ message }) => {
  const { text, from } = message;
  const isUser = from === 'user';

  const bubbleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={bubbleVariants}
      className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Icon */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-sky-500 text-white order-2' : 'bg-gray-200 text-gray-600 order-1'}`}>
        {isUser ? <User size={18} /> : <Sparkles size={18} />}
      </div>

      {/* Message Bubble */}
      <div className={`px-4 py-3 rounded-xl max-w-md ${isUser ? 'bg-sky-500 text-white order-1' : 'bg-white border border-gray-200 text-gray-800 order-2'}`}>
        <p className="text-sm leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
};

export default ChatBubble;
