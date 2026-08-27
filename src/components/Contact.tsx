import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MessageSquare, Mail, Phone, MapPin, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SiteSettings } from '../types';
import { StorageService } from '../lib/storage';

interface ContactProps {
  settings: SiteSettings;
  onEnquirySubmitted?: () => void;
  prefilledProjectType?: string;
  prefilledMessage?: string;
}

export const Contact: React.FC<ContactProps> = ({
  settings,
  onEnquirySubmitted,
  prefilledProjectType,
  prefilledMessage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: prefilledProjectType || 'Website Development',
    message: prefilledMessage || '',
  });

  React.useEffect(() => {
    if (prefilledProjectType) {
      setFormData((prev) => ({ ...prev, projectType: prefilledProjectType }));
    }
    if (prefilledMessage) {
      setFormData((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledProjectType, prefilledMessage]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      StorageService.addContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        projectType: formData.projectType,
        message: formData.message,
      });

      setIsSubmitting(false);
      setIsSuccess(true);

      // Gold and Rose confetti celebratory burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C9A45C', '#E8B8C4', '#C94F78', '#A9DDF2', '#E8D3A3'],
      });

      if (onEnquirySubmitted) {
        onEnquirySubmitted();
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Website Development',
        message: '',
      });
    }, 700);
  };

  const projectTypes = [
    'Website Development',
    'UI/UX Design',
    'Branding & Identity',
    'Digital Solutions',
    'Creative Design',
    'Custom Solution',
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden bg-white">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-[#F7DDE3]/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#DDF3FC]/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Text & Channels */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-10 h-[1.5px] bg-[#C9A45C]" />
              <span className="text-[11px] font-bold tracking-[0.35em] text-[#5D9FBE] uppercase font-sans">
                Initiate Collaboration
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#342C32] tracking-tight mb-4 leading-tight">
              Let's Turn Your Idea Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C94F78] via-[#E8B8C4] to-[#C9A45C]">
                Impact.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#342C32]/80 leading-relaxed mb-8 font-sans">
              Have a visionary project? Let's build something meaningful, beautiful, and commercially unforgettable together.
            </p>

            {/* Direct Connect Quick Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Mirai%20Studio,%20I'd%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`mailto:${settings.contactEmail}?subject=Project%20Enquiry%20-%20Mirai%20Studio`}
                className="px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#342C32] bg-[#FFF9F6] border border-[#C9A45C]/40 hover:border-[#C94F78] transition-all shadow-xs flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4 text-[#C94F78]" />
                <span>Email Studio</span>
              </a>
            </div>

            {/* Direct Info Card List */}
            <div className="space-y-4 pt-8 border-t border-[#C9A45C]/20">
              <div className="flex items-center gap-4 text-sm text-[#342C32]/80">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 flex items-center justify-center text-[#C9A45C] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-[#342C32]/60 uppercase tracking-wider font-semibold">Direct Email</p>
                  <a href={`mailto:${settings.contactEmail}`} className="font-medium text-[#342C32] hover:text-[#C94F78] transition-colors">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#342C32]/80">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 flex items-center justify-center text-[#5D9FBE] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-[#342C32]/60 uppercase tracking-wider font-semibold">Direct Phone</p>
                  <span className="font-medium text-[#342C32]">{settings.contactPhone}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#342C32]/80">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 flex items-center justify-center text-[#C94F78] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-[#342C32]/60 uppercase tracking-wider font-semibold">Studio Location</p>
                  <span className="font-medium text-[#342C32]">{settings.contactAddress}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-[36px] sm:rounded-[44px] bg-gradient-to-br from-[#FFF9F6] to-white border border-[#C9A45C]/30 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />
              
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-[#F7DDE3] border border-[#C94F78]/30 flex items-center justify-center text-[#C94F78] mb-6 shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32] mb-2">
                    Enquiry Received
                  </h3>
                  <p className="text-sm sm:text-base text-[#342C32]/75 max-w-md mb-8">
                    Thank you for reaching out to Mirai. Our creative strategy team will review your project requirements and connect within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-[#342C32] border border-[#C9A45C]/40 hover:bg-[#FFF9F6] transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <div className="flex items-center justify-between pb-4 border-b border-[#C9A45C]/20">
                    <h3 className="font-serif text-2xl font-bold text-[#342C32]">
                      Start a Conversation
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#C9A45C] font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Confidential & Direct</span>
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#C9A45C]/30 focus:border-[#C94F78] focus:ring-2 focus:ring-[#E8B8C4]/30 outline-hidden text-sm transition-all text-[#342C32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="eleanor@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#C9A45C]/30 focus:border-[#C94F78] focus:ring-2 focus:ring-[#E8B8C4]/30 outline-hidden text-sm transition-all text-[#342C32]"
                      />
                    </div>
                  </div>

                  {/* Phone & Project Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#C9A45C]/30 focus:border-[#C94F78] focus:ring-2 focus:ring-[#E8B8C4]/30 outline-hidden text-sm transition-all text-[#342C32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                        Project Category
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-2xl bg-white border border-[#C9A45C]/30 focus:border-[#C94F78] focus:ring-2 focus:ring-[#E8B8C4]/30 outline-hidden text-sm transition-all text-[#342C32] cursor-pointer"
                      >
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                      Tell Us About Your Vision *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Share your goals, timeline, and what you would like to achieve..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-white border border-[#C9A45C]/30 focus:border-[#C94F78] focus:ring-2 focus:ring-[#E8B8C4]/30 outline-hidden text-sm transition-all text-[#342C32] resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full text-xs font-semibold uppercase tracking-widest text-white bg-gradient-to-r from-[#C94F78] via-[#C9A45C] to-[#C94F78] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_8px_25px_rgba(201,79,120,0.25)] hover:shadow-[0_10px_30px_rgba(201,164,92,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Enquiry...</span>
                    ) : (
                      <>
                        <span>Submit Project Brief</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
