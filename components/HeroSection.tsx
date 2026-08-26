import React from 'react';
import { Button } from './Button';
import { MockButton, SandboxBadge } from './SandboxBadge';
import { CheckCircle2, Play, LayoutDashboard, Users, FileText, Settings, Bell, Search, PieChart, CreditCard, MoreHorizontal, Scale, GraduationCap, Building2 } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      {/* Complex Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50 via-transparent to-slate-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 sm:gap-12 lg:gap-16">
          
          {/* Left: Sales Copy */}
          <div className="flex-1 w-full min-w-0 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-growth opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-growth"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-navy">Live: Per-subclass document checklists</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-navy tracking-tight leading-[1.15] sm:leading-[1.1] mb-5 sm:mb-6">
              The Operating System for <span className="text-transparent bg-clip-text bg-gradient-to-r from-techBlue to-navy">Global Mobility.</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed font-light">
              One platform, three tailored workflows. Purpose-built for <strong>Migration Agents</strong>, <strong>Education Consultants</strong>, and <strong>Corporate HR</strong> teams.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button onClick={onOpenWaitlist} variant="primary" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg shadow-xl shadow-navy/20 border-b-4 border-navyLight active:border-b-0 active:translate-y-1 transition-all">
                Start Free Trial
              </Button>
              <button onClick={onOpenWaitlist} className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-medium text-navy border border-gray-300 rounded-md bg-white hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2 shadow-sm">
                <Play className="h-4 w-4 shrink-0 fill-navy" /> Watch Demo
              </button>
            </div>

            {/* Persona Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
               <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <Scale className="h-4 w-4 text-goldDark" />
                  <span className="text-xs font-bold text-navy">Migration Agents</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <GraduationCap className="h-4 w-4 text-techBlue" />
                  <span className="text-xs font-bold text-navy">Education</span>
               </div>
               <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <Building2 className="h-4 w-4 text-navy" />
                  <span className="text-xs font-bold text-navy">Corporate</span>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-x-6 sm:gap-y-2 text-sm text-gray-500 font-medium border-t border-gray-200 pt-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-growth" />
                <span>Row-level security enforced by Postgres</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-growth" />
                <span>Hash-chained audit log</span>
              </div>
            </div>
          </div>

          {/* Right: Enterprise Dashboard Mockup */}
          <div className="flex-1 w-full min-w-0 perspective-1000">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-white rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)] border border-gray-300 overflow-hidden transform lg:rotate-y-[-6deg] lg:rotate-x-[4deg] hover:rotate-0 transition-transform duration-700 ease-out">
              
              {/* SaaS Top Navigation */}
              <div className="h-12 sm:h-14 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 z-20 relative">
                 <div className="flex items-center gap-3 sm:gap-6 min-w-0">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 bg-navy rounded-sm flex items-center justify-center text-white font-bold text-xs">IS</div>
                       <span className="font-bold text-navy text-sm">Immistack</span>
                    </div>
                    <div className="hidden md:flex items-center gap-1 bg-gray-100 px-2 py-1.5 rounded-md w-40 lg:w-64 max-w-full border border-gray-200">
                       <Search className="h-3.5 w-3.5 text-gray-400" />
                       <span className="text-xs text-gray-400">Search cases, clients, or files...</span>
                    </div>
                 </div>
                 <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <SandboxBadge className="hidden lg:inline-flex" />
                    <MockButton className="p-2 rounded-full text-gray-500 relative">
                       <Bell className="h-4 w-4" />
                       <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </MockButton>
                    <div className="w-8 h-8 bg-gradient-to-tr from-gold to-goldDark rounded-full flex items-center justify-center text-white text-xs font-bold border border-white shadow-sm">
                       JD
                    </div>
                 </div>
              </div>

              <div className="flex h-full bg-slate-50">
                 {/* SaaS Sidebar */}
                 <div className="w-11 sm:w-16 md:w-40 lg:w-56 bg-navy flex-shrink-0 flex flex-col pt-4">
                    <div className="px-1.5 sm:px-3 mb-6">
                       <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2 hidden md:block">Main</div>
                       <div className="space-y-1">
                          <div className="flex items-center gap-3 px-3 py-2 bg-white/10 rounded-md text-white cursor-pointer border-l-2 border-gold">
                             <LayoutDashboard className="h-4 w-4" />
                             <span className="text-sm font-medium hidden md:block">Dashboard</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors">
                             <Users className="h-4 w-4" />
                             <span className="text-sm font-medium hidden md:block">Cases</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors">
                             <FileText className="h-4 w-4" />
                             <span className="text-sm font-medium hidden md:block">Documents</span>
                          </div>
                          <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors">
                             <CreditCard className="h-4 w-4" />
                             <span className="text-sm font-medium hidden md:block">Billing</span>
                          </div>
                       </div>
                    </div>
                    <div className="mt-auto px-1.5 sm:px-3 pb-20">
                       <div className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-md cursor-pointer transition-colors">
                          <Settings className="h-4 w-4" />
                          <span className="text-sm font-medium hidden md:block">Settings</span>
                       </div>
                    </div>
                 </div>

                 {/* SaaS Main Content */}
                 <div className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6 overflow-hidden">
                    <div className="flex flex-wrap justify-between items-end gap-2 mb-4 sm:mb-6">
                       <div>
                          <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-navy">Executive Overview</h2>
                          <p className="text-[10px] sm:text-xs text-gray-500">Welcome back, James. You have 3 urgent deadlines.</p>
                       </div>
                       <div className="hidden xs:flex gap-2 shrink-0">
                          <MockButton className="hidden sm:inline-flex bg-white border border-gray-300 text-navy text-xs px-3 py-2 rounded-md font-medium shadow-sm">Filter View</MockButton>
                          <MockButton className="bg-techBlue text-white text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 rounded-md font-medium shadow-sm">+ New Matter</MockButton>
                       </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                       <div className="bg-white p-2.5 sm:p-3 lg:p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                             <div className="p-1.5 bg-green-50 rounded-md"><CreditCard className="h-4 w-4 text-growth" /></div>
                             <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-bold">+12%</span>
                          </div>
                          <div className="text-base sm:text-lg lg:text-2xl font-bold text-navy">$142,390</div>
                          <div className="text-xs text-gray-400">Monthly Revenue</div>
                       </div>
                       <div className="bg-white p-2.5 sm:p-3 lg:p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                             <div className="p-1.5 bg-blue-50 rounded-md"><Users className="h-4 w-4 text-techBlue" /></div>
                          </div>
                          <div className="text-base sm:text-lg lg:text-2xl font-bold text-navy">84</div>
                          <div className="text-xs text-gray-400">Active Matters</div>
                       </div>
                       <div className="bg-white p-2.5 sm:p-3 lg:p-4 rounded-lg border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                             <div className="p-1.5 bg-orange-50 rounded-md"><PieChart className="h-4 w-4 text-orange-500" /></div>
                             <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold">Action Req</span>
                          </div>
                          <div className="text-base sm:text-lg lg:text-2xl font-bold text-navy">3</div>
                          <div className="text-xs text-gray-400">Approaching Expiry</div>
                       </div>
                    </div>

                    {/* Dense Data Table */}
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                       <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                          <h3 className="text-sm font-bold text-navy">Recent Matters</h3>
                          <MoreHorizontal className="h-4 w-4 text-gray-400" />
                       </div>
                       {/* Four columns in a ~180px frame: scroll them inside the card. */}
                       <div className="overflow-x-auto no-scrollbar">
                          <table className="w-full min-w-[320px] text-left">
                          <thead className="bg-gray-50 text-[10px] uppercase text-gray-500 font-bold">
                             <tr>
                                <th className="px-3 py-2 sm:px-4">Client / Matter</th>
                                <th className="px-3 py-2 sm:px-4">Stage</th>
                                <th className="px-3 py-2 sm:px-4">Fees Status</th>
                                <th className="px-3 py-2 sm:px-4 text-right">Owner</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-xs">
                             <tr className="hover:bg-blue-50/50">
                                <td className="px-3 py-2.5 sm:px-4 sm:py-3">
                                   <div className="font-bold text-navy">TechCorp Inc.</div>
                                   <div className="text-gray-400 text-[10px]">TSS 482 Nomination</div>
                                </td>
                                <td className="px-3 py-2.5 sm:px-4 sm:py-3">
                                   <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100">
                                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Lodged
                                   </span>
                                </td>
                                <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-growth font-bold">Paid (Stripe)</td>
                                <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-right">
                                   <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-[10px] font-bold text-gray-600">SJ</div>
                                </td>
                             </tr>
                             <tr className="hover:bg-blue-50/50">
                                <td className="px-3 py-2.5 sm:px-4 sm:py-3">
                                   <div className="font-bold text-navy">Sarah Connor</div>
                                   <div className="text-gray-400 text-[10px]">Partner 820</div>
                                </td>
                                <td className="px-3 py-2.5 sm:px-4 sm:py-3">
                                   <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-yellow-50 text-yellow-700 font-medium border border-yellow-100">
                                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span> Info Req
                                   </span>
                                </td>
                                <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-gray-400">Pending</td>
                                <td className="px-3 py-2.5 sm:px-4 sm:py-3 text-right">
                                   <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-[10px] font-bold text-gray-600">MC</div>
                                </td>
                             </tr>
                          </tbody>
                          </table>
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};