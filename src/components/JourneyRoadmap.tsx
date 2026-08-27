import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  MessageSquare,
  Layout,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Rocket,
  Heart,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Play,
  Pause,
  Laptop,
  Check,
  ExternalLink,
  Zap,
  Globe,
  Award,
} from 'lucide-react';

export interface JourneyStep {
  id: number;
  number: string;
  stageTitle: string;
  tagline: string;
  heading: string;
  desc: string;
  milestone: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  bgGlow: string;
  pillColor: string;
  visualType: 'phone' | 'chat' | 'demo' | 'approval' | 'dev' | 'testing' | 'delivery' | 'support';
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 1,
    number: '01',
    stageTitle: 'COLD CALL',
    tagline: 'Step 1 • Initial Spark',
    heading: 'The Discovery Call',
    desc: 'We start with a friendly, zero-pressure phone call or meeting to understand your business goals, target audience, and digital ambitions.',
    milestone: 'Day 0 • Direct Connection & Vision Shared',
    icon: PhoneCall,
    accentColor: '#C94F78',
    bgGlow: 'rgba(201, 79, 120, 0.15)',
    pillColor: 'bg-[#F7DDE3] text-[#C94F78]',
    visualType: 'phone',
  },
  {
    id: 2,
    number: '02',
    stageTitle: 'UNDERSTAND YOUR BUSINESS',
    tagline: 'Step 2 • Strategic Clarity',
    heading: 'Deep Business & Brand Architecture',
    desc: 'We map out your business models, customer journey, content hierarchy, and visual aesthetic to craft a tailored blueprint.',
    milestone: 'Day 1 • Business Model & Feature Map Finalized',
    icon: MessageSquare,
    accentColor: '#5D9FBE',
    bgGlow: 'rgba(93, 159, 190, 0.15)',
    pillColor: 'bg-[#DDF3FC] text-[#5D9FBE]',
    visualType: 'chat',
  },
  {
    id: 3,
    number: '03',
    stageTitle: 'FREE DEMO WEBSITE',
    tagline: 'Step 3 • Visual Guarantee',
    heading: 'See Your Website Before We Build It',
    desc: 'We build an actual interactive preview demo website based on your idea before starting the actual development — so you know exactly what you are getting.',
    milestone: 'Day 2 • Interactive Working Demo Delivered',
    icon: Layout,
    accentColor: '#C9A45C',
    bgGlow: 'rgba(201, 164, 92, 0.18)',
    pillColor: 'bg-[#E8D3A3]/40 text-[#342C32]',
    visualType: 'demo',
  },
  {
    id: 4,
    number: '04',
    stageTitle: 'YOUR APPROVAL',
    tagline: 'Step 4 • Confident Alignment',
    heading: 'Feedback & Mutual Greenlight',
    desc: 'You experience the live demo, share your design adjustments, and give approval with 100% confidence before any full development kicks off.',
    milestone: 'Milestone Signed Off • Zero Uncertainty',
    icon: CheckCircle2,
    accentColor: '#C9A45C',
    bgGlow: 'rgba(201, 164, 92, 0.22)',
    pillColor: 'bg-[#E8D3A3]/40 text-[#C9A45C]',
    visualType: 'approval',
  },
  {
    id: 5,
    number: '05',
    stageTitle: 'DEVELOPMENT',
    tagline: 'Step 5 • Precision Craft',
    heading: 'High-Performance Engineering',
    desc: 'We build your full digital solution using ultra-modern frameworks, responsive mobile-first architectures, dynamic databases, and sensory motion interactions.',
    milestone: 'Days 3–6 • Production-Ready Full Stack Build',
    icon: Code2,
    accentColor: '#C94F78',
    bgGlow: 'rgba(201, 79, 120, 0.15)',
    pillColor: 'bg-[#F7DDE3] text-[#C94F78]',
    visualType: 'dev',
  },
  {
    id: 6,
    number: '06',
    stageTitle: 'TESTING & REFINEMENT',
    tagline: 'Step 6 • Quality Assurance',
    heading: 'Multi-Device QA & Security Pass',
    desc: 'Exhaustive testing across iPhones, iPads, Androids, and desktops with 100% SEO index checks, sub-second load optimizations, and form encryption verification.',
    milestone: 'Day 7 • 100% Cross-Browser & Mobile Pass',
    icon: ShieldCheck,
    accentColor: '#5D9FBE',
    bgGlow: 'rgba(93, 159, 190, 0.15)',
    pillColor: 'bg-[#DDF3FC] text-[#5D9FBE]',
    visualType: 'testing',
  },
  {
    id: 7,
    number: '07',
    stageTitle: 'WEBSITE DELIVERY',
    tagline: 'Step 7 • The Grand Launch',
    heading: 'Live Deployment & Domain Setup',
    desc: 'Your website launches onto the live web with custom 1-year domain, SSL encryption certificate, and complete ownership handover of all credentials and code.',
    milestone: 'Days 7–10 • Live Production Website Active',
    icon: Rocket,
    accentColor: '#C94F78',
    bgGlow: 'rgba(201, 79, 120, 0.2)',
    pillColor: 'bg-[#F7DDE3] text-[#C94F78]',
    visualType: 'delivery',
  },
  {
    id: 8,
    number: '08',
    stageTitle: 'SUPPORT & MAINTENANCE',
    tagline: 'Step 8 • Enduring Care',
    heading: '24/7 Reliability & Growth SLA',
    desc: 'We stand by you after launch with ongoing security patches, speed audits, content guidance, and prompt technical support for lasting peace of mind.',
    milestone: 'Lifelong Peace of Mind & Dedicated SLA',
    icon: Heart,
    accentColor: '#C9A45C',
    bgGlow: 'rgba(201, 164, 92, 0.2)',
    pillColor: 'bg-[#E8D3A3]/40 text-[#C9A45C]',
    visualType: 'support',
  },
];

