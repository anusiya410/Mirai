import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Sparkles,
  Cpu,
  Gem,
  Smartphone,
  Zap,
  Headphones,
  Quote,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  Award,
  Layers,
  Star,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageTransition } from '../components/PageTransition';
import { Testimonial } from '../types';

interface WhyUsPageProps {
  testimonials: Testimonial[];
}

export const WhyUsPage: React.FC<WhyUsPageProps> = ({ testimonials }) => {
  const benefits = [
    {
      icon: Sparkles,
      title: 'Creative Thinking',
      badge: 'Unconventional',
      desc: 'We explore fearless, unconventional ideas that elevate your brand beyond generic industry patterns and cookie-cutter designs.',
      details: [
        'Bespoke visual concepts tailored to brand ethos',
        'Distinctive editorial typographic pairings',
        'Unique micro-interaction choreography',
      ],
      accent: 'from-[#F7DDE3] to-[#FFF9F6]',
      border: 'border-[#E8B8C4]',
      color: 'text-[#C94F78]',
    },
    {
      icon: Cpu,
      title: 'Modern Technology',
      badge: 'High Performance',
      desc: 'Engineered with cutting-edge frameworks, ultra-fast architectures, and scalable cloud performance with clean TypeScript code.',
      details: [
        'Modern React 18 & TypeScript architecture',
        'Sub-second page load times and 100/100 Core Web Vitals',
        'Scalable RESTful / Cloud infrastructure',
      ],
      accent: 'from-[#DDF3FC] to-[#FFF9F6]',
      border: 'border-[#A9DDF2]',
      color: 'text-[#5D9FBE]',
    },
    {
      icon: Gem,
      title: 'Premium Design',
      badge: 'Haute Couture',
      desc: 'Sophisticated aesthetics, high-fashion typography, and refined palettes tailored for discerning and premium audiences.',
      details: [
        'Luxury aesthetic balance with golden ratio spacing',
        'Comprehensive digital design system & UI tokens',
        'Accessibility compliance (WCAG AA)',
      ],
      accent: 'from-[#FFF9F6] to-[#F7DDE3]',
      border: 'border-[#C9A45C]',
      color: 'text-[#C9A45C]',
    },
    {
      icon: Smartphone,
      title: 'Responsive Experience',
      badge: 'Device Agnostic',
      desc: 'Fluid layouts tested across devices for flawless touch interactions, seamless scaling, and zero friction from mobile to 4K displays.',
      details: [
        'Mobile-first responsive layout engineering',
        'Smooth touch gesture optimization',
        'Adaptive media and dynamic layout containers',
      ],
      accent: 'from-[#DDF3FC] to-[#FFF9F6]',
      border: 'border-[#5D9FBE]',
      color: 'text-[#5D9FBE]',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      badge: 'Agile Velocity',
      desc: 'Agile sprints and transparent milestones ensuring high-velocity launches without ever sacrificing craftsmanship.',
      details: [
        'Structured sprint cycles with weekly video demos',
        'Clear milestone sign-offs with zero ambiguity',
        'Guaranteed target launch timelines',
      ],
      accent: 'from-[#F7DDE3] to-[#FFF9F6]',
      border: 'border-[#C94F78]',
      color: 'text-[#C94F78]',
    },
    {
      icon: Headphones,
      title: 'Reliable Support',
      badge: 'Partner Level',
      desc: 'Direct partner-level collaboration, post-launch refinement, proactive monitoring, and dedicated maintenance whenever needed.',
      details: [
        'Direct line to lead engineers & designers',
        'Post-launch warranty & security patch cycles',
        'Flexible monthly retainers for ongoing expansion',
      ],
      accent: 'from-[#FFF9F6] to-[#DDF3FC]',
      border: 'border-[#C9A45C]',
      color: 'text-[#C9A45C]',
    },
  ];

  const guarantees = [
    '100% Client Intellectual Property & Source Code Ownership',
    'Transparent Milestone-Based Billing with No Hidden Fees',
    'Direct Communication with Senior Creators, Not Account Layers',
    'Post-Launch 30-Day Defect Warranty & Optimization Buffer',
  ];

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HERO & BREADCRUMBS                                                        */}
      {/* ========================================================================= */}
      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden bg-mesh-luxury border-b border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'Why Choose Us' }]} className="mb-6" />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                The Mirai Distinction
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#342C32] tracking-tight leading-tight mb-6">
              Why Discerning Brands{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] to-[#C9A45C]">
                Trust Mirai Studio.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#342C32]/80 leading-relaxed font-sans mb-8">
              We bridge artistic sensibility with technical precision. We don't settle for ordinary templates—we engineer bespoke digital assets that stand the test of time.
            </p>

            <Link
              to="/contact"
              className="px-8 py-4 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C94F78] transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Work With Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6 VALUE PILLARS DEEP DIVE                                                 */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`p-8 rounded-[32px] bg-gradient-to-b ${b.accent} border ${b.border} shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-[#C9A45C]/30 flex items-center justify-center shadow-xs">
                        <Icon className={`w-7 h-7 ${b.color}`} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#342C32] border border-[#C9A45C]/20 shadow-2xs">
                        {b.badge}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl font-bold text-[#342C32] mb-3">
                      {b.title}
                    </h2>

                    <p className="text-sm text-[#342C32]/80 leading-relaxed mb-6 font-sans">
                      {b.desc}
                    </p>

                    <div className="space-y-2 pt-4 border-t border-[#C9A45C]/20">
                      {b.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#342C32]/85">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${b.color} shrink-0`} />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* STUDIO GUARANTEES & QUALITY BENCHMARK                                     */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 bg-mesh-luxury border-y border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
                <span className="text-[11px] font-bold tracking-[0.35em] text-[#C94F78] uppercase font-sans">
                  Our Uncompromising Promise
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight mb-6">
                Guaranteed Excellence In Every Engagement
              </h2>

              <p className="text-base text-[#342C32]/80 leading-relaxed mb-8">
                Working with Mirai Studio means absolute transparency, predictable deliverables, and zero friction. Here is what we commit to every partnership:
              </p>

              <div className="space-y-3.5 mb-8">
                {guarantees.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 border border-[#C9A45C]/25 shadow-2xs">
                    <ShieldCheck className="w-5 h-5 text-[#C9A45C] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-[#342C32]">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="px-8 py-4 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C9A45C] transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Testimonial Snippet */}
            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-[36px] bg-white border border-[#C9A45C]/30 shadow-2xl relative">
                <Quote className="w-12 h-12 text-[#C9A45C]/20 absolute top-8 right-8" />

                <div className="flex items-center gap-1 text-[#C9A45C] mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="font-serif text-lg sm:text-xl text-[#342C32] italic leading-relaxed mb-8">
                  "{testimonials[0]?.quote ||
                    'Mirai Studio exceeded our highest expectations. Their fusion of luxury art direction and rock-solid code transformed our conversion metrics by over 240%.'}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-[#C9A45C]/20">
                  <img
                    src={testimonials[0]?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={testimonials[0]?.clientName || 'Client'}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#C9A45C]"
                  />
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#342C32]">
                      {testimonials[0]?.clientName || 'Elena Rostova'}
                    </h3>
                    <p className="text-xs text-[#342C32]/60">
                      {testimonials[0]?.role || 'Founder'}, {testimonials[0]?.company || 'Aura Haute Horlogerie'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};
