import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, ExternalLink, Image as ImageIcon, Check } from 'lucide-react';
import { Project } from '../../types';

interface ProjectManagerProps {
  projects: Project[];
  onSaveProjects: (projects: Project[]) => void;
  showToast: (msg: string) => void;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  projects,
  onSaveProjects,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const curatedImages = [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  ];

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNew = () => {
    setIsNew(true);
    setEditingProject({
      id: 'proj-' + Date.now(),
      title: '',
      category: 'Websites',
      description: '',
      image: curatedImages[0],
      client: '',
      year: '2026',
      link: 'https://example.com',
      featured: true,
    });
  };

  const handleEdit = (p: Project) => {
    setIsNew(false);
    setEditingProject({ ...p });
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    onSaveProjects(updated);
    setDeleteConfirmId(null);
    showToast('Project deleted successfully.');
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title) return;

    let updated: Project[];
    if (isNew) {
      updated = [editingProject, ...projects];
      showToast('New project added to portfolio.');
    } else {
      updated = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
      showToast('Project details updated.');
    }

    onSaveProjects(updated);
    setEditingProject(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProject) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditingProject({ ...editingProject, image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C9A45C]/20">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#342C32]">
            Projects Management
          </h2>
          <p className="text-xs text-[#342C32]/60">
            Showcase your best client case studies, change categories, images, and descriptions
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-[#C9A45C] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search projects by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-[#C9A45C]/30 focus:border-[#C94F78] focus:ring-2 focus:ring-[#E8B8C4]/30 outline-hidden text-xs text-[#342C32]"
        />
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-3xl border border-[#C9A45C]/25 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#342C32]">
            <thead className="bg-[#FFF9F6] text-[#342C32]/70 uppercase font-semibold border-b border-[#C9A45C]/20">
              <tr>
                <th className="px-6 py-4">Project Preview</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Client / Year</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A45C]/15">
              {filtered.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#FFF9F6]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-14 h-11 rounded-xl object-cover border border-[#C9A45C]/30 shrink-0"
                      />
                      <div>
                        <p className="font-bold text-sm text-[#342C32]">{proj.title}</p>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-[#5D9FBE] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Live URL</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#F7DDE3] text-[#C94F78]">
                      {proj.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-[#342C32]">{proj.client || 'Internal'}</p>
                    <p className="text-[#342C32]/60 text-[11px]">{proj.year || '2026'}</p>
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-[#342C32]/75">
                    {proj.description}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(proj)}
                      className="p-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-[#342C32] hover:text-[#C94F78] hover:border-[#C94F78] transition-colors cursor-pointer"
                      title="Edit Project"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(proj.id)}
                      className="p-2 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full border border-[#C9A45C]/30 shadow-2xl text-center">
            <h3 className="font-serif text-xl font-bold text-[#342C32] mb-2">Delete Project?</h3>
            <p className="text-xs text-[#342C32]/70 mb-6">
              Are you sure you want to permanently remove this case study from the website?
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

      {/* Add / Edit Project Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#C9A45C]/40 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C9A45C]/20">
              <h3 className="font-serif text-xl font-bold text-[#342C32]">
                {isNew ? 'Create New Project' : 'Edit Project Details'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="w-8 h-8 rounded-full bg-[#FFF9F6] text-[#342C32] hover:text-[#C94F78] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  placeholder="e.g. Luminary Global Brand Flagship"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as 'Websites' | 'Branding' | 'UI/UX' | 'Creative',
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm cursor-pointer"
                  >
                    <option value="Websites">Websites</option>
                    <option value="Branding">Branding</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Creative">Creative</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editingProject.client || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    placeholder="e.g. Maison Luxe"
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Year
                  </label>
                  <input
                    type="text"
                    value={editingProject.year || '2026'}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                    Live Project Link
                  </label>
                  <input
                    type="text"
                    value={editingProject.link || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, link: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  placeholder="Describe the challenges, creative execution, and outcome..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 focus:border-[#C94F78] outline-hidden text-sm resize-none"
                />
              </div>

              {/* Image Selection & Upload */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-[#342C32]/80 mb-1.5">
                  Project Image Source
                </label>
                
                {/* Image Preview & URL input */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={editingProject.image}
                    alt="Preview"
                    className="w-16 h-16 rounded-xl object-cover border border-[#C9A45C]/40"
                  />
                  <div className="flex-1">
                    <input
                      type="text"
                      value={editingProject.image}
                      onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                      placeholder="Paste image URL..."
                      className="w-full px-3 py-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs mb-1"
                    />
                    <label className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#C9A45C]/30 text-[11px] font-medium text-[#342C32] hover:bg-[#FFF9F6] cursor-pointer">
                      <ImageIcon className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>Upload Local Image File</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Quick Curated Selection */}
                <p className="text-[10px] text-[#342C32]/60 uppercase tracking-wider font-semibold mb-1">
                  Or Pick Curated Luxury Aesthetic:
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {curatedImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setEditingProject({ ...editingProject, image: img })}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        editingProject.image === img ? 'border-[#C94F78] ring-2 ring-[#C94F78]/30' : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Preset" className="w-full h-full object-cover" />
                      {editingProject.image === img && (
                        <div className="absolute inset-0 bg-[#C94F78]/40 flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#C9A45C]/20">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#342C32]/70 hover:bg-[#FFF9F6] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
