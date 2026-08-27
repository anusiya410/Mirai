import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PipelineLead,
  PipelineStage,
} from '../../types';
import {
  PhoneCall,
  MessageSquare,
  Layout,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Rocket,
  Heart,
  Plus,
  Search,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Edit2,
  Trash2,
  X,
  Phone,
  Mail,
  DollarSign,
  Calendar,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';

interface PipelineManagerProps {
  leads: PipelineLead[];
  onSaveLeads: (leads: PipelineLead[]) => void;
  showToast: (msg: string) => void;
}

const STAGES: { stage: PipelineStage; label: string; icon: React.ComponentType<{ className?: string }>; color: string; bg: string }[] = [
  { stage: 'Lead', label: '1. Cold Call / Lead', icon: PhoneCall, color: '#C94F78', bg: 'bg-[#F7DDE3]' },
  { stage: 'Contacted', label: '2. Contacted', icon: Phone, color: '#5D9FBE', bg: 'bg-[#DDF3FC]' },
  { stage: 'Requirement Collected', label: '3. Business Requirements', icon: MessageSquare, color: '#C9A45C', bg: 'bg-[#E8D3A3]/40' },
  { stage: 'Demo Created', label: '4. Free Demo Created', icon: Layout, color: '#C94F78', bg: 'bg-[#F7DDE3]' },
  { stage: 'Demo Approved', label: '5. Demo Approved', icon: CheckCircle2, color: '#C9A45C', bg: 'bg-[#E8D3A3]/40' },
  { stage: 'Development', label: '6. In Development', icon: Code2, color: '#5D9FBE', bg: 'bg-[#DDF3FC]' },
  { stage: 'Testing', label: '7. QA & Testing', icon: ShieldCheck, color: '#C94F78', bg: 'bg-[#F7DDE3]' },
  { stage: 'Delivered', label: '8. Delivered & Care', icon: Rocket, color: '#C9A45C', bg: 'bg-[#E8D3A3]/40' },
];

export const PipelineManager: React.FC<PipelineManagerProps> = ({
  leads,
  onSaveLeads,
  showToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<PipelineLead | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<PipelineLead>>({
    clientName: '',
    businessName: '',
    phone: '',
    email: '',
    stage: 'Lead',
    dealValue: '₹7,800',
    packageType: 'Premium',
    demoUrl: '',
    requirementNotes: '',
    nextAction: '',
  });

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'all' || l.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const openAddModal = (defaultStage: PipelineStage = 'Lead') => {
    setEditingLead(null);
    setFormData({
      clientName: '',
      businessName: '',
      phone: '',
      email: '',
      stage: defaultStage,
      dealValue: '₹7,800',
      packageType: 'Premium',
      demoUrl: '',
      requirementNotes: '',
      nextAction: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (lead: PipelineLead) => {
    setEditingLead(lead);
    setFormData({ ...lead });
    setIsModalOpen(true);
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName || !formData.businessName) {
      showToast('Please fill in Client Name and Business Name');
      return;
    }

    if (editingLead) {
      const updated = leads.map((l) =>
        l.id === editingLead.id
          ? {
              ...l,
              ...formData,
              updatedAt: new Date().toISOString(),
            } as PipelineLead
          : l
      );
      onSaveLeads(updated);
      showToast(`Lead updated successfully`);
    } else {
      const newLead: PipelineLead = {
        id: 'lead-' + Date.now(),
        clientName: formData.clientName || '',
        businessName: formData.businessName || '',
        phone: formData.phone || '',
        email: formData.email || '',
        stage: (formData.stage as PipelineStage) || 'Lead',
        dealValue: formData.dealValue || '₹7,800',
        packageType: formData.packageType || 'Premium',
        demoUrl: formData.demoUrl || '',
        requirementNotes: formData.requirementNotes || '',
        nextAction: formData.nextAction || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      onSaveLeads([newLead, ...leads]);
      showToast(`New client lead added to ${newLead.stage}`);
    }

    setIsModalOpen(false);
  };

  const handleDeleteLead = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete lead for ${name}?`)) {
      onSaveLeads(leads.filter((l) => l.id !== id));
      showToast('Lead deleted');
    }
  };

  const moveStage = (lead: PipelineLead, direction: 'next' | 'prev') => {
    const stageIndex = STAGES.findIndex((s) => s.stage === lead.stage);
    if (stageIndex === -1) return;

    let targetIndex = direction === 'next' ? stageIndex + 1 : stageIndex - 1;
    if (targetIndex < 0 || targetIndex >= STAGES.length) return;

    const targetStage = STAGES[targetIndex].stage;
    const updated = leads.map((l) =>
      l.id === lead.id
        ? { ...l, stage: targetStage, updatedAt: new Date().toISOString() }
        : l
    );
    onSaveLeads(updated);
    showToast(`Moved "${lead.businessName}" to ${targetStage}`);
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Metrics Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-white border border-[#C9A45C]/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#C9A45C]/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C94F78] px-3 py-0.5 rounded-full bg-[#F7DDE3]">
                Sales & Delivery Pipeline
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32]">
              Client Journey Workflow
            </h2>
            <p className="text-xs text-[#342C32]/70 font-sans mt-1">
              Track prospects through Cold Call → Free Demo → Approval → Engineering → Delivery & Maintenance.
            </p>
          </div>

          <button
            onClick={() => openAddModal('Lead')}
            className="px-6 py-3 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C9A45C] transition-all shadow-md flex items-center gap-2 cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Prospect</span>
          </button>
        </div>

        {/* Pipeline Stage Counts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 pt-6">
          {STAGES.map((s, idx) => {
            const count = leads.filter((l) => l.stage === s.stage).length;
            const Icon = s.icon;
            return (
              <div
                key={s.stage}
                onClick={() => setStageFilter(stageFilter === s.stage ? 'all' : s.stage)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer text-center ${
                  stageFilter === s.stage
                    ? 'border-[#C94F78] bg-[#F7DDE3]/40 shadow-sm'
                    : 'border-[#C9A45C]/20 bg-[#FFF9F6] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-[#342C32]/60 uppercase mb-1">
                  <span>{idx + 1}</span>
                  <Icon className="w-3 h-3 text-[#C9A45C]" />
                </div>
                <span className="font-serif text-xl font-bold text-[#342C32] block">
                  {count}
                </span>
                <span className="text-[9px] font-bold truncate block text-[#342C32]/80 mt-0.5">
                  {s.stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#C9A45C] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by client, business, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#C9A45C]/30 text-xs text-[#342C32] focus:border-[#C94F78] outline-hidden shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-[#342C32]/60 font-semibold hidden sm:inline">Filter:</span>
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden shadow-2xs w-full sm:w-auto cursor-pointer"
          >
            <option value="all">All Stages ({leads.length})</option>
            {STAGES.map((s) => (
              <option key={s.stage} value={s.stage}>
                {s.label} ({leads.filter((l) => l.stage === s.stage).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Kanban Multi-Column Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
        {STAGES.map((s, stageIndex) => {
          const stageLeads = filteredLeads.filter((l) => l.stage === s.stage);
          const Icon = s.icon;

          return (
            <div
              key={s.stage}
              className="rounded-3xl bg-white border border-[#C9A45C]/25 shadow-sm p-4 flex flex-col min-h-[400px]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C9A45C]/15">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center text-[#342C32]`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#342C32] truncate">
                      {s.label}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF9F6] border border-[#C9A45C]/30 text-[#342C32]">
                    {stageLeads.length}
                  </span>
                  <button
                    onClick={() => openAddModal(s.stage)}
                    className="p-1 text-[#C9A45C] hover:text-[#C94F78] cursor-pointer"
                    title="Add prospect to this stage"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lead Cards List */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[700px] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-[#FFF9F6]/50 border border-dashed border-[#C9A45C]/20 text-center text-xs text-[#342C32]/40">
                    <span>No prospects in this stage</span>
                  </div>
                ) : (
                  stageLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/25 shadow-2xs hover:shadow-md transition-all space-y-3 group"
                    >
                      {/* Business & Package Pill */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-serif text-base font-bold text-[#342C32] leading-tight">
                            {lead.businessName}
                          </h4>
                          <span className="text-xs text-[#342C32]/70 block mt-0.5">
                            {lead.clientName}
                          </span>
                        </div>

                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#342C32] text-white shrink-0">
                          {lead.packageType || 'Premium'}
                        </span>
                      </div>

                      {/* Contact Channels */}
                      <div className="space-y-1 text-xs text-[#342C32]/75">
                        {lead.phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 text-[#C9A45C]" />
                            <a
                              href={`tel:${lead.phone}`}
                              className="hover:text-[#C94F78] hover:underline truncate"
                            >
                              {lead.phone}
                            </a>
                          </div>
                        )}
                        {lead.email && (
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-[#5D9FBE]" />
                            <a
                              href={`mailto:${lead.email}`}
                              className="hover:text-[#5D9FBE] hover:underline truncate"
                            >
                              {lead.email}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Demo Link Badge if available */}
                      {lead.demoUrl && (
                        <a
                          href={lead.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-white border border-[#C9A45C]/30 flex items-center justify-between text-[11px] font-semibold text-[#C94F78] hover:bg-[#F7DDE3] transition-colors"
                        >
                          <span className="truncate">View Demo Website</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      )}

                      {/* Requirement Notes */}
                      {lead.requirementNotes && (
                        <p className="text-[11px] text-[#342C32]/70 line-clamp-2 bg-white/80 p-2 rounded-lg border border-[#C9A45C]/15">
                          {lead.requirementNotes}
                        </p>
                      )}

                      {/* Next Action Pill */}
                      {lead.nextAction && (
                        <div className="p-2 rounded-lg bg-[#E8D3A3]/25 border border-[#C9A45C]/30 text-[10px] text-[#342C32]">
                          <strong className="text-[#C9A45C]">Next:</strong> {lead.nextAction}
                        </div>
                      )}

                      {/* Card Action Footers */}
                      <div className="pt-2 border-t border-[#C9A45C]/15 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEditModal(lead)}
                            className="p-1.5 rounded-lg hover:bg-white text-[#342C32]/60 hover:text-[#C94F78] transition-colors cursor-pointer"
                            title="Edit Prospect"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead.id, lead.businessName)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500/70 hover:text-red-700 transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Stage Stepper Arrows */}
                        <div className="flex items-center gap-1">
                          {stageIndex > 0 && (
                            <button
                              onClick={() => moveStage(lead, 'prev')}
                              className="p-1 rounded-lg bg-white border border-[#C9A45C]/25 text-[#342C32] hover:bg-[#FFF9F6] cursor-pointer"
                              title="Move to Previous Stage"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          )}
                          {stageIndex < STAGES.length - 1 && (
                            <button
                              onClick={() => moveStage(lead, 'next')}
                              className="px-2 py-1 rounded-lg bg-[#342C32] text-white hover:bg-[#C9A45C] text-[10px] font-bold uppercase tracking-wider flex items-center gap-0.5 cursor-pointer shadow-2xs"
                              title="Advance Stage"
                            >
                              <span>Advance</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Prospect Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/30 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C9A45C]/20">
                <h3 className="font-serif text-xl font-bold text-[#342C32]">
                  {editingLead ? 'Edit Prospect Details' : 'Add New Client Prospect'}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 text-[#342C32]/60 hover:text-[#C94F78] cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveLead} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                      Business / Studio Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Royal Silk Sarees"
                      value={formData.businessName || ''}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden focus:border-[#C94F78]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                      Client / Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.clientName || ''}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden focus:border-[#C94F78]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                      Mobile / WhatsApp
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. +91 98450 12345"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden focus:border-[#C94F78]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rajesh@royalsilks.in"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden focus:border-[#C94F78]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                      Pipeline Stage
                    </label>
                    <select
                      value={formData.stage || 'Lead'}
                      onChange={(e) => setFormData({ ...formData, stage: e.target.value as PipelineStage })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden"
                    >
                      {STAGES.map((s) => (
                        <option key={s.stage} value={s.stage}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                      Package
                    </label>
                    <select
                      value={formData.packageType || 'Premium'}
                      onChange={(e) => setFormData({ ...formData, packageType: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden"
                    >
                      <option value="Basic">Basic (₹3,500 – ₹5,000)</option>
                      <option value="Professional">Professional (₹6,000 – ₹8,000)</option>
                      <option value="Premium">Premium Launch (₹7,800)</option>
                      <option value="Custom">Custom Scope</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                      Deal Value
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. ₹7,800"
                      value={formData.dealValue || ''}
                      onChange={(e) => setFormData({ ...formData, dealValue: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden focus:border-[#C94F78]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                    Free Demo Website URL (Preview Link)
                  </label>
                  <input
                    type="url"
                    placeholder="https://preview.client.mirai-demo.com"
                    value={formData.demoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden focus:border-[#C94F78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                    Requirements & Discussion Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Client needs doctor booking portal, WhatsApp inquiry button, and before/after photo slider..."
                    value={formData.requirementNotes || ''}
                    onChange={(e) => setFormData({ ...formData, requirementNotes: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden focus:border-[#C94F78]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#342C32]/80 mb-1">
                    Next Action / Reminder
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Send demo link on WhatsApp and call at 5:00 PM"
                    value={formData.nextAction || ''}
                    onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] outline-hidden focus:border-[#C94F78]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#C9A45C]/20">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#342C32]/70 hover:bg-[#FFF9F6] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C9A45C] transition-all shadow-md cursor-pointer"
                  >
                    {editingLead ? 'Save Changes' : 'Create Prospect'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
