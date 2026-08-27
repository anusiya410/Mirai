import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Trash2, Search, Calendar, Filter } from 'lucide-react';
import { ContactEnquiry } from '../../types';

interface ContactManagerProps {
  contacts: ContactEnquiry[];
  onSaveContacts: (contacts: ContactEnquiry[]) => void;
  showToast: (msg: string) => void;
}

export const ContactManager: React.FC<ContactManagerProps> = ({
  contacts,
  onSaveContacts,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);

  const filtered = contacts.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.message.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: 'New' | 'Contacted' | 'Completed') => {
    const updated = contacts.map((c) => (c.id === id ? { ...c, status: newStatus } : c));
    onSaveContacts(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    showToast(`Status updated to ${newStatus}`);
  };

  const handleDelete = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    onSaveContacts(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry(null);
    }
    showToast('Enquiry removed.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#C9A45C]/20">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#342C32]">
            Contact Enquiries CRM
          </h2>
          <p className="text-xs text-[#342C32]/60">
            Track and manage incoming client project briefs submitted via the public contact portal
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F7DDE3] text-[#C94F78]">
            {contacts.filter((c) => c.status === 'New').length} New Enquiries
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-[#C9A45C]/30 text-[#342C32]">
            {contacts.length} Total
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#C9A45C] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search enquiries by name, email, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-[#C9A45C]/30 focus:border-[#C94F78] focus:ring-2 focus:ring-[#E8B8C4]/30 outline-hidden text-xs text-[#342C32]"
          />
        </div>

        <div className="flex items-center gap-2 p-1 rounded-2xl bg-white border border-[#C9A45C]/30 self-start sm:self-auto">
          <Filter className="w-3.5 h-3.5 text-[#C9A45C] ml-2" />
          {['All', 'New', 'Contacted', 'Completed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === st
                  ? 'bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white shadow-2xs'
                  : 'text-[#342C32]/70 hover:text-[#C94F78]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white rounded-3xl border border-[#C9A45C]/25 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#342C32]/60">
            No enquiries found matching your search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#342C32]">
              <thead className="bg-[#FFF9F6] text-[#342C32]/70 uppercase font-semibold border-b border-[#C9A45C]/20">
                <tr>
                  <th className="px-6 py-4">Client Prospect</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A45C]/15">
                {filtered.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    onClick={() => setSelectedEnquiry(enquiry)}
                    className="hover:bg-[#FFF9F6]/50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 font-medium">
                      <div className="font-bold text-sm text-[#342C32]">{enquiry.name}</div>
                      <div className="text-[11px] text-[#342C32]/60">{enquiry.email}</div>
                      {enquiry.phone && (
                        <div className="text-[10px] text-[#C9A45C]">{enquiry.phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#DDF3FC] text-[#5D9FBE]">
                        {enquiry.projectType}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-[#342C32]/80">
                      {enquiry.message}
                    </td>
                    <td className="px-6 py-4 text-[#342C32]/60 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                        <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          enquiry.status === 'New'
                            ? 'bg-[#F7DDE3] text-[#C94F78]'
                            : enquiry.status === 'Contacted'
                            ? 'bg-[#E8D3A3]/50 text-[#C9A45C]'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {enquiry.status}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-right space-x-2 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={enquiry.status}
                        onChange={(e) =>
                          handleStatusChange(
                            enquiry.id,
                            e.target.value as 'New' | 'Contacted' | 'Completed'
                          )
                        }
                        className="px-2.5 py-1.5 rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-[11px] font-medium outline-hidden cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Completed">Completed</option>
                      </select>

                      <a
                        href={`mailto:${enquiry.email}?subject=Regarding Your Project Enquiry with Mirai Studio`}
                        className="p-1.5 inline-flex rounded-xl bg-[#FFF9F6] border border-[#C9A45C]/30 text-[#342C32] hover:text-[#C94F78]"
                        title="Send Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => handleDelete(enquiry.id)}
                        className="p-1.5 rounded-xl bg-red-50 border border-red-200 text-red-600 hover:bg-red-100 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-[#C9A45C]/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#C9A45C]/20">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A45C] block">
                  Enquiry Reference #{selectedEnquiry.id}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#342C32]">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="w-8 h-8 rounded-full bg-[#FFF9F6] text-[#342C32] hover:text-[#C94F78] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs mb-6">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-[#FFF9F6] border border-[#C9A45C]/20">
                <div>
                  <span className="text-[#342C32]/60 uppercase tracking-wider block font-semibold">
                    Email
                  </span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-[#C94F78] font-bold hover:underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#342C32]/60 uppercase tracking-wider block font-semibold">
                    Phone
                  </span>
                  <span className="font-bold text-[#342C32]">
                    {selectedEnquiry.phone || 'None provided'}
                  </span>
                </div>
                <div>
                  <span className="text-[#342C32]/60 uppercase tracking-wider block font-semibold">
                    Category
                  </span>
                  <span className="font-bold text-[#5D9FBE]">{selectedEnquiry.projectType}</span>
                </div>
                <div>
                  <span className="text-[#342C32]/60 uppercase tracking-wider block font-semibold">
                    Received Date
                  </span>
                  <span className="font-bold text-[#342C32]">
                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-[#342C32]/80 block mb-2">
                  Full Prospect Message:
                </span>
                <div className="p-4 rounded-2xl bg-white border border-[#C9A45C]/30 text-sm text-[#342C32]/85 leading-relaxed">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-[#342C32]/80 block mb-2">
                  Workflow Status:
                </span>
                <div className="flex items-center gap-2">
                  {(['New', 'Contacted', 'Completed'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedEnquiry.id, st)}
                      className={`flex-1 py-2 rounded-xl font-semibold transition-all cursor-pointer ${
                        selectedEnquiry.status === st
                          ? 'bg-gradient-to-r from-[#C94F78] to-[#C9A45C] text-white shadow-xs'
                          : 'bg-[#FFF9F6] border border-[#C9A45C]/30 text-[#342C32]/70 hover:text-[#342C32]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#C9A45C]/20">
              <a
                href={`mailto:${selectedEnquiry.email}?subject=Regarding Your Project Enquiry with Mirai Studio`}
                className="flex-1 py-3 text-center rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Reply via Email</span>
              </a>
              {selectedEnquiry.phone && (
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-3 rounded-full text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
