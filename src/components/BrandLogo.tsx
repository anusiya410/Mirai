import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'intro';
  customUrl?: string | null;
  className?: string;
  showTagline?: boolean;
  withGlow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  customUrl,
  className = '',
  showTagline = true,
  withGlow = false,
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    hero: 'w-44 h-44 sm:w-56 sm:h-56',
    intro: 'w-52 h-52 sm:w-64 sm:h-64',
  };

  if (customUrl) {
    return (
      <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
        {withGlow && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C94F78]/30 via-[#C9A45C]/35 to-[#5D9FBE]/25 blur-xl scale-120 animate-pulse-glow pointer-events-none" />
        )}
        <img
          src={customUrl}
          alt="Mirai — Ideas • Innovation • Impact Official Logo"
          className="w-full h-full object-contain rounded-full relative z-10 drop-shadow-md mx-auto block"
        />
      </div>
    );
  }

  // Official Brand Asset SVG Composition strictly matching the brand specifications
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 ${sizeMap[size]} ${className}`}
      title="Mirai — Ideas • Innovation • Impact"
    >
      {withGlow && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#E8B8C4]/40 via-[#C9A45C]/30 to-[#A9DDF2]/40 blur-xl scale-125 animate-pulse-glow pointer-events-none" />
      )}
      
      <svg
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md relative z-10"
      >
        <defs>
          {/* Champagne & Gold Gradient */}
          <linearGradient id="saGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E5C9" />
            <stop offset="25%" stopColor="#D4AF37" />
            <stop offset="60%" stopColor="#C9A45C" />
            <stop offset="100%" stopColor="#9C7728" />
          </linearGradient>

          {/* Rose Gold Metallic Gradient */}
          <linearGradient id="saRoseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8DCE2" />
            <stop offset="40%" stopColor="#D98A9E" />
            <stop offset="70%" stopColor="#C94F78" />
            <stop offset="100%" stopColor="#8A2846" />
          </linearGradient>

          {/* Rose Blush Soft Gradient */}
          <linearGradient id="saRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C94F78" />
            <stop offset="60%" stopColor="#E8B8C4" />
            <stop offset="100%" stopColor="#A8365D" />
          </linearGradient>

          {/* Sky Soft Radial */}
          <radialGradient id="saSkyRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="65%" stopColor="#FFF9F6" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#F7EBEF" stopOpacity="0.9" />
          </radialGradient>

          {/* Metallic 3D Sheen Highlight */}
          <linearGradient id="metallicSheen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C9A45C" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#C9A45C" stopOpacity="0.8" />
          </linearGradient>

          {/* Drop Shadow Filter */}
          <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C9A45C" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Circular Medallion Background */}
        <circle cx="160" cy="160" r="148" fill="url(#saSkyRadial)" />
        
        {/* Outer Circular Rose-Gold / Champagne Ring */}
        <circle
          cx="160"
          cy="160"
          r="144"
          stroke="url(#saGoldGrad)"
          strokeWidth="3.5"
          filter="url(#goldShadow)"
        />
        
        {/* Inner Delicate Orbital Ring */}
        <circle
          cx="160"
          cy="160"
          r="137"
          stroke="url(#saRoseGoldGrad)"
          strokeWidth="1"
          strokeDasharray="4 2"
          opacity="0.85"
        />

        {/* Top & Side Quotation Marks & Decorative Stars */}
        <g id="stars-and-quotes">
          {/* Top Center Star */}
          <path d="M160 20 L162 25 L167 27 L162 29 L160 34 L158 29 L153 27 L158 25 Z" fill="url(#saGoldGrad)" />
          {/* Subtle Top Quotation Marks */}
          <text x="138" y="32" fill="#C9A45C" fontSize="11" fontFamily="'Playfair Display', serif" opacity="0.75">“</text>
          <text x="178" y="32" fill="#C9A45C" fontSize="11" fontFamily="'Playfair Display', serif" opacity="0.75">”</text>
          {/* Accent Stars on Sides */}
          <path d="M42 160 L44 163 L47 164 L44 165 L42 168 L40 165 L37 164 L40 163 Z" fill="url(#saGoldGrad)" />
          <path d="M278 160 L280 163 L283 164 L280 165 L278 168 L276 165 L273 164 L276 163 Z" fill="url(#saGoldGrad)" />
        </g>

        {/* Left Creative Female Illustration (Digital Technology & Laptop) */}
        <g id="left-woman" opacity="0.92" transform="translate(38, 98) scale(0.68)">
          {/* Head & Elegant Hair */}
          <ellipse cx="48" cy="30" rx="14" ry="18" fill="#342C32" />
          <path d="M38 30 Q28 48 34 66 Q42 56 46 44 Z" fill="#342C32" />
          <ellipse cx="50" cy="32" rx="11" ry="13" fill="#E8B8C4" />
          {/* Glasses & Chic Earring */}
          <circle cx="53" cy="30" r="4.5" stroke="#C9A45C" strokeWidth="1.2" fill="none" />
          <circle cx="43" cy="36" r="1.5" fill="url(#saGoldGrad)" />
          {/* Torso & Professional Stylized Top */}
          <path d="M32 54 Q48 48 64 54 L70 96 L26 96 Z" fill="#C94F78" opacity="0.9" />
          {/* Arm holding modern ultra-slim device / laptop */}
          <path d="M60 62 L80 78 L74 86 L54 72 Z" fill="#E8B8C4" />
          {/* Modern Slim Laptop Screen */}
          <rect x="70" y="62" width="26" height="36" rx="3" fill="#5D9FBE" transform="rotate(-15 70 62)" stroke="url(#saGoldGrad)" strokeWidth="1.5" />
          <line x1="74" y1="73" x2="90" y2="69" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="75" y1="81" x2="87" y2="78" stroke="#F5E5C9" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Right Creative Female Illustration (Creativity, Ideas & Notebook) */}
        <g id="right-woman" opacity="0.92" transform="translate(196, 100) scale(0.68)">
          {/* Head & Chic High Hair Bun */}
          <circle cx="48" cy="16" r="8.5" fill="#342C32" />
          <ellipse cx="45" cy="32" rx="13" ry="17" fill="#342C32" />
          <ellipse cx="42" cy="34" rx="11" ry="13" fill="#E8B8C4" />
          {/* Earring */}
          <circle cx="39" cy="36" r="2" fill="url(#saGoldGrad)" />
          {/* Torso & Creative Studio Outfit */}
          <path d="M24 54 Q40 47 58 54 L66 96 L18 96 Z" fill="#5D9FBE" opacity="0.9" />
          {/* Arm holding open creative design notebook */}
          <path d="M30 62 L12 78 L20 86 L38 72 Z" fill="#E8B8C4" />
          {/* Notebook / Sketchpad */}
          <path d="M-6 82 L24 82 L26 86 L-10 86 Z" fill="url(#saGoldGrad)" />
          <rect x="-4" y="64" width="22" height="18" rx="2" fill="#FFF9F6" stroke="url(#saGoldGrad)" strokeWidth="1.2" transform="rotate(8 -4 64)" />
          <line x1="2" y1="68" x2="16" y2="70" stroke="#C94F78" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="2" y1="74" x2="14" y2="76" stroke="#5D9FBE" strokeWidth="1.2" strokeLinecap="round" />
        </g>

        {/* Central Interlocking A + S Monogram */}
        <g id="as-monogram" transform="translate(160, 146)">
          {/* Letter 'A' Form */}
          <path
            d="M 0 -36 L -24 22 L -11 22 L -6 9 L 6 9 L 11 22 L 24 22 Z M 0 -18 L -4 1 L 4 1 Z"
            fill="url(#saGoldGrad)"
            filter="url(#goldShadow)"
          />
          {/* Intertwined Stylized 'S' Ribbon */}
          <path
            d="M 16 -24 C 8 -34 -14 -32 -16 -18 C -18 -4 14 0 16 12 C 18 24 -4 30 -16 22 L -12 14 C -2 18 10 16 8 8 C 6 0 -22 -2 -18 -22 C -14 -36 10 -38 20 -28 Z"
            fill="url(#saRoseGoldGrad)"
            opacity="0.95"
          />
          {/* Polished Metallic 3D Highlight Accent */}
          <path
            d="M -3 -30 L -1 5 L 1 5 L 3 -30 Z"
            fill="url(#metallicSheen)"
            opacity="0.8"
          />
          {/* Brand Name Text: MIRAI */}
          <text
            x="0"
            y="44"
            textAnchor="middle"
            fill="url(#saGoldGrad)"
            fontSize="15"
            fontWeight="800"
            letterSpacing="6"
            fontFamily="'Playfair Display', serif"
          >
            MIRAI
          </text>
        </g>

        {/* Botanical Floral Wreath & Bottom-Center Blooming Tulip */}
        <g id="tulip-and-wreath" transform="translate(160, 230)">
          {/* Left Botanical Branch */}
          <path
            d="M -10 6 Q -65 6 -105 -24"
            stroke="url(#saGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Left Delicate Leaves */}
          <ellipse cx="-40" cy="6" rx="8" ry="4" transform="rotate(-15 -40 6)" fill="#E8B8C4" opacity="0.95" />
          <ellipse cx="-75" cy="-7" rx="8" ry="4" transform="rotate(-35 -75 -7)" fill="#C94F78" opacity="0.85" />
          <ellipse cx="-98" cy="-21" rx="6" ry="3" transform="rotate(-50 -98 -21)" fill="url(#saGoldGrad)" />

          {/* Right Botanical Branch */}
          <path
            d="M 10 6 Q 65 6 105 -24"
            stroke="url(#saGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right Delicate Leaves */}
          <ellipse cx="40" cy="6" rx="8" ry="4" transform="rotate(15 40 6)" fill="#E8B8C4" opacity="0.95" />
          <ellipse cx="75" cy="-7" rx="8" ry="4" transform="rotate(35 75 -8)" fill="#C94F78" opacity="0.85" />
          <ellipse cx="98" cy="-21" rx="6" ry="3" transform="rotate(50 98 -21)" fill="url(#saGoldGrad)" />

          {/* Bottom-Center Tulip Stem */}
          <path d="M 0 16 Q 0 4 0 -4" stroke="#5D9FBE" strokeWidth="2.5" strokeLinecap="round" />
          {/* Tulip Unfolding Green / Rose Leaves */}
          <path d="M 0 8 Q -10 2 -12 -6 Q -4 -2 0 4 Z" fill="#E8B8C4" opacity="0.9" />
          <path d="M 0 8 Q 10 2 12 -6 Q 4 -2 0 4 Z" fill="#E8B8C4" opacity="0.9" />

          {/* Central Blooming Tulip Flower Petals */}
          <g id="tulip-petals" transform="translate(0, -6)">
            {/* Center Tulip Petal */}
            <path
              d="M 0 -12 C -6 -8 -7 4 0 8 C 7 4 6 -8 0 -12 Z"
              fill="url(#saRoseGoldGrad)"
            />
            {/* Left Tulip Petal */}
            <path
              d="M -3 6 C -10 0 -10 -8 -6 -11 C -4 -4 -1 1 -3 6 Z"
              fill="#C94F78"
            />
            {/* Right Tulip Petal */}
            <path
              d="M 3 6 C 10 0 10 -8 6 -11 C 4 -4 1 1 3 6 Z"
              fill="#E8B8C4"
            />
            {/* Golden Dewdrop Sparkle inside Tulip */}
            <circle cx="0" cy="-2" r="2" fill="url(#saGoldGrad)" />
          </g>
        </g>

        {/* Tagline Curved Ribbon Bottom: IDEAS • INNOVATION • IMPACT */}
        {showTagline && (
          <g id="tagline-ribbon">
            <rect
              x="48"
              y="262"
              width="224"
              height="26"
              rx="13"
              fill="#342C32"
              stroke="url(#saGoldGrad)"
              strokeWidth="1.5"
              filter="url(#goldShadow)"
            />
            <text
              x="160"
              y="279"
              textAnchor="middle"
              fill="#F5E5C9"
              fontSize="9.5"
              fontWeight="700"
              letterSpacing="2.8"
              fontFamily="'Plus Jakarta Sans', sans-serif"
            >
              IDEAS • INNOVATION • IMPACT
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};
