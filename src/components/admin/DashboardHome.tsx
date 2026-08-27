import React from 'react';
import {
  FolderKanban,
  Layers,
  MessageSquareQuote,
  Inbox,
  Users,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Clock,
} from 'lucide-react';
import { Project, Service, Testimonial, ContactEnquiry } from '../../types';
import { AdminTab } from './AdminSidebar';

interface DashboardHomeProps {
  projects: Project[];
  services: Service[];
  testimonials: Testimonial[];
  contacts: ContactEnquiry[];
  visits: number;
  onNavigate: (tab: AdminTab) => void;
  onStatusChange: (id: string, status: 'New' | 'Contacted' | 'Completed') => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  projects,
  services,
  testimonials,
  contacts,
  visits,
  onNavigate,
  onStatusChange,
}) => {
  const newContactsCount = contacts.filter((c) => c.status === 'New').length;

  const statCards = [
    {
      title: 'Total Projects',
      value: projects.length,
      tab: 'projects' as AdminTab,
      icon: FolderKanban,
      color: 'text-[#C94F78]',
      bg: 'bg-[#F7DDE3]',
      change: '+2 this month',
    },
    {
      title: 'Total Services',
      value: services.length,
      tab: 'services' as AdminTab,
      icon: Layers,
      color: 'text-[#5D9FBE]',
      bg: 'bg-[#DDF3FC]',
      change: '6 Active Offerings',
    },
    {
      title: 'Testimonials',
      value: testimonials.length,
      tab: 'testimonials' as AdminTab,
      icon: MessageSquareQuote,
      color: 'text-[#C9A45C]',
      bg: 'bg-[#FFF9F6]',
      change: '5.0 ★ Client Rating',
    },
    {
      title: 'Contact Enquiries',
      value: contacts.length,
      tab: 'contacts' as AdminTab,
      icon: Inbox,
      color: 'text-[#C94F78]',
      bg: 'bg-[#F7DDE3]',
      change: `${newContactsCount} Pending Review`,
    },
    {
      title: 'Website Visits',
      value: visits.toLocaleString(),
      tab: 'dashboard' as AdminTab,
      icon: Users,
      color: 'text-[#342C32]',
      bg: 'bg-white',
      change: '+18.4% engagement',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-[#FFF9F6] via-[#F7DDE3]/40 to-[#DDF3FC]/40 border border-[#C9A45C]/30 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-xs font-semibold text-[#C9A45C] border border-[#C9A45C]/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Administration Active</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32]">
            Welcome to the Mirai Management Suite
          </h1>
          <p className="text-sm text-[#342C32]/70 mt-1 max-w-xl">
            Monitor client inquiries, update project portfolios, adjust site settings, and preserve brand integrity in real-time.
          </p>
        </div>

        <button
          onClick={() => onNavigate('projects')}
          className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-[#C94F78] to-[#C9A45C] shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer"
        >
          Add New Project
        </button>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onNavigate(card.tab)}
              className="p-6 rounded-3xl bg-white border border-[#C9A45C]/25 shadow-xs hover:shadow-md hover:border-[#C9A45C] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-2xl ${card.bg} flex items-center justify-center ${card.color} border border-[#C9A45C]/20 shadow-2xs`}>
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#342C32]/40 group-hover:text-[#C94F78] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              <div>
                <p className="text-xs font-medium text-[#342C32]/60 uppercase tracking-wider mb-1">
                  {card.title}
                </p>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#342C32]">
                  {card.value}
                </p>
                <p className="text-[11px] text-[#C9A45C] font-semibold mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{card.change}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Contact Enquiries Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#C9A45C]/25 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#C9A45C]/20">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#342C32]">
              Recent Contact Enquiries
            </h3>
            <p className="text-xs text-[#342C32]/60">Incoming prospect inquiries from the website form</p>
          </div>

          <button
            onClick={() => onNavigate('contacts')}
            className="text-xs font-semibold text-[#C94F78] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({contacts.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {contacts.length === 0 ? (
          <p className="text-sm text-center py-8 text-[#342C32]/60">No contact enquiries received yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#342C32]">
              <thead className="bg-[#FFF9F6] text-[#342C32]/70 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3 rounded-l-xl">Prospect</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Message Snippet</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-xl text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A45C]/15">
                {contacts.slice(0, 5).map((contact) => (
                  <tr key={contact.id} className="hover:bg-[#FFF9F6]/50 transition-colors">
                    <td className="px-4 py-3.5 font-medium">
                      <div className="font-bold text-[#342C32]">{contact.name}</div>
                      <div className="text-[11px] text-[#342C32]/60">{contact.email}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#DDF3FC] text-[#5D9FBE]">
                        {contact.projectType}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 max-w-xs truncate text-[#342C32]/75">
                      {contact.message}
                    </td>
                    <td className="px-4 py-3.5 text-[#342C32]/60 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{new Date(contact.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          contact.status === 'New'
                            ? 'bg-[#F7DDE3] text-[#C94F78]'
                            : contact.status === 'Contacted'
                            ? 'bg-[#E8D3A3]/40 text-[#C9A45C]'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {contact.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
                      <select
                        value={contact.status}
                        onChange={(e) =>
                          onStatusChange(contact.id, e.target.value as 'New' | 'Contacted' | 'Completed')
                        }
                        className="px-2.5 py-1 rounded-xl bg-white border border-[#C9A45C]/30 text-[11px] font-medium outline-hidden cursor-pointer"
                      >
                        <option value="New">Mark New</option>
                        <option value="Contacted">Mark Contacted</option>
                        <option value="Completed">Mark Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
