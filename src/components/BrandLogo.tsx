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
          <div className="absolute inset-0 rounded-full bg-[#C9A45C]/20 blur-xl scale-125 animate-pulse-glow pointer-events-none" />
        )}
        <img
          src={customUrl}
          alt="Mirai — Ideas • Innovation • Impact Official Logo"
          className="w-full h-full object-contain rounded-full relative z-10"
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
          {/* Gold Gradient */}
          <linearGradient id="saGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="35%" stopColor="#F3E5AB" />
            <stop offset="70%" stopColor="#C9A45C" />
            <stop offset="100%" stopColor="#AA7C11" />
          </linearGradient>

          {/* Rose Blush Gradient */}
          <linearGradient id="saRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C94F78" />
            <stop offset="60%" stopColor="#E8B8C4" />
            <stop offset="100%" stopColor="#A8365D" />
          </linearGradient>

          {/* Sky Blue Soft Radial */}
          <radialGradient id="saSkyRadial" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="65%" stopColor="#FFF9F6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F5E8EB" stopOpacity="0.85" />
          </radialGradient>

          {/* Drop Shadow Filter */}
          <filter id="goldShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#C9A45C" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Circular Medallion Background */}
        <circle cx="160" cy="160" r="148" fill="url(#saSkyRadial)" />
        
        {/* Outer Circular Gold Ring */}
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
          stroke="url(#saGoldGrad)"
          strokeWidth="1"
          strokeDasharray="4 2"
          opacity="0.85"
        />

        {/* Subtle Decorative Star Accents */}
        <path d="M160 22 L162 26 L166 28 L162 30 L160 34 L158 30 L154 28 L158 26 Z" fill="url(#saGoldGrad)" />
        <circle cx="50" cy="160" r="2.5" fill="url(#saGoldGrad)" />
        <circle cx="270" cy="160" r="2.5" fill="url(#saGoldGrad)" />

        {/* Left Creative Female Illustration (Designing / Tablet / Stylus) */}
        <g opacity="0.9" transform="translate(42, 100) scale(0.65)">
          {/* Head & Hair */}
          <ellipse cx="48" cy="30" rx="14" ry="18" fill="#342C32" />
          <path d="M40 32 Q32 50 36 68 Q44 58 48 45 Z" fill="#342C32" />
          <ellipse cx="50" cy="32" rx="11" ry="13" fill="#E8B8C4" />
          {/* Glasses & Face Details */}
          <circle cx="54" cy="30" r="4.5" stroke="#C9A45C" strokeWidth="1.2" fill="none" />
          {/* Torso & Elegant Blouse */}
          <path d="M35 55 Q48 50 62 55 L68 95 L28 95 Z" fill="#C94F78" opacity="0.85" />
          {/* Arm holding tablet */}
          <path d="M60 62 L78 78 L72 86 L54 72 Z" fill="#E8B8C4" />
          {/* Digital Tablet Screen */}
          <rect x="70" y="65" width="24" height="34" rx="3" fill="#5D9FBE" transform="rotate(-15 70 65)" stroke="url(#saGoldGrad)" strokeWidth="1.5" />
          <line x1="74" y1="75" x2="88" y2="72" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="75" y1="83" x2="85" y2="80" stroke="#E8D3A3" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Right Creative Female Illustration (Working with Modern Laptop / Strategy) */}
        <g opacity="0.9" transform="translate(198, 102) scale(0.65)">
          {/* Head & Chic Hair Bun */}
          <circle cx="48" cy="18" r="8" fill="#342C32" />
          <ellipse cx="45" cy="32" rx="13" ry="17" fill="#342C32" />
          <ellipse cx="42" cy="34" rx="11" ry="13" fill="#E8B8C4" />
          {/* Earring */}
          <circle cx="39" cy="36" r="2" fill="url(#saGoldGrad)" />
          {/* Torso & Professional Blazer */}
          <path d="M26 55 Q40 48 56 55 L64 95 L20 95 Z" fill="#5D9FBE" opacity="0.85" />
          {/* Arm typing on laptop */}
          <path d="M30 62 L15 78 L22 84 L38 72 Z" fill="#E8B8C4" />
          {/* Sleek Laptop */}
          <path d="M-8 84 L22 84 L26 88 L-12 88 Z" fill="url(#saGoldGrad)" />
          <path d="M-4 66 L20 66 L22 84 L-8 84 Z" fill="#342C32" stroke="url(#saGoldGrad)" strokeWidth="1" />
          <rect x="-2" y="68" width="20" height="13" fill="#A9DDF2" opacity="0.75" />
        </g>

        {/* Center Stylized "MIRAI" Monogram */}
        <g transform="translate(160, 150) scale(1)">
          {/* Stylized Luxury 'M' Monogram */}
          <path
            d="M -36 28 L -36 -32 L -22 -32 L -4 4 L 4 4 L 22 -32 L 36 -32 L 36 28 L 24 28 L 24 -12 L 8 20 L -8 20 L -24 -12 L -24 28 Z"
            fill="url(#saGoldGrad)"
            filter="url(#goldShadow)"
          />
          {/* Accent flourish overlay in rose */}
          <path
            d="M -26 -28 L -4 12 L -2 12 L -14 -28 Z"
            fill="url(#saRoseGrad)"
          />
          <path
            d="M 26 -28 L 4 12 L 2 12 L 14 -28 Z"
            fill="url(#saRoseGrad)"
          />
          {/* Text MIRAI underneath the M */}
          <text
            x="0"
            y="48"
            textAnchor="middle"
            fill="url(#saGoldGrad)"
            fontSize="14"
            fontWeight="800"
            letterSpacing="5"
            fontFamily="'Playfair Display', serif"
          >
            MIRAI
          </text>
        </g>

        {/* Botanical Floral Wreath / Leaves Arching Bottom */}
        <g transform="translate(160, 235)">
          {/* Left Branch */}
          <path
            d="M -10 5 Q -65 5 -105 -25"
            stroke="url(#saGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Left Leaves */}
          <ellipse cx="-40" cy="5" rx="8" ry="4" transform="rotate(-15 -40 5)" fill="#E8B8C4" opacity="0.9" />
          <ellipse cx="-75" cy="-8" rx="8" ry="4" transform="rotate(-35 -75 -8)" fill="#C94F78" opacity="0.8" />
          <ellipse cx="-98" cy="-22" rx="6" ry="3" transform="rotate(-50 -98 -22)" fill="url(#saGoldGrad)" />

          {/* Right Branch */}
          <path
            d="M 10 5 Q 65 5 105 -25"
            stroke="url(#saGoldGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right Leaves */}
          <ellipse cx="40" cy="5" rx="8" ry="4" transform="rotate(15 40 5)" fill="#E8B8C4" opacity="0.9" />
          <ellipse cx="75" cy="-8" rx="8" ry="4" transform="rotate(35 75 -8)" fill="#C94F78" opacity="0.8" />
          <ellipse cx="98" cy="-22" rx="6" ry="3" transform="rotate(50 98 -22)" fill="url(#saGoldGrad)" />

          {/* Central Rose Blossom */}
          <circle cx="0" cy="5" r="7" fill="#C94F78" />
          <circle cx="0" cy="5" r="4.5" fill="#E8B8C4" />
          <circle cx="0" cy="5" r="2" fill="url(#saGoldGrad)" />
        </g>

        {/* Tagline Curved Ribbon or Text Bottom */}
        {showTagline && (
          <g>
            <rect
              x="52"
              y="262"
              width="216"
              height="26"
              rx="13"
              fill="#342C32"
              stroke="url(#saGoldGrad)"
              strokeWidth="1.5"
            />
            <text
              x="160"
              y="279"
              textAnchor="middle"
              fill="#E8D3A3"
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
