import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, ArrowUpRight, Lightbulb, Compass, Code2, HeartHandshake, Eye } from 'lucide-react';
import { SiteSettings } from '../types';

interface AboutProps {
  settings: SiteSettings;
  onContactClick: () => void;
}

// Custom Counter Hook
function useAnimatedCounter(targetValue: string, inView: boolean) {
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    if (!inView) return;
    
    // Extract numeric part and suffix
    const match = targetValue.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(targetValue);
      return;
    }

    const num = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1600; // ms
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(num * ease);
      setDisplayValue(`${current}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [targetValue, inView]);

  return displayValue;
}

const StatBox: React.FC<{
  target: string;
  label: string;
  inView: boolean;
  colorClass: string;
  bgClass: string;
}> = ({ target, label, inView, colorClass, bgClass }) => {
  const animatedValue = useAnimatedCounter(target, inView);

  return (
    <div className={`p-6 rounded-2xl ${bgClass} border border-[#C9A45C]/20 shadow-xs hover:shadow-md transition-all duration-300 group`}>
      <div className={`font-serif text-3xl sm:text-4xl font-bold ${colorClass} mb-1.5 tracking-tight group-hover:scale-105 transition-transform`}>
        {animatedValue}
      </div>
      <p className="text-xs sm:text-sm font-medium text-[#342C32]/75 uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
};

export const About: React.FC<AboutProps> = ({ settings, onContactClick }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const pillars = [
    { icon: Lightbulb, name: 'Creativity', desc: 'Original thinking that challenges convention.' },
    { icon: Code2, name: 'Technology', desc: 'Scalable modern code engineered to perfection.' },
    { icon: Sparkles, name: 'Innovation', desc: 'Fresh perspectives for high competitive edge.' },
    { icon: Compass, name: 'Strategy', desc: 'Data-driven roadmaps designed for market growth.' },
    { icon: Eye, name: 'Design', desc: 'Sensory aesthetics and seamless digital harmony.' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 sm:py-32 relative overflow-hidden bg-white">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-[#F7DDE3]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-[#DDF3FC]/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand Story & Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col"
          >
            {/* Section Tag */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                About Mirai Studio
              </span>
            </div>

            {/* Title */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight leading-tight mb-6">
              {settings.aboutTitle}
            </h2>

            {/* Story & Paragraphs */}
            <p className="text-base sm:text-lg text-[#342C32]/85 leading-relaxed mb-6 font-sans">
              {settings.aboutStory}
            </p>

            <p className="text-sm sm:text-base text-[#342C32]/70 leading-relaxed mb-8 font-sans">
              {settings.aboutSubtext}
            </p>

            {/* 5 Pillars Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.name}
                    className="p-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/20 hover:border-[#C94F78]/40 transition-colors flex items-center gap-2.5 shadow-2xs"
                  >
                    <div className="w-7 h-7 rounded-xl bg-[#F7DDE3] flex items-center justify-center text-[#C94F78] shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-semibold text-[#342C32] tracking-wide">
                      {pillar.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Action CTA */}
            <div>
              <button
                onClick={onContactClick}
                className="group relative px-8 py-4 overflow-hidden rounded-full border border-[#C9A45C] text-[#342C32] font-sans text-xs font-bold uppercase tracking-widest cursor-pointer shadow-sm hover:shadow-md transition-all inline-flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>Partner With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
                <div className="absolute inset-0 bg-[#E8B8C4] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Premium Animated Stats Card Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative p-7 sm:p-10 rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#FFF9F6] via-[#F7DDE3]/30 to-[#DDF3FC]/40 border border-[#C9A45C]/30 shadow-xl overflow-hidden">
              <div className="absolute inset-0 opacity-15 bg-dot-pattern pointer-events-none" />

              {/* Decorative Header Inside Card */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#C9A45C]/20 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-[#C9A45C]/30 flex items-center justify-center text-[#C9A45C]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#342C32]">The Mirai Benchmark</h3>
                    <p className="text-xs text-[#342C32]/60">Measurable impact in every deliverable</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8B8C4]/30 text-[#C94F78] text-xs font-semibold">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Trusted Agency</span>
                </div>
              </div>

              {/* 4 Statistics Grid */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 relative z-10">
                <StatBox
                  target={settings.stats.ideas || '50+'}
                  label="Creative Ideas"
                  inView={isInView}
                  colorClass="text-[#C94F78]"
                  bgClass="bg-white/85"
                />
                <StatBox
                  target={settings.stats.projects || '6+'}
                  label="Projects Delivered"
                  inView={isInView}
                  colorClass="text-[#5D9FBE]"
                  bgClass="bg-white/85"
                />
                <StatBox
                  target={settings.stats.commitment || '100%'}
                  label="Commitment"
                  inView={isInView}
                  colorClass="text-[#C9A45C]"
                  bgClass="bg-white/85"
                />
                <StatBox
                  target={settings.stats.support || '24/7'}
                  label="Dedicated Support"
                  inView={isInView}
                  colorClass="text-[#342C32]"
                  bgClass="bg-white/85"
                />
              </div>

              {/* Bottom Quote inside the Stats card */}
              <div className="mt-8 pt-6 border-t border-[#C9A45C]/20 text-center relative z-10">
                <p className="font-serif italic text-sm text-[#342C32]/75">
                  "Excellence is not an accident. It is our deliberate standard of creative engineering."
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
