import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Check,
  Sparkles,
  Clock,
  ArrowUp,
  ArrowDown,
  Crown,
  Gift,
  Eye,
  EyeOff,
  RotateCcw,
} from 'lucide-react';
import { PricingTier } from '../../types';

interface PricingManagerProps {
  pricing: PricingTier[];
  onSavePricing: (pricing: PricingTier[]) => void;
  showToast: (msg: string) => void;
}

export const PricingManager: React.FC<PricingManagerProps> = ({
  pricing,
  onSavePricing,
  showToast,
}) => {
  const [editingTier, setEditingTier] = useState<PricingTier | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  const handleEdit = (tier: PricingTier) => {
    setEditingTier({
      ...tier,
      features: [...tier.features],
      breakdown: tier.breakdown ? [...tier.breakdown] : [],
    });
    setIsNew(false);
  };

  const handleAddNew = () => {
    setEditingTier({
      id: `price-${Date.now()}`,
      name: '',
      tagline: '',
      price: '₹5,000',
      priceOneTime: '₹5,000',
      period: 'one-time',
      badge: '',
      isPopular: false,
      isLaunchOffer: false,
      isActive: true,
      turnaround: '7–10 Working Days',
      description: '',
      features: ['Home Page', 'Responsive Design', 'Contact Form'],
      ctaText: 'View Details',
      ctaDestination: '/pricing',
    });
    setIsNew(true);
  };

  const handleAddFeature = () => {
    if (!featureInput.trim() || !editingTier) return;
    setEditingTier({
      ...editingTier,
      features: [...editingTier.features, featureInput.trim()],
    });
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingTier) return;
    setEditingTier({
      ...editingTier,
      features: editingTier.features.filter((_, i) => i !== index),
    });
  };

  const handleMoveFeature = (index: number, direction: 'up' | 'down') => {
    if (!editingTier) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= editingTier.features.length) return;
    const feats = [...editingTier.features];
    const temp = feats[index];
    feats[index] = feats[targetIdx];
    feats[targetIdx] = temp;
    setEditingTier({ ...editingTier, features: feats });
  };

  const handleToggleActive = (id: string) => {
    const updated = pricing.map((t) =>
      t.id === id ? { ...t, isActive: t.isActive === false ? true : false } : t
    );
    onSavePricing(updated);
    showToast('Package visibility updated');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTier || !editingTier.name || !editingTier.price) {
      showToast('Please provide a package name and price');
      return;
    }

    let updated: PricingTier[];
    if (isNew) {
      updated = [...pricing, editingTier];
      showToast('New pricing package created');
    } else {
      updated = pricing.map((t) => (t.id === editingTier.id ? editingTier : t));
      showToast('Pricing package updated');
    }

    onSavePricing(updated);
    setEditingTier(null);
  };

  const handleDelete = (id: string) => {
    if (pricing.length <= 1) {
      showToast('You must keep at least one pricing tier');
      return;
    }
    const updated = pricing.filter((t) => t.id !== id);
    onSavePricing(updated);
    showToast('Pricing package removed');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C9A45C]/20">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#342C32]">
            Pricing Packages Management
          </h2>
          <p className="text-xs text-[#342C32]/70 font-sans mt-0.5">
            Configure website packages, Launch Offers, delivery velocities, features, and public CTAs.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] hover:opacity-95 shadow-md flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Package</span>
        </button>
      </div>

      {/* Tiers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricing.map((tier) => (
          <div
            key={tier.id}
            className={`p-6 rounded-3xl bg-white border transition-all flex flex-col justify-between shadow-2xs relative ${
              tier.isLaunchOffer
                ? 'border-[#C9A45C] ring-2 ring-[#C9A45C]/30 bg-gradient-to-b from-[#FFFDF9] to-white'
                : tier.isPopular || tier.featured
                ? 'border-[#C94F78] ring-2 ring-[#C94F78]/20'
                : 'border-[#C9A45C]/30 hover:border-[#C9A45C]'
            } ${tier.isActive === false ? 'opacity-60' : ''}`}
          >
            {/* Badges */}
            <div className="flex items-center gap-1.5 absolute top-4 right-4">
              {tier.isLaunchOffer && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider bg-[#C9A45C] text-[#342C32] flex items-center gap-1">
                  <Gift className="w-3 h-3" />
                  <span>Offer</span>
                </span>
              )}
              {tier.isPopular && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#F7DDE3] text-[#C94F78] flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  <span>Popular</span>
                </span>
              )}
              {tier.badge && !tier.isPopular && !tier.isLaunchOffer && (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#DDF3FC] text-[#5D9FBE]">
                  {tier.badge}
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif text-xl font-bold text-[#342C32]">
                  {tier.name}
                </h3>
                {tier.isActive === false && (
                  <span className="text-[9px] font-bold uppercase text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    Hidden
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#5D9FBE] font-semibold uppercase tracking-wider mb-4">
                {tier.tagline}
              </p>

              {/* Price */}
              <div className="mb-4 pb-4 border-b border-[#C9A45C]/15">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-3xl font-extrabold text-[#342C32]">
                    {tier.price || tier.priceOneTime}
                  </span>
                  {tier.originalPrice && (
                    <span className="text-xs line-through text-[#342C32]/40 font-serif">
                      {tier.originalPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[#C9A45C] font-bold mt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Velocity: {tier.turnaround}</span>
                </div>
              </div>

              <p className="text-xs text-[#342C32]/75 mb-4 line-clamp-2">
                {tier.description}
              </p>

              {/* Inclusions summary */}
              <div className="space-y-1.5 mb-6">
                <span className="text-[9px] uppercase tracking-wider font-bold text-[#342C32]/50 block">
                  Features ({tier.features.length})
                </span>
                {tier.features.slice(0, 4).map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#342C32]/80">
                    <Check className="w-3 h-3 text-[#C94F78] shrink-0" />
                    <span className="truncate">{f}</span>
                  </div>
                ))}
                {tier.features.length > 4 && (
                  <span className="text-[10px] text-[#5D9FBE] font-semibold block">
                    +{tier.features.length - 4} more deliverables
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-[#C9A45C]/15">
              <button
                onClick={() => handleToggleActive(tier.id)}
                className="p-2 rounded-xl text-xs text-[#342C32]/70 hover:bg-[#FFF9F6] border border-[#C9A45C]/30 cursor-pointer"
                title={tier.isActive === false ? 'Publish Package' : 'Hide Package'}
              >
                {tier.isActive === false ? (
                  <EyeOff className="w-3.5 h-3.5 text-stone-400" />
                ) : (
                  <Eye className="w-3.5 h-3.5 text-[#5D9FBE]" />
                )}
              </button>

              <button
                onClick={() => handleEdit(tier)}
                className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#FFF9F6] text-[#342C32] border border-[#C9A45C]/30 hover:bg-[#F7DDE3]/50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-[#C94F78]" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => handleDelete(tier.id)}
                className="p-2 rounded-xl text-xs text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200 cursor-pointer"
                title="Delete Tier"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Create Modal */}
      {editingTier && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-[#C9A45C]/30 p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#C9A45C]/20 mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#342C32]">
                {isNew ? 'Create New Pricing Package' : 'Edit Pricing Package'}
              </h3>
              <button
                onClick={() => setEditingTier(null)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                    Package Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Professional"
                    value={editingTier.name}
                    onChange={(e) => setEditingTier({ ...editingTier, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C9A45C]/30 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                    Subtitle / Target Audience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Most Popular for Growing Studios"
                    value={editingTier.tagline}
                    onChange={(e) => setEditingTier({ ...editingTier, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C9A45C]/30 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                    Package Price (₹) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. ₹6,000 – ₹8,000"
                    value={editingTier.price || editingTier.priceOneTime || ''}
                    onChange={(e) =>
                      setEditingTier({
                        ...editingTier,
                        price: e.target.value,
                        priceOneTime: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C9A45C]/30 text-sm font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                    Original Price (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹12,000"
                    value={editingTier.originalPrice || ''}
                    onChange={(e) =>
                      setEditingTier({ ...editingTier, originalPrice: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C9A45C]/30 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                    Delivery Velocity
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 7–10 Working Days"
                    value={editingTier.turnaround}
                    onChange={(e) =>
                      setEditingTier({ ...editingTier, turnaround: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C9A45C]/30 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                    CTA Button Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. View Details"
                    value={editingTier.ctaText}
                    onChange={(e) => setEditingTier({ ...editingTier, ctaText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C9A45C]/30 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                    CTA Destination Route
                  </label>
                  <select
                    value={editingTier.ctaDestination || '/pricing'}
                    onChange={(e) =>
                      setEditingTier({ ...editingTier, ctaDestination: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#C9A45C]/30 text-sm"
                  >
                    <option value="/pricing">/pricing (Pricing Page)</option>
                    <option value="/contact">/contact (Contact / Enquiry Form)</option>
                    <option value="/services">/services (Services Catalogue)</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#342C32]">
                  <input
                    type="checkbox"
                    checked={editingTier.isPopular || editingTier.featured || false}
                    onChange={(e) =>
                      setEditingTier({
                        ...editingTier,
                        isPopular: e.target.checked,
                        featured: e.target.checked,
                      })
                    }
                    className="rounded text-[#C94F78]"
                  />
                  <span>Most Popular Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#342C32]">
                  <input
                    type="checkbox"
                    checked={editingTier.isLaunchOffer || false}
                    onChange={(e) =>
                      setEditingTier({ ...editingTier, isLaunchOffer: e.target.checked })
                    }
                    className="rounded text-[#C9A45C]"
                  />
                  <span>Launch Offer Badge</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-[#342C32]">
                  <input
                    type="checkbox"
                    checked={editingTier.isActive !== false}
                    onChange={(e) =>
                      setEditingTier({ ...editingTier, isActive: e.target.checked })
                    }
                    className="rounded text-[#5D9FBE]"
                  />
                  <span>Active & Visible</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe what this package accomplishes..."
                  value={editingTier.description}
                  onChange={(e) =>
                    setEditingTier({ ...editingTier, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-[#C9A45C]/30 text-sm"
                />
              </div>

              {/* Features List Manager with Reordering */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-2 font-sans">
                  Features & Scope Deliverables ({editingTier.features.length})
                </label>

                <div className="space-y-2 mb-3 max-h-48 overflow-y-auto pr-1">
                  {editingTier.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                    >
                      <div className="flex items-center gap-2 flex-1 mr-2">
                        <Check className="w-3.5 h-3.5 text-[#C94F78] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveFeature(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer"
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveFeature(idx, 'down')}
                          disabled={idx === editingTier.features.length - 1}
                          className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30 cursor-pointer"
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(idx)}
                          className="p-1 text-red-500 hover:text-red-700 cursor-pointer ml-1"
                          title="Remove feature"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a new deliverable feature..."
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-xl border border-[#C9A45C]/30 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 rounded-xl bg-[#F7DDE3] text-[#C94F78] font-bold text-xs hover:bg-[#E8B8C4]/50 cursor-pointer"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setEditingTier(null)}
                  className="px-5 py-2.5 rounded-full border border-stone-300 text-xs font-bold uppercase tracking-wider text-stone-600 hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-wider shadow-md hover:opacity-95 cursor-pointer"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
