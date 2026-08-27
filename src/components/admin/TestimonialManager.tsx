import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Image as ImageIcon } from 'lucide-react';
import { Testimonial } from '../../types';

interface TestimonialManagerProps {
  testimonials: Testimonial[];
  onSaveTestimonials: (testimonials: Testimonial[]) => void;
  showToast: (msg: string) => void;
}

export const TestimonialManager: React.FC<TestimonialManagerProps> = ({
  testimonials,
  onSaveTestimonials,
  showToast,
}) => {
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const curatedAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  ];

  const handleAddNew = () => {
    setIsNew(true);
    setEditingTestimonial({
      id: 'test-' + Date.now(),
      clientName: '',
      role: 'Chief Executive Officer',
      company: '',
      quote: '',
      rating: 5,
      avatar: curatedAvatars[0],
    });
  };

  const handleEdit = (t: Testimonial) => {
    setIsNew(false);
    setEditingTestimonial({ ...t });
  };

  const handleDelete = (id: string) => {
    const updated = testimonials.filter((t) => t.id !== id);
    onSaveTestimonials(updated);
    setDeleteConfirmId(null);
    showToast('Testimonial removed.');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial || !editingTestimonial.clientName || !editingTestimonial.quote) return;

    let updated: Testimonial[];
    if (isNew) {
      updated = [editingTestimonial, ...testimonials];
      showToast('New testimonial added.');
    } else {
      updated = testimonials.map((t) => (t.id === editingTestimonial.id ? editingTestimonial : t));
      showToast('Testimonial updated.');
    }

    onSaveTestimonials(updated);
    setEditingTestimonial(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingTestimonial) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditingTestimonial({ ...editingTestimonial, avatar: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C9A45C]/20">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#342C32]">
            Testimonials Management
          </h2>
          <p className="text-xs text-[#342C32]/60">
            Manage high-profile client reviews, 5-star ratings, and executive quotes
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Testimonials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-[#C9A45C]/30 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#C9A45C]">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A45C]" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-[#C94F78]">Verified Client</span>
              </div>

              <p className="font-serif italic text-sm text-[#342C32]/85 leading-relaxed mb-6">
                "{t.quote}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#C9A45C]/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.clientName}
                  className="w-10 h-10 rounded-full object-cover border border-[#C9A45C]/40"
                />
                <div>
                  <h4 className="font-bold text-xs text-[#342C32]">{t.clientName}</h4>
                  <p className="text-[11px] text-[#342C32]/60">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(t)}
                  className="p-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-[#342C32] hover:text-[#C94F78] cursor-pointer"
                  title="Edit"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDeleteConfirmId(t.id)}
                  className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-[#C9A45C]/30 shadow-2xl text-center">
            <h3 className="font-serif text-xl font-bold text-[#342C32] mb-2">Delete Testimonial?</h3>
            <p className="text-xs text-[#342C32]/70 mb-6">
              Are you sure you want to remove this client endorsement?
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-full text-xs font-semibold text-white bg-red-600 hover:bg-red-700 cursor-pointer"
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

      {/* Add / Edit Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#C9A45C]/40 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C9A45C]/20">
              <h3 className="font-serif text-xl font-bold text-[#342C32]">
                {isNew ? 'Add Client Testimonial' : 'Edit Testimonial'}
              </h3>
              <button
                onClick={() => setEditingTestimonial(null)}
                className="w-8 h-8 rounded-full bg-[#FFF9F6] text-[#342C32] hover:text-[#C94F78] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.clientName}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })
                    }
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Rating (Stars)
                  </label>
                  <select
                    value={editingTestimonial.rating}
                    onChange={(e) =>
                      setEditingTestimonial({
                        ...editingTestimonial,
                        rating: parseInt(e.target.value, 10),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm cursor-pointer"
                  >
                    <option value={5}>★★★★★ (5 Stars)</option>
                    <option value={4}>★★★★ (4 Stars)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Client Role / Title
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.role}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, role: e.target.value })
                    }
                    placeholder="Founder & Creative Director"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    value={editingTestimonial.company}
                    onChange={(e) =>
                      setEditingTestimonial({ ...editingTestimonial, company: e.target.value })
                    }
                    placeholder="Maison Luxe Paris"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                  Client Quote *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingTestimonial.quote}
                  onChange={(e) =>
                    setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })
                  }
                  placeholder="Share the client's testimonial feedback..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm resize-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                  Avatar Picture
                </label>
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={editingTestimonial.avatar}
                    alt="Preview"
                    className="w-12 h-12 rounded-full object-cover border border-[#C9A45C]"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editingTestimonial.avatar}
                      onChange={(e) =>
                        setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value })
                      }
                      placeholder="Avatar URL..."
                      className="w-full px-3 py-1.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs mb-1"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#C9A45C]/30 text-[10px] font-medium text-[#342C32] hover:bg-[#FFF9F6] cursor-pointer">
                      <ImageIcon className="w-3 h-3 text-[#C9A45C]" />
                      <span>Upload Avatar</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#C9A45C]/20">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#342C32]/70 hover:bg-[#FFF9F6] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
