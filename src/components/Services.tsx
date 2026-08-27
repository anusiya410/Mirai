import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Globe,
  Layout,
  Sparkles,
  Cpu,
  Palette,
  Layers,
  ArrowRight,
  CheckCircle,
  LucideIcon,
} from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  onSelectService?: (service: Service) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Layout,
  Sparkles,
  Cpu,
  Palette,
  Layers,
};

export const Services: React.FC<ServicesProps> = ({ services, onSelectService }) => {
  const [activeModalService, setActiveModalService] = useState<Service | null>(null);

  return (
    <section id="services" className="py-24 sm:py-32 relative overflow-hidden bg-mesh-luxury">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-[#A9DDF2]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 rounded-full bg-[#E8B8C4]/35 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3.5 mb-3.5">
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
              Our Capabilities
            </span>
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
          </div>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight mb-4">
            What We Create
          </h2>
          
          <p className="text-base text-[#342C32]/75 font-sans">
            End-to-end digital solutions crafted with bespoke artistry, precision architecture, and measurable commercial impact.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-[32px] bg-white/80 backdrop-blur-md p-8 sm:p-9 border border-[#C9A45C]/25 transition-all duration-500 hover:border-[#C9A45C] hover:shadow-[0_20px_45px_-15px_rgba(201,79,120,0.15),0_0_20px_2px_rgba(201,164,92,0.2)] hover:-translate-y-2 flex flex-col justify-between cursor-pointer overflow-hidden"
                onClick={() => {
                  if (onSelectService) {
                    onSelectService(service);
                  } else {
                    setActiveModalService(service);
                  }
                }}
              >
                {/* Subtle Hover Gradient Glow & Dot Texture inside Card */}
                <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#F7DDE3]/0 via-[#FFF9F6]/0 to-[#DDF3FC]/0 group-hover:from-[#F7DDE3]/35 group-hover:to-[#DDF3FC]/45 transition-all duration-500 -z-10" />

                <div className="relative z-10">
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#C9A45C] opacity-75 group-hover:opacity-100 transition-opacity">
                      {service.number}
                    </span>

                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#F7DDE3] to-[#DDF3FC] border border-[#C9A45C]/30 flex items-center justify-center text-[#C94F78] group-hover:text-[#342C32] group-hover:bg-[#C9A45C]/20 transition-all duration-300 shadow-2xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#342C32] group-hover:text-[#C94F78] transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#342C32]/75 leading-relaxed mb-6 font-sans">
                    {service.description}
                  </p>

                  {/* Key Features Pill list if available */}
                  {service.features && service.features.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.features.slice(0, 2).map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-[#FFF9F6] border border-[#C9A45C]/20 text-[#342C32]/75"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Row: Explore Arrow */}
                <div className="pt-4 border-t border-[#C9A45C]/15 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#C9A45C] group-hover:text-[#C94F78] transition-colors relative z-10">
                  <span>Explore Service</span>
                  <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#C94F78] group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:translate-x-1">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#342C32]/50 backdrop-blur-sm">
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
                className="w-8 h-8 rounded-full bg-[#F7DDE3] text-[#C94F78] flex items-center justify-center hover:bg-[#C94F78] hover:text-white transition-colors cursor-pointer"
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
                  Key Deliverables & Standards:
                </h4>
                <div className="space-y-2">
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
              <a
                href="#contact"
                onClick={() => setActiveModalService(null)}
                className="flex-1 py-3 text-center rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg transition-all"
              >
                Request This Service
              </a>
              <button
                onClick={() => setActiveModalService(null)}
                className="px-6 py-3 rounded-full text-xs font-semibold text-[#342C32]/70 hover:text-[#342C32] border border-[#C9A45C]/30"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};
