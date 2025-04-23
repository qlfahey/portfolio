'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEasterEggs } from '@/hooks/useEasterEggs';
import Terminal from './Terminal';

export default function EasterEggs() {
  const { terminalMode, setTerminalMode, showQuote, currentQuote } = useEasterEggs();

  return (
    <>
      <AnimatePresence>
        {terminalMode && (
          <Terminal isOpen={terminalMode} onClose={() => setTerminalMode(false)} />
        )}

        {showQuote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     bg-black/95 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-primary
                     max-w-md w-full text-center z-50"
          >
            <div className="text-xl font-medium text-primary mb-4">🌟 Easter Egg Found!</div>
            <p className="text-xl text-white italic">"{currentQuote}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 