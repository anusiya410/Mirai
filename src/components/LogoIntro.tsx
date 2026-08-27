import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ArrowUpRight } from 'lucide-react';

interface LogoIntroProps {
  customLogoUrl?: string | null;
  onComplete: () => void;
}

export const LogoIntro: React.FC<LogoIntroProps> = ({ customLogoUrl, onComplete }) => {
  // Current animation scene: 1 to 8 (8 is final transition / hero reveal)
  const [scene, setScene] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Scene 1: Soft Beginning (0s)
    // Scene 2: Outer Circle Formation (1.2s)
    const t2 = setTimeout(() => setScene(2), 1200);
    // Scene 3: A + S Monogram Reveal (2.4s)
    const t3 = setTimeout(() => setScene(3), 2400);
    // Scene 4: Tulip Bloom (3.8s)
    const t4 = setTimeout(() => setScene(4), 3800);
    // Scene 5: Two Women Reveal (5.0s)
    const t5 = setTimeout(() => setScene(5), 5000);
    // Scene 6: Details Appear (6.2s)
    const t6 = setTimeout(() => setScene(6), 6200);
    // Scene 7: Full Logo Reveal & Tagline (7.4s)
    const t7 = setTimeout(() => setScene(7), 7400);
    // Scene 8: Final Cinematic Transition into Homepage Tagline & CTAs (9.6s)
    const t8 = setTimeout(() => setScene(8), 9600);

    return () => {
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, []);

  // Floating ambient champagne-gold particles
  const particles = [
    { x: '16%', y: '24%', size: 4, dur: 5.5, delay: 0.1 },
    { x: '82%', y: '18%', size: 5, dur: 6.2, delay: 0.3 },
    { x: '22%', y: '72%', size: 4.5, dur: 5.8, delay: 0.2 },
    { x: '78%', y: '78%', size: 3.5, dur: 6.5, delay: 0.5 },
    { x: '48%', y: '14%', size: 5, dur: 7.0, delay: 0.4 },
    { x: '12%', y: '52%', size: 3.5, dur: 5.2, delay: 0.6 },
    { x: '86%', y: '48%', size: 4, dur: 6.0, delay: 0.25 },
    { x: '35%', y: '84%', size: 5.5, dur: 6.8, delay: 0.45 },
  ];

  const taglineLetters = "IDEAS • INNOVATION • IMPACT".split("");

  // Mouse Parallax Coordinates for 3D Tilt Experience
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 16;
    const y = (clientY / innerHeight - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleCtaClick = (destination: string) => {
    onComplete();
    navigate(destination);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="logo-cinematic-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.03 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFFDFB] overflow-hidden select-none"
      >
        {/* ========================================================================= */}
        {/* SCENE 1 — SOFT BEGINNING: WARM IVORY BG & ROTATING LIGHT BEAMS            */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 bg-radial from-[#FFFFFF] via-[#FFF9F6] to-[#F9EFEF] pointer-events-none" />
        
        {/* Volumetric Rotating Light Beams in the Background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[800px] h-[800px] rounded-full pointer-events-none opacity-20"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, rgba(201,164,92,0.15) 0deg, transparent 35deg, rgba(201,79,120,0.12) 90deg, transparent 130deg, rgba(201,164,92,0.18) 180deg, transparent 230deg, rgba(93,159,190,0.15) 270deg, transparent 320deg, rgba(201,164,92,0.15) 360deg)',
          }}
        />

        {/* Subtle center ambient radial glow */}
        <motion.div
          animate={{
            scale: scene >= 7 ? [1.1, 1.3, 1.1] : [0.9, 1.15, 0.9],
            opacity: scene >= 2 ? [0.35, 0.65, 0.35] : 0.25,
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-[500px] h-[500px] sm:w-[650px] sm:h-[650px] rounded-full bg-gradient-to-tr from-[#F7DDE3]/40 via-[#E8D3A3]/35 to-[#DDF3FC]/40 blur-[100px] pointer-events-none"
        />

        {/* Pulsating Ripple Wave on Scene Changes */}
        {scene >= 3 && (
          <div className="absolute w-72 h-72 rounded-full border border-[#C9A45C]/30 animate-ripple pointer-events-none" />
        )}
        {scene >= 5 && (
          <div className="absolute w-80 h-80 rounded-full border border-[#C94F78]/25 animate-ripple pointer-events-none" style={{ animationDelay: '1.2s' }} />
        )}

        {/* Tiny Champagne-Gold Particles */}
        {particles.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15, scale: 0.5 }}
            animate={{
              opacity: [0.25, 0.9, 0.25],
              y: [-14, 14, -14],
              scale: [0.85, 1.25, 0.85],
            }}
            transition={{
              duration: p.dur,
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
            className="absolute rounded-full bg-[#C9A45C] shadow-[0_0_12px_#C9A45C] pointer-events-none"
          />
        ))}

        {/* ========================================================================= */}
        {/* MAIN CINEMATIC STAGE CONTAINER WITH 3D PERSPECTIVE TILT                   */}
        {/* ========================================================================= */}
        <motion.div
          animate={{
            scale: scene === 8 ? 0.85 : scene >= 2 && scene < 7 ? 1.04 : 1,
            y: scene === 8 ? -40 : 0,
            rotateX: mousePos.y * -0.5,
            rotateY: mousePos.x * 0.5,
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex flex-col items-center justify-center z-10 w-full max-w-2xl px-4 perspective-1000"
        >
          {/* Circular Frame & Vector Medallion Layer */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            
            {/* Background Medallion Base (Soft Sky / Ivory Radial) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: scene >= 2 ? 1 : 0,
                scale: scene >= 2 ? 1 : 0.8,
              }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-2 rounded-full bg-gradient-to-br from-white via-[#FFF9F6] to-[#F7EBEF] shadow-[0_20px_50px_-10px_rgba(201,164,92,0.3)] border border-[#C9A45C]/25 pointer-events-none"
            />

            {/* Custom Uploaded Logo Mode Support */}
            {customLogoUrl ? (
              <motion.img
                src={customLogoUrl}
                alt="Mirai"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="w-full h-full object-contain rounded-full relative z-20"
              />
            ) : (
              <svg
                viewBox="0 0 320 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full relative z-20 overflow-visible"
              >
                <defs>
                  {/* Champagne Gold Metallic Gradient */}
                  <linearGradient id="introGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5E5C9" />
                    <stop offset="30%" stopColor="#D4AF37" />
                    <stop offset="70%" stopColor="#C9A45C" />
                    <stop offset="100%" stopColor="#9C7728" />
                  </linearGradient>

                  {/* Rose Gold Metallic Gradient */}
                  <linearGradient id="introRoseGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F8DCE2" />
                    <stop offset="40%" stopColor="#D98A9E" />
                    <stop offset="75%" stopColor="#C94F78" />
                    <stop offset="100%" stopColor="#8A2846" />
                  </linearGradient>

                  {/* Refined Metallic Sheen Light Sweep Gradient */}
                  <linearGradient id="lightSweepGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#C9A45C" stopOpacity="0" />
                    <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#C9A45C" stopOpacity="0" />
                  </linearGradient>

                  {/* Drop Shadow Filter */}
                  <filter id="introDropShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#C9A45C" floodOpacity="0.3" />
                  </filter>
                </defs>

                {/* ========================================================================= */}
                {/* SCENE 2 — OUTER CIRCLE FORMATION (Rose-gold drawing line & metallic shine) */}
                {/* ========================================================================= */}
                {scene >= 2 && (
                  <motion.circle
                    cx="160"
                    cy="160"
                    r="144"
                    stroke="url(#introGoldGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#introDropShadow)"
                    initial={{ pathLength: 0, rotate: -90 }}
                    animate={{ pathLength: 1, rotate: 0 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}

                {scene >= 2 && (
                  <motion.circle
                    cx="160"
                    cy="160"
                    r="137"
                    stroke="url(#introRoseGold)"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                    opacity="0.8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 0.8, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                  />
                )}

                {/* ========================================================================= */}
                {/* SCENE 3 — A + S MONOGRAM REVEAL (Line-drawing into 3D metallic lettering)  */}
                {/* ========================================================================= */}
                {scene >= 3 && (
                  <motion.g
                    id="intro-as-monogram"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    transform="translate(160, 146)"
                  >
                    {/* Letter 'A' Form with Drawing Animation */}
                    <motion.path
                      d="M 0 -36 L -24 22 L -11 22 L -6 9 L 6 9 L 11 22 L 24 22 Z M 0 -18 L -4 1 L 4 1 Z"
                      fill="url(#introGoldGrad)"
                      stroke="url(#introGoldGrad)"
                      strokeWidth="1"
                      filter="url(#introDropShadow)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.1, ease: 'easeInOut' }}
                    />

                    {/* Intertwined Stylized 'S' Ribbon */}
                    <motion.path
                      d="M 16 -24 C 8 -34 -14 -32 -16 -18 C -18 -4 14 0 16 12 C 18 24 -4 30 -16 22 L -12 14 C -2 18 10 16 8 8 C 6 0 -22 -2 -18 -22 C -14 -36 10 -38 20 -28 Z"
                      fill="url(#introRoseGold)"
                      stroke="url(#introRoseGold)"
                      strokeWidth="1"
                      opacity="0.95"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.95 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: 'easeInOut' }}
                    />

                    {/* Light Sweep Shimmer Accent */}
                    <motion.path
                      d="M -3 -30 L -1 5 L 1 5 L 3 -30 Z"
                      fill="url(#lightSweepGrad)"
                      animate={{
                        opacity: [0, 1, 0],
                        x: [-15, 15],
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    />

                    {/* MIRAI Text Under Monogram */}
                    <motion.text
                      x="0"
                      y="44"
                      textAnchor="middle"
                      fill="url(#introGoldGrad)"
                      fontSize="15"
                      fontWeight="800"
                      letterSpacing="6"
                      fontFamily="'Playfair Display', serif"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 44 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      MIRAI
                    </motion.text>
                  </motion.g>
                )}

                {/* ========================================================================= */}
                {/* SCENE 4 — TULIP BLOOM (Growing stem, unfolding leaves, blooming petals)    */}
                {/* ========================================================================= */}
                {scene >= 4 && (
                  <motion.g
                    id="intro-tulip-bloom"
                    transform="translate(160, 230)"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {/* Stem Growth */}
                    <motion.path
                      d="M 0 16 Q 0 4 0 -4"
                      stroke="#5D9FBE"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Unfolding Leaves */}
                    <motion.path
                      d="M 0 8 Q -10 2 -12 -6 Q -4 -2 0 4 Z"
                      fill="#E8B8C4"
                      opacity="0.9"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    <motion.path
                      d="M 0 8 Q 10 2 12 -6 Q 4 -2 0 4 Z"
                      fill="#E8B8C4"
                      opacity="0.9"
                      initial={{ scale: 0, rotate: 20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />

                    {/* Blooming Tulip Petals from Closed Bud */}
                    <motion.g
                      transform="translate(0, -6)"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Center Tulip Petal */}
                      <path
                        d="M 0 -12 C -6 -8 -7 4 0 8 C 7 4 6 -8 0 -12 Z"
                        fill="url(#introRoseGold)"
                      />
                      {/* Left Tulip Petal */}
                      <motion.path
                        d="M -3 6 C -10 0 -10 -8 -6 -11 C -4 -4 -1 1 -3 6 Z"
                        fill="#C94F78"
                        initial={{ rotate: 15 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      />
                      {/* Right Tulip Petal */}
                      <motion.path
                        d="M 3 6 C 10 0 10 -8 6 -11 C 4 -4 1 1 3 6 Z"
                        fill="#E8B8C4"
                        initial={{ rotate: -15 }}
                        animate={{ rotate: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      />
                      {/* Golden Sparkle inside Tulip */}
                      <circle cx="0" cy="-2" r="2" fill="url(#introGoldGrad)" />
                    </motion.g>
                  </motion.g>
                )}

                {/* ========================================================================= */}
                {/* SCENE 5 — TWO WOMEN REVEAL (Left with laptop, Right with notebook)         */}
                {/* ========================================================================= */}
                {scene >= 5 && (
                  <>
                    {/* Left Woman (Technology & Laptop) */}
                    <motion.g
                      id="intro-left-woman"
                      transform="translate(38, 98) scale(0.68)"
                      initial={{ opacity: 0, x: -12, scale: 0.62 }}
                      animate={{ opacity: 0.95, x: 0, scale: 0.68 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ellipse cx="48" cy="30" rx="14" ry="18" fill="#342C32" />
                      <path d="M38 30 Q28 48 34 66 Q42 56 46 44 Z" fill="#342C32" />
                      <ellipse cx="50" cy="32" rx="11" ry="13" fill="#E8B8C4" />
                      <circle cx="53" cy="30" r="4.5" stroke="#C9A45C" strokeWidth="1.2" fill="none" />
                      <circle cx="43" cy="36" r="1.5" fill="url(#introGoldGrad)" />
                      <path d="M32 54 Q48 48 64 54 L70 96 L26 96 Z" fill="#C94F78" opacity="0.9" />
                      <path d="M60 62 L80 78 L74 86 L54 72 Z" fill="#E8B8C4" />
                      {/* Laptop */}
                      <rect x="70" y="62" width="26" height="36" rx="3" fill="#5D9FBE" transform="rotate(-15 70 62)" stroke="url(#introGoldGrad)" strokeWidth="1.5" />
                      <line x1="74" y1="73" x2="90" y2="69" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                      <line x1="75" y1="81" x2="87" y2="78" stroke="#F5E5C9" strokeWidth="1.5" strokeLinecap="round" />
                    </motion.g>

                    {/* Right Woman (Creativity & Notebook) */}
                    <motion.g
                      id="intro-right-woman"
                      transform="translate(196, 100) scale(0.68)"
                      initial={{ opacity: 0, x: 12, scale: 0.62 }}
                      animate={{ opacity: 0.95, x: 0, scale: 0.68 }}
                      transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <circle cx="48" cy="16" r="8.5" fill="#342C32" />
                      <ellipse cx="45" cy="32" rx="13" ry="17" fill="#342C32" />
                      <ellipse cx="42" cy="34" rx="11" ry="13" fill="#E8B8C4" />
                      <circle cx="39" cy="36" r="2" fill="url(#introGoldGrad)" />
                      <path d="M24 54 Q40 47 58 54 L66 96 L18 96 Z" fill="#5D9FBE" opacity="0.9" />
                      <path d="M30 62 L12 78 L20 86 L38 72 Z" fill="#E8B8C4" />
                      {/* Notebook */}
                      <path d="M-6 82 L24 82 L26 86 L-10 86 Z" fill="url(#introGoldGrad)" />
                      <rect x="-4" y="64" width="22" height="18" rx="2" fill="#FFF9F6" stroke="url(#introGoldGrad)" strokeWidth="1.2" transform="rotate(8 -4 64)" />
                      <line x1="2" y1="68" x2="16" y2="70" stroke="#C94F78" strokeWidth="1.2" strokeLinecap="round" />
                      <line x1="2" y1="74" x2="14" y2="76" stroke="#5D9FBE" strokeWidth="1.2" strokeLinecap="round" />
                    </motion.g>
                  </>
                )}

                {/* ========================================================================= */}
                {/* SCENE 6 — DETAILS APPEAR (Leaves, stars, quotation marks, ornaments)       */}
                {/* ========================================================================= */}
                {scene >= 6 && (
                  <>
                    {/* Stars & Quotation Marks */}
                    <motion.g
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                      <path d="M160 20 L162 25 L167 27 L162 29 L160 34 L158 29 L153 27 L158 25 Z" fill="url(#introGoldGrad)" />
                      <text x="138" y="32" fill="#C9A45C" fontSize="11" fontFamily="'Playfair Display', serif" opacity="0.75">“</text>
                      <text x="178" y="32" fill="#C9A45C" fontSize="11" fontFamily="'Playfair Display', serif" opacity="0.75">”</text>
                      <path d="M42 160 L44 163 L47 164 L44 165 L42 168 L40 165 L37 164 L40 163 Z" fill="url(#introGoldGrad)" />
                      <path d="M278 160 L280 163 L283 164 L280 165 L278 168 L276 165 L273 164 L276 163 Z" fill="url(#introGoldGrad)" />
                    </motion.g>

                    {/* Botanical Leaves Arching Bottom */}
                    <motion.g
                      transform="translate(160, 230)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {/* Left Branch */}
                      <path
                        d="M -10 6 Q -65 6 -105 -24"
                        stroke="url(#introGoldGrad)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <ellipse cx="-40" cy="6" rx="8" ry="4" transform="rotate(-15 -40 6)" fill="#E8B8C4" opacity="0.95" />
                      <ellipse cx="-75" cy="-7" rx="8" ry="4" transform="rotate(-35 -75 -7)" fill="#C94F78" opacity="0.85" />
                      <ellipse cx="-98" cy="-21" rx="6" ry="3" transform="rotate(-50 -98 -21)" fill="url(#introGoldGrad)" />

                      {/* Right Branch */}
                      <path
                        d="M 10 6 Q 65 6 105 -24"
                        stroke="url(#introGoldGrad)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <ellipse cx="40" cy="6" rx="8" ry="4" transform="rotate(15 40 6)" fill="#E8B8C4" opacity="0.95" />
                      <ellipse cx="75" cy="-7" rx="8" ry="4" transform="rotate(35 75 -8)" fill="#C94F78" opacity="0.85" />
                      <ellipse cx="98" cy="-21" rx="6" ry="3" transform="rotate(50 98 -21)" fill="url(#introGoldGrad)" />
                    </motion.g>
                  </>
                )}

                {/* ========================================================================= */}
                {/* SCENE 7 — FULL LOGO REVEAL & TAGLINE RIBBON                               */}
                {/* ========================================================================= */}
                {scene >= 7 && (
                  <motion.g
                    id="intro-tagline-ribbon"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <rect
                      x="48"
                      y="262"
                      width="224"
                      height="26"
                      rx="13"
                      fill="#342C32"
                      stroke="url(#introGoldGrad)"
                      strokeWidth="1.5"
                      filter="url(#introDropShadow)"
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
                  </motion.g>
                )}
              </svg>
            )}

            {/* Shimmer Light Sweep across full logo in Scene 7 */}
            {scene >= 7 && (
              <motion.div
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '200%', opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 pointer-events-none z-30"
              />
            )}
          </div>

          {/* Letter-by-Letter Tagline Reveal Underneath Logo */}
          {scene >= 7 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-6 text-center flex items-center justify-center gap-1.5 flex-wrap"
            >
              {taglineLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.03 * index }}
                  className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C9A45C] font-semibold font-sans"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* FINAL TRANSITION (SCENE 8): HOMEPAGE HERO EXPANSION, TAGLINE & CTAS       */}
          {/* ========================================================================= */}
          {scene >= 8 && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 text-center space-y-6 max-w-xl"
            >
              {/* Final Signature Website Tagline */}
              <div className="space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#F7DDE3] border border-[#C94F78]/30 text-[10px] font-bold tracking-widest text-[#C94F78] uppercase"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Welcome to Mirai Studio</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="font-serif text-2xl sm:text-4xl md:text-[38px] font-bold text-[#342C32] tracking-tight leading-tight"
                >
                  “Beautiful Websites for{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C]">
                    Beautiful Businesses.”
                  </span>
                </motion.h2>
              </div>

              {/* Two Luxury CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
              >
                <button
                  onClick={() => handleCtaClick('/contact')}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:shadow-[0_10px_25px_rgba(201,164,92,0.4)] hover:-translate-y-0.5 transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>GET YOUR WEBSITE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleCtaClick('/projects')}
                  className="w-full sm:w-auto px-8 py-4 bg-white border border-[#C9A45C]/40 text-[#342C32] text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:bg-[#FFF9F6] hover:border-[#342C32] transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>VIEW OUR WORK</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </motion.div>
          )}

        </motion.div>

        {/* Quick Skip / Enter Website Button */}
        <button
          onClick={onComplete}
          className="absolute bottom-6 right-6 text-[11px] text-[#342C32]/60 hover:text-[#C94F78] uppercase tracking-widest px-4 py-2 rounded-full border border-[#C9A45C]/30 hover:border-[#C94F78]/50 transition-all backdrop-blur-sm cursor-pointer z-30 flex items-center gap-1.5"
        >
          <span>Skip to Website</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

