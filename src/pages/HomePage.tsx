import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  FolderKanban,
  HeartHandshake,
  CheckCircle2,
  Globe,
  Layout,
  Cpu,
  Palette,
  MessageSquareQuote,
  Star,
  Crown,
  Tag,
  Gift,
} from 'lucide-react';
import { BrandLogo } from '../components/BrandLogo';
import { PageTransition } from '../components/PageTransition';
import { PricingTier, Project, Service, SiteSettings, Testimonial } from '../types';

interface HomePageProps {
  settings: SiteSettings;
  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  pricing?: PricingTier[];
}

export const HomePage: React.FC<HomePageProps> = ({
  settings,
  services,
  projects,
  testimonials,
  pricing = [],
}) => {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);
  const previewServices = services.slice(0, 3);
  const topTestimonial = testimonials[0];

  // Gold floating particles for hero
  const particles = [
    { left: '12%', top: '22%', size: 4, dur: 6, delay: 0 },
    { left: '84%', top: '16%', size: 6, dur: 8, delay: 1 },
    { left: '76%', top: '64%', size: 5, dur: 7, delay: 2 },
    { left: '18%', top: '78%', size: 3, dur: 5, delay: 0.5 },
    { left: '46%', top: '14%', size: 5, dur: 9, delay: 1.5 },
  ];

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* 1. PREMIUM ANIMATED HERO SECTION                                          */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 sm:pb-24 overflow-hidden bg-[#FFF9F6]">
        {/* Background glow orbs */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
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

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[74px] font-bold text-[#342C32] leading-[1.02] tracking-tight mb-8"
              >
                Ideas That{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C]">
                  Inspire.
                </span>
                <br />
                Innovation That{' '}
                <span className="italic font-normal text-[#C9A45C]">
                  Transforms.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-lg text-[#342C32]/80 leading-relaxed max-w-xl mb-10 font-sans font-normal"
              >
                {settings.heroSubheading ||
                  'Mirai Studio crafts bespoke digital identities, high-performance web platforms, and visionary brand experiences where artistry meets engineered precision.'}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
              >
                <Link
                  to="/projects"
                  className="w-full sm:w-auto px-8 py-4 bg-[#342C32] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-[#C9A45C] transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-[0_10px_25px_rgba(201,164,92,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group text-center"
                >
                  <span>Explore Selected Work</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-xs border border-[#C9A45C]/40 text-[#342C32] text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-[#F7DDE3] hover:border-[#C94F78] transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
                >
                  <Sparkles className="w-4 h-4 text-[#C94F78]" />
                  <span>Let's Work Together</span>
                </Link>
              </motion.div>

              {/* Highlights Pill Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 mt-12 pt-8 border-t border-[#C9A45C]/20 w-full"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-[#342C32]/75">
                  <CheckCircle2 className="w-4 h-4 text-[#C94F78]" />
                  <span>Bespoke Digital Solutions</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#342C32]/75">
                  <CheckCircle2 className="w-4 h-4 text-[#5D9FBE]" />
                  <span>High-Performance Architecture</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#342C32]/75">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
                  <span>100% Client Satisfaction</span>
                </div>
              </motion.div>
            </div>

            {/* Hero Right Brand Showcase Card */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="relative"
              >
                <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#FFF9F6] via-[#F7DDE3]/60 to-[#DDF3FC]/70 p-4 border border-[#C9A45C]/30 shadow-2xl flex items-center justify-center group">
                  <BrandLogo size="hero" customUrl={settings.customLogoUrl} withGlow />

                  {/* Floating Micro Badges */}
                  <motion.div
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-3 -right-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#C9A45C]/30 shadow-lg flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-[#C9A45C]" />
                    <span className="text-[11px] font-bold text-[#342C32] uppercase tracking-wider">
                      Ideas • Innovation
                    </span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [6, -6, 6] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute -bottom-3 -left-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#C9A45C]/30 shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-[#C94F78]" />
                    <span className="text-[11px] font-bold text-[#342C32] uppercase tracking-wider">
                      Impact Driven
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BRAND INTRODUCTION PREVIEW SECTION                                     */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-white border-y border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
                <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                  The Mirai Studio Story
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight leading-tight mb-6">
                {settings.aboutTitle || 'Where Bold Ideas Spark Lasting Impact.'}
              </h2>

              <p className="text-base sm:text-lg text-[#342C32]/85 leading-relaxed mb-6 font-sans">
                {settings.aboutStory ||
                  'Mirai is a multidisciplinary creative studio driven by the pursuit of elegance, technical excellence, and transformative commercial value. We do not just build websites; we architect digital presence.'}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link
                  to="/about"
                  className="px-7 py-3.5 rounded-full bg-[#342C32] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C94F78] transition-all shadow-md flex items-center gap-2.5 group"
                >
                  <span>Explore About Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/projects"
                  className="px-6 py-3.5 rounded-full border border-[#C9A45C]/40 text-[#342C32] text-xs uppercase tracking-widest font-semibold hover:bg-[#FFF9F6] transition-all"
                >
                  <span>Our Portfolio</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#FFF9F6] via-[#F7DDE3]/40 to-[#DDF3FC]/40 border border-[#C9A45C]/30 shadow-xl space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-[#C9A45C]/20">
                  <BrandLogo size="sm" customUrl={settings.customLogoUrl} />
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#342C32]">Creative Excellence</h3>
                    <p className="text-[11px] text-[#342C32]/60">Engineered with Purpose</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/90 border border-[#C9A45C]/20 shadow-2xs">
                    <span className="font-serif text-3xl font-bold text-[#C94F78] block mb-1">
                      {settings.stats.ideas || '50+'}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#342C32]/70">
                      Ideas Delivered
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/90 border border-[#C9A45C]/20 shadow-2xs">
                    <span className="font-serif text-3xl font-bold text-[#5D9FBE] block mb-1">
                      {settings.stats.projects || '6+'}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#342C32]/70">
                      Curated Works
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/90 border border-[#C9A45C]/20 shadow-2xs">
                    <span className="font-serif text-3xl font-bold text-[#C9A45C] block mb-1">
                      {settings.stats.commitment || '100%'}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#342C32]/70">
                      Commitment
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/90 border border-[#C9A45C]/20 shadow-2xs">
                    <span className="font-serif text-3xl font-bold text-[#342C32] block mb-1">
                      {settings.stats.support || '24/7'}
                    </span>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#342C32]/70">
                      Dedicated SLA
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SHORT SERVICES PREVIEW SECTION                                         */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-mesh-luxury">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
                <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                  Core Capabilities
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight">
                Services Preview
              </h2>
            </div>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#C9A45C]/30 text-xs font-bold uppercase tracking-widest text-[#342C32] hover:text-[#C94F78] hover:border-[#C94F78] transition-all shadow-xs self-start md:self-auto group"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Top 3 Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
            {previewServices.map((service) => (
              <div
                key={service.id}
                className="p-8 rounded-[30px] bg-white/85 backdrop-blur-sm border border-[#C9A45C]/25 hover:border-[#C9A45C] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-bold text-[#C9A45C]">
                      {service.number}
                    </span>
                    <div className="w-11 h-11 rounded-2xl bg-[#F7DDE3] flex items-center justify-center text-[#C94F78] group-hover:bg-[#C9A45C]/20 transition-colors">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-[#342C32] group-hover:text-[#C94F78] transition-colors mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#342C32]/75 leading-relaxed line-clamp-3 mb-6">
                    {service.description}
                  </p>
                </div>

                <Link
                  to="/services"
                  className="pt-4 border-t border-[#C9A45C]/15 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#C9A45C] group-hover:text-[#C94F78] transition-colors"
                >
                  <span>Explore In Services</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C94F78] hover:text-[#342C32] transition-colors"
            >
              <span>Explore All 6 Full Digital Capabilities & Deliverables</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3.5. OUR PACKAGES PRICING PREVIEW SECTION                                  */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-[#FFF9F6] via-white to-[#FFF9F6] border-y border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
                <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                  Transparent Investment
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight">
                Our Packages
              </h2>
              <p className="text-sm sm:text-base text-[#342C32]/75 font-sans mt-2 max-w-xl">
                Simple, transparent pricing tailored for startups, growing studios, and established businesses.
              </p>
            </div>

            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C9A45C] transition-all shadow-md self-start md:self-auto group"
            >
              <span>View Full Pricing & Comparison</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-10">
            
            {/* 1. BASIC CARD */}
            <div className="p-8 sm:p-9 rounded-[32px] bg-white border border-[#C9A45C]/25 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#5D9FBE] px-3 py-1 rounded-full bg-[#DDF3FC]">
                    Starter Solution
                  </span>
                  <span className="text-xs text-[#342C32]/50 font-sans">5–7 Days</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#342C32] mb-1">
                  BASIC
                </h3>
                <p className="text-xs text-[#342C32]/60 font-sans mb-6">
                  Essential online presence for small businesses & professionals.
                </p>

                {/* Price */}
                <div className="pb-6 mb-6 border-b border-[#C9A45C]/20">
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#342C32]">
                    ₹3,500 – ₹5,000
                  </div>
                  <span className="text-xs text-[#342C32]/60 font-sans block mt-1">
                    One-time investment
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A45C] block">
                    Includes:
                  </span>
                  {[
                    'Home',
                    'About',
                    'Services',
                    'Gallery',
                    'Contact',
                    'WhatsApp Integration',
                    'Responsive Design',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#342C32]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#5D9FBE] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/pricing"
                className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#342C32] bg-[#FFF9F6] border border-[#C9A45C]/30 hover:bg-[#342C32] hover:text-white transition-all flex items-center justify-center gap-2 group-hover:border-[#342C32]"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 2. PROFESSIONAL CARD (MOST POPULAR) */}
            <div className="p-8 sm:p-9 rounded-[32px] bg-white border-2 border-[#C94F78] shadow-2xl scale-102 lg:-translate-y-2 flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" />
                <span>Most Popular</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C94F78] px-3 py-1 rounded-full bg-[#F7DDE3]">
                    Growth Package
                  </span>
                  <span className="text-xs text-[#342C32]/50 font-sans">7–10 Days</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#342C32] mb-1">
                  PROFESSIONAL
                </h3>
                <p className="text-xs text-[#342C32]/60 font-sans mb-6">
                  Conversion-focused digital portal for scaling brands & studios.
                </p>

                {/* Price */}
                <div className="pb-6 mb-6 border-b border-[#C9A45C]/20">
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#342C32]">
                    ₹6,000 – ₹8,000
                  </div>
                  <span className="text-xs text-[#C94F78] font-bold font-sans block mt-1">
                    High Conversion Suite
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C94F78] block">
                    Includes:
                  </span>
                  {[
                    'All Basic Features',
                    'Booking / Enquiry',
                    'Testimonials',
                    'Before / After Gallery',
                    'Responsive Design',
                    'Modern UI/UX',
                    'Better customization',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#342C32]/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#C94F78] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/pricing"
                className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 3. PREMIUM CARD (LAUNCH OFFER) */}
            <div className="p-8 sm:p-9 rounded-[32px] bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F6] to-white border-2 border-[#C9A45C] shadow-xl flex flex-col justify-between relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#C9A45C] text-[#342C32] text-[10px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Launch Offer</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A45C] px-3 py-1 rounded-full bg-[#E8D3A3]/40">
                    Dynamic Application
                  </span>
                  <span className="text-xs text-[#342C32]/50 font-sans">7–10 Days</span>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#342C32] mb-1">
                  PREMIUM
                </h3>
                <p className="text-xs text-[#342C32]/60 font-sans mb-4">
                  Complete dynamic platform with Database & Admin Dashboard.
                </p>

                {/* Price & Offer Breakdown */}
                <div className="p-3.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 mb-6 space-y-1 text-xs">
                  <div className="flex justify-between text-[#342C32]/80">
                    <span>Website Development:</span>
                    <span className="font-bold">₹7,000</span>
                  </div>
                  <div className="flex justify-between text-[#342C32]/80">
                    <span>Domain (1 Year Included):</span>
                    <span className="font-bold text-[#5D9FBE]">₹800</span>
                  </div>
                  <div className="pt-2 border-t border-[#C9A45C]/20 flex justify-between items-baseline">
                    <span className="font-bold text-xs uppercase text-[#342C32]">Total All-Inclusive:</span>
                    <span className="font-serif text-2xl font-extrabold text-[#C9A45C]">₹7,800</span>
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A45C] block">
                    Includes:
                  </span>
                  {[
                    'All Professional Features',
                    'Database Integration',
                    'Admin Panel',
                    'Booking Management',
                    'Dynamic Content Management',
                    '1 Year Domain Included',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#342C32]/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Link
                  to="/contact"
                  className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-[#342C32] hover:bg-[#C9A45C] shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Choose Premium</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="w-full py-2 text-center text-[11px] font-bold uppercase tracking-wider text-[#342C32]/60 hover:text-[#C94F78] transition-colors block"
                >
                  Compare All Features →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FEATURED PROJECTS PREVIEW SECTION                                      */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
                <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                  Selected Work
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight">
                Featured Projects
              </h2>
            </div>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C9A45C] transition-all shadow-md self-start md:self-auto group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* 3 Featured Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {displayProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group rounded-[30px] overflow-hidden bg-[#FFF9F6] border border-[#C9A45C]/25 shadow-xs hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7DDE3]/30">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#342C32]/85 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 text-[#C94F78] backdrop-blur-xs shadow-xs">
                    {project.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#342C32] group-hover:text-[#C94F78] transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#342C32]/75 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#C9A45C]/15 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#C9A45C] group-hover:text-[#C94F78]">
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#5D9FBE] hover:text-[#342C32] transition-colors"
            >
              <span>Explore Complete Portfolio with Categories & Filters</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SHORT WHY-US PREVIEW SECTION                                           */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-mesh-luxury border-t border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
                <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                  The Mirai Standard
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight mb-6">
                Why Visionary Brands Choose Mirai Studio
              </h2>

              <p className="text-base text-[#342C32]/80 leading-relaxed mb-8">
                We combine visionary creative intuition with rigorous architectural engineering. Every deliverable is designed to look magnificent, load instantaneously, and drive measurable commercial growth.
              </p>

              <Link
                to="/why-us"
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:opacity-95 transition-all inline-flex items-center gap-2.5 group"
              >
                <span>Why Choose Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-white/90 border border-[#E8B8C4] shadow-xs">
                <Sparkles className="w-6 h-6 text-[#C94F78] mb-3" />
                <h4 className="font-serif text-base font-bold text-[#342C32] mb-1">Creative Thinking</h4>
                <p className="text-xs text-[#342C32]/70">Unconventional ideas tailored to elevate brand authority.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/90 border border-[#A9DDF2] shadow-xs">
                <Cpu className="w-6 h-6 text-[#5D9FBE] mb-3" />
                <h4 className="font-serif text-base font-bold text-[#342C32] mb-1">Modern Technology</h4>
                <p className="text-xs text-[#342C32]/70">Engineered with ultra-fast modern frameworks & cloud resilience.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/90 border border-[#C9A45C] shadow-xs">
                <Award className="w-6 h-6 text-[#C9A45C] mb-3" />
                <h4 className="font-serif text-base font-bold text-[#342C32] mb-1">Premium Design</h4>
                <p className="text-xs text-[#342C32]/70">Sensory aesthetics, refined typography, and artistic flair.</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/90 border border-[#C94F78] shadow-xs">
                <Globe className="w-6 h-6 text-[#C94F78] mb-3" />
                <h4 className="font-serif text-base font-bold text-[#342C32] mb-1">Fast Delivery</h4>
                <p className="text-xs text-[#342C32]/70">Agile sprints with transparent milestones and high launch velocity.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FINAL CTA BANNER                                                       */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 relative overflow-hidden bg-gradient-to-br from-[#342C32] via-[#2A2328] to-[#1E191C] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <BrandLogo size="md" customUrl={settings.customLogoUrl} className="mx-auto mb-6" withGlow />
          
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to Build Something Extraordinary?
          </h2>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 font-sans">
            Let us turn your ideas into innovative digital solutions that create lasting impact.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all text-center"
            >
              <span>Explore Services</span>
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
