// src/sections/Game.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';

// Reusable animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Game = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Game settings
  const gridSize = 20;
  
  // We use refs to hold game state that changes rapidly, to avoid re-renders
  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const foodRef = useRef({ x: 15, y: 15 });
  const directionRef = useRef({ x: 0, y: -1 }); // Start moving up
  const gameLoopRef = useRef(null);

  const generateFood = (canvas) => {
    foodRef.current = {
      x: Math.floor(Math.random() * (canvas.width / gridSize)),
      y: Math.floor(Math.random() * (canvas.height / gridSize))
    };
  };

  const resetGame = () => {
    const canvas = canvasRef.current;
    snakeRef.current = [{ x: 10, y: 10 }];
    directionRef.current = { x: 0, y: -1 };
    generateFood(canvas);
    setScore(0);
    setIsGameOver(false);
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;
      
      const keyMap = {
        'ArrowUp': { x: 0, y: -1 },
        'ArrowDown': { x: 0, y: 1 },
        'ArrowLeft': { x: -1, y: 0 },
        'ArrowRight': { x: 1, y: 0 }
      };

      if (keyMap[e.key]) {
        e.preventDefault();
        const newDirection = keyMap[e.key];
        // Prevent the snake from reversing on itself
        if (directionRef.current.x !== -newDirection.x || directionRef.current.y !== -newDirection.y) {
          directionRef.current = newDirection;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted]);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    const gameLoop = () => {
      if (!gameStarted || isGameOver) {
        clearInterval(gameLoopRef.current);
        return;
      }

      // Move snake
      const head = { ...snakeRef.current[0] };
      head.x += directionRef.current.x;
      head.y += directionRef.current.y;

      // Check for collision with walls
      if (head.x < 0 || head.x >= canvas.width / gridSize || head.y < 0 || head.y >= canvas.height / gridSize) {
        setIsGameOver(true);
        return;
      }

      // Check for collision with self
      for (let i = 1; i < snakeRef.current.length; i++) {
        if (head.x === snakeRef.current[i].x && head.y === snakeRef.current[i].y) {
          setIsGameOver(true);
          return;
        }
      }

      snakeRef.current.unshift(head);

      // Check for collision with food
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(prev => prev + 10);
        generateFood(canvas);
      } else {
        snakeRef.current.pop();
      }

      // Draw everything
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw food
      ctx.fillStyle = '#ef4444'; // Red for food
      ctx.fillRect(foodRef.current.x * gridSize, foodRef.current.y * gridSize, gridSize, gridSize);

      // Draw snake
      ctx.fillStyle = '#0ea5e9'; // Blueprint blue for snake
      snakeRef.current.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
      });
    };

    if(gameStarted && !isGameOver) {
        gameLoopRef.current = setInterval(gameLoop, 100);
    }

    return () => clearInterval(gameLoopRef.current);

  }, [gameStarted, isGameOver]);


  return (
    <AnimatedSection id="game" className="bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-4 text-gray-900">
          Take a Break
        </motion.h2>
        <motion.div variants={fadeInUp} className="w-24 h-1 bg-sky-500 mx-auto mb-8"></motion.div>
        <motion.p variants={fadeInUp} className="text-lg text-gray-600 mb-8">
          Fancy a quick game? Use the arrow keys to play.
        </motion.p>
        
        <motion.div variants={fadeInUp} className="relative aspect-video bg-gray-50 border-2 border-gray-200 rounded-lg shadow-inner overflow-hidden">
          <canvas
            ref={canvasRef}
            width={600}
            height={338} // Maintain a 16:9 aspect ratio
            className="w-full h-full"
          />
          {!gameStarted && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80">
              <button onClick={resetGame} className="bg-sky-500 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-sky-600 transition-colors shadow-lg">
                Start Game
              </button>
            </div>
          )}
          {isGameOver && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/80 text-white">
              <h3 className="text-4xl font-bold">Game Over</h3>
              <p className="text-xl mt-2">Your Score: {score}</p>
              <button onClick={resetGame} className="mt-6 flex items-center gap-2 bg-sky-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors">
                <RotateCw size={18} /> Play Again
              </button>
            </div>
          )}
        </motion.div>
        <div className="mt-4 flex justify-between items-center font-semibold text-gray-700">
            <p>Score: <span className="text-2xl font-bold text-sky-600">{score}</span></p>
            <div className="hidden md:flex items-center gap-2 text-gray-500">
                <span>Controls:</span>
                <div className="flex gap-1">
                    <div className="w-8 h-8 border rounded flex items-center justify-center"><ArrowUp size={16}/></div>
                    <div className="w-8 h-8 border rounded flex items-center justify-center"><ArrowDown size={16}/></div>
                    <div className="w-8 h-8 border rounded flex items-center justify-center"><ArrowLeft size={16}/></div>
                    <div className="w-8 h-8 border rounded flex items-center justify-center"><ArrowRight size={16}/></div>
                </div>
            </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Game;