export const JourneyRoadmap: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const currentStep = JOURNEY_STEPS[activeStepIndex];
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    autoPlayTimerRef.current = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length);
    }, 4500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying]);

  const handleNext = () => {
    setActiveStepIndex((prev) => (prev + 1) % JOURNEY_STEPS.length);
  };

  const handlePrev = () => {
    setActiveStepIndex((prev) => (prev - 1 + JOURNEY_STEPS.length) % JOURNEY_STEPS.length);
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-[#FFF9F6] to-white border-y border-[#C9A45C]/20 select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-[-100px] w-[500px] h-[500px] bg-[#F7DDE3]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-100px] w-[500px] h-[500px] bg-[#DDF3FC]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#E8D3A3]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                            */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3.5 mb-3.5"
          >
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
              Interactive 3D Journey
            </span>
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight leading-tight mb-4"
          >
            From First Call to Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C]">
              Live Website
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#342C32]/75 font-sans leading-relaxed"
          >
            Travel across our structured 8-stage transformation roadmap. Experience how we transition your raw vision into a high-converting digital platform.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* THE BIG VISUAL HIGHLIGHT: "SEE YOUR WEBSITE BEFORE WE BUILD IT"          */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-14 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#342C32] via-[#2D232A] to-[#1F191D] border-2 border-[#C9A45C]/40 shadow-2xl relative overflow-hidden text-white"
        >
          {/* Subtle Glow Spheres inside banner */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#C9A45C]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-[#C94F78]/25 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="flex items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#C94F78] to-[#C9A45C] flex items-center justify-center text-white shrink-0 shadow-lg ring-4 ring-white/10">
                <Sparkles className="w-7 h-7 animate-pulse" />
              </div>

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#C9A45C] text-[#342C32] text-[10px] font-extrabold uppercase tracking-widest mb-1.5 shadow-xs">
                  <span>Our Signature Guarantee</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  “See Your Website Before We Build It.”
                </h3>
                <p className="text-xs sm:text-sm text-white/80 font-sans mt-1 max-w-2xl leading-relaxed">
                  We create a working demo website based on your idea before starting the actual development — so you know exactly what you're getting with zero financial ambiguity.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => {
                  setActiveStepIndex(2); // Jump to Step 3: Free Demo Website
                  setIsPlaying(false);
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white text-[#342C32] text-xs font-bold uppercase tracking-widest hover:bg-[#C9A45C] hover:text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Preview Demo Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link
                to="/contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Free Demo</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ========================================================================= */}
        {/* HORIZONTAL 3D ROAD / STEP TRACKER STRIP                                   */}
        {/* ========================================================================= */}
        <div className="relative mb-10">
          {/* Top Stage Control Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#342C32]">
                Stage {currentStep.number} of {JOURNEY_STEPS.length.toString().padStart(2, '0')}:
              </span>
              <span className="text-xs font-serif font-bold text-[#C94F78]">
                {currentStep.stageTitle}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-xl bg-white border border-[#C9A45C]/30 text-[#342C32] hover:text-[#C94F78] transition-colors cursor-pointer text-xs flex items-center gap-1.5 shadow-2xs"
                title={isPlaying ? 'Pause Auto-Play' : 'Start Auto-Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline text-[11px] font-semibold">
                  {isPlaying ? 'Auto-Advancing' : 'Paused'}
                </span>
              </button>

              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-white border border-[#C9A45C]/30 text-[#342C32] hover:bg-[#FFF9F6] hover:text-[#C94F78] transition-colors cursor-pointer shadow-2xs"
                title="Previous Stage"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-white border border-[#C9A45C]/30 text-[#342C32] hover:bg-[#FFF9F6] hover:text-[#C94F78] transition-colors cursor-pointer shadow-2xs"
                title="Next Stage"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3D Runway Road Track */}
          <div className="relative rounded-3xl bg-[#342C32] p-4 sm:p-5 shadow-xl border border-[#C9A45C]/30 overflow-x-auto scrollbar-none">
            {/* Center Road Glow Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A45C]/60 to-transparent -translate-y-1/2 pointer-events-none" />

            <div className="flex items-center justify-between min-w-[760px] gap-2 relative z-10">
              {JOURNEY_STEPS.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx === activeStepIndex;
                const isPassed = idx < activeStepIndex;

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStepIndex(idx);
                      setIsPlaying(false);
                    }}
                    className={`flex-1 py-3 px-2 rounded-2xl flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer relative group ${
                      isActive
                        ? 'bg-gradient-to-b from-[#C94F78] to-[#C9A45C] text-white shadow-lg scale-105 ring-2 ring-white/50'
                        : isPassed
                        ? 'bg-white/15 text-white/90 hover:bg-white/25'
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    {/* Top Step Number */}
                    <span className="text-[10px] font-mono font-bold tracking-wider opacity-80">
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isActive
                          ? 'bg-white text-[#342C32] shadow-sm'
                          : isPassed
                          ? 'bg-[#C9A45C]/30 text-[#C9A45C]'
                          : 'bg-white/10 text-white/70'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Short Title */}
                    <span className="text-[9px] font-bold uppercase tracking-tight text-center truncate max-w-[80px]">
                      {step.stageTitle.split(' ')[0]}
                    </span>

                    {/* Active pulse pip */}
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* ACTIVE STAGE 3D SHOWCASE DISPLAY                                          */}
        {/* ========================================================================= */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep.id}
              initial={{ opacity: 0, y: 25, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[36px] bg-white border border-[#C9A45C]/30 shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden"
              style={{
                boxShadow: `0 25px 60px -15px ${currentStep.bgGlow}`,
              }}
            >
              {/* Top Accent Strip */}
              <div
                className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#C94F78] via-[#C9A45C] to-[#5D9FBE]"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                
                {/* Left Stage Details */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className={`px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-2xs ${currentStep.pillColor}`}>
                      {currentStep.tagline}
                    </span>
                    <span className="text-xs font-mono text-[#342C32]/50 font-bold">
                      STAGE {currentStep.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#342C32] tracking-tight leading-tight">
                    {currentStep.heading}
                  </h3>

                  <p className="text-base sm:text-lg text-[#342C32]/80 font-sans leading-relaxed">
                    {currentStep.desc}
                  </p>

                  {/* Milestone Verified Box */}
                  <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 flex items-center gap-3.5 shadow-2xs">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C94F78] to-[#C9A45C] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5D9FBE] block">
                        Milestone Deliverable
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#342C32]">
                        {currentStep.milestone}
                      </span>
                    </div>
                  </div>

                  {/* Step Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    {currentStep.id < 8 ? (
                      <button
                        onClick={handleNext}
                        className="px-7 py-3.5 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C9A45C] transition-all shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        <span>Next Step ({JOURNEY_STEPS[activeStepIndex + 1].stageTitle})</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <Link
                        to="/contact"
                        className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all shadow-lg flex items-center gap-2"
                      >
                        <span>Start Your Project Journey</span>
                        <Sparkles className="w-4 h-4" />
                      </Link>
                    )}

                    <Link
                      to="/contact"
                      className="px-6 py-3.5 rounded-full border border-[#C9A45C]/40 text-[#342C32] text-xs font-bold uppercase tracking-widest hover:bg-[#FFF9F6] transition-all"
                    >
                      <span>Book A Discovery Call</span>
                    </Link>
                  </div>
                </div>

                {/* Right Interactive 3D Visual Simulation */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-br from-[#FFF9F6] via-[#F7DDE3]/30 to-[#DDF3FC]/40 border border-[#C9A45C]/30 p-6 flex flex-col items-center justify-center relative shadow-inner group overflow-hidden">
                    
                    {/* Visual 1: COLD CALL */}
                    {currentStep.visualType === 'phone' && (
                      <div className="relative flex flex-col items-center">
                        {/* Glowing Rings */}
                        <motion.div
                          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute w-36 h-36 rounded-full border-2 border-[#C94F78] pointer-events-none"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                          className="absolute w-36 h-36 rounded-full border-2 border-[#C9A45C] pointer-events-none"
                        />

                        {/* Floating 3D Phone Mock */}
                        <motion.div
                          animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-28 h-52 rounded-[28px] bg-[#342C32] border-4 border-[#C9A45C]/60 p-2 shadow-2xl flex flex-col justify-between items-center text-white relative z-10"
                        >
                          <div className="w-8 h-1 rounded-full bg-white/40 mt-1" />
                          
                          <div className="text-center my-auto space-y-2">
                            <div className="w-12 h-12 rounded-full bg-[#C94F78] mx-auto flex items-center justify-center text-white shadow-lg animate-bounce">
                              <PhoneCall className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-bold block text-white/90">Incoming Call</span>
                            <span className="text-[9px] text-[#C9A45C] font-mono block">Mirai Discovery</span>
                          </div>

                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-1 shadow-md">
                            <PhoneCall className="w-4 h-4 text-white" />
                          </div>
                        </motion.div>
                      </div>
                    )}

                    {/* Visual 2: UNDERSTAND YOUR BUSINESS */}
                    {currentStep.visualType === 'chat' && (
                      <div className="w-full space-y-3 relative z-10">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4 }}
                          className="p-3.5 rounded-2xl rounded-bl-xs bg-white border border-[#C9A45C]/30 shadow-md text-xs text-[#342C32]"
                        >
                          <span className="text-[9px] font-bold text-[#C94F78] block mb-0.5">Your Business Goal</span>
                          “We need a high-converting website to attract premium clients.”
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          className="p-3.5 rounded-2xl rounded-br-xs bg-[#342C32] text-white shadow-lg text-xs ml-auto max-w-[88%]"
                        >
                          <span className="text-[9px] font-bold text-[#C9A45C] block mb-0.5">Mirai Strategy</span>
                          “Understood! Let's craft an interactive demo website tailored to your brand.”
                        </motion.div>

                        <div className="flex items-center justify-center gap-2 pt-2">
                          <span className="px-2.5 py-1 rounded-full bg-[#DDF3FC] text-[#5D9FBE] text-[10px] font-bold">
                            #BrandPersona
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-[#F7DDE3] text-[#C94F78] text-[10px] font-bold">
                            #ConversionFunnel
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Visual 3: FREE DEMO WEBSITE */}
                    {currentStep.visualType === 'demo' && (
                      <div className="w-full relative z-10 flex flex-col items-center">
                        <motion.div
                          animate={{ y: [-6, 6, -6] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-full rounded-2xl bg-white border-2 border-[#C9A45C] shadow-2xl p-3 overflow-hidden"
                        >
                          {/* Mock Browser Header */}
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C9A45C]/20">
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-red-400" />
                              <div className="w-2 h-2 rounded-full bg-yellow-400" />
                              <div className="w-2 h-2 rounded-full bg-green-400" />
                            </div>
                            <span className="text-[9px] font-mono text-[#342C32]/60 truncate">
                              https://preview.yourbrand.mirai-demo.com
                            </span>
                            <ExternalLink className="w-3 h-3 text-[#C9A45C]" />
                          </div>

                          {/* Mock Preview Content */}
                          <div className="space-y-2 bg-[#FFF9F6] p-3 rounded-xl border border-[#C9A45C]/15">
                            <div className="h-3 w-1/2 bg-[#C94F78]/40 rounded-full" />
                            <div className="h-2 w-3/4 bg-stone-300 rounded-full" />
                            <div className="grid grid-cols-3 gap-1.5 pt-1">
                              <div className="h-8 rounded bg-[#DDF3FC]" />
                              <div className="h-8 rounded bg-[#F7DDE3]" />
                              <div className="h-8 rounded bg-[#E8D3A3]/50" />
                            </div>
                          </div>
                        </motion.div>

                        <div className="mt-3 px-3 py-1 rounded-full bg-[#C9A45C] text-[#342C32] text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>100% Free Interactive Preview</span>
                        </div>
                      </div>
                    )}

                    {/* Visual 4: YOUR APPROVAL */}
                    {currentStep.visualType === 'approval' && (
                      <div className="relative flex flex-col items-center text-center">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#C94F78] via-[#C9A45C] to-[#E8D3A3] p-1 shadow-2xl flex items-center justify-center mb-4 ring-4 ring-[#C9A45C]/30"
                        >
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#C9A45C]">
                            <CheckCircle2 className="w-12 h-12" />
                          </div>
                        </motion.div>

                        <span className="font-serif text-lg font-bold text-[#342C32]">Demo Approved!</span>
                        <p className="text-xs text-[#342C32]/70 max-w-xs mt-1">
                          Zero risk. Development begins only when you are 100% delighted.
                        </p>
                      </div>
                    )}

                    {/* Visual 5: DEVELOPMENT */}
                    {currentStep.visualType === 'dev' && (
                      <div className="w-full space-y-2 relative z-10 font-mono text-[11px]">
                        <motion.div
                          animate={{ y: [-4, 4, -4] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          className="p-3 rounded-2xl bg-[#342C32] text-white shadow-xl border border-white/10"
                        >
                          <div className="flex items-center justify-between text-[9px] text-[#C9A45C] mb-1">
                            <span>App.tsx • Full Stack</span>
                            <span>React 19 + Tailwind</span>
                          </div>
                          <p className="text-pink-400">const <span className="text-yellow-300">Website</span> = () =&gt; &#123;</p>
                          <p className="text-cyan-300 pl-3">return &lt;<span className="text-pink-300">MiraiExperience</span> highPerformance /&gt;</p>
                          <p className="text-pink-400">&#125;;</p>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
                          <div className="p-2 rounded-xl bg-white border border-[#C9A45C]/30 text-[#342C32] font-sans font-bold">
                            ⚡ Sub-Second Load
                          </div>
                          <div className="p-2 rounded-xl bg-white border border-[#C9A45C]/30 text-[#342C32] font-sans font-bold">
                            📱 100% Mobile Fluid
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Visual 6: TESTING & REFINEMENT */}
                    {currentStep.visualType === 'testing' && (
                      <div className="w-full space-y-2.5 relative z-10">
                        <div className="p-3.5 rounded-2xl bg-white border border-[#C9A45C]/30 shadow-md flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-green-600" />
                            <span className="text-xs font-bold text-[#342C32]">Security & SSL Audit</span>
                          </div>
                          <span className="text-[10px] font-bold text-green-600 px-2 py-0.5 bg-green-50 rounded-md">PASS</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white border border-[#C9A45C]/30 shadow-md flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-[#C9A45C]" />
                            <span className="text-xs font-bold text-[#342C32]">Lighthouse Performance</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#C9A45C] px-2 py-0.5 bg-amber-50 rounded-md">99/100</span>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-white border border-[#C9A45C]/30 shadow-md flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-[#5D9FBE]" />
                            <span className="text-xs font-bold text-[#342C32]">Mobile Responsive QA</span>
                          </div>
                          <span className="text-[10px] font-bold text-[#5D9FBE] px-2 py-0.5 bg-sky-50 rounded-md">100%</span>
                        </div>
                      </div>
                    )}

                    {/* Visual 7: WEBSITE DELIVERY */}
                    {currentStep.visualType === 'delivery' && (
                      <div className="relative flex flex-col items-center text-center">
                        <motion.div
                          animate={{ y: [-10, 10, -10] }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#C94F78] to-[#C9A45C] text-white flex items-center justify-center shadow-2xl mb-3"
                        >
                          <Rocket className="w-10 h-10 animate-bounce" />
                        </motion.div>

                        <span className="font-serif text-lg font-bold text-[#342C32]">Live On The Web</span>
                        <span className="text-xs font-mono text-[#5D9FBE] font-bold mt-1">
                          https://yourdomain.com
                        </span>
                        <span className="text-[10px] text-green-600 font-bold mt-1">
                          ✓ SSL Secured • 1 Yr Domain Active
                        </span>
                      </div>
                    )}

                    {/* Visual 8: SUPPORT & MAINTENANCE */}
                    {currentStep.visualType === 'support' && (
                      <div className="relative flex flex-col items-center text-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="w-18 h-18 rounded-full bg-[#F7DDE3] text-[#C94F78] flex items-center justify-center shadow-xl mb-3 border-2 border-[#C94F78]/30"
                        >
                          <Heart className="w-8 h-8 fill-current" />
                        </motion.div>

                        <span className="font-serif text-lg font-bold text-[#342C32]">24/7 Dedicated Care</span>
                        <p className="text-xs text-[#342C32]/70 max-w-xs mt-1">
                          Ongoing monitoring, priority adjustments, and complete security maintenance.
                        </p>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
