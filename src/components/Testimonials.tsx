import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto rotate carousel
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 relative overflow-hidden bg-mesh-luxury"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-[#E8B8C4]/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#A9DDF2]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3.5 mb-3.5">
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
              Client Endorsements
            </span>
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight mb-4">
            Words of Trust
          </h2>

          <p className="text-base text-[#342C32]/75 font-sans">
            Hear directly from the visionary leaders, founders, and enterprises who built their digital futures with Mirai.
          </p>
        </div>

        {/* Testimonial Stage Carousel */}
        <div className="max-w-4xl mx-auto relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[36px] sm:rounded-[44px] bg-white/85 backdrop-blur-xl p-8 sm:p-12 md:p-16 border border-[#C9A45C]/35 shadow-[0_20px_50px_-15px_rgba(201,79,120,0.15)] relative overflow-hidden"
            >
              {/* Subtle Dot Pattern inside */}
              <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

              {/* Gold Quote Watermark */}
              <div className="absolute top-6 right-8 text-[#C9A45C]/15 pointer-events-none">
                <Quote className="w-20 h-20 sm:w-28 sm:h-28" />
              </div>

              {/* 5-Star Rating */}
              <div className="flex items-center gap-1.5 mb-8 relative z-10">
                {Array.from({ length: current.rating || 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#C9A45C] text-[#C9A45C] drop-shadow-xs"
                  />
                ))}
              </div>

              {/* Client Quote */}
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-medium text-[#342C32] leading-relaxed italic mb-10 relative z-10">
                "{current.quote}"
              </blockquote>

              {/* Client Profile */}
              <div className="flex items-center gap-4 pt-6 border-t border-[#C9A45C]/20 relative z-10">
                <img
                  src={current.avatar}
                  alt={current.clientName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#C9A45C] shadow-sm"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#342C32]">
                    {current.clientName}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#C94F78] font-medium">
                    {current.role} • <span className="text-[#342C32]/70 font-normal">{current.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8 px-2">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-8 bg-gradient-to-r from-[#C94F78] to-[#C9A45C]'
                      : 'w-2.5 bg-[#C9A45C]/30 hover:bg-[#C9A45C]/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full bg-white border border-[#C9A45C]/35 text-[#342C32] hover:bg-[#F7DDE3] hover:text-[#C94F78] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full bg-white border border-[#C9A45C]/35 text-[#342C32] hover:bg-[#F7DDE3] hover:text-[#C94F78] flex items-center justify-center transition-all shadow-xs hover:shadow-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
