import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Globe,
  Layout,
  Sparkles,
  Cpu,
  Palette,
  Layers,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  LucideIcon,
  CheckCircle2,
  Workflow,
  Zap,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageTransition } from '../components/PageTransition';
import { Service } from '../types';

interface ServicesPageProps {
  services: Service[];
  onSelectServiceForContact?: (serviceTitle: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Layout,
  Sparkles,
  Cpu,
  Palette,
  Layers,
};

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services,
  onSelectServiceForContact,
}) => {
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);
  const navigate = useNavigate();

  const handleStartProject = (serviceTitle?: string) => {
    if (onSelectServiceForContact && serviceTitle) {
      onSelectServiceForContact(serviceTitle);
    }
    navigate('/contact');
  };

  const workflowSteps = [
    {
      num: '01',
      title: 'Architectural Discovery',
      desc: 'We map out your business objectives, target personas, technical requirements, and aesthetic direction.',
    },
    {
      num: '02',
      title: 'Haute Couture Design',
      desc: 'Interactive Figma design systems, tactile typography, refined micro-interactions, and visual harmony.',
    },
    {
      num: '03',
      title: 'Precision Engineering',
      desc: 'Full-stack development in modern TypeScript with clean architecture, sub-second loads, and high security.',
    },
    {
      num: '04',
      title: 'QA, Launch & Evolution',
      desc: 'Cross-browser testing, SEO indexing, milestone handoff, and ongoing SLA maintenance support.',
    },
  ];

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HERO & BREADCRUMBS                                                        */}
      {/* ========================================================================= */}
      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden bg-mesh-luxury border-b border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'Services Catalogue' }]} className="mb-6" />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Our Capabilities
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#342C32] tracking-tight leading-tight mb-6">
              Complete Digital Solutions{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] to-[#C9A45C]">
                Engineered for Impact.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#342C32]/80 leading-relaxed font-sans mb-8">
              From bespoke web engineering to iconic brand architecture and full-stack software solutions, explore our comprehensive suite of creative and technical services.
            </p>

            <button
              onClick={() => handleStartProject()}
              className="px-8 py-4 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C94F78] transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FULL SERVICES CATALOGUE GRID                                              */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Sparkles;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative rounded-[32px] bg-[#FFF9F6] p-8 sm:p-9 border border-[#C9A45C]/25 transition-all duration-500 hover:border-[#C9A45C] hover:shadow-[0_20px_45px_-15px_rgba(201,79,120,0.15),0_0_20px_2px_rgba(201,164,92,0.2)] hover:-translate-y-2 flex flex-col justify-between cursor-pointer"
                  onClick={() => setActiveModalService(service)}
                >
                  <div>
                    {/* Top Row: Number & Icon */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-serif text-3xl font-bold text-[#C9A45C]">
                        {service.number}
                      </span>

                      <div className="w-14 h-14 rounded-2xl bg-white border border-[#C9A45C]/30 flex items-center justify-center text-[#C94F78] group-hover:bg-[#F7DDE3] group-hover:text-[#342C32] transition-all duration-300 shadow-2xs">
                        <IconComponent className="w-7 h-7" />
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-2xl font-bold text-[#342C32] group-hover:text-[#C94F78] transition-colors mb-3">
                      {service.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-[#342C32]/75 leading-relaxed mb-6 font-sans">
                      {service.description}
                    </p>

                    {/* Deliverables Pills */}
                    {service.features && service.features.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C9A45C] block">
                          Key Deliverables:
                        </span>
                        {service.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#342C32]/80">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C94F78] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-5 border-t border-[#C9A45C]/15 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartProject(service.title);
                      }}
                      className="text-xs font-bold uppercase tracking-wider text-[#C94F78] hover:underline cursor-pointer"
                    >
                      Request Service
                    </button>

                    <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#C94F78] group-hover:text-white flex items-center justify-center transition-all shadow-2xs group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICE DELIVERY PROCESS                                                  */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-mesh-luxury border-t border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex items-center justify-center gap-3.5 mb-3.5">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Engagement Model
              </span>
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight mb-4">
              How We Deliver Excellence
            </h2>
            <p className="text-base text-[#342C32]/75 font-sans">
              A disciplined four-stage pipeline ensuring precision, transparency, and rapid launch velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="p-7 rounded-3xl bg-white/90 border border-[#C9A45C]/25 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-extrabold text-[#C9A45C] block mb-4">
                    {step.num}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#342C32] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#342C32]/75 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Final CTA Banner */}
          <div className="mt-16 p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-[#342C32] via-[#2D242B] to-[#1E191C] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Need a Custom or Multi-Disciplinary Scope?
              </h3>
              <p className="text-sm text-white/70 max-w-xl">
                We structure tailored sprints combining branding, custom web app engineering, and ongoing creative retainers.
              </p>
            </div>

            <button
              onClick={() => handleStartProject('Custom Solution')}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-opacity shadow-lg shrink-0 cursor-pointer"
            >
              Start a Project
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICE MODAL DEEP-DIVE                                                   */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeModalService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#342C32]/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#C9A45C]/40 shadow-2xl relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C9A45C]">
                  Service {activeModalService.number}
                </span>
                <button
                  onClick={() => setActiveModalService(null)}
                  className="w-8 h-8 rounded-full bg-[#F7DDE3] text-[#C94F78] flex items-center justify-center hover:bg-[#C94F78] hover:text-white transition-colors cursor-pointer text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32] mb-3">
                {activeModalService.title}
              </h3>

              <p className="text-sm sm:text-base text-[#342C32]/80 leading-relaxed mb-6">
                {activeModalService.description}
              </p>

              {activeModalService.features && (
                <div className="mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#342C32] mb-3">
                    Full Package Inclusions:
                  </h4>
                  <div className="space-y-2.5">
                    {activeModalService.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-[#342C32]/85">
                        <CheckCircle className="w-4 h-4 text-[#C94F78] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const title = activeModalService.title;
                    setActiveModalService(null);
                    handleStartProject(title);
                  }}
                  className="flex-1 py-3.5 text-center rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  Start This Project
                </button>

                <button
                  onClick={() => setActiveModalService(null)}
                  className="px-6 py-3.5 rounded-full text-xs font-semibold text-[#342C32]/70 hover:text-[#342C32] border border-[#C9A45C]/30 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};
