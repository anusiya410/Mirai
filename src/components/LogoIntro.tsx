import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';

interface LogoIntroProps {
  customLogoUrl?: string | null;
  onComplete: () => void;
}

export const LogoIntro: React.FC<LogoIntroProps> = ({ customLogoUrl, onComplete }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Step 0: Background & Gold particles appear
    const t1 = setTimeout(() => setStep(1), 400);
    // Step 1: Circular glow behind logo forms
    const t2 = setTimeout(() => setStep(2), 1100);
    // Step 2: Logo fades in with scale 96% -> 100%
    const t3 = setTimeout(() => setStep(3), 1800);
    // Step 3: Soft gold glow burst & tagline fades in
    const t4 = setTimeout(() => setStep(4), 2600);
    // Step 4: Smooth transition out into homepage
    const t5 = setTimeout(() => onComplete(), 3900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  // Floating ambient gold particles
  const particles = [
    { x: '20%', y: '30%', size: 4, delay: 0.1 },
    { x: '80%', y: '25%', size: 6, delay: 0.3 },
    { x: '25%', y: '70%', size: 5, delay: 0.2 },
    { x: '75%', y: '75%', size: 3, delay: 0.5 },
    { x: '50%', y: '18%', size: 4, delay: 0.4 },
    { x: '15%', y: '50%', size: 5, delay: 0.6 },
    { x: '85%', y: '55%', size: 4, delay: 0.2 },
    { x: '40%', y: '82%', size: 6, delay: 0.4 },
  ];

  return (
    <AnimatePresence>
      <motion.div
        key="logo-intro-screen"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF9F6] via-[#F7DDE3]/40 to-[#DDF3FC]/30 overflow-hidden select-none"
      >
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#E8B8C4]/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-[#A9DDF2]/20 blur-3xl pointer-events-none" />

        {/* Gold Particles */}
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: step >= 1 ? [0.2, 0.9, 0.4] : 0,
              scale: step >= 1 ? [0.8, 1.3, 1] : 0,
              y: step >= 1 ? [-5, 5, -5] : 0,
            }}
            transition={{
              duration: 3 + idx * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
            }}
            className="absolute rounded-full bg-[#C9A45C] shadow-[0_0_10px_#C9A45C] pointer-events-none"
          />
        ))}

        {/* Central Reveal Container */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Circular Glowing Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{
              opacity: step >= 2 ? (step >= 4 ? 0.85 : 0.5) : 0,
              scale: step >= 2 ? (step >= 4 ? 1.25 : 1) : 0.7,
            }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-r from-[#E8B8C4]/50 via-[#C9A45C]/40 to-[#A9DDF2]/50 blur-2xl pointer-events-none"
          />

          {/* Thin Circular Gold Framing Ring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -45 }}
            animate={{
              opacity: step >= 2 ? 0.7 : 0,
              scale: step >= 2 ? 1.08 : 0.85,
              rotate: step >= 2 ? 0 : -45,
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-[#C9A45C]/40 pointer-events-none"
          />

          {/* The Official Unmodified Brand Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{
              opacity: step >= 3 ? 1 : 0,
              scale: step >= 3 ? 1 : 0.96,
              y: step >= 3 ? 0 : 8,
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <BrandLogo size="intro" customUrl={customLogoUrl} withGlow={step >= 4} />
          </motion.div>

          {/* Tagline Reveal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: step >= 4 ? 1 : 0,
              y: step >= 4 ? 0 : 12,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-6 text-center z-10"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-[#C9A45C] font-semibold">
              IDEAS • INNOVATION • IMPACT
            </span>
          </motion.div>
        </div>

        {/* Skip button for seamless preview experience */}
        <button
          onClick={onComplete}
          className="absolute bottom-8 text-xs text-[#342C32]/60 hover:text-[#C94F78] uppercase tracking-widest px-4 py-2 rounded-full border border-[#C9A45C]/30 hover:border-[#C94F78]/50 transition-all backdrop-blur-sm cursor-pointer"
        >
          Skip Intro
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
