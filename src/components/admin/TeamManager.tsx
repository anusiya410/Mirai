import React, { useState, useRef } from 'react';
import {
  User,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Phone,
  Mail,
  Linkedin,
  Instagram,
  Upload,
  Save,
  X,
  Crown,
  Users,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { TeamMember } from '../../types';

interface TeamManagerProps {
  teamMembers: TeamMember[];
  onSaveTeamMembers: (members: TeamMember[]) => void;
  showToast: (msg: string) => void;
}

const EMPTY_MEMBER: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'> = {
  name: '',
  role: 'Founder',
  bio: '',
  photoUrl: '',
  mobile: '',
  email: '',
  linkedinUrl: '',
  instagramUrl: '',
  displayOrder: 1,
  isActive: true,
};

export const TeamManager: React.FC<TeamManagerProps> = ({
  teamMembers,
  onSaveTeamMembers,
  showToast,
}) => {
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newMemberData, setNewMemberData] = useState({ ...EMPTY_MEMBER });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const newFileInputRef = useRef<HTMLInputElement>(null);

  const sorted = [...teamMembers].sort((a, b) => a.displayOrder - b.displayOrder);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validateMember = (data: Partial<TeamMember>): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!data.name?.trim()) e.name = 'Name is required';
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = 'Enter a valid email address';
    if (data.mobile && !/^\+?[\d\s\-().]{7,}$/.test(data.mobile))
      e.mobile = 'Enter a valid mobile number';
    if (data.linkedinUrl && !/^https?:\/\//.test(data.linkedinUrl))
      e.linkedinUrl = 'URL must start with http:// or https://';
    if (data.instagramUrl && !/^https?:\/\//.test(data.instagramUrl))
      e.instagramUrl = 'URL must start with http:// or https://';
    return e;
  };

  // ── Photo upload → base64 ───────────────────────────────────────────────────
  const handlePhotoUpload = (
    file: File,
    setter: (url: string) => void
  ) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setter(result);
    };
    reader.readAsDataURL(file);
  };

  // ── Toggle active ────────────────────────────────────────────────────────────
  const handleToggleActive = (id: string) => {
    const updated = teamMembers.map((m) =>
      m.id === id
        ? { ...m, isActive: !m.isActive, updatedAt: new Date().toISOString() }
        : m
    );
    onSaveTeamMembers(updated);
    showToast('Profile visibility updated');
  };

  // ── Delete ───────────────────────────────────────────────────────────────────
  const handleDelete = (id: string) => {
    if (!window.confirm('Remove this team member profile?')) return;
    onSaveTeamMembers(teamMembers.filter((m) => m.id !== id));
    showToast('Team member removed');
  };

  // ── Save edit ────────────────────────────────────────────────────────────────
  const handleSaveEdit = () => {
    if (!editingMember) return;
    const errs = validateMember(editingMember);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const updated = teamMembers.map((m) =>
      m.id === editingMember.id
        ? { ...editingMember, updatedAt: new Date().toISOString() }
        : m
    );
    onSaveTeamMembers(updated);
    setEditingMember(null);
    showToast('Team member profile saved successfully');
  };

  // ── Add new ──────────────────────────────────────────────────────────────────
  const handleAddNew = () => {
    const errs = validateMember(newMemberData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    const now = new Date().toISOString();
    const newMember: TeamMember = {
      ...newMemberData,
      id: 'team-' + Date.now(),
      createdAt: now,
      updatedAt: now,
    };
    onSaveTeamMembers([...teamMembers, newMember]);
    setIsAddingNew(false);
    setNewMemberData({ ...EMPTY_MEMBER });
    showToast('New team member added');
  };

  // ── Field row helper ─────────────────────────────────────────────────────────
  const Field = ({
    label,
    icon: Icon,
    value,
    onChange,
    type = 'text',
    placeholder,
    hint,
    errorKey,
    textarea,
  }: {
    label: string;
    icon: React.ElementType;
    value: string;
    onChange: (v: string) => void;
    type?: string;
    placeholder?: string;
    hint?: string;
    errorKey?: string;
    textarea?: boolean;
  }) => (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#342C32]/70 mb-2">
        <Icon className="w-3.5 h-3.5 text-[#C9A45C]" />
        {label}
      </label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78] resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] focus:ring-1 focus:ring-[#C94F78]"
        />
      )}
      {hint && (
        <p className="text-[10px] text-[#342C32]/50 mt-1">{hint}</p>
      )}
      {errorKey && errors[errorKey] && (
        <p className="text-[10px] text-red-600 mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> {errors[errorKey]}
        </p>
      )}
    </div>
  );

  // ── Edit form ────────────────────────────────────────────────────────────────
  const EditForm = ({
    member,
    onSave,
    onCancel,
    isNew,
    data,
    setData,
  }: {
    member?: TeamMember;
    onSave: () => void;
    onCancel: () => void;
    isNew?: boolean;
    data: Partial<TeamMember>;
    setData: (d: Partial<TeamMember>) => void;
  }) => {
    const currentFileRef = isNew ? newFileInputRef : fileInputRef;
    return (
      <div className="bg-white rounded-3xl border border-[#C9A45C]/30 shadow-xl p-8 space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-serif text-xl font-bold text-[#342C32]">
            {isNew ? 'Add Team Member' : `Edit — ${data.role}`}
          </h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-xl text-[#342C32]/50 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Photo */}
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#C9A45C]/40 bg-[#FFF9F6] flex items-center justify-center shrink-0">
            {data.photoUrl ? (
              <img src={data.photoUrl} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User className="w-8 h-8 text-[#C9A45C]/50" />
            )}
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#342C32]/60">
              Photo URL or Upload
            </p>
            <input
              type="text"
              value={data.photoUrl || ''}
              onChange={(e) => setData({ ...data, photoUrl: e.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="w-full px-3 py-2.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78]"
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => currentFileRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F7DDE3] text-[#C94F78] text-[10px] font-bold uppercase tracking-wider hover:bg-[#C94F78] hover:text-white transition-colors cursor-pointer"
              >
                <Upload className="w-3 h-3" /> Upload Photo
              </button>
              <span className="text-[10px] text-[#342C32]/40">JPG, PNG or WebP</span>
            </div>
            <input
              ref={currentFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePhotoUpload(file, (url) => setData({ ...data, photoUrl: url }));
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Full Name"
            icon={User}
            value={data.name || ''}
            onChange={(v) => setData({ ...data, name: v })}
            placeholder="Enter full name"
            hint="Use the real name provided by the business owner"
            errorKey="name"
          />
          <div>
            <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#342C32]/70 mb-2">
              <Crown className="w-3.5 h-3.5 text-[#C9A45C]" /> Role
            </label>
            <select
              value={data.role || 'Founder'}
              onChange={(e) => setData({ ...data, role: e.target.value as 'Founder' | 'Co-Founder' })}
              className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78] cursor-pointer"
            >
              <option value="Founder">Founder</option>
              <option value="Co-Founder">Co-Founder</option>
            </select>
          </div>
        </div>

        <Field
          label="Short Bio"
          icon={Edit3}
          value={data.bio || ''}
          onChange={(v) => setData({ ...data, bio: v })}
          placeholder="A brief professional introduction (2–3 sentences)"
          textarea
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Mobile Number"
            icon={Phone}
            type="tel"
            value={data.mobile || ''}
            onChange={(v) => setData({ ...data, mobile: v })}
            placeholder="+91 98765 43210"
            hint="Displayed only if provided. Used for tel: links."
            errorKey="mobile"
          />
          <Field
            label="Email Address"
            icon={Mail}
            type="email"
            value={data.email || ''}
            onChange={(v) => setData({ ...data, email: v })}
            placeholder="founder@yourbrand.com"
            hint="Displayed only if provided. Used for mailto: links."
            errorKey="email"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="LinkedIn URL"
            icon={Linkedin}
            value={data.linkedinUrl || ''}
            onChange={(v) => setData({ ...data, linkedinUrl: v })}
            placeholder="https://linkedin.com/in/yourname"
            errorKey="linkedinUrl"
          />
          <Field
            label="Instagram URL"
            icon={Instagram}
            value={data.instagramUrl || ''}
            onChange={(v) => setData({ ...data, instagramUrl: v })}
            placeholder="https://instagram.com/yourhandle"
            errorKey="instagramUrl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#342C32]/70 block mb-2">
              Display Order
            </label>
            <input
              type="number"
              min="1"
              value={data.displayOrder || 1}
              onChange={(e) => setData({ ...data, displayOrder: parseInt(e.target.value) || 1 })}
              className="w-full px-4 py-3 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-xs text-[#342C32] focus:outline-none focus:border-[#C94F78]"
            />
          </div>
          <div className="flex flex-col justify-end">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#342C32]/70 block mb-2">
              Visibility
            </label>
            <button
              type="button"
              onClick={() => setData({ ...data, isActive: !data.isActive })}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                data.isActive
                  ? 'bg-[#F7DDE3] border-[#C94F78]/30 text-[#C94F78]'
                  : 'bg-[#FFF9F6] border-[#C9A45C]/30 text-[#342C32]/50'
              }`}
            >
              {data.isActive ? (
                <><Eye className="w-4 h-4" /> Published — Visible</>
              ) : (
                <><EyeOff className="w-4 h-4" /> Hidden — Draft</>
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-[#C9A45C]/20">
          <button
            onClick={onSave}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white text-xs font-bold uppercase tracking-widest shadow-lg hover:opacity-95 transition-opacity cursor-pointer"
          >
            <Save className="w-4 h-4" /> Save Profile
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 rounded-full border border-[#C9A45C]/30 text-[#342C32]/70 text-xs font-bold uppercase tracking-widest hover:bg-[#FFF9F6] transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C9A45C] block mb-1">
            Admin — Team
          </span>
          <h2 className="font-serif text-2xl font-bold text-[#342C32]">
            Founders & Team Management
          </h2>
          <p className="text-xs text-[#342C32]/60 mt-1">
            All contact details must be entered by the business owner. Leave blank until real data is available.
          </p>
        </div>
        <button
          onClick={() => {
            setIsAddingNew(true);
            setErrors({});
            setNewMemberData({ ...EMPTY_MEMBER, displayOrder: teamMembers.length + 1 });
          }}
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#342C32] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#C94F78] transition-colors shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {/* Privacy notice */}
      <div className="p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/30 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-[#C9A45C] shrink-0 mt-0.5" />
        <p className="text-xs text-[#342C32]/75 leading-relaxed">
          <strong>Privacy Notice:</strong> Mobile numbers and personal email addresses are only displayed on the public website if the Founder/Co-Founder explicitly chooses to publish them (profile is active and fields are filled). Never invent or guess contact details.
        </p>
      </div>

      {/* Add New Form */}
      {isAddingNew && (
        <EditForm
          isNew
          data={newMemberData}
          setData={(d) => setNewMemberData(d as typeof newMemberData)}
          onSave={handleAddNew}
          onCancel={() => { setIsAddingNew(false); setErrors({}); }}
        />
      )}

      {/* Member Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sorted.map((member) => (
          <div key={member.id}>
            {editingMember?.id === member.id ? (
              <EditForm
                member={member}
                data={editingMember}
                setData={(d) => setEditingMember(d as TeamMember)}
                onSave={handleSaveEdit}
                onCancel={() => { setEditingMember(null); setErrors({}); }}
              />
            ) : (
              <div className={`p-6 rounded-3xl border transition-all ${member.isActive ? 'bg-white border-[#C9A45C]/30 shadow-md' : 'bg-[#FFF9F6] border-[#C9A45C]/20 opacity-60'}`}>
                {/* Card header */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C9A45C]/40 bg-[#FFF9F6] flex items-center justify-center shrink-0">
                    {member.photoUrl ? (
                      <img src={member.photoUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-7 h-7 text-[#C9A45C]/40" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${member.role === 'Founder' ? 'bg-[#F7DDE3] text-[#C94F78]' : 'bg-[#DDF3FC] text-[#5D9FBE]'}`}>
                        {member.role}
                      </span>
                      {member.isActive ? (
                        <span className="flex items-center gap-1 text-[10px] text-green-600 font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#342C32]/40 font-semibold">Hidden</span>
                      )}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#342C32] truncate">
                      {member.name || <span className="text-[#342C32]/30 italic">No name set</span>}
                    </h3>
                    {member.bio && (
                      <p className="text-xs text-[#342C32]/60 mt-1 line-clamp-2">{member.bio}</p>
                    )}
                  </div>
                </div>

                {/* Contact chips */}
                <div className="space-y-1.5 mb-5">
                  {member.mobile ? (
                    <div className="flex items-center gap-2 text-xs text-[#342C32]/70">
                      <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>{member.mobile}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] text-[#342C32]/30 italic">
                      <Phone className="w-3.5 h-3.5" /> Mobile not set
                    </div>
                  )}
                  {member.email ? (
                    <div className="flex items-center gap-2 text-xs text-[#342C32]/70">
                      <Mail className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span className="truncate">{member.email}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[11px] text-[#342C32]/30 italic">
                      <Mail className="w-3.5 h-3.5" /> Email not set
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {member.linkedinUrl && <Linkedin className="w-3.5 h-3.5 text-[#5D9FBE]" />}
                    {member.instagramUrl && <Instagram className="w-3.5 h-3.5 text-[#C94F78]" />}
                    {!member.linkedinUrl && !member.instagramUrl && (
                      <span className="text-[11px] text-[#342C32]/30 italic">No social links set</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-[#C9A45C]/15">
                  <button
                    onClick={() => { setEditingMember({ ...member }); setErrors({}); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-[#342C32] text-[11px] font-bold uppercase tracking-wider hover:bg-[#F7DDE3] hover:border-[#C94F78]/40 transition-colors cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(member.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                      member.isActive
                        ? 'bg-[#FFF9F6] border-[#C9A45C]/30 text-[#342C32]/60 hover:bg-amber-50 hover:text-amber-700'
                        : 'bg-[#F7DDE3] border-[#C94F78]/30 text-[#C94F78] hover:bg-[#C94F78] hover:text-white'
                    }`}
                  >
                    {member.isActive ? <><EyeOff className="w-3.5 h-3.5" /> Hide</> : <><Eye className="w-3.5 h-3.5" /> Show</>}
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-200 text-red-500 text-[11px] font-bold uppercase tracking-wider hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <div className="text-center py-16 text-[#342C32]/40">
          <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-semibold">No team members yet</p>
          <p className="text-xs mt-1">Click "Add Member" to create the Founder profile.</p>
        </div>
      )}
    </div>
  );
};
