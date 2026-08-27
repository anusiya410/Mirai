import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'motion/react';
import {
  Sparkles,
  ArrowUpRight,
  Lightbulb,
  Compass,
  Code2,
  HeartHandshake,
  Eye,
  Target,
  Rocket,
  ShieldCheck,
  Award,
  Users,
  CheckCircle,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageTransition } from '../components/PageTransition';
import { BrandLogo } from '../components/BrandLogo';
import { SiteSettings } from '../types';

interface AboutPageProps {
  settings: SiteSettings;
}

// Custom Counter Hook for Animated Stats
function useAnimatedCounter(targetValue: string, inView: boolean) {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!inView) return;

    const match = targetValue.match(/^(\d+)(.*)$/);
    if (!match) {
      setDisplayValue(targetValue);
      return;
    }

    const num = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1500;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
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
  sublabel: string;
  inView: boolean;
  colorClass: string;
  bgClass: string;
}> = ({ target, label, sublabel, inView, colorClass, bgClass }) => {
  const animatedValue = useAnimatedCounter(target, inView);

  return (
    <div
      className={`p-6 sm:p-8 rounded-3xl ${bgClass} border border-[#C9A45C]/25 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between`}
    >
      <div>
        <div
          className={`font-serif text-4xl sm:text-5xl font-bold ${colorClass} mb-2 tracking-tight group-hover:scale-105 transition-transform`}
        >
          {animatedValue}
        </div>
        <h4 className="text-xs sm:text-sm font-bold text-[#342C32] uppercase tracking-wider mb-1">
          {label}
        </h4>
      </div>
      <p className="text-xs text-[#342C32]/60 mt-2">{sublabel}</p>
    </div>
  );
};

