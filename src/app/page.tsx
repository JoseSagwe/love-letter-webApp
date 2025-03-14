"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { Heart, Sparkles, Mail, Star, Gift, Music, Coffee, Cake, Moon, Phone, Camera } from 'lucide-react';

const Confetti = dynamic(() => 
  import('canvas-confetti').then(mod => ({ default: mod.default })),
  { ssr: false }
);

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizResult, setQuizResult] = useState("");
  
  const totalPages = 4;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then(confettiModule => {
        const confetti = confettiModule.default;
        
        // Welcome animation with a consistent pattern
        const end = Date.now() + 3000;
        
        const frame = () => {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff0000', '#ff69b4', '#ff1493'],
            shapes: ['circle']
          });
          
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff0000', '#ff69b4', '#ff1493'],
            shapes: ['circle']
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        };
        
        frame();
      });
    }
  }, []);

  // Function to trigger confetti celebration
  const celebrateWithConfetti = () => {
    if (typeof window !== 'undefined') {
      import('canvas-confetti').then(confettiModule => {
        const confetti = confettiModule.default;
        
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff0000', '#ff69b4', '#ff1493', '#FFC0CB', '#FFB6C1']
        });
      });
    }
  };

  // Quiz questions and answers
  const quizQuestions = [
    {
      question: "What's my favorite thing about you?",
      options: ["Your eyes", "Your smile", "Your laugh", "Your kindness"],
      answer: "Your smile"
    },
    {
      question: "What would be our perfect date?",
      options: ["Fancy dinner", "Movie night", "Stargazing", "Beach walk"],
      answer: "Stargazing"
    },
    {
      question: "What song reminds me of us?",
      options: ["All I ever Need", "All of Me by John Legend", "A Thousand Years by Christina Perri", "At Last by Etta James"],
      answer: "All I ever Need"
    },
    {
      question: "What's my dream way to spend a rainy day with you?",
      options: ["Watching movies under blankets", "Reading books together", "Cooking a delicious meal", "Dancing in the rain"],
      answer: "Cooking a delicious meal"
    },
    {
      question: "What do I love most about our late-night talks?",
      options: ["Sharing secrets", "Planning our future", "Just hearing your voice", "How time seems to stop"],
      answer: "Planning our future"
    },
    {
      question: "Where do I want to travel with you someday?",
      options: ["Paris", "Santorini", "Maldivs", "Anywhere as long as I'm with you"],
      answer: "Maldivs"
    },
    {
      question: "If I could give you one thing, what would it be?",
      options: ["A kiss", "My heart", "Forever love", "All of the above"],
      answer: "All of the above"
    }
  ];

  const handleQuizAnswer = (answer: string) => {
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Show quiz result
      setQuizResult(answer === quizQuestions[quizStep].answer ? 
        "You know me so well! I love that about you. ❤️" : 
        "That's not what I was thinking... but I love you anyway! ❤️");
      
      // Celebrate with confetti
      celebrateWithConfetti();
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizResult("");
  };

  const nextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const toggleQuiz = () => {
    setShowQuiz(!showQuiz);
    resetQuiz();
  };

  return (
    <main className="w-full min-h-screen overflow-hidden bg-gradient-to-br from-pink-300 via-purple-200 to-pink-300 text-center relative">
      {/* Background floating hearts - using consistent seeded values instead of random */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => {
          // Use deterministic values based on index to prevent hydration errors
          const seedX = (i * 8) % 100;
          const seedY = -50;
          const seedScale = ((i % 4) * 0.2) + 0.3;
          const seedOpacity = ((i % 5) * 0.1) + 0.3;
          
          return (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: seedX,
                y: seedY,
                scale: seedScale,
                opacity: seedOpacity
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: [
                  `${seedX}vw`,
                  `${seedX - 15}vw`,
                  `${seedX + 15}vw`,
                  `${seedX}vw`,
                ],
              }}
              transition={{
                duration: 15 + (i % 10),
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5
              }}
            >
              <Heart 
                size={30} 
                className="text-pink-500" 
                fill="#f472b6"
              />
            </motion.div>
          );
        })}
      </div>
      
      {/* Love Quiz Modal */}
      <AnimatePresence>
        {showQuiz && (
          <motion.div 
            className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white bg-opacity-90 p-6 md:p-8 rounded-3xl shadow-2xl max-w-md w-full relative"
            >
              <button
                onClick={toggleQuiz}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                ✕
              </button>
              
              <div className="text-center mb-6">
                <Mail className="inline-block text-pink-500 mb-2" size={40} fill="#ec4899" stroke="#fff" />
                <h2 className="text-2xl md:text-3xl font-bold text-pink-600">Love Quiz</h2>
                <p className="text-gray-700 text-sm mt-1">How well do you know me?</p>
              </div>
              
              {!quizResult ? (
                <>
                  <div className="mb-6">
                    <h3 className="text-xl font-medium text-gray-800 mb-4">
                      {quizQuestions[quizStep].question}
                    </h3>
                    
                    <div className="space-y-3">
                      {quizQuestions[quizStep].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleQuizAnswer(option)}
                          className="w-full text-left p-3 bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 rounded-xl border border-pink-200 transition-colors"
                        >
                          <div className="flex items-center">
                            <Heart className="mr-2 text-pink-500" size={18} fill="#ec4899" />
                            <span>{option}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-gray-500">
                    Question {quizStep + 1} of {quizQuestions.length}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <div className="mb-4 flex justify-center">
                    <Heart size={60} fill="#ec4899" stroke="white" />
                  </div>
                  <h3 className="text-xl font-bold text-pink-600 mb-2">Quiz Complete!</h3>
                  <p className="text-gray-700 mb-6">{quizResult}</p>
                  
                  <button
                    onClick={resetQuiz}
                    className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full shadow hover:shadow-lg transition"
                  >
                    Play Again
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Pages */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Page 0: Welcome */}
        <AnimatePresence mode="wait">
          {currentPage === 0 && (
            <motion.div
              key="page-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 8, stiffness: 100 }}
                className="relative mb-6"
              >
                <Heart size={120} className="text-pink-500" fill="#ec4899" />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <Sparkles size={40} className="text-white" />
                </motion.div>
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text"
              >
                Hey Babe!
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-700 mb-8 px-6"
              >
                I made this just for you, because you deserve something as special as you are.
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <button 
                  onClick={nextPage}
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transform transition hover:-translate-y-1 flex items-center"
                >
                  <span>Start</span>
                  <Sparkles size={20} className="ml-2" />
                </button>
              </motion.div>
            </motion.div>
          )}
        
          {/* Page 1: Love Letter */}
          {currentPage === 1 && (
            <motion.div
              key="page-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto flex flex-col items-center"
            >
              <motion.div
                initial={{ rotate: -5 }}
                animate={{ rotate: 5 }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  duration: 2 
                }}
                className="w-full p-6 bg-white rounded-lg shadow-lg transform rotate-1 mb-8 relative"
              >
                <div className="absolute -top-3 -right-3 text-3xl">
                  <Mail size={32} className="text-pink-500" fill="#ec4899" stroke="white" />
                </div>
                <h2 className="text-2xl font-bold text-pink-600 mb-4">My Dearest Babe,</h2>
                <p className="text-gray-700 mb-3">
                  From the moment we met, you've filled my life with colors I never knew existed.
                </p>
                <p className="text-gray-700 mb-3">
                  Your smile lights up even my darkest days, and your laugh is my favorite melody.
                </p>
                <p className="text-gray-700 mb-3">
                  I cherish every moment with you, every memory we create, and I look forward to making countless more.
                </p>
                <p className="text-right text-pink-600 font-medium mt-6">Forever Yours</p>
              </motion.div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={prevPage}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition flex items-center"
                >
                  ← Back
                </button>
                <button 
                  onClick={nextPage}
                  className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow hover:shadow-lg transition flex items-center"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {/* Page 2: Reasons I Love You */}
          {currentPage === 2 && (
            <motion.div
              key="page-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto flex flex-col items-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-pink-600 flex items-center">
                <Heart size={24} className="mr-2" fill="#ec4899" />
                Reasons I Love You
              </h2>
              
              <div className="w-full mb-8 px-2">
                {[
                  {text: "Your beautiful smile", icon: <Heart size={24} fill="#ec4899" />},
                  {text: "Your incredible heart", icon: <Heart size={24} fill="#ec4899" />},
                  {text: "Your amazing strength", icon: <Star size={24} fill="#ec4899" />},
                  {text: "Your wonderful laugh", icon: <Music size={24} fill="#ec4899" />},
                  {text: "Everything about you", icon: <Gift size={24} fill="#ec4899" />}
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="mb-4 bg-white bg-opacity-70 p-4 rounded-lg shadow-md transform hover:scale-105 transition-transform"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3 text-pink-500">{item.icon}</span>
                      <p className="text-gray-800 font-medium">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={prevPage}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition flex items-center"
                >
                  ← Back
                </button>
                <button 
                  onClick={nextPage}
                  className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow hover:shadow-lg transition flex items-center"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          )}

          {/* Page 3: Our Love Journey */}
          {currentPage === 3 && (
            <motion.div
              key="page-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 8 }}
                className="mb-6 flex justify-center"
              >
                <Heart size={80} className="text-pink-500" fill="#ec4899" />
              </motion.div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-pink-600">Our Precious Memories</h2>
              
              <div className="bg-white bg-opacity-70 p-5 rounded-xl shadow-md mb-6">
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Heart size={20} className="text-pink-600 mr-2" fill="#ec4899" />
                  <p className="text-gray-800 font-medium">How I was serious about you and never gave up ❤️</p>
                </motion.div>
                
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Star size={20} className="text-pink-600 mr-2" fill="#ec4899" />
                  <p className="text-gray-800 font-medium">Our first kiss, you remember? I certainly do ✨</p>
                </motion.div>
                
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Cake size={20} className="text-pink-600 mr-2" fill="#ec4899" />
                  <p className="text-gray-800 font-medium">All our special celebrations - each one memorable 🎉</p>
                </motion.div>
                
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Moon size={20} className="text-pink-600 mr-2" fill="#ec4899" />
                  <p className="text-gray-800 font-medium">Those cold nights talking endlessly until sunrise 🌙</p>
                </motion.div>
                
                <motion.div 
                  className="flex items-center mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Coffee size={20} className="text-pink-600 mr-2" fill="#ec4899" />
                  <p className="text-gray-800 font-medium">Morning coffees that started our perfect days ☕</p>
                </motion.div>
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-gray-700 mb-8 text-center px-4 font-medium"
              >
                Every moment with you is a treasure. These memories we've created are just the beginning of our beautiful story. I can't wait to make countless more with you, my love. ✨
              </motion.p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleQuiz}
                className="px-6 py-3 mb-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition flex items-center"
              >
                <Mail size={20} className="mr-2" fill="#ec4899" stroke="white" />
                <span>Take Our Love Quiz</span>
              </motion.button>
              
              <div className="flex space-x-4">
                <button 
                  onClick={prevPage}
                  className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition flex items-center"
                >
                  ← Back
                </button>
                <button 
                  onClick={() => setCurrentPage(0)}
                  className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow hover:shadow-lg transition flex items-center"
                >
                  Start Over ↺
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Fixed footer message */}
      <div className="fixed bottom-4 left-0 right-0 text-center pointer-events-none">
        <p className="text-sm text-pink-700 font-medium flex items-center justify-center">
          <Heart size={14} className="mr-1" fill="#be185d" />
          Made with love for my beautiful Babe
          <Heart size={14} className="ml-1" fill="#be185d" />
        </p>
      </div>
    </main>
  );
}