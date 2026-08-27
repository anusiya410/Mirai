import React from 'react';
import { motion } from 'motion/react';
import { Search, Lightbulb, PenTool, Code, Rocket, Check } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      tagline: 'Deep Dive & Requirements',
      desc: 'We explore your vision, business goals, target audience, and brand ethos to define the foundation of success.',
      icon: Search,
      color: '#C94F78',
    },
    {
      number: '02',
      title: 'Strategize',
      tagline: 'Digital Architecture',
      desc: 'We formulate the creative direction, content hierarchy, conversion funnel, and technological roadmap.',
      icon: Lightbulb,
      color: '#5D9FBE',
    },
    {
      number: '03',
      title: 'Design',
      tagline: 'Sensory Aesthetics',
      desc: 'We craft bespoke visual concepts, typography systems, fluid micro-interactions, and high-fidelity prototypes.',
      icon: PenTool,
      color: '#C9A45C',
    },
    {
      number: '04',
      title: 'Develop',
      tagline: 'Precision Engineering',
      desc: 'We translate the design into high-performance, responsive, and SEO-optimized code with flawless reliability.',
      icon: Code,
      color: '#C94F78',
    },
    {
      number: '05',
      title: 'Launch',
      tagline: 'Impact & Evolution',
      desc: 'We deploy the final digital experience, conduct exhaustive QA, and monitor performance for continuous market dominance.',
      icon: Rocket,
      color: '#C9A45C',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative overflow-hidden bg-white">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 rounded-full bg-[#F7DDE3]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-[#DDF3FC]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-24">
          <div className="flex items-center justify-center gap-3.5 mb-3.5">
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
              Our Methodology
            </span>
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight mb-4">
            From Idea to Impact
          </h2>

          <p className="text-base text-[#342C32]/75 font-sans">
            A structured, transparent 5-step creative engineering process designed for effortless collaboration and stellar outcomes.
          </p>
        </div>

        {/* Interactive Steps Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: idx * 0.12 }}
                className="relative rounded-[32px] bg-[#FFF9F6] border border-[#C9A45C]/25 p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#C9A45C] transition-all duration-400 hover:-translate-y-2 group overflow-hidden"
              >
                {/* Subtle Dot Pattern inside */}
                <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

                {/* Step Connector Indicator for larger screens */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-white border border-[#C9A45C]/40 text-[#C9A45C] items-center justify-center text-[10px] shadow-xs">
                    →
                  </div>
                )}

                <div className="relative z-10">
                  {/* Top: Step Number & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-2xl font-bold text-[#C9A45C]">
                      {step.number}
                    </span>

                    <div className="w-11 h-11 rounded-2xl bg-white border border-[#C9A45C]/30 flex items-center justify-center text-[#C94F78] group-hover:bg-[#C9A45C] group-hover:text-white transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#5D9FBE] block mb-1">
                    {step.tagline}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-[#342C32] mb-3 group-hover:text-[#C94F78] transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#342C32]/75 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C9A45C]/15 flex items-center gap-1.5 text-[11px] text-[#342C32]/60 font-medium relative z-10">
                  <Check className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>Milestone Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
