import React, { useState } from 'react';
import { Save, RefreshCw, Sliders, Mail, Globe, Sparkles } from 'lucide-react';
import { SiteSettings } from '../../types';

interface SettingsManagerProps {
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
  showToast: (msg: string) => void;
}

export const SettingsManager: React.FC<SettingsManagerProps> = ({
  settings,
  onSaveSettings,
  showToast,
}) => {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    showToast('Site settings updated and published successfully.');
  };

  const handleResetDefaults = () => {
    const defaultSettings: SiteSettings = {
      heroHeading: 'Ideas That Inspire.\nInnovation That Creates.\nImpact That Matters.',
      heroSubheading: 'We transform creative ideas into meaningful digital experiences that help brands grow, connect and stand out.',
      heroCtaPrimary: 'Explore Our Work',
      heroCtaSecondary: "Let's Create Together",
      aboutTitle: 'Where Ideas Become Impact',
      aboutStory: 'At Mirai, we believe exceptional digital experiences should be as emotionally evocative as they are technologically flawless. We merge creative artistry with strategic innovation, turning visionary concepts into impactful digital products that help modern brands command attention and thrive.',
      aboutSubtext: 'Our multidisciplinary studio bridges luxury aesthetics, smart engineering, and deliberate strategy.',
      contactEmail: 'hello@mirai-studio.com',
      contactPhone: '+1 (800) 555-0199',
      contactAddress: '750 Madison Avenue, Suite 1400, New York, NY',
      whatsappNumber: '+18005550199',
      instagramUrl: 'https://instagram.com',
      linkedinUrl: 'https://linkedin.com',
      customLogoUrl: settings.customLogoUrl,
      stats: {
        ideas: '50+',
        projects: '6+',
        commitment: '100%',
        support: '24/7',
      },
    };
    setFormData(defaultSettings);
    onSaveSettings(defaultSettings);
    showToast('Default content restored.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C9A45C]/20">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#342C32]">
            Website Content & Copy Settings
          </h2>
          <p className="text-xs text-[#342C32]/60">
            Control headlines, story descriptions, contact channels, and agency metrics live
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#342C32]/70 hover:text-[#342C32] border border-[#C9A45C]/30 hover:bg-[#FFF9F6] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {/* Section 1: Hero Settings */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/25 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-[#C94F78] pb-3 border-b border-[#C9A45C]/15">
          <Sparkles className="w-4 h-4" />
          <span>Hero Stage Configuration</span>
        </div>

        <div className="grid grid-cols-1 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              Hero Supporting Subheading
            </label>
            <textarea
              rows={2}
              value={formData.heroSubheading}
              onChange={(e) => setFormData({ ...formData, heroSubheading: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                Primary CTA Button Text
              </label>
              <input
                type="text"
                value={formData.heroCtaPrimary}
                onChange={(e) => setFormData({ ...formData, heroCtaPrimary: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                Secondary CTA Button Text
              </label>
              <input
                type="text"
                value={formData.heroCtaSecondary}
                onChange={(e) => setFormData({ ...formData, heroCtaSecondary: e.target.value })}
                className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: About & Stats */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/25 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-[#5D9FBE] pb-3 border-b border-[#C9A45C]/15">
          <Sliders className="w-4 h-4" />
          <span>About Section & Agency Metrics</span>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              About Heading Title
            </label>
            <input
              type="text"
              value={formData.aboutTitle}
              onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              Primary Brand Story
            </label>
            <textarea
              rows={3}
              value={formData.aboutStory}
              onChange={(e) => setFormData({ ...formData, aboutStory: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm resize-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              Secondary Philosophy Subtext
            </label>
            <textarea
              rows={2}
              value={formData.aboutSubtext}
              onChange={(e) => setFormData({ ...formData, aboutSubtext: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm resize-none"
            />
          </div>

          {/* Animated Statistics Numbers */}
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-2">
              4 Metric Numbers
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] text-[#342C32]/60 uppercase font-semibold block mb-1">
                  Creative Ideas
                </span>
                <input
                  type="text"
                  value={formData.stats.ideas}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, ideas: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-sm font-bold text-[#C94F78]"
                />
              </div>

              <div>
                <span className="text-[10px] text-[#342C32]/60 uppercase font-semibold block mb-1">
                  Projects
                </span>
                <input
                  type="text"
                  value={formData.stats.projects}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, projects: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-sm font-bold text-[#5D9FBE]"
                />
              </div>

              <div>
                <span className="text-[10px] text-[#342C32]/60 uppercase font-semibold block mb-1">
                  Commitment
                </span>
                <input
                  type="text"
                  value={formData.stats.commitment}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, commitment: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-sm font-bold text-[#C9A45C]"
                />
              </div>

              <div>
                <span className="text-[10px] text-[#342C32]/60 uppercase font-semibold block mb-1">
                  Support
                </span>
                <input
                  type="text"
                  value={formData.stats.support}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stats: { ...formData.stats, support: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-sm font-bold text-[#342C32]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Contact Channels & Socials */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/25 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-[#C9A45C] pb-3 border-b border-[#C9A45C]/15">
          <Mail className="w-4 h-4" />
          <span>Contact Coordinates & Social Channels</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              Contact Email
            </label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              Phone Number
            </label>
            <input
              type="text"
              value={formData.contactPhone}
              onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              WhatsApp Connect Number
            </label>
            <input
              type="text"
              value={formData.whatsappNumber}
              onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              Studio Physical Address
            </label>
            <input
              type="text"
              value={formData.contactAddress}
              onChange={(e) => setFormData({ ...formData, contactAddress: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              Instagram Profile URL
            </label>
            <input
              type="url"
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              value={formData.linkedinUrl}
              onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
            />
          </div>
        </div>
      </div>

      {/* Save Trigger Bottom */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save All Settings</span>
        </button>
      </div>
    </form>
  );
};
