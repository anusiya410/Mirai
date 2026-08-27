import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Cpu,
  Gem,
  Smartphone,
  Zap,
  Headphones,
  Quote,
} from 'lucide-react';

export const WhyUs: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Creative Thinking',
      desc: 'We explore fearless, unconventional ideas that elevate your brand beyond generic industry patterns.',
      accent: 'from-[#F7DDE3] to-[#FFF9F6]',
      border: 'border-[#E8B8C4]',
    },
    {
      icon: Cpu,
      title: 'Modern Technology',
      desc: 'Engineered with cutting-edge frameworks, ultra-fast architectures, and scalable cloud performance.',
      accent: 'from-[#DDF3FC] to-[#FFF9F6]',
      border: 'border-[#A9DDF2]',
    },
    {
      icon: Gem,
      title: 'Premium Design',
      desc: 'Sophisticated aesthetics, high-fashion typography, and refined palettes tailored for discerning audiences.',
      accent: 'from-[#FFF9F6] to-[#F7DDE3]',
      border: 'border-[#C9A45C]',
    },
    {
      icon: Smartphone,
      title: 'Responsive Experience',
      desc: 'Fluid layouts tested across devices for flawless touch interactions, seamless scaling, and zero friction.',
      accent: 'from-[#DDF3FC] to-[#FFF9F6]',
      border: 'border-[#5D9FBE]',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      desc: 'Agile sprints and transparent milestones ensuring high-velocity launches without sacrificing craftsmanship.',
      accent: 'from-[#F7DDE3] to-[#FFF9F6]',
      border: 'border-[#C94F78]',
    },
    {
      icon: Headphones,
      title: 'Reliable Support',
      desc: 'Direct partner-level collaboration, post-launch refinement, and proactive maintenance whenever needed.',
      accent: 'from-[#FFF9F6] to-[#DDF3FC]',
      border: 'border-[#C9A45C]',
    },
  ];

  return (
    <section id="why-us" className="py-24 sm:py-32 relative overflow-hidden bg-mesh-luxury">
      {/* Large Background Quotation Mark & Floral Line Art */}
      <div className="absolute top-10 right-8 sm:right-20 text-[#C9A45C]/10 pointer-events-none select-none">
        <Quote className="w-64 h-64 sm:w-96 sm:h-96" />
      </div>

      <div className="absolute bottom-0 left-0 w-80 h-80 opacity-15 pointer-events-none">
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full stroke-[#C94F78]">
          <path d="M20 180 Q80 120 100 20" strokeWidth="2" />
          <ellipse cx="60" cy="140" rx="15" ry="8" transform="rotate(-30 60 140)" fill="#E8B8C4" />
          <ellipse cx="85" cy="80" rx="15" ry="8" transform="rotate(40 85 80)" fill="#C9A45C" />
          <circle cx="100" cy="20" r="10" fill="#C94F78" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3.5 mb-3.5">
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
              The Mirai Distinction
            </span>
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight mb-4">
            Why Brands Choose Us
          </h2>

          <p className="text-base text-[#342C32]/75 font-sans">
            We bridge artistic sensibility with technical precision to build digital assets that stand the test of time.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`p-8 sm:p-9 rounded-[32px] bg-white/85 backdrop-blur-md border ${b.border}/40 shadow-xs hover:shadow-xl hover:border-[#C9A45C] transition-all duration-400 hover:-translate-y-1.5 group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFF9F6] to-[#F7DDE3] border border-[#C9A45C]/30 flex items-center justify-center text-[#C94F78] mb-6 group-hover:scale-110 group-hover:bg-[#C9A45C]/15 transition-all duration-300 shadow-2xs">
                    <Icon className="w-7 h-7 text-[#C9A45C] group-hover:text-[#C94F78] transition-colors" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#342C32] group-hover:text-[#C94F78] transition-colors mb-3">
                    {b.title}
                  </h3>

                  <p className="text-sm text-[#342C32]/75 leading-relaxed font-sans">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
