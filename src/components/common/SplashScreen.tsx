import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      setProgress(100);
      setIsFinished(true);
      // Seamlessly trigger parent display as splash begins fading out
      setTimeout(() => {
        onCompleteRef.current();
      }, 400);
    };

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          finish();
          return 100;
        }
        const increment = Math.floor(Math.random() * 18) + 12;
        const next = Math.min(prev + increment, 100);
        if (next >= 100) {
          clearInterval(timer);
          finish();
        }
        return next;
      });
    }, 50);

    // Hard safety timeout: never block the user for more than 1.4s under any condition
    const safetyTimer = setTimeout(() => {
      clearInterval(timer);
      finish();
    }, 1400);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -40, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAFAF9] text-[#09090B] select-none"
        >
          {/* Subtle architectural background grid */}
          <div className="absolute inset-0 bg-dot-subtle opacity-60 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            {/* Animated Vector Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-20 h-20 mb-8 flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-neutral-200 to-neutral-100 border border-neutral-300 shadow-sm" />
              
              <svg className="w-10 h-10 text-neutral-900 relative z-10" viewBox="0 0 64 64" fill="none">
                {/* Outer C */}
                <motion.path
                  d="M48 20 C42 12, 22 12, 16 26 C10 40, 24 52, 48 44"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.1, ease: "easeInOut" }}
                />
                {/* Inner Modern Crosshair/Lens */}
                <motion.circle
                  cx="32"
                  cy="32"
                  r="6"
                  fill="#2563EB"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                />
                <motion.path
                  d="M32 16 V22 M32 42 V48 M16 32 H22 M42 32 H48"
                  stroke="#2563EB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.3 }}
                />
              </svg>

              {/* Ping glow */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 rounded-2xl bg-blue-500/20 pointer-events-none"
              />
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-2xl font-bold tracking-tight text-neutral-900 font-display"
            >
              CAPTURE CREATIVES
            </motion.h1>

            {/* Brand Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-1 text-xs font-medium tracking-widest uppercase text-neutral-500"
            >
              Design · Build · Brand · Grow
            </motion.p>

            {/* Minimal Progress Bar */}
            <div className="w-48 h-1 bg-neutral-200 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                className="h-full bg-neutral-900 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut", duration: 0.1 }}
              />
            </div>

            {/* Progress Ticker & Year */}
            <div className="flex items-center justify-between w-48 mt-2 text-[11px] font-mono text-neutral-400">
              <span>EST. 2025</span>
              <span>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
