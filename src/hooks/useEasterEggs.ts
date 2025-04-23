'use client';

import { useState, useEffect, useCallback } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const TECH_QUOTES = [
  "The best way to predict the future is to invent it. - Alan Kay",
  "Simplicity is the ultimate sophistication. - Leonardo da Vinci",
  "Code is like humor. When you have to explain it, it's bad. - Cory House",
  "AI is the new electricity. - Andrew Ng",
  "The future is already here – it's just not evenly distributed. - William Gibson"
];

export function useEasterEggs() {
  const [terminalMode, setTerminalMode] = useState(false);
  const [avatarClicks, setAvatarClicks] = useState(0);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showQuote, setShowQuote] = useState(false);
  const [currentQuote, setCurrentQuote] = useState('');
  const [lastKeyTime, setLastKeyTime] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [isAvatarRotating, setIsAvatarRotating] = useState(false);
  
  // Handle keypress for terminal trigger and Konami code
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Check for Cmd + / (Mac-friendly terminal trigger)
    if (event.key === '/' && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      setTerminalMode(prev => !prev);
      return;
    }

    // Check for Konami code with timing
    const currentTime = Date.now();
    if (currentTime - lastKeyTime > 2000) {
      setKonamiIndex(0);
      setShowProgress(false);
    }
    setLastKeyTime(currentTime);

    const expectedKey = KONAMI_CODE[konamiIndex]?.toLowerCase();
    const pressedKey = event.key.toLowerCase();
    
    if (expectedKey === pressedKey) {
      const newIndex = konamiIndex + 1;
      setKonamiIndex(newIndex);
      setShowProgress(true);
      
      if (newIndex === KONAMI_CODE.length) {
        const randomQuote = TECH_QUOTES[Math.floor(Math.random() * TECH_QUOTES.length)];
        setCurrentQuote(randomQuote);
        setShowQuote(true);
        setShowProgress(false);
        setTimeout(() => setShowQuote(false), 5000);
        setKonamiIndex(0);
      }
    } else {
      setKonamiIndex(0);
      setShowProgress(false);
    }
  }, [konamiIndex, lastKeyTime]);

  // Handle avatar clicks with rotation
  const handleAvatarClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default zoom behavior
    e.stopPropagation(); // Stop event bubbling
    
    setAvatarClicks(prev => {
      if (prev === 4) {
        setIsAvatarRotating(true);
        // Reset after 2 seconds
        setTimeout(() => {
          setIsAvatarRotating(false);
          setAvatarClicks(0);
        }, 2000);
        return 5;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return {
    terminalMode,
    setTerminalMode,
    isAvatarRotating,
    showQuote,
    currentQuote,
    handleAvatarClick,
    konamiProgress: showProgress ? konamiIndex / KONAMI_CODE.length : 0
  };
} 