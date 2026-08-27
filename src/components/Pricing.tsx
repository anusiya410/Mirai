import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Sparkles,
  ArrowUpRight,
  Calculator,
  ShieldCheck,
  Zap,
  HelpCircle,
  ChevronDown,
  Clock,
  Layers,
  Award,
} from 'lucide-react';
import { PricingTier } from '../types';

interface PricingProps {
  pricing?: PricingTier[];
  onSelectTier?: (tier: PricingTier, isMonthly: boolean) => void;
  onCustomEstimateSubmit?: (details: { selectedItems: string[]; estimatedTotal: number; timeline: string }) => void;
}

const ESTIMATOR_OPTIONS = [
  { id: 'brand', name: 'Brand Identity & Monogram Suite', cost: 1200, days: 7, icon: Sparkles },
  { id: 'web', name: 'Custom High-Performance Web Platform (5-8 Pages)', cost: 2200, days: 14, icon: Zap },
  { id: 'uiux', name: 'Interactive UI/UX Prototypes (Figma Design System)', cost: 1100, days: 7, icon: Layers },
  { id: 'cms', name: 'Custom Admin Dashboard & CMS Management', cost: 950, days: 5, icon: ShieldCheck },
  { id: 'motion', name: '3D Motion Graphics & Digital Brand Storytelling', cost: 1400, days: 10, icon: Award },
  { id: 'seo', name: 'Advanced SEO, Analytics & Speed Optimization Suite', cost: 650, days: 4, icon: Calculator },
];

const FAQS = [
  {
    q: 'How does the payment and milestone schedule work?',
    a: 'For project-based engagements, we typically operate on a transparent 50/50 milestone structure (50% commencement deposit, 50% upon final delivery & launch). For larger enterprise projects, we can structure milestone phases.',
  },
  {
    q: 'Do I own 100% of the designs, code, and creative assets?',
    a: 'Absolutely. Upon project completion and final settlement, all intellectual property, Figma design files, raw vector assets, code repositories, and brand materials become 100% your property.',
  },
  {
    q: 'What is the turnaround time for a typical project?',
    a: 'Our Brand Starter tier launches in 10–14 business days. Signature Growth projects take 3–4 weeks, while full bespoke enterprise platforms are delivered according to agreed sprint milestones.',
  },
  {
    q: 'What is included in the Monthly Creative Retainer?',
    a: 'Our Retainer provides dedicated monthly development sprints, design iterations, feature additions, priority SLA support, and direct Slack/WhatsApp access to your dedicated creative lead.',
  },
];

