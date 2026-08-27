import React, { useState } from 'react';
import { ShieldCheck, Lock, Upload, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { BrandLogo } from '../BrandLogo';
import { SiteSettings } from '../../types';

interface LogoManagerProps {
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => void;
  showToast: (msg: string) => void;
}

export const LogoManager: React.FC<LogoManagerProps> = ({
  settings,
  onSaveSettings,
  showToast,
}) => {
  const [customUrlInput, setCustomUrlInput] = useState(settings.customLogoUrl || '');

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...settings,
      customLogoUrl: customUrlInput.trim() || null,
    };
    onSaveSettings(updated);
    showToast('Brand logo configuration updated.');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const updated = {
          ...settings,
          customLogoUrl: reader.result,
        };
        setCustomUrlInput(reader.result);
        onSaveSettings(updated);
        showToast('Custom brand logo asset uploaded.');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRestoreOriginal = () => {
    const updated = {
      ...settings,
      customLogoUrl: null,
    };
    setCustomUrlInput('');
    onSaveSettings(updated);
    showToast('Official original brand asset restored.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-[#C9A45C]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF9F6] border border-[#C9A45C]/40 text-xs font-bold text-[#C9A45C] uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Protected Brand Asset</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#342C32]">
            Official Brand Logo Asset
          </h2>
          <p className="text-xs text-[#342C32]/60">
            System safeguards and live visual verification for Mirai official identity
          </p>
        </div>

        <button
          type="button"
          onClick={handleRestoreOriginal}
          className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#342C32] bg-[#FFF9F6] border border-[#C9A45C]/30 hover:border-[#C94F78] transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#C9A45C]" />
          <span>Restore Original Logo</span>
        </button>
      </div>

      {/* Security Rule Alert Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#FFF9F6] to-[#F7DDE3]/30 border-2 border-[#C9A45C]/30 flex items-start gap-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-white border border-[#C9A45C]/40 flex items-center justify-center text-[#C94F78] shrink-0 shadow-2xs">
          <ShieldCheck className="w-6 h-6 text-[#C9A45C]" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-[#342C32] mb-1 flex items-center gap-2">
            <span>Brand Identity Policy: Active Protection</span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#C94F78] text-white">
              IMMUTABLE
            </span>
          </h3>
          <p className="text-xs text-[#342C32]/80 leading-relaxed font-sans">
            The official brand logo design (stylized <strong>"MIRAI"</strong>, dual female creative work illustrations, floral botanical sprig, gold quotation marks, and luxury palette) is a fixed brand asset. AI models are strictly prohibited from redesigning, recoloring, distorting, or replacing it with synthetic approximations.
          </p>
        </div>
      </div>

      {/* Live Brand Preview Stages */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/25 shadow-xs">
        <h3 className="font-serif text-xl font-bold text-[#342C32] mb-6">
          Multi-Scale Visual Inspection
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large Preview */}
          <div className="p-6 rounded-2xl bg-mesh-luxury border border-[#C9A45C]/20 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#342C32]/60 mb-4">
              Hero / Full Stage (Size XL)
            </span>
            <div className="p-4 bg-white/70 rounded-2xl border border-[#C9A45C]/30 shadow-xs mb-4">
              <BrandLogo size="xl" customUrl={settings.customLogoUrl} withGlow />
            </div>
            <span className="text-xs text-[#342C32]/70 font-serif">120px scale</span>
          </div>

          {/* Medium Preview */}
          <div className="p-6 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/20 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#342C32]/60 mb-4">
              Navbar & Header (Size MD)
            </span>
            <div className="p-4 bg-white/70 rounded-2xl border border-[#C9A45C]/30 shadow-xs mb-4">
              <BrandLogo size="md" customUrl={settings.customLogoUrl} />
            </div>
            <span className="text-xs text-[#342C32]/70 font-serif">64px scale</span>
          </div>

          {/* Dark Contrast Preview */}
          <div className="p-6 rounded-2xl bg-[#342C32] border border-[#C9A45C]/30 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFF9F6]/60 mb-4">
              Dark Mode & Footer (Size LG)
            </span>
            <div className="p-4 bg-[#342C32] rounded-2xl border border-[#C9A45C]/30 shadow-xs mb-4">
              <BrandLogo size="lg" customUrl={settings.customLogoUrl} withGlow />
            </div>
            <span className="text-xs text-[#FFF9F6]/70 font-serif">96px on dark</span>
          </div>
        </div>
      </div>

      {/* Manual Upload Replacement (Optional client manual upload) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/25 shadow-xs space-y-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-[#342C32] mb-1">
            Manual Asset Override (Optional)
          </h3>
          <p className="text-xs text-[#342C32]/60">
            If you have a new vector/raster asset file exported directly from your design team:
          </p>
        </div>

        <form onSubmit={handleApplyUrl} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-2">
              Direct Asset Image URL
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={customUrlInput}
                onChange={(e) => setCustomUrlInput(e.target.value)}
                placeholder="https://your-domain.com/assets/logo.png"
                className="flex-1 px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg cursor-pointer shrink-0"
              >
                Apply URL
              </button>
            </div>
          </div>

          <div className="pt-2">
            <span className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-2">
              Or Upload Approved Graphic File:
            </span>
            <label className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FFF9F6] border-2 border-dashed border-[#C9A45C]/40 text-xs font-semibold text-[#342C32] hover:bg-white hover:border-[#C94F78] transition-all cursor-pointer">
              <Upload className="w-4 h-4 text-[#C9A45C]" />
              <span>Select PNG, JPG, or SVG from computer</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
