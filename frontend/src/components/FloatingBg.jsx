import React from 'react';
import { motion } from 'framer-motion';

export const FloatingBg = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50 bg-[var(--bg-main)] transition-colors duration-300">
      {/* Light mode doesn't need ambient glows to maintain premium paper feel */}
      <div className="absolute inset-0 dark:block hidden">
        {/* Soft Indigo Glow */}
        <motion.div
          className="absolute w-[350px] h-[350px] sm:w-[600px] sm:h-[600px] rounded-full bg-indigo-500/[0.04] blur-[100px] sm:blur-[140px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ top: '5%', left: '5%' }}
        />

        {/* Soft Purple Glow */}
        <motion.div
          className="absolute w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full bg-purple-500/[0.03] blur-[100px] sm:blur-[140px]"
          animate={{
            x: [0, -30, 40, 0],
            y: [0, 50, -40, 0],
            scale: [1, 0.98, 1.02, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </div>
    </div>
  );
};
export default FloatingBg;
