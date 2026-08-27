import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Sparkles,
  MessageSquare,
  Instagram,
  Linkedin,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowUpRight,
} from 'lucide-react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageTransition } from '../components/PageTransition';
import { SiteSettings, ContactEnquiry } from '../types';
import { StorageService } from '../lib/storage';

interface ContactPageProps {
  settings: SiteSettings;
  onEnquirySubmitted: (enquiry: ContactEnquiry) => void;
  prefilledType?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  settings,
  onEnquirySubmitted,
  prefilledType = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: prefilledType || 'Website Development',
    budget: '$5,000 - $10,000',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (prefilledType) {
      setFormData((prev) => ({ ...prev, projectType: prefilledType }));
    }
  }, [prefilledType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, email, and project message.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newEnquiry: ContactEnquiry = {
        id: `enquiry-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || 'N/A',
        projectType: `${formData.projectType} (${formData.budget})`,
        message: formData.message.trim(),
        createdAt: new Date().toISOString(),
        status: 'New',
      };

      // Notify parent state and dispatch event
      onEnquirySubmitted(newEnquiry);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C94F78', '#E8B8C4', '#C9A45C', '#5D9FBE'],
      });

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Website Development',
        budget: '$5,000 - $10,000',
        message: '',
      });
    } catch (err) {
      setErrorMsg('Failed to transmit message. Please try again or reach us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypes = [
    'Website Development',
    'UI/UX Design',
    'Branding & Identity',
    'Digital Solutions',
    'Creative Design',
    'Custom Solution / Retainer',
  ];

  const budgetTiers = [
    '< $3,000',
    '$3,000 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+',
  ];

  return (
    <PageTransition>
      {/* ========================================================================= */}
      {/* HERO & BREADCRUMBS                                                        */}
      {/* ========================================================================= */}
      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 relative overflow-hidden bg-mesh-luxury border-b border-[#C9A45C]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <Breadcrumbs items={[{ label: 'Contact Us' }]} className="mb-6" />

          <div className="max-w-3xl">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Initiate Dialogue
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#342C32] tracking-tight leading-tight mb-6">
              Let's Create Something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] to-[#C9A45C]">
                Extraordinary Together.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#342C32]/80 leading-relaxed font-sans">
              Have an upcoming launch, brand transformation, or custom digital requirement? Share your vision with our creative engineering team.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MAIN INTERACTIVE CONTACT SECTION                                          */}
      {/* ========================================================================= */}
      <section className="py-20 sm:py-28 bg-[#FFF9F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Column: Direct Communication Channels & Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-[36px] bg-white border border-[#C9A45C]/30 shadow-xl space-y-6">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C9A45C] block mb-1">
                    Direct Channels
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#342C32]">
                    Studio Information
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* WhatsApp */}
                  {settings.whatsappNumber && (
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl bg-[#FFF9F6] hover:bg-[#F7DDE3]/50 border border-[#C9A45C]/25 flex items-center justify-between group transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center">
                          <MessageSquare className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#342C32]/50 block">Instant Chat</span>
                          <span className="text-xs font-bold text-[#342C32]">{settings.whatsappNumber}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#C9A45C] group-hover:text-[#C94F78] group-hover:translate-x-0.5 transition-all" />
                    </a>
                  )}

                  {/* Email */}
                  <a
                    href={`mailto:${settings.contactEmail}`}
                    className="p-4 rounded-2xl bg-[#FFF9F6] hover:bg-[#DDF3FC]/50 border border-[#C9A45C]/25 flex items-center justify-between group transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#5D9FBE]/15 text-[#5D9FBE] flex items-center justify-center">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#342C32]/50 block">Email Inquiries</span>
                        <span className="text-xs font-bold text-[#342C32]">{settings.contactEmail}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#C9A45C] group-hover:text-[#5D9FBE] group-hover:translate-x-0.5 transition-all" />
                  </a>

                  {/* Phone */}
                  <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#C94F78]/15 text-[#C94F78] flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#342C32]/50 block">Direct Line</span>
                      <span className="text-xs font-bold text-[#342C32]">{settings.contactPhone}</span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25 flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#C9A45C]/15 text-[#C9A45C] flex items-center justify-center">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#342C32]/50 block">Studio Headquarters</span>
                      <span className="text-xs font-bold text-[#342C32]">{settings.contactAddress}</span>
                    </div>
                  </div>
                </div>

                {/* Response SLA Note */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F7DDE3]/50 to-[#FFF9F6] border border-[#E8B8C4] flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#C94F78] shrink-0" />
                  <p className="text-xs text-[#342C32]/80">
                    <span className="font-bold">Guaranteed Response SLA:</span> All inquiries receive an executive response within 24 business hours.
                  </p>
                </div>

                {/* Socials */}
                <div className="pt-4 border-t border-[#C9A45C]/20 flex items-center gap-3">
                  <span className="text-xs font-bold uppercase text-[#342C32]/60">Follow Us:</span>
                  {settings.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#FFF9F6] hover:bg-[#C94F78] hover:text-white transition-colors text-[#342C32]/70"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {settings.linkedinUrl && (
                    <a
                      href={settings.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-[#FFF9F6] hover:bg-[#5D9FBE] hover:text-white transition-colors text-[#342C32]/70"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Contact & Proposal Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-[36px] bg-white border border-[#C9A45C]/30 shadow-2xl relative">
                
                <div className="mb-8">
                  <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C94F78] block mb-1">
                    Start a Project
                  </span>
                  <h2 className="font-serif text-3xl font-bold text-[#342C32]">
                    Tell Us About Your Vision
                  </h2>
                </div>

                <AnimatePresence>
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#F7DDE3] text-[#C94F78] flex items-center justify-center mx-auto shadow-md">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#342C32]">
                        Enquiry Transmitted Successfully!
                      </h3>
                      <p className="text-sm text-[#342C32]/75 max-w-md mx-auto leading-relaxed">
                        Thank you for reaching out to Mirai Studio. Our lead partners will review your project brief and reply within 24 hours.
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="mt-6 px-8 py-3 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C9A45C] transition-colors"
                      >
                        Submit Another Inquiry
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {errorMsg && (
                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                          {errorMsg}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-[#342C32] block mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alexander Vance"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78]"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-[#342C32] block mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. alexander@brand.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-[#342C32] block mb-2">
                            Phone / WhatsApp (Optional)
                          </label>
                          <input
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78]"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-[#342C32] block mb-2">
                            Service of Interest
                          </label>
                          <select
                            value={formData.projectType}
                            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78] cursor-pointer"
                          >
                            {projectTypes.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#342C32] block mb-2">
                          Estimated Budget Tier
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                          {budgetTiers.map((b) => (
                            <button
                              type="button"
                              key={b}
                              onClick={() => setFormData({ ...formData, budget: b })}
                              className={`py-2 px-3 rounded-xl text-[11px] font-semibold transition-all border cursor-pointer text-center ${
                                formData.budget === b
                                  ? 'bg-[#342C32] text-white border-[#342C32]'
                                  : 'bg-[#FFF9F6] text-[#342C32]/70 border-[#C9A45C]/30 hover:border-[#C94F78]'
                              }`}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#342C32] block mb-2">
                          Project Details & Timeline *
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us about your brand goals, target timeline, key functional needs, or existing assets..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-full bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Transmitting Brief...</span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Transmit Project Inquiry</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </section>
    </PageTransition>
  );
};