export const AboutPage: React.FC<AboutPageProps> = ({ settings }) => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isStatsInView = useInView(statsRef, { once: true, margin: '-50px' });

  const pillars = [
    {
      icon: Lightbulb,
      name: 'Fearless Creativity',
      desc: 'Original concepts that challenge stale conventions and captivate attention.',
    },
    {
      icon: Code2,
      name: 'Architectural Precision',
      desc: 'Ultra-clean, modern TypeScript engineering built for scale and security.',
    },
    {
      icon: Sparkles,
      name: 'Continuous Innovation',
      desc: 'Staying at the forefront of digital aesthetics, motion design, and technology.',
    },
    {
      icon: Compass,
      name: 'Strategic Focus',
      desc: 'Every design decision is rooted in commercial outcomes and brand equity.',
    },
    {
      icon: Eye,
      name: 'Sensory Craftsmanship',
      desc: 'Meticulous typography, harmonious color physics, and fluid interactions.',
    },
  ];

  const values = [
    {
      title: 'Our Mission',
      desc: 'To empower forward-thinking creators, enterprises, and innovators with bespoke digital identities that establish unmistakable authority and commercial resonance.',
      icon: Target,
      color: 'text-[#C94F78]',
      bg: 'bg-[#F7DDE3]/50',
    },
    {
      title: 'Our Vision',
      desc: 'To become the premier international boutique digital agency renowned for fusing high artistry with rigorous software engineering.',
      icon: Rocket,
      color: 'text-[#5D9FBE]',
      bg: 'bg-[#DDF3FC]/50',
    },
    {
      title: 'Our Core Values',
      desc: 'Uncompromising craftsmanship, radical transparency, collaborative partnership, and 100% intellectual property ownership for every client.',
      icon: ShieldCheck,
      color: 'text-[#C9A45C]',
      bg: 'bg-[#FFF9F6]',
    },
  ];

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* TOP HERO & BREADCRUMBS                                                    */}
      {/* ========================================================================= */}
      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden bg-mesh-luxury border-b border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'About Us' }]} className="mb-6" />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                About Mirai Studio
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#342C32] tracking-tight leading-tight mb-6">
              Ideas That Inspire.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] to-[#C9A45C]">
                Impact That Endures.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#342C32]/80 leading-relaxed font-sans">
              We are an independent digital agency built at the intersection of haute couture aesthetics and high-performance software engineering.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* BRAND STORY & PHILOSOPHY                                                 */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
                <span className="text-[11px] font-bold tracking-[0.35em] text-[#C94F78] uppercase font-sans">
                  The Genesis & Philosophy
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#342C32] mb-6 leading-tight">
                {settings.aboutTitle || 'Where Bold Ideas Spark Lasting Impact.'}
              </h2>

              <p className="text-base sm:text-lg text-[#342C32]/85 leading-relaxed mb-6 font-sans">
                {settings.aboutStory ||
                  'Mirai Studio was founded on the conviction that digital experiences should feel as tactile and captivating as fine art, while maintaining the rock-solid reliability of mission-critical systems.'}
              </p>

              <p className="text-sm sm:text-base text-[#342C32]/70 leading-relaxed mb-8 font-sans">
                {settings.aboutSubtext ||
                  'Whether architecting a bespoke web application, forging an iconic brand identity, or scaling an interactive ecosystem, our team is committed to making your vision iconic.'}
              </p>

              {/* Action Buttons Required by User Spec */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/services"
                  className="px-7 py-3.5 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C94F78] transition-all shadow-md flex items-center gap-2 group cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  to="/projects"
                  className="px-7 py-3.5 rounded-full border border-[#C9A45C] text-[#342C32] text-xs font-bold uppercase tracking-widest hover:bg-[#FFF9F6] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>View Our Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Brand Emblem Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative p-8 rounded-[40px] bg-gradient-to-br from-[#FFF9F6] via-[#F7DDE3]/50 to-[#DDF3FC]/50 border border-[#C9A45C]/30 shadow-2xl text-center flex flex-col items-center">
                <BrandLogo size="lg" customUrl={settings.customLogoUrl} withGlow className="mb-6" />
                <h3 className="font-serif text-2xl font-bold text-[#342C32] mb-1">Mirai Studio</h3>
                <span className="text-[10px] tracking-[0.25em] font-bold text-[#C9A45C] uppercase mb-4">
                  IDEAS • INNOVATION • IMPACT
                </span>
                <p className="text-xs text-[#342C32]/70 leading-relaxed max-w-xs">
                  "Excellence is not an accident. It is our deliberate standard of creative engineering."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3 CORE PILLARS: MISSION, VISION, VALUES                                  */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 bg-mesh-luxury border-y border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3.5 mb-3.5">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Foundations
              </span>
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#342C32] tracking-tight">
              Mission, Vision & Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="p-8 rounded-3xl bg-white/90 backdrop-blur-sm border border-[#C9A45C]/25 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${v.bg} flex items-center justify-center ${v.color} mb-6 shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#342C32] mb-3">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[#342C32]/75 leading-relaxed font-sans">
                      {v.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5 CREATIVE PILLARS                                                        */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3.5 mb-3.5">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#C94F78] uppercase font-sans">
                Creative Methodology
              </span>
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight">
              The 5 Pillars of Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.name}
                  className="p-7 rounded-3xl bg-[#FFF9F6] border border-[#C9A45C]/25 hover:border-[#C94F78] hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#C9A45C]/30 flex items-center justify-center text-[#C94F78] mb-5 group-hover:bg-[#F7DDE3] transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A45C] block mb-1">
                      Pillar 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#342C32] group-hover:text-[#C94F78] transition-colors mb-2">
                      {pillar.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#342C32]/75 leading-relaxed font-sans">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* CTA card completing grid */}
            <div className="p-7 rounded-3xl bg-gradient-to-br from-[#342C32] to-[#251E23] text-white flex flex-col justify-between">
              <div>
                <Sparkles className="w-8 h-8 text-[#E8D3A3] mb-4" />
                <h3 className="font-serif text-xl font-bold text-white mb-2">
                  Have a Project in Mind?
                </h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  Let us build a bespoke strategy tailored to your exact timeline and goals.
                </p>
              </div>

              <Link
                to="/contact"
                className="w-full py-3 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest text-center shadow-md hover:opacity-95 transition-opacity"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ANIMATED STATISTICS BENCHMARK                                             */}
      {/* ========================================================================= */}
      <section ref={statsRef} className="py-20 sm:py-28 bg-[#FFF9F6] border-t border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3.5 mb-3.5">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Measurable Benchmarks
              </span>
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight">
              Craft Proven by Results
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatBox
              target={settings.stats.ideas || '50+'}
              label="Creative Ideas"
              sublabel="Innovative brand & UI prototypes"
              inView={isStatsInView}
              colorClass="text-[#C94F78]"
              bgClass="bg-white"
            />
            <StatBox
              target={settings.stats.projects || '6+'}
              label="Projects Delivered"
              sublabel="Complete full-stack implementations"
              inView={isStatsInView}
              colorClass="text-[#5D9FBE]"
              bgClass="bg-white"
            />
            <StatBox
              target={settings.stats.commitment || '100%'}
              label="Commitment Rate"
              sublabel="On-time delivery & IP transfer"
              inView={isStatsInView}
              colorClass="text-[#C9A45C]"
              bgClass="bg-white"
            />
            <StatBox
              target={settings.stats.support || '24/7'}
              label="Dedicated Support"
              sublabel="Post-launch maintenance & agility"
              inView={isStatsInView}
              colorClass="text-[#342C32]"
              bgClass="bg-white"
            />
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
