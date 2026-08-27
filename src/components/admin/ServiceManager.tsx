import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Globe, Layout, Sparkles, Cpu, Palette, Layers, Check } from 'lucide-react';
import { Service } from '../../types';

interface ServiceManagerProps {
  services: Service[];
  onSaveServices: (services: Service[]) => void;
  showToast: (msg: string) => void;
}

export const ServiceManager: React.FC<ServiceManagerProps> = ({
  services,
  onSaveServices,
  showToast,
}) => {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [featuresInput, setFeaturesInput] = useState('');

  const iconOptions = ['Globe', 'Layout', 'Sparkles', 'Cpu', 'Palette', 'Layers'];

  const handleAddNew = () => {
    setIsNew(true);
    const nextNum = (services.length + 1).toString().padStart(2, '0');
    setEditingService({
      id: 'serv-' + Date.now(),
      number: nextNum,
      title: '',
      description: '',
      iconName: 'Sparkles',
      features: ['Bespoke Execution', 'Performance Focused'],
    });
    setFeaturesInput('Bespoke Execution, Performance Focused');
  };

  const handleEdit = (s: Service) => {
    setIsNew(false);
    setEditingService({ ...s });
    setFeaturesInput((s.features || []).join(', '));
  };

  const handleDelete = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    onSaveServices(updated);
    setDeleteConfirmId(null);
    showToast('Service removed.');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title) return;

    const parsedFeatures = featuresInput
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    const finalized: Service = {
      ...editingService,
      features: parsedFeatures,
    };

    let updated: Service[];
    if (isNew) {
      updated = [...services, finalized];
      showToast('New capability added.');
    } else {
      updated = services.map((s) => (s.id === finalized.id ? finalized : s));
      showToast('Service updated.');
    }

    onSaveServices(updated);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C9A45C]/20">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#342C32]">
            Services Management
          </h2>
          <p className="text-xs text-[#342C32]/60">
            Define the core solutions, deliverables, and icons presented on the public website
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((serv) => (
          <div
            key={serv.id}
            className="bg-white rounded-3xl p-6 border border-[#C9A45C]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-xl font-bold text-[#C9A45C]">
                  {serv.number}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#F7DDE3] text-[#C94F78]">
                  {serv.iconName}
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-[#342C32] mb-2">
                {serv.title}
              </h3>

              <p className="text-xs text-[#342C32]/75 leading-relaxed mb-4">
                {serv.description}
              </p>

              {serv.features && serv.features.length > 0 && (
                <div className="space-y-1 mb-4">
                  {serv.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#342C32]/80">
                      <Check className="w-3 h-3 text-[#C94F78] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#C9A45C]/20 flex items-center justify-end gap-2">
              <button
                onClick={() => handleEdit(serv)}
                className="p-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-[#342C32] hover:text-[#C94F78] cursor-pointer"
                title="Edit Service"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteConfirmId(serv.id)}
                className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 cursor-pointer"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-[#C9A45C]/30 shadow-2xl text-center">
            <h3 className="font-serif text-xl font-bold text-[#342C32] mb-2">Delete Service?</h3>
            <p className="text-xs text-[#342C32]/70 mb-6">
              Are you sure you want to remove this service from your public agency offerings?
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-full text-xs font-semibold text-[#342C32] border border-[#C9A45C]/30 hover:bg-[#FFF9F6] cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#C9A45C]/40 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C9A45C]/20">
              <h3 className="font-serif text-xl font-bold text-[#342C32]">
                {isNew ? 'Add New Service' : 'Edit Service'}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="w-8 h-8 rounded-full bg-[#FFF9F6] text-[#342C32] hover:text-[#C94F78] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Order Number
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.number}
                    onChange={(e) => setEditingService({ ...editingService, number: e.target.value })}
                    placeholder="01"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Icon Style
                  </label>
                  <select
                    value={editingService.iconName}
                    onChange={(e) => setEditingService({ ...editingService, iconName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm cursor-pointer"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  placeholder="e.g. Website Development"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                  Service Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingService.description}
                  onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                  placeholder="Modern, responsive and conversion-focused..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm resize-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                  Key Deliverables (Comma separated)
                </label>
                <input
                  type="text"
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Responsive Design, CMS Integration, SEO Architecture"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#C9A45C]/20">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#342C32]/70 hover:bg-[#FFF9F6] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
