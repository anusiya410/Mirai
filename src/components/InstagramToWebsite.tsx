import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Instagram, 
  Globe, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  CalendarCheck, 
  CreditCard 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const InstagramToWebsite: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-[#FFF9F6] to-white border-y border-[#C9A45C]/20 select-none">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F7DDE3]/35 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DDF3FC]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-3.5"
          >
            <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
            <span className="text-[11px] font-bold tracking-[0.35em] text-[#C94F78] uppercase font-sans">
              The Digital Evolution
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
            Turn Your Instagram Presence Into a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C]">
              Professional Online Brand.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#342C32]/75 font-sans leading-relaxed"
          >
            Instagram is for social discovery. A bespoke Mirai website is for high-ticket bookings, instant credibility, and 24/7 automated client acquisition.
          </motion.p>
        </div>

        {/* Interactive Comparison Transformation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Instagram Profile Experience (The Limitations) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl bg-white border border-[#C9A45C]/20 shadow-xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045]" />
            
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5 text-[#833AB4]">
                  <Instagram className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">Instagram Only</span>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                  Scattered Workflow
                </span>
              </div>

              {/* Mock Instagram Profile Preview */}
              <div className="bg-[#FAFAFA] border border-gray-200 rounded-2xl p-4 mb-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FD1D1D] to-[#833AB4] p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-serif text-sm font-bold text-[#342C32]">
                      Studio
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-[#342C32] block">@glamour.beauty.studio</span>
                    <span className="text-[11px] text-gray-500">Bridal • Makeup • Hair Styling</span>
                  </div>
                </div>

                <div className="text-[11px] text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100 leading-relaxed">
                  <p>✨ DM for bridal quotes & prices</p>
                  <p>📞 WhatsApp screenshot for slot confirm</p>
                  <p className="text-rose-500 font-medium">⚠️ Slots fill fast, DMs may get missed</p>
                </div>
              </div>

              {/* The Frustrations List */}
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-[#342C32]/80">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>Endless “PP?” (Price Please) bargaining in DMs</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#342C32]/80">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>No automated calendar booking or slot reservation</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#342C32]/80">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>High-value brides perceive you as a hobbyist, not a brand</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Conversion Rate</span>
              <span className="font-bold text-rose-500">~ 1.2%</span>
            </div>
          </motion.div>

          {/* CENTER: Animated Transformation Conduit */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center gap-4 py-4 lg:py-0">
            <motion.div
              animate={{ y: [-4, 4, -4], scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C94F78] to-[#C9A45C] text-white flex items-center justify-center shadow-xl ring-4 ring-[#C9A45C]/20"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <span className="text-[10px] font-mono uppercase tracking-widest font-extrabold text-[#C9A45C] text-center">
              MIRAI UPGRADE
            </span>
            <div className="hidden lg:flex flex-col items-center gap-1.5 opacity-60">
              <div className="w-1 h-3 rounded-full bg-[#C94F78]" />
              <div className="w-1 h-3 rounded-full bg-[#E8B8C4]" />
              <div className="w-1 h-3 rounded-full bg-[#C9A45C]" />
            </div>
          </div>

          {/* RIGHT: Professional Mirai Website Experience */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl bg-white border-2 border-[#C9A45C] shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden ring-4 ring-[#C9A45C]/10 animate-shimmer"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C]" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5 text-[#C9A45C]">
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider font-sans">Bespoke Mirai Platform</span>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  High-Ticket Conversion
                </span>
              </div>

              {/* Mock Website Experience Preview */}
              <div className="bg-gradient-to-br from-[#FFF9F6] to-[#F7EBEF] border border-[#C9A45C]/30 rounded-2xl p-4 mb-6 space-y-3.5 shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-sm font-bold text-[#342C32]">GLAMOUR STUDIO • LUXURY</span>
                  <span className="text-[10px] text-green-700 font-bold bg-white px-2 py-0.5 rounded-full border border-green-200">
                    🟢 Instant Booking Open
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="bg-white p-2 rounded-xl border border-[#C9A45C]/20 shadow-xs flex items-center gap-1.5 font-bold text-[#342C32]">
                    <CalendarCheck className="w-3.5 h-3.5 text-[#C94F78]" />
                    <span>Real-Time Calendar</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#C9A45C]/20 shadow-xs flex items-center gap-1.5 font-bold text-[#342C32]">
                    <CreditCard className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>Direct Advance Pay</span>
                  </div>
                </div>
              </div>

              {/* The Benefits List */}
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-xs text-[#342C32]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">Transparent, high-ticket bridal packages published with pride</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#342C32]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">Automated booking confirmations via SMS & WhatsApp</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#342C32]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">Clients respect your pricing and perceive you as a premier luxury studio</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#C9A45C]/20 flex items-center justify-between text-xs">
              <span className="text-[#342C32]/70">Conversion Rate</span>
              <span className="font-extrabold text-emerald-600 text-sm">6.8% - 9.4%</span>
            </div>
          </motion.div>

        </div>

        {/* Bottom CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] text-white text-xs uppercase tracking-[0.2em] font-bold rounded-full hover:shadow-[0_10px_25px_rgba(201,164,92,0.4)] hover:-translate-y-0.5 transition-all shadow-xl cursor-pointer"
          >
            <span>GET YOUR WEBSITE NOW</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
