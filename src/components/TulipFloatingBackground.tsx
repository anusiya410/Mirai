import React from 'react';
import { motion } from 'motion/react';

// Delicate Luxury Botanical Tulip Vector Asset
export const TulipFlowerIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 40,
}) => (
  <svg
    width={size}
    height={size * 1.3}
    viewBox="0 0 60 78"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-sm select-none pointer-events-none ${className}`}
  >
    <defs>
      <linearGradient id="tulipPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F8DCE2" />
        <stop offset="45%" stopColor="#E8B8C4" />
        <stop offset="85%" stopColor="#C94F78" />
        <stop offset="100%" stopColor="#A8365D" />
      </linearGradient>

      <linearGradient id="tulipGoldStem" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" />
        <stop offset="60%" stopColor="#C9A45C" />
        <stop offset="100%" stopColor="#9C7728" />
      </linearGradient>

      <linearGradient id="tulipLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E8D3A3" />
        <stop offset="50%" stopColor="#C9A45C" />
        <stop offset="100%" stopColor="#5D9FBE" />
      </linearGradient>
    </defs>

    {/* Delicate Curved Stem */}
    <path
      d="M30 75 Q29 55 30 38"
      stroke="url(#tulipGoldStem)"
      strokeWidth="2.2"
      strokeLinecap="round"
    />

    {/* Left Leaf */}
    <path
      d="M29 60 Q15 50 12 36 Q22 42 29 48"
      fill="url(#tulipLeafGrad)"
      opacity="0.85"
    />

    {/* Right Leaf */}
    <path
      d="M31 56 Q45 46 48 32 Q38 38 31 44"
      fill="url(#tulipLeafGrad)"
      opacity="0.85"
    />

    {/* Center Tulip Petal (Back/Core) */}
    <path
      d="M30 6 C20 12 18 30 30 36 C42 30 40 12 30 6 Z"
      fill="url(#tulipPetalGrad)"
      opacity="0.95"
    />

    {/* Left Tulip Petal */}
    <path
      d="M26 34 C16 28 14 16 22 10 C24 20 28 28 26 34 Z"
      fill="#C94F78"
      opacity="0.9"
    />

    {/* Right Tulip Petal */}
    <path
      d="M34 34 C44 28 46 16 38 10 C36 20 32 28 34 34 Z"
      fill="#E8B8C4"
      opacity="0.9"
    />

    {/* Center Gold Dewdrop Accent */}
    <circle cx="30" cy="22" r="2.5" fill="url(#tulipGoldStem)" />
  </svg>
);

// Single Botanical Falling / Floating Petal
export const TulipPetalIcon: React.FC<{ size?: number; color?: string; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg
    width={size}
    height={size * 1.4}
    viewBox="0 0 24 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
  >
    <path
      d="M12 2 C4 8 2 22 12 32 C22 22 20 8 12 2 Z"
      fill="url(#tulipPetalGrad)"
      opacity="0.75"
    />
  </svg>
);

export const TulipFloatingBackground: React.FC = () => {
  // Ambient floating positions across viewport corners
  const floatingTulips = [
    { left: '4%', top: '15%', size: 38, dur: 7.5, delay: 0, rotate: -8 },
    { right: '4%', top: '22%', size: 44, dur: 9.0, delay: 1.2, rotate: 12 },
    { left: '6%', top: '65%', size: 34, dur: 8.2, delay: 2.0, rotate: 6 },
    { right: '5%', top: '78%', size: 40, dur: 8.8, delay: 0.7, rotate: -10 },
  ];

  // Drifting loose petals
  const floatingPetals = [
    { left: '15%', top: '35%', size: 16, dur: 11, delay: 0.5, sway: 25 },
    { right: '18%', top: '45%', size: 18, dur: 13, delay: 2.5, sway: -30 },
    { left: '22%', top: '80%', size: 14, dur: 10, delay: 1.8, sway: 20 },
    { right: '14%', top: '12%', size: 16, dur: 12, delay: 3.2, sway: -25 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Floating Corner Tulips */}
      {floatingTulips.map((tulip, idx) => (
        <motion.div
          key={`tulip-${idx}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.25, 0.55, 0.25],
            y: [-18, 18, -18],
            x: [-8, 8, -8],
            rotate: [tulip.rotate - 4, tulip.rotate + 4, tulip.rotate - 4],
            scale: [0.96, 1.04, 0.96],
          }}
          transition={{
            duration: tulip.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: tulip.delay,
          }}
          style={{
            position: 'absolute',
            ...(tulip.left ? { left: tulip.left } : {}),
            ...(tulip.right ? { right: tulip.right } : {}),
            top: tulip.top,
          }}
          className="hidden md:block opacity-40 hover:opacity-75 transition-opacity"
        >
          <TulipFlowerIcon size={tulip.size} />
        </motion.div>
      ))}

      {/* Gentle Floating Drifting Petals */}
      {floatingPetals.map((petal, idx) => (
        <motion.div
          key={`petal-${idx}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: [0.15, 0.45, 0.15],
            y: [-25, 25, -25],
            x: [-petal.sway, petal.sway, -petal.sway],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: petal.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: petal.delay,
          }}
          style={{
            position: 'absolute',
            ...(petal.left ? { left: petal.left } : {}),
            ...(petal.right ? { right: petal.right } : {}),
            top: petal.top,
          }}
          className="hidden sm:block opacity-35"
        >
          <TulipPetalIcon size={petal.size} />
        </motion.div>
      ))}
    </div>
  );
};
