import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowRight,
  ArrowUpRight,
  HelpCircle,
  Calculator,
  Layers,
  Award,
  Crown,
  Gift,
  Clock,
  Calendar,
  CreditCard,
  Globe,
  ChevronDown,
  X,
  Minus,
  Check,
  Search,
  Lock,
  Smartphone,
  Headphones,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageTransition } from '../components/PageTransition';
import { PricingTier } from '../types';

interface PricingPageProps {
  pricingTiers: PricingTier[];
  onSelectTier: (tierName: string, model?: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  pricingTiers,
  onSelectTier,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [comparisonView, setComparisonView] = useState<'all' | 'basic' | 'professional' | 'premium'>('all');
  const navigate = useNavigate();

  // Custom Investment Estimator State (in ₹ INR)
  const [calcPages, setCalcPages] = useState<number>(5);
  const [calcDynamicCms, setCalcDynamicCms] = useState<boolean>(true);
  const [calcDomain, setCalcDomain] = useState<boolean>(true);
  const [calcSeo, setCalcSeo] = useState<boolean>(true);
  const [calcSpeed, setCalcSpeed] = useState<'standard' | 'rush'>('standard');

  const basePrice = 3000;
  const pageAddon = Math.max(0, calcPages - 3) * 600;
  const cmsAddon = calcDynamicCms ? 2500 : 0;
  const domainAddon = calcDomain ? 800 : 0;
  const seoAddon = calcSeo ? 1200 : 0;
  const speedAddon = calcSpeed === 'rush' ? 1500 : 0;
  const totalEstimatedCost = basePrice + pageAddon + cmsAddon + domainAddon + seoAddon + speedAddon;

  const handleSelectPackage = (packageName: string, price: string) => {
    onSelectTier(`${packageName} Package (${price})`);
    navigate('/contact');
  };

  const handleBookCustomEstimate = () => {
    const summary = `Custom Package Scope: ${calcPages} Pages, ${calcDynamicCms ? 'Admin CMS + DB, ' : ''}${calcDomain ? '1 Yr Domain, ' : ''}${calcSeo ? 'Full SEO, ' : ''}${calcSpeed === 'rush' ? 'Rush 5-Day Launch, ' : ''}Estimated ~ ₹${totalEstimatedCost.toLocaleString('en-IN')}`;
    onSelectTier(summary);
    navigate('/contact');
  };

  // Comparison Matrix Rows
  const comparisonRows = [
    { name: 'Home Page', basic: true, pro: true, premium: true, category: 'Core Pages' },
    { name: 'About Us Page', basic: true, pro: true, premium: true, category: 'Core Pages' },
    { name: 'Services Showcase', basic: true, pro: true, premium: true, category: 'Core Pages' },
    { name: 'Photo & Work Gallery', basic: true, pro: true, premium: true, category: 'Content' },
    { name: 'Contact Form', basic: true, pro: true, premium: true, category: 'Conversion' },
    { name: 'WhatsApp Direct Integration', basic: true, pro: true, premium: true, category: 'Conversion' },
    { name: '100% Mobile & Tablet Responsive', basic: true, pro: true, premium: true, category: 'Design' },
    { name: 'Interactive Booking / Enquiry Form', basic: false, pro: true, premium: true, category: 'Conversion' },
    { name: 'Client Testimonials & Ratings', basic: false, pro: true, premium: true, category: 'Content' },
    { name: 'Before / After Comparison Showcase', basic: false, pro: true, premium: true, category: 'Content' },
    { name: 'Modern Luxury Custom UI/UX', basic: 'Standard', pro: 'Bespoke', premium: 'VIP Luxury', category: 'Design' },
    { name: 'Cloud Database Integration', basic: false, pro: false, premium: true, category: 'Architecture' },
    { name: 'Executive Admin Panel Dashboard', basic: false, pro: false, premium: true, category: 'Management' },
    { name: 'Real-Time Booking & Lead Management', basic: false, pro: false, premium: true, category: 'Management' },
    { name: 'Dynamic Content Editing (CMS)', basic: false, pro: false, premium: true, category: 'Management' },
    { name: 'Domain Name Included (1 Year)', basic: false, pro: false, premium: '1 Year Included (₹800 value)', category: 'Hosting' },
    { name: 'Delivery Timeline', basic: '5–7 Days', pro: '7–10 Days', premium: '7–10 Days', category: 'Timeline' },
  ];

  const commonBenefits = [
    {
      icon: Search,
      title: 'SEO-Friendly Structure',
      description: 'Clean semantic HTML markup, fast meta tags, and open graph schemas built for Google indexability.',
      color: 'text-[#C94F78]',
      bg: 'bg-[#F7DDE3]',
    },
    {
      icon: Zap,
      title: 'Fast Performance',
      description: 'Ultra-lightweight rendering, optimized vector assets, and sub-second load times across devices.',
      color: 'text-[#5D9FBE]',
      bg: 'bg-[#DDF3FC]',
    },
    {
      icon: Sparkles,
      title: 'Modern UI/UX',
      description: 'Sophisticated typography, high-contrast aesthetics, and smooth fluid micro-interactions.',
      color: 'text-[#C9A45C]',
      bg: 'bg-[#E8D3A3]/30',
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'Adaptive fluid layouts engineered pixel-perfect across iPhones, iPads, Androids, and desktops.',
      color: 'text-[#C94F78]',
      bg: 'bg-[#F7DDE3]',
    },
    {
      icon: Lock,
      title: 'Secure Implementation',
      description: 'Protected forms, secure input sanitization, spam prevention, and encrypted communication.',
      color: 'text-[#5D9FBE]',
      bg: 'bg-[#DDF3FC]',
    },
    {
      icon: Headphones,
      title: 'Reliable Support',
      description: 'Dedicated post-launch handover, walkthrough guidance, and prompt technical support.',
      color: 'text-[#C9A45C]',
      bg: 'bg-[#E8D3A3]/30',
    },
  ];

  const faqs = [
    {
      q: 'What is included in the Launch Offer for ₹7,800?',
      a: 'The Launch Offer includes complete full-stack website development (₹7,000) PLUS your 1st year domain registration (₹800 value), giving you a dynamic site with database storage and an admin panel at an all-inclusive price of ₹7,800.',
    },
    {
      q: 'How does the 50% / 50% payment structure work?',
      a: 'Development begins immediately upon receiving the 50% advance (₹3,900 for the Launch Offer package). The remaining 50% is due only after the website is completed, reviewed, and approved by you before final launch.',
    },
    {
      q: 'What happens to the domain renewal after the 1st year?',
      a: 'The ₹800 domain charge covers your complete first year. From the second year onwards, standard domain renewal charges are paid directly by the client at standard registrar rates (approx. ₹800–₹1,000/year).',
    },
    {
      q: 'Can I add extra custom pages or features later?',
      a: 'Yes, absolutely! Our architecture is fully modular. You can easily expand your website, add new pages, integrate payment gateways, or scale up features at any time.',
    },
    {
      q: 'Do I get full ownership of my website and code?',
      a: 'Yes, 100%. Once final payment is made, full ownership of the website, code, media assets, and admin credentials belong entirely to you.',
    },
  ];

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* 1. HERO SECTION & BREADCRUMBS                                             */}
      {/* ========================================================================= */}
      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden bg-mesh-luxury border-b border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'Pricing & Packages' }]} className="mb-6" />

          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3.5 mb-4"
            >
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Transparent Packages
              </span>
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#342C32] tracking-tight leading-tight mb-6"
            >
              Choose the Right Website{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C]">
                for Your Business.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-[#342C32]/80 leading-relaxed font-sans max-w-2xl mx-auto"
            >
              From a simple business website to a complete dynamic platform, choose the package that fits your goals.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THREE COMPLETE PRICING CARDS                                           */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 bg-[#FFF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            
            {/* CARD 1: BASIC */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[36px] p-8 sm:p-9 bg-white border border-[#C9A45C]/30 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#5D9FBE] px-3.5 py-1 rounded-full bg-[#DDF3FC]">
                    Starter Website
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#342C32]/60 font-sans font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#5D9FBE]" />
                    <span>5–7 Days</span>
                  </div>
                </div>

                <h3 className="font-serif text-3xl font-bold text-[#342C32] mb-1">
                  BASIC
                </h3>
                <p className="text-xs text-[#342C32]/65 font-sans mb-6">
                  Essential online presence for small businesses & solo professionals.
                </p>

                {/* Price Display */}
                <div className="pb-6 mb-6 border-b border-[#C9A45C]/20">
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#342C32]">
                    ₹3,500 – ₹5,000
                  </div>
                  <span className="text-xs text-[#342C32]/60 font-sans block mt-1">
                    One-time fixed development fee
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A45C] block">
                    What's Included:
                  </span>
                  {[
                    'Home Page',
                    'About Us Section',
                    'Services Showcase',
                    'Gallery Section',
                    'Contact Form',
                    'WhatsApp Integration',
                    '100% Responsive Design',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#342C32]/85 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#5D9FBE] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectPackage('Basic', '₹3,500 – ₹5,000')}
                className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-[#342C32] bg-[#FFF9F6] border border-[#C9A45C]/40 hover:bg-[#342C32] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>View Details & Enquire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* CARD 2: PROFESSIONAL (MOST POPULAR) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-[36px] p-8 sm:p-9 bg-white border-2 border-[#C94F78] shadow-2xl scale-102 lg:-translate-y-2 flex flex-col justify-between relative"
            >
              {/* Most Popular Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" />
                <span>Most Popular</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C94F78] px-3.5 py-1 rounded-full bg-[#F7DDE3]">
                    Growth Solution
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#342C32]/60 font-sans font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#C94F78]" />
                    <span>7–10 Days</span>
                  </div>
                </div>

                <h3 className="font-serif text-3xl font-bold text-[#342C32] mb-1">
                  PROFESSIONAL
                </h3>
                <p className="text-xs text-[#342C32]/65 font-sans mb-6">
                  High-converting digital experience designed to turn visitors into booked clients.
                </p>

                {/* Price Display */}
                <div className="pb-6 mb-6 border-b border-[#C9A45C]/20">
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#342C32]">
                    ₹6,000 – ₹8,000
                  </div>
                  <span className="text-xs text-[#C94F78] font-bold font-sans block mt-1">
                    Best Value for Growing Businesses
                  </span>
                </div>

                {/* Checklist */}
                <div className="space-y-3 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C94F78] block">
                    What's Included:
                  </span>
                  {[
                    'All Basic Features Included',
                    'Interactive Booking / Enquiry Form',
                    'Client Testimonials & Reviews',
                    'Before / After Gallery Showcase',
                    'Responsive Mobile-First Architecture',
                    'Modern Luxury UI/UX Design',
                    'Enhanced Visual Customization',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#342C32]/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#C94F78] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectPackage('Professional', '₹6,000 – ₹8,000')}
                className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View Details & Enquire</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* CARD 3: PREMIUM (LAUNCH OFFER) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-[36px] p-8 sm:p-9 bg-gradient-to-b from-[#FFFDF9] via-[#FFF9F6] to-white border-2 border-[#C9A45C] shadow-xl flex flex-col justify-between relative"
            >
              {/* Launch Offer Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-[#C9A45C] text-[#342C32] text-[10px] font-extrabold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Launch Offer</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4 mt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A45C] px-3.5 py-1 rounded-full bg-[#E8D3A3]/40">
                    Dynamic Application
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#342C32]/60 font-sans font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>7–10 Days</span>
                  </div>
                </div>

                <h3 className="font-serif text-3xl font-bold text-[#342C32] mb-1">
                  PREMIUM
                </h3>
                <p className="text-xs text-[#342C32]/65 font-sans mb-4">
                  Complete dynamic platform with Database & CMS Admin Dashboard.
                </p>

                {/* Price & Offer Breakdown Box */}
                <div className="p-4 rounded-2xl bg-white border border-[#C9A45C]/35 shadow-xs mb-6 space-y-1.5 text-xs">
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
                    What's Included:
                  </span>
                  {[
                    'All Professional Features Included',
                    'Cloud Database Integration',
                    'Custom Executive Admin Panel',
                    'Real-Time Booking Management',
                    'Dynamic Content Management (CMS)',
                    '1 Year Domain Included',
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-[#342C32]/90 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#C9A45C] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleSelectPackage('Premium Launch Offer', '₹7,800')}
                className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-[#342C32] hover:bg-[#C9A45C] shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Choose Premium Launch Offer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. DETAILED PRICING COMPARISON TABLE (RESPONSIVE)                         */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-t border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3.5 mb-3.5">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#C94F78] uppercase font-sans">
                Side-by-Side Matrix
              </span>
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#342C32] tracking-tight mb-3">
              Package Feature Comparison
            </h2>
            <p className="text-sm text-[#342C32]/70 font-sans">
              Review every deliverable, technical capability, and inclusion across all tiers.
            </p>

            {/* Mobile Package Filter Tabs */}
            <div className="flex lg:hidden items-center justify-center gap-2 mt-6 p-1 rounded-full bg-[#FFF9F6] border border-[#C9A45C]/30 max-w-xs mx-auto">
              <button
                onClick={() => setComparisonView('all')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase cursor-pointer ${
                  comparisonView === 'all' ? 'bg-[#342C32] text-white' : 'text-[#342C32]/70'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setComparisonView('basic')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase cursor-pointer ${
                  comparisonView === 'basic' ? 'bg-[#5D9FBE] text-white' : 'text-[#342C32]/70'
                }`}
              >
                Basic
              </button>
              <button
                onClick={() => setComparisonView('professional')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase cursor-pointer ${
                  comparisonView === 'professional' ? 'bg-[#C94F78] text-white' : 'text-[#342C32]/70'
                }`}
              >
                Pro
              </button>
              <button
                onClick={() => setComparisonView('premium')}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase cursor-pointer ${
                  comparisonView === 'premium' ? 'bg-[#C9A45C] text-[#342C32]' : 'text-[#342C32]/70'
                }`}
              >
                Premium
              </button>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden lg:block overflow-hidden rounded-3xl border border-[#C9A45C]/30 shadow-lg bg-[#FFF9F6]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#C9A45C]/25 bg-white">
                  <th className="p-6 text-sm font-bold uppercase tracking-wider text-[#342C32] w-2/5">
                    Feature & Capability
                  </th>
                  <th className="p-6 text-center text-sm font-bold text-[#342C32] w-1/5 bg-[#FFF9F6]/50">
                    <span className="block font-serif text-lg font-bold">BASIC</span>
                    <span className="text-xs text-[#5D9FBE] font-sans font-semibold">₹3,500 – ₹5,000</span>
                  </th>
                  <th className="p-6 text-center text-sm font-bold text-[#342C32] w-1/5 bg-[#F7DDE3]/30 border-x border-[#C94F78]/30">
                    <span className="block font-serif text-lg font-bold text-[#C94F78]">PROFESSIONAL</span>
                    <span className="text-xs text-[#C94F78] font-sans font-bold">₹6,000 – ₹8,000</span>
                  </th>
                  <th className="p-6 text-center text-sm font-bold text-[#342C32] w-1/5 bg-[#E8D3A3]/20">
                    <span className="block font-serif text-lg font-bold text-[#C9A45C]">PREMIUM</span>
                    <span className="text-xs text-[#C9A45C] font-sans font-extrabold">₹7,800 (Offer)</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A45C]/15 text-xs font-sans">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/60 transition-colors">
                    <td className="p-4 sm:px-6 font-semibold text-[#342C32]">
                      <span>{row.name}</span>
                    </td>

                    {/* Basic Column */}
                    <td className="p-4 text-center">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? (
                          <CheckCircle2 className="w-4 h-4 text-[#5D9FBE] mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-stone-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-semibold text-[#342C32]/80">{row.basic}</span>
                      )}
                    </td>

                    {/* Professional Column */}
                    <td className="p-4 text-center bg-[#F7DDE3]/15 border-x border-[#C94F78]/20">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <CheckCircle2 className="w-4 h-4 text-[#C94F78] mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-stone-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-[#C94F78]">{row.pro}</span>
                      )}
                    </td>

                    {/* Premium Column */}
                    <td className="p-4 text-center bg-[#E8D3A3]/10">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <CheckCircle2 className="w-4 h-4 text-[#C9A45C] mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-stone-300 mx-auto" />
                        )
                      ) : (
                        <span className="font-bold text-[#C9A45C]">{row.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Comparison Cards (No horizontal overflow) */}
          <div className="lg:hidden space-y-4">
            {comparisonRows.map((row, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25 shadow-2xs space-y-3"
              >
                <div className="font-serif text-sm font-bold text-[#342C32] border-b border-[#C9A45C]/15 pb-2 flex items-center justify-between">
                  <span>{row.name}</span>
                  <span className="text-[9px] uppercase font-sans font-bold text-[#C9A45C] px-2 py-0.5 rounded-full bg-white">
                    {row.category}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {/* Basic */}
                  {(comparisonView === 'all' || comparisonView === 'basic') && (
                    <div className="p-2.5 rounded-xl bg-white border border-[#C9A45C]/15">
                      <span className="text-[10px] text-[#5D9FBE] font-bold block mb-1">Basic</span>
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? (
                          <CheckCircle2 className="w-4 h-4 text-[#5D9FBE] mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-stone-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-[11px] font-semibold">{row.basic}</span>
                      )}
                    </div>
                  )}

                  {/* Pro */}
                  {(comparisonView === 'all' || comparisonView === 'professional') && (
                    <div className="p-2.5 rounded-xl bg-[#F7DDE3]/50 border border-[#C94F78]/30">
                      <span className="text-[10px] text-[#C94F78] font-bold block mb-1">Pro</span>
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? (
                          <CheckCircle2 className="w-4 h-4 text-[#C94F78] mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-stone-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-[11px] font-bold text-[#C94F78]">{row.pro}</span>
                      )}
                    </div>
                  )}

                  {/* Premium */}
                  {(comparisonView === 'all' || comparisonView === 'premium') && (
                    <div className="p-2.5 rounded-xl bg-[#E8D3A3]/30 border border-[#C9A45C]/40">
                      <span className="text-[10px] text-[#C9A45C] font-extrabold block mb-1">Premium</span>
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <CheckCircle2 className="w-4 h-4 text-[#C9A45C] mx-auto" />
                        ) : (
                          <Minus className="w-4 h-4 text-stone-300 mx-auto" />
                        )
                      ) : (
                        <span className="text-[11px] font-extrabold text-[#C9A45C]">{row.premium}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LAUNCH OFFER SPECIAL BANNER                                            */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-[#342C32] via-[#2A2328] to-[#1E191C] text-white relative overflow-hidden">
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C94F78]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C9A45C]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="p-8 sm:p-12 rounded-[40px] bg-white/5 backdrop-blur-md border-2 border-[#C9A45C]/40 shadow-2xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A45C] text-[#342C32] text-[11px] font-extrabold uppercase tracking-widest mb-6">
              <Gift className="w-4 h-4" />
              <span>LAUNCH OFFER — Special for New Clients!</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Get a Complete Dynamic Website + Free Domain
            </h2>

            <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto font-sans mb-10">
              Everything your business needs to launch with authority: dynamic content management, real-time lead capture, custom admin portal, and complimentary 1st-year domain registration.
            </p>

            {/* Visual Formula Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center max-w-3xl mx-auto mb-10">
              <div className="p-5 rounded-2xl bg-white/10 border border-white/15">
                <span className="text-[10px] uppercase font-bold tracking-wider text-white/60 block mb-1">
                  Website Development
                </span>
                <span className="font-serif text-2xl font-bold text-white">₹7,000</span>
              </div>

              <div className="text-2xl font-bold text-[#C9A45C]">+</div>

              <div className="p-5 rounded-2xl bg-white/10 border border-white/15">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#5D9FBE] block mb-1">
                  Domain (1 Year)
                </span>
                <span className="font-serif text-2xl font-bold text-[#5D9FBE]">₹800</span>
              </div>

              <div className="text-2xl font-bold text-[#C9A45C]">=</div>

              <div className="p-5 rounded-2xl bg-[#C9A45C] text-[#342C32] shadow-xl">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[#342C32]/75 block mb-1">
                  Total All-Inclusive
                </span>
                <span className="font-serif text-3xl font-extrabold text-[#342C32]">₹7,800</span>
              </div>
            </div>

            <button
              onClick={() => handleSelectPackage('Premium Launch Offer', '₹7,800')}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-xl hover:shadow-[0_10px_30px_rgba(201,164,92,0.5)] hover:scale-102 transition-all cursor-pointer inline-flex items-center gap-2.5"
            >
              <span>Claim Launch Offer Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PAYMENT TERMS & DELIVERY TIMELINE                                      */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            
            {/* Payment Terms Card */}
            <div className="p-8 sm:p-10 rounded-[36px] bg-white border border-[#C9A45C]/30 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#F7DDE3] flex items-center justify-center text-[#C94F78]">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C94F78]">
                      Transparent Milestone Flow
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#342C32]">
                      Simple & Transparent Payment
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#342C32]/75 font-sans leading-relaxed mb-6">
                  We believe in fair, risk-free collaboration with zero hidden costs. Payment is divided into two straightforward milestones.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#5D9FBE] block mb-1">
                      Step 1 • Advance
                    </span>
                    <span className="font-serif text-3xl font-extrabold text-[#342C32] block mb-1">
                      50%
                    </span>
                    <span className="text-xs text-[#342C32]/70">
                      ₹3,900 on kickoff (Launch Offer)
                    </span>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C94F78] block mb-1">
                      Step 2 • On Completion
                    </span>
                    <span className="font-serif text-3xl font-extrabold text-[#342C32] block mb-1">
                      50%
                    </span>
                    <span className="text-xs text-[#342C32]/70">
                      ₹3,900 after approval & final check
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#DDF3FC]/40 border border-[#5D9FBE]/30 text-xs text-[#342C32]/85 font-sans leading-relaxed">
                  <span className="font-bold text-[#5D9FBE] block mb-0.5">Payment Guarantee:</span>
                  Project development begins promptly after the advance payment. Remaining payment is collected only after complete development and your final approval.
                </div>
              </div>
            </div>

            {/* Delivery Time & Domain Renewal Card */}
            <div className="p-8 sm:p-10 rounded-[36px] bg-white border border-[#C9A45C]/30 shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E8D3A3]/40 flex items-center justify-center text-[#C9A45C]">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A45C]">
                      Velocity & Continuity
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#342C32]">
                      Delivery Time & Domain Renewal
                    </h3>
                  </div>
                </div>

                {/* Delivery Time Block */}
                <div className="mb-6 p-5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#342C32]">
                      Estimated Delivery Velocity:
                    </span>
                    <span className="font-serif text-xl font-bold text-[#C94F78]">
                      7 – 10 Working Days
                    </span>
                  </div>
                  <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#C94F78] to-[#C9A45C] h-full w-4/5 rounded-full" />
                  </div>
                  <span className="text-[11px] text-[#342C32]/60 block mt-2 font-sans">
                    * Actual delivery timeline may vary depending on customized scope requirements, third-party integrations, and client review feedback.
                  </span>
                </div>

                {/* Domain Renewal Block */}
                <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#C9A45C]/35">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Globe className="w-4 h-4 text-[#5D9FBE]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#342C32]">
                      Domain — 1 Year Included
                    </span>
                  </div>
                  <p className="text-xs text-[#342C32]/75 leading-relaxed font-sans">
                    The ₹800 domain charge covers your complete initial 1-year registration. From the second year onwards, standard annual domain renewal charges will be paid directly by the client.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. WHAT'S INCLUDED IN ALL PACKAGES                                        */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white border-t border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3.5 mb-3.5">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Universal Inclusions
              </span>
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#342C32] tracking-tight mb-3">
              What's Included in Every Project
            </h2>
            <p className="text-sm text-[#342C32]/70 font-sans">
              Foundational quality standards engineered into every build without extra charges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonBenefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-3xl bg-[#FFF9F6] border border-[#C9A45C]/25 shadow-2xs hover:shadow-lg transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${b.bg} flex items-center justify-center ${b.color} mb-5 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#342C32] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-xs text-[#342C32]/75 leading-relaxed font-sans">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. INTERACTIVE CUSTOM SCOPE ESTIMATOR (₹ INR)                             */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFF9F6] border-t border-[#C9A45C]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3.5 mb-3.5">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#C94F78] uppercase font-sans">
                Interactive Tool
              </span>
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#342C32] tracking-tight mb-3">
              Calculate Your Custom Scope
            </h2>
            <p className="text-sm text-[#342C32]/70 font-sans">
              Need specific customizations? Adjust parameters below to calculate an instant preliminary estimate.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-[36px] bg-white border border-[#C9A45C]/30 shadow-xl space-y-8">
            {/* Number of Pages Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#342C32]">
                  Estimated Pages / Sections:
                </label>
                <span className="font-serif text-lg font-bold text-[#C94F78]">{calcPages} Pages</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={calcPages}
                onChange={(e) => setCalcPages(parseInt(e.target.value, 10))}
                className="w-full accent-[#C94F78] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#342C32]/50 font-bold mt-1">
                <span>1 Landing Page</span>
                <span>5 Multi-Page</span>
                <span>15+ Custom Portal</span>
              </div>
            </div>

            {/* Checkbox Add-ons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25 cursor-pointer hover:border-[#C94F78]">
                <input
                  type="checkbox"
                  checked={calcDynamicCms}
                  onChange={(e) => setCalcDynamicCms(e.target.checked)}
                  className="w-4 h-4 accent-[#C94F78] rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#342C32] block">Admin CMS & DB</span>
                  <span className="text-[#342C32]/60">+₹2,500</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25 cursor-pointer hover:border-[#C94F78]">
                <input
                  type="checkbox"
                  checked={calcDomain}
                  onChange={(e) => setCalcDomain(e.target.checked)}
                  className="w-4 h-4 accent-[#C94F78] rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#342C32] block">1 Year Domain</span>
                  <span className="text-[#342C32]/60">+₹800</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25 cursor-pointer hover:border-[#C94F78]">
                <input
                  type="checkbox"
                  checked={calcSeo}
                  onChange={(e) => setCalcSeo(e.target.checked)}
                  className="w-4 h-4 accent-[#C94F78] rounded"
                />
                <div className="text-xs">
                  <span className="font-bold text-[#342C32] block">Full SEO Architecture</span>
                  <span className="text-[#342C32]/60">+₹1,200</span>
                </div>
              </label>
            </div>

            {/* Velocity / Speed Radio */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#342C32] block mb-2">
                Launch Velocity:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCalcSpeed('standard')}
                  className={`p-3.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                    calcSpeed === 'standard'
                      ? 'bg-[#342C32] text-white border-[#342C32]'
                      : 'bg-white text-[#342C32]/70 border-[#C9A45C]/25'
                  }`}
                >
                  Standard (7–10 Days)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcSpeed('rush')}
                  className={`p-3.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                    calcSpeed === 'rush'
                      ? 'bg-[#C94F78] text-white border-[#C94F78]'
                      : 'bg-white text-[#342C32]/70 border-[#C9A45C]/25'
                  }`}
                >
                  Priority Rush (3–5 Days) (+₹1,500)
                </button>
              </div>
            </div>

            {/* Total Estimate Calculation Result Bar */}
            <div className="pt-6 border-t border-[#C9A45C]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#342C32]/50 block">
                  Estimated Investment Scope
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#342C32]">
                  ₹{totalEstimatedCost.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-sans font-normal text-[#342C32]/60">approx.</span>
                </div>
              </div>

              <button
                onClick={handleBookCustomEstimate}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book This Custom Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. CUSTOM WEBSITE CTA BANNER                                              */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-24 bg-white border-t border-[#C9A45C]/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-[#FFF9F6] via-[#F7DDE3]/40 to-[#DDF3FC]/40 border border-[#C9A45C]/30 shadow-xl">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C94F78] block mb-3 font-sans">
              Tailored Digital Architecture
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#342C32] mb-4">
              Need Something More?
            </h2>
            <p className="text-sm sm:text-base text-[#342C32]/80 max-w-2xl mx-auto mb-8 font-sans leading-relaxed">
              Have a custom requirement that doesn't fit these packages? Let's discuss your idea and create a solution around your business.
            </p>
            <button
              onClick={() => {
                onSelectTier('Custom Website Solution');
                navigate('/contact');
              }}
              className="px-9 py-4 rounded-full bg-[#342C32] hover:bg-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Get a Custom Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. FAQ ACCORDION                                                          */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFF9F6] border-t border-[#C9A45C]/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#342C32] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#342C32]/70 font-sans">
              Clear answers regarding payments, timelines, domain ownership, and ongoing support.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-[#C9A45C]/25 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-base font-bold text-[#342C32]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#C9A45C] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#C94F78]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#342C32]/75 leading-relaxed font-sans border-t border-[#C9A45C]/15">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
