// src/components/CursorTrail.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// A custom hook to track mouse position
const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return position;
};

const CursorTrail = () => {
  const { x, y } = useMousePosition();

  // This is the main spotlight element
  const spotlightVariants = {
    default: {
      x: x - 200, // Center the 400px spotlight on the cursor
      y: y - 200,
    }
  };

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300"
      style={{
        // This radial gradient creates the soft spotlight effect
        background: `radial-gradient(400px at ${x}px ${y}px, rgba(14, 165, 233, 0.15), transparent 80%)`,
      }}
    />
  );
};

export default CursorTrail;
