import React from 'react';
import { motion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`min-h-[80vh] relative ${className}`}
    >
      {/* Subtle Top Rose-Gold Transition Accent Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0.8 }}
        animate={{ scaleX: 1, opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C94F78] via-[#C9A45C] to-[#5D9FBE] origin-left z-50 pointer-events-none"
      />
      {children}
    </motion.div>
  );
};

