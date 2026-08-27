import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, CheckCircle2, Award, Zap } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SiteSettings } from '../types';

interface HeroProps {
  settings: SiteSettings;
  onExploreWork: () => void;
  onCreateTogether: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onExploreWork,
  onCreateTogether,
}) => {
  // Ambient gold floating particles
  const particles = [
    { left: '10%', top: '20%', size: 4, dur: 6, delay: 0 },
    { left: '85%', top: '15%', size: 6, dur: 8, delay: 1 },
    { left: '75%', top: '65%', size: 5, dur: 7, delay: 2 },
    { left: '20%', top: '75%', size: 3, dur: 5, delay: 0.5 },
    { left: '48%', top: '12%', size: 5, dur: 9, delay: 1.5 },
    { left: '92%', top: '45%', size: 4, dur: 6.5, delay: 2.5 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-[#FFF9F6]"
    >
      {/* Signature Atmospheric Blur Orbs */}
      <div className="absolute top-[-80px] right-[-80px] w-[450px] h-[450px] bg-[#E8B8C4] opacity-25 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-60px] w-[400px] h-[400px] bg-[#A9DDF2] opacity-25 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#F7DDE3]/20 blur-[120px] pointer-events-none" />

      {/* Floating Gold Particles */}
      {particles.map((p, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-12, 12, -12],
            opacity: [0.25, 0.85, 0.25],
            scale: [0.9, 1.2, 0.9],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          className="absolute rounded-full bg-[#C9A45C] shadow-[0_0_12px_#C9A45C] pointer-events-none"
        />
      ))}

      {/* Abstract Fine Floral Line Art in Background */}
      <div className="absolute right-4 top-1/4 w-80 h-80 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C94F78]">
          <path d="M100 10 C120 40 180 50 190 100 C150 120 120 180 100 190 C80 150 20 120 10 100 C50 80 80 20 100 10 Z" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="40" stroke="#C9A45C" strokeWidth="1" />
          <path d="M100 40 Q130 70 160 100 Q130 130 100 160 Q70 130 40 100 Q70 70 100 40" stroke="#5D9FBE" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Top Brand Eyebrow with Hairline Divider */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3.5 mb-6"
            >
              <div className="w-12 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] uppercase tracking-[0.35em] text-[#5D9FBE] font-sans font-bold">
                A Premium Creative Agency
              </span>
            </motion.div>

            {/* Main Editorial Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-[#342C32] leading-[1.02] tracking-tight mb-8"
            >
              Ideas That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C]">
                Inspire.
              </span>
              <br />
              <span className="italic font-light">Impact</span> That{' '}
              <span className="text-[#342C32]">Matters.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-[#342C32]/75 max-w-lg mb-10 leading-relaxed font-sans"
            >
              {settings.heroSubheading}
            </motion.p>

            {/* Artistic CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
            >
              {/* Sliding Reveal Primary Button */}
              <button
                onClick={onExploreWork}
                className="group relative px-8 py-4 overflow-hidden rounded-full border border-[#C9A45C] text-[#342C32] font-sans text-xs font-bold uppercase tracking-widest cursor-pointer shadow-sm hover:shadow-md transition-all"
              >
                <span className="relative z-10 flex items-center gap-2 group-hover:text-[#342C32] transition-colors">
                  <span>{settings.heroCtaPrimary}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-[#E8B8C4] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>

              {/* Secondary Button */}
              <button
                onClick={onCreateTogether}
                className="flex items-center gap-3 px-6 py-4 rounded-full border border-[#342C32]/15 hover:border-[#C9A45C] bg-white/50 backdrop-blur-sm transition-all duration-300 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border border-[#342C32]/15 flex items-center justify-center group-hover:bg-[#A9DDF2]/30 transition-all">
                  <div className="w-2 h-2 rounded-full bg-[#C9A45C] group-hover:scale-125 transition-transform" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#342C32]">
                  {settings.heroCtaSecondary}
                </span>
              </button>
            </motion.div>

            {/* Trust Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-12 pt-6 border-t border-[#C9A45C]/20 w-full"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-[#342C32]/80">
                <CheckCircle2 className="w-4 h-4 text-[#C94F78]" />
                <span>Bespoke Engineering</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#342C32]/80">
                <Award className="w-4 h-4 text-[#C9A45C]" />
                <span>Award-Calibre Aesthetic</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#342C32]/80">
                <Zap className="w-4 h-4 text-[#5D9FBE]" />
                <span>High Conversion Impact</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Glass Stage Composition */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[400px] h-[540px] sm:h-[560px]"
            >
              {/* Backing decorative colored card */}
              <div className="absolute top-8 right-8 sm:top-10 sm:right-10 w-full h-full bg-[#F7DDE3] rounded-[48px] sm:rounded-[60px] border border-[#E8B8C4]/40" />

              {/* Front Glass Stage Card */}
              <div className="absolute top-0 right-0 w-full h-full bg-white/50 backdrop-blur-xl border border-white/60 rounded-[48px] sm:rounded-[60px] shadow-2xl flex flex-col p-8 sm:p-9 justify-between overflow-hidden">
                
                {/* Visual Header Banner with Dot Pattern and Brand Emblem */}
                <div className="w-full h-44 bg-gradient-to-br from-[#E8B8C4] via-[#F7DDE3] to-[#A9DDF2] rounded-[32px] relative overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute inset-0 opacity-25 bg-dot-pattern-white" />
                  <div className="relative z-10 transform scale-90 sm:scale-100 hover:scale-105 transition-transform duration-500">
                    <BrandLogo size="md" customUrl={settings.customLogoUrl} withGlow />
                  </div>
                </div>

                {/* Card Meta & Story Content */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#5D9FBE]">
                      Featured Studio Work
                    </span>
                    <div className="flex items-center gap-1 text-[#C9A45C] text-xs">
                      ★★★★★
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32] leading-tight">
                    Aria Luxury Estates
                  </h3>

                  <p className="text-xs sm:text-sm font-sans text-[#342C32]/65 leading-relaxed">
                    Digital identity and bespoke web platform engineered for a premier prestige lifestyle brand.
                  </p>

                  <div className="w-full h-[1px] bg-[#C9A45C]/20 my-1" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="font-serif text-lg font-bold text-[#342C32]">2026</span>
                      <span className="text-[9px] uppercase tracking-widest text-[#342C32]/50 font-sans">Launch Year</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-serif text-lg font-bold text-[#342C32]">Branding</span>
                      <span className="text-[9px] uppercase tracking-widest text-[#342C32]/50 font-sans">Service Scope</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Signature Rotated Premium Quality Seal Badge */}
              <motion.div
                animate={{ rotate: [10, 16, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-28 h-28 sm:w-32 sm:h-32 bg-[#E8D3A3] rounded-full flex items-center justify-center p-3 sm:p-4 shadow-xl z-20"
              >
                <div className="w-full h-full border border-white/40 rounded-full flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#342C32]/75 uppercase tracking-tighter leading-tight">
                    PREMIUM
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-extrabold text-[#342C32] uppercase tracking-wider">
                    QUALITY
                  </span>
                  <span className="text-[8px] text-[#342C32]/60 font-semibold mt-0.5">
                    EST. 2026
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
