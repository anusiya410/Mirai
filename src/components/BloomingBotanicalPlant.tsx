import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flower2, Heart } from 'lucide-react';

interface BloomingBotanicalPlantProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BloomingBotanicalPlant: React.FC<BloomingBotanicalPlantProps> = ({
  className = '',
  size = 'md',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient Radial Glowing Aura */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F7DDE3]/50 via-[#E8D3A3]/40 to-[#DDF3FC]/40 blur-3xl pointer-events-none scale-110" />

      {/* Decorative Circular Orbital Frame */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-dashed border-[#C9A45C]/35 pointer-events-none"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-[#C94F78]/20 pointer-events-none"
      />

      {/* Main Glassmorphic Showcase Base */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [-1, 1, -1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-br from-white/90 via-[#FFF9F6]/80 to-[#F7EBEF]/90 backdrop-blur-md p-6 border-2 border-[#C9A45C]/35 shadow-2xl flex items-center justify-center overflow-hidden"
      >
        {/* Animated Botanical Plant & Blooming Tulip SVG */}
        <svg
          viewBox="0 0 300 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-md overflow-visible"
        >
          <defs>
            {/* Gold Stem Gradient */}
            <linearGradient id="plantGoldStem" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#9C7728" />
              <stop offset="50%" stopColor="#C9A45C" />
              <stop offset="100%" stopColor="#E8D3A3" />
            </linearGradient>

            {/* Rose Blossom Gradient */}
            <linearGradient id="plantRoseBloom" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8DCE2" />
              <stop offset="35%" stopColor="#E8B8C4" />
              <stop offset="75%" stopColor="#C94F78" />
              <stop offset="100%" stopColor="#8A2846" />
            </linearGradient>

            {/* Sky Pastel Leaf Gradient */}
            <linearGradient id="plantLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8D3A3" />
              <stop offset="50%" stopColor="#C9A45C" />
              <stop offset="100%" stopColor="#5D9FBE" />
            </linearGradient>

            {/* Drop Shadow */}
            <filter id="plantShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C9A45C" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Plant Base Pot / Soil Accent */}
          <ellipse cx="150" cy="275" rx="35" ry="6" fill="#C9A45C" opacity="0.3" />

          {/* 1. Main Central Stem Growing Upward */}
          <motion.path
            d="M 150 270 Q 148 180 150 90"
            stroke="url(#plantGoldStem)"
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* 2. Left Branch Growing Out */}
          <motion.path
            d="M 149 190 Q 120 165 95 140"
            stroke="url(#plantGoldStem)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* 3. Right Branch Growing Out */}
          <motion.path
            d="M 150 170 Q 180 150 205 130"
            stroke="url(#plantGoldStem)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* 4. Lower Unfolding Leaves */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left Leaf 1 */}
            <path
              d="M 148 230 Q 110 220 90 195 Q 120 190 148 215 Z"
              fill="url(#plantLeafGrad)"
            />
            {/* Right Leaf 1 */}
            <path
              d="M 152 220 Q 190 210 210 185 Q 180 180 152 205 Z"
              fill="url(#plantLeafGrad)"
            />
          </motion.g>

          {/* 5. Mid-Level Delicate Foliage */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left Mid Leaf */}
            <path
              d="M 149 155 Q 125 140 115 115 Q 135 125 149 145 Z"
              fill="#E8B8C4"
            />
            {/* Right Mid Leaf */}
            <path
              d="M 151 145 Q 175 130 185 105 Q 165 115 151 135 Z"
              fill="#E8B8C4"
            />
          </motion.g>

          {/* 6. LEFT BRANCH BLOOMING FLOWER (Bud to Bloom) */}
          <motion.g
            transform="translate(95, 140)"
            initial={{ scale: 0.2, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.0, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Left Flower Petals */}
            <path
              d="M 0 0 C -12 -6 -14 -22 0 -28 C 14 -22 12 -6 0 0 Z"
              fill="url(#plantRoseBloom)"
            />
            <path
              d="M -4 -4 C -18 -12 -12 -26 0 -28 C -6 -18 -2 -10 -4 -4 Z"
              fill="#C94F78"
              opacity="0.9"
            />
            <path
              d="M 4 -4 C 18 -12 12 -26 0 -28 C 6 -18 2 -10 4 -4 Z"
              fill="#E8B8C4"
              opacity="0.9"
            />
            <circle cx="0" cy="-16" r="2.5" fill="url(#plantGoldStem)" />
          </motion.g>

          {/* 7. RIGHT BRANCH BLOOMING FLOWER */}
          <motion.g
            transform="translate(205, 130)"
            initial={{ scale: 0.2, opacity: 0, rotate: 20 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 1.0, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Right Flower Petals */}
            <path
              d="M 0 0 C -10 -5 -12 -18 0 -24 C 12 -18 10 -5 0 0 Z"
              fill="url(#plantRoseBloom)"
            />
            <path
              d="M -3 -3 C -14 -10 -10 -22 0 -24 C -5 -15 -2 -8 -3 -3 Z"
              fill="#C94F78"
              opacity="0.9"
            />
            <path
              d="M 3 -3 C 14 -10 10 -22 0 -24 C 5 -15 2 -8 3 -3 Z"
              fill="#E8B8C4"
              opacity="0.9"
            />
            <circle cx="0" cy="-14" r="2.2" fill="url(#plantGoldStem)" />
          </motion.g>

          {/* 8. TOP CENTRAL MAJESTIC BLOOMING TULIP */}
          <motion.g
            transform="translate(150, 90)"
            initial={{ scale: 0.3, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Background Glow */}
            <circle cx="0" cy="-22" r="22" fill="#E8B8C4" opacity="0.3" filter="url(#plantShadow)" />

            {/* Central Bloom Petals */}
            <path
              d="M 0 0 C -18 -8 -20 -36 0 -44 C 20 -36 18 -8 0 0 Z"
              fill="url(#plantRoseBloom)"
              filter="url(#plantShadow)"
            />
            {/* Left Outer Petal */}
            <motion.path
              d="M -6 -4 C -28 -14 -22 -40 0 -44 C -12 -28 -4 -16 -6 -4 Z"
              fill="#C94F78"
              opacity="0.95"
              animate={{ rotate: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Right Outer Petal */}
            <motion.path
              d="M 6 -4 C 28 -14 22 -40 0 -44 C 12 -28 4 -16 6 -4 Z"
              fill="#E8B8C4"
              opacity="0.95"
              animate={{ rotate: [2, -2, 2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Golden Core Sparkle */}
            <circle cx="0" cy="-24" r="3.5" fill="url(#plantGoldStem)" />
            <path d="M 0 -29 L 1.5 -25 L 5.5 -24 L 1.5 -23 L 0 -19 L -1.5 -23 L -5.5 -24 L -1.5 -25 Z" fill="#FFFFFF" />
          </motion.g>

          {/* Floating Pollen / Stardust Sparkles */}
          {[
            { cx: 120, cy: 75, r: 2, delay: 0 },
            { cx: 180, cy: 65, r: 2.5, delay: 0.5 },
            { cx: 80, cy: 110, r: 1.8, delay: 1.0 },
            { cx: 220, cy: 105, r: 2, delay: 0.7 },
          ].map((spark, sIdx) => (
            <motion.circle
              key={sIdx}
              cx={spark.cx}
              cy={spark.cy}
              r={spark.r}
              fill="#D4AF37"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.3, 0.8],
                y: [-4, 4, -4],
              }}
              transition={{
                duration: 3 + sIdx * 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.8 + spark.delay,
              }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Floating Micro-Badge Top-Right */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 right-2 sm:right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#C9A45C]/40 shadow-xl flex items-center gap-2 z-20 animate-shimmer"
      >
        <Flower2 className="w-4 h-4 text-[#C94F78]" />
        <span className="text-[11px] font-bold text-[#342C32] uppercase tracking-wider whitespace-nowrap">
          Artistry In Bloom
        </span>
      </motion.div>

      {/* Floating Micro-Badge Bottom-Left */}
      <motion.div
        animate={{ y: [5, -5, 5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-2 left-2 sm:left-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-[#C94F78]/35 shadow-xl flex items-center gap-2 z-20 animate-shimmer"
      >
        <Sparkles className="w-4 h-4 text-[#C9A45C]" />
        <span className="text-[11px] font-bold text-[#342C32] uppercase tracking-wider whitespace-nowrap">
          Organic Growth
        </span>
      </motion.div>
    </div>
  );
};