export const Pricing: React.FC<PricingProps> = ({
  pricing,
  onSelectTier,
  onCustomEstimateSubmit,
}) => {
  const [billingCycle, setBillingCycle] = useState<'project' | 'monthly'>('project');
  const [showEstimator, setShowEstimator] = useState(false);
  const [selectedEstimates, setSelectedEstimates] = useState<string[]>(['brand', 'web', 'cms']);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Fallback if pricing not loaded
  const tiers: PricingTier[] = pricing && pricing.length > 0 ? pricing : [
    {
      id: 'price-starter',
      name: 'Brand Starter',
      tagline: 'For Emerging Brands & Creators',
      priceOneTime: '$1,499',
      priceMonthly: '$990',
      period: 'one-time',
      badge: 'Fast Launch',
      turnaround: '10–14 Days',
      description: 'Essential visual identity and a high-performance modern web presence crafted to establish immediate market credibility.',
      features: [
        'Bespoke Visual Identity & Emblem / Monogram',
        'Curated Typography & Color Hierarchy',
        'Single-Page or 3-Page Responsive Website',
        'Mobile-First Fluid Layout & Fast CDN Hosting',
        'Standard SEO Setup & Social Media Launch Kit',
        '14-Day Delivery & 30 Days Post-Launch Support',
      ],
      deliverables: ['Vector Logo Suite', 'Style Sheet PDF', 'Hosted Website'],
      ctaText: 'Choose Starter',
    },
    {
      id: 'price-signature',
      name: 'Signature Growth',
      tagline: 'Most Popular for Scaling Studios & Companies',
      priceOneTime: '$3,499',
      priceMonthly: '$2,490',
      period: 'one-time',
      featured: true,
      badge: 'Most Popular',
      turnaround: '3–4 Weeks',
      description: 'Comprehensive brand architecture, custom multi-page digital platform, dynamic animations, and conversion engine.',
      features: [
        'Complete Brand System & Comprehensive Guidelines',
        'Custom Multi-Page Website (Up to 8 Pages)',
        'Bespoke Interactive UI/UX Motion & Transitions',
        'Integrated CMS & Dynamic Content Management',
        'Advanced On-Page SEO, Metadata & Analytics Suite',
        'Interactive Consultation / Lead Capture Forms',
        'Priority Turnaround & 60 Days Dedicated Support',
      ],
      deliverables: ['Brand System Book', 'Figma Prototype Files', 'Production Code', 'Admin CMS Access'],
      ctaText: 'Choose Signature',
    },
    {
      id: 'price-enterprise',
      name: 'Bespoke Enterprise',
      tagline: 'For High-Impact Enterprises & Luxury Labels',
      priceOneTime: '$7,999+',
      priceMonthly: '$4,990',
      period: 'custom',
      badge: 'VIP Bespoke',
      turnaround: 'Tailored Timeline',
      description: 'Bespoke end-to-end digital mastery: custom web applications, 3D motion assets, API integrations, and dedicated engineering.',
      features: [
        'Holistic Brand Transformation & Art Direction',
        'Custom Full-Stack Web Application / Client Portal',
        '3D Motion Assets, Animations & Interactive Storytelling',
        'Complex Database Architecture & API Integrations',
        'Enterprise-Grade Performance, Security & CDN Hardening',
        'Dedicated Creative Director & Senior Engineering Lead',
        '24/7 VIP SLA & Ongoing Strategic Partnership',
      ],
      deliverables: ['Custom Architecture', 'Full Figma UI Kit', 'Enterprise Codebase', 'VIP SLA Agreement'],
      ctaText: 'Request VIP Quote',
    },
  ];

  const handleTierClick = (tier: PricingTier) => {
    if (onSelectTier) {
      onSelectTier(tier, billingCycle === 'monthly');
    } else {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const toggleEstimateItem = (id: string) => {
    setSelectedEstimates((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateEstimate = () => {
    const totalCost = selectedEstimates.reduce((sum, id) => {
      const found = ESTIMATOR_OPTIONS.find((opt) => opt.id === id);
      return sum + (found ? found.cost : 0);
    }, 0);

    const totalDays = selectedEstimates.reduce((sum, id) => {
      const found = ESTIMATOR_OPTIONS.find((opt) => opt.id === id);
      return sum + (found ? found.days : 0);
    }, 0);

    const estimatedWeeks = Math.max(1, Math.ceil(totalDays / 6));
    return {
      totalCost,
      timeline: `${estimatedWeeks}-${estimatedWeeks + 1} Weeks`,
    };
  };

  const handleApplyEstimate = () => {
    const { totalCost, timeline } = calculateEstimate();
    const selectedNames = selectedEstimates.map(
      (id) => ESTIMATOR_OPTIONS.find((opt) => opt.id === id)?.name || id
    );

    if (onCustomEstimateSubmit) {
      onCustomEstimateSubmit({
        selectedItems: selectedNames,
        estimatedTotal: totalCost,
        timeline,
      });
    } else {
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#FFF9F6] relative overflow-hidden">
      {/* Signature Atmospheric Radial Blur Orbs */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] rounded-full bg-[#E8B8C4]/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] rounded-full bg-[#A9DDF2]/20 blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3.5 mb-3.5">
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
              Investment & Packages
            </span>
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight mb-4">
            Transparent Pricing.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C]">
              Measurable Impact.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#342C32]/75 leading-relaxed font-sans">
            Choose a curated scope tailored to your stage of growth, or calculate a bespoke engagement based on exact project deliverables.
          </p>

          {/* Billing Switcher Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="p-1.5 rounded-full bg-white border border-[#C9A45C]/30 shadow-xs flex items-center gap-1">
              <button
                onClick={() => setBillingCycle('project')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  billingCycle === 'project'
                    ? 'bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white shadow-xs'
                    : 'text-[#342C32]/70 hover:text-[#C94F78]'
                }`}
              >
                Project-Based (Fixed)
              </button>

              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white shadow-xs'
                    : 'text-[#342C32]/70 hover:text-[#C94F78]'
                }`}
              >
                <span>Monthly Retainer</span>
                <span className="px-2 py-0.5 rounded-full bg-[#E8D3A3] text-[#342C32] text-[9px] font-extrabold tracking-tight">
                  VIP Squad
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {tiers.map((tier, idx) => {
            const isFeatured = tier.featured;
            const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceOneTime;
            const subLabel = billingCycle === 'monthly' ? '/ month (ongoing)' : 'one-time investment';

            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={`relative rounded-[36px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 overflow-hidden ${
                  isFeatured
                    ? 'bg-gradient-to-b from-white via-white to-[#FFF9F6] border-2 border-[#C9A45C] shadow-[0_20px_50px_-15px_rgba(201,79,120,0.2),0_0_30px_rgba(201,164,92,0.25)] z-20'
                    : 'bg-white/85 backdrop-blur-md border border-[#C9A45C]/30 shadow-sm hover:shadow-xl hover:border-[#C9A45C]'
                }`}
              >
                {/* Subtle Decorative Pattern */}
                <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

                {/* Top Badge */}
                {tier.badge && (
                  <div className="absolute top-6 right-6">
                    <span
                      className={`px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        isFeatured
                          ? 'bg-[#C9A45C] text-white shadow-xs'
                          : 'bg-[#F7DDE3] text-[#C94F78] border border-[#C9A45C]/30'
                      }`}
                    >
                      {tier.badge}
                    </span>
                  </div>
                )}

                <div className="relative z-10">
                  {/* Plan Name & Tagline */}
                  <div className="mb-6">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32] mb-1">
                      {tier.name}
                    </h3>
                    <p className="text-xs font-medium text-[#5D9FBE] uppercase tracking-wider font-sans">
                      {tier.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="mb-6 pb-6 border-b border-[#C9A45C]/20">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-4xl sm:text-5xl font-extrabold text-[#342C32] tracking-tight">
                        {price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-[#342C32]/60 font-sans">{subLabel}</span>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#C9A45C]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{tier.turnaround}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#342C32]/75 leading-relaxed mb-6 font-sans">
                    {tier.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#342C32]/50 block">
                      Scope & Inclusions
                    </span>
                    {tier.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#342C32]/85 font-sans">
                        <div className="w-4 h-4 rounded-full bg-[#F7DDE3] text-[#C94F78] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-6 border-t border-[#C9A45C]/20 relative z-10">
                  <button
                    onClick={() => handleTierClick(tier)}
                    className={`w-full py-4 rounded-full font-sans text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                      isFeatured
                        ? 'bg-gradient-to-r from-[#C94F78] via-[#C9A45C] to-[#C94F78] bg-[length:200%_auto] hover:bg-right text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                        : 'border border-[#C9A45C] bg-white text-[#342C32] hover:bg-[#F7DDE3]/50 shadow-2xs hover:shadow-sm'
                    }`}
                  >
                    <span>{tier.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Custom Project Scope Estimator Drawer / Card */}
        <div className="rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#FFF9F6] via-white to-[#F7DDE3]/40 border border-[#C9A45C]/35 p-8 sm:p-12 shadow-xl mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern opacity-15 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#C9A45C]/25 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E8D3A3]/50 border border-[#C9A45C]/40 flex items-center justify-center text-[#342C32]">
                  <Calculator className="w-6 h-6 text-[#C9A45C]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32]">
                    Bespoke Project Cost Estimator
                  </h3>
                  <p className="text-xs sm:text-sm text-[#342C32]/70 font-sans mt-0.5">
                    Select the exact capabilities you require to view an instantaneous scope & timeline forecast.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowEstimator(!showEstimator)}
                className="px-5 py-2.5 rounded-full border border-[#C9A45C]/40 bg-white text-xs font-bold uppercase tracking-wider text-[#342C32] hover:bg-[#FFF9F6] transition-colors self-start md:self-auto cursor-pointer"
              >
                {showEstimator ? 'Hide Options' : 'Customize Modules'}
              </button>
            </div>

            {/* Estimator Interactive Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {ESTIMATOR_OPTIONS.map((opt) => {
                const isSelected = selectedEstimates.includes(opt.id);
                const Icon = opt.icon;

                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleEstimateItem(opt.id)}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-white border-[#C94F78] shadow-sm ring-2 ring-[#C94F78]/15'
                        : 'bg-white/60 border-[#C9A45C]/20 hover:border-[#C9A45C]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#F7DDE3] text-[#C94F78]'
                            : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#342C32] leading-tight">
                          {opt.name}
                        </h4>
                        <span className="text-[10px] text-[#342C32]/55 font-medium">
                          Est. {opt.days} working days
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0 ml-3">
                      <span className="text-xs font-serif font-bold text-[#C94F78]">
                        +${opt.cost}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Estimator Summary Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-white border border-[#C9A45C]/30 shadow-xs">
              <div className="flex flex-wrap items-center gap-8 text-center sm:text-left">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#342C32]/50 font-sans block">
                    Estimated Investment
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#342C32]">
                    ${calculateEstimate().totalCost.toLocaleString()}
                  </span>
                </div>

                <div className="hidden sm:block w-[1px] h-10 bg-[#C9A45C]/25" />

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#342C32]/50 font-sans block">
                    Estimated Velocity
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#5D9FBE]">
                    {calculateEstimate().timeline}
                  </span>
                </div>

                <div className="hidden sm:block w-[1px] h-10 bg-[#C9A45C]/25" />

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#342C32]/50 font-sans block">
                    Selected Modules
                  </span>
                  <span className="text-xs font-bold text-[#C9A45C]">
                    {selectedEstimates.length} Core Deliverables
                  </span>
                </div>
              </div>

              <button
                onClick={handleApplyEstimate}
                className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] hover:opacity-95 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 shrink-0"
              >
                <span>Book This Custom Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Assurance Guarantees Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-white/80 border border-[#C9A45C]/25 flex items-center gap-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F7DDE3] flex items-center justify-center text-[#C94F78] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#342C32]">100% IP & Asset Ownership</h4>
              <p className="text-xs text-[#342C32]/65 font-sans mt-0.5">All vector graphics, Figma files, and source code transfer directly to you.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 border border-[#C9A45C]/25 flex items-center gap-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#DDF3FC] flex items-center justify-center text-[#5D9FBE] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#342C32]">Milestone-Based Escrow</h4>
              <p className="text-xs text-[#342C32]/65 font-sans mt-0.5">Transparent staged delivery. Pay only upon approval of designated milestones.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white/80 border border-[#C9A45C]/25 flex items-center gap-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/40 flex items-center justify-center text-[#C9A45C] shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-[#342C32]">SLA Quality Guarantee</h4>
              <p className="text-xs text-[#342C32]/65 font-sans mt-0.5">Comprehensive testing across 15+ screen sizes, WCAG AA contrast, and speed index.</p>
            </div>
          </div>
        </div>

        {/* Pricing FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2 text-[#C9A45C]">
              <HelpCircle className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">Frequently Inquired</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32]">
              Investment Clarifications
            </h3>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, fIndex) => {
              const isOpen = openFaq === fIndex;
              return (
                <div
                  key={fIndex}
                  className="rounded-2xl bg-white border border-[#C9A45C]/25 overflow-hidden transition-all duration-300 shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIndex)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FFF9F6]/40 transition-colors"
                  >
                    <span className="font-serif text-base sm:text-lg font-bold text-[#342C32]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#C9A45C] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-[#C94F78]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-[#C9A45C]/15 px-5 sm:px-6 pb-6 pt-3"
                      >
                        <p className="text-xs sm:text-sm text-[#342C32]/75 leading-relaxed font-sans">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
