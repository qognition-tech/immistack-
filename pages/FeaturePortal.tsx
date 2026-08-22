import React, { useState } from 'react';
import { ArrowRight, Users, Lock, CreditCard, Smartphone, Shield, Briefcase, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Button } from '../components/Button';
import { MockButton } from '../components/SandboxBadge';

export const FeaturePortal: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  const [activeTab, setActiveTab] = useState<'CLIENT' | 'AGENT' | 'ADMIN'>('CLIENT');

  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 mb-6">
           <Users className="h-4 w-4 text-navy" />
           <span className="text-xs font-bold uppercase tracking-wide text-navy">Unified Ecosystem</span>
         </div>
         <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
           Three dedicated portals.<br/><span className="text-goldDark">One single source of truth.</span>
         </h1>
         <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
           Most software gives you a messy backend and a basic client form. Immistack provides three distinct, optimized environments for every stakeholder in the migration process.
         </p>
      </div>

      {/* Interactive Portal Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
         <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100">
               <button 
                  onClick={() => setActiveTab('CLIENT')}
                  className={`flex-1 py-6 text-center font-bold text-sm uppercase tracking-wide transition-all ${activeTab === 'CLIENT' ? 'bg-white text-goldDark border-b-4 border-goldDark' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
               >
                  1. Client Portal
               </button>
               <button 
                  onClick={() => setActiveTab('AGENT')}
                  className={`flex-1 py-6 text-center font-bold text-sm uppercase tracking-wide transition-all ${activeTab === 'AGENT' ? 'bg-white text-techBlue border-b-4 border-techBlue' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
               >
                  2. Staff / Agent Portal
               </button>
               <button 
                  onClick={() => setActiveTab('ADMIN')}
                  className={`flex-1 py-6 text-center font-bold text-sm uppercase tracking-wide transition-all ${activeTab === 'ADMIN' ? 'bg-white text-navy border-b-4 border-navy' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
               >
                  3. Admin Headquarters
               </button>
            </div>

            {/* Content Area */}
            <div className="p-8 md:p-12 bg-slate-50 min-h-[500px] flex items-center justify-center">
               
               {/* CLIENT PORTAL VIEW */}
               {activeTab === 'CLIENT' && (
                  <div className="grid md:grid-cols-2 gap-12 items-center w-full animate-fade-in">
                     <div>
                        <h3 className="text-3xl font-bold text-navy mb-4">A White-Labeled Mobile Experience</h3>
                        <p className="text-gray-600 mb-6">
                           Your clients don't want to login to a "database". They want an app-like experience to track their visa, scan passports, and pay invoices.
                        </p>
                        <ul className="space-y-4">
                           <li className="flex items-start gap-3">
                              <div className="p-1.5 bg-gold/10 rounded-full mt-0.5"><Smartphone className="h-4 w-4 text-goldDark" /></div>
                              <div>
                                 <strong className="block text-navy">Mobile Optimized</strong>
                                 <span className="text-sm text-gray-500">Clients can scan and upload documents directly from their phone camera.</span>
                              </div>
                           </li>
                           <li className="flex items-start gap-3">
                              <div className="p-1.5 bg-gold/10 rounded-full mt-0.5"><CreditCard className="h-4 w-4 text-goldDark" /></div>
                              <div>
                                 <strong className="block text-navy">Frictionless Payments</strong>
                                 <span className="text-sm text-gray-500">Every invoice and its status, with what is outstanding by matter — and a clear note of how to settle with the firm.</span>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div className="flex justify-center">
                        <div className="w-[280px] h-[550px] bg-navy rounded-[40px] border-[8px] border-navy shadow-2xl relative overflow-hidden">
                           {/* Mobile Screen */}
                           <div className="bg-gray-50 w-full h-full pt-10 px-4">
                              <div className="flex justify-between items-center mb-6">
                                 <div className="font-bold text-lg text-navy">Hello, Alex</div>
                                 <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
                              </div>
                              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
                                 <div className="text-xs font-bold text-gray-400 mb-1">CURRENT STATUS</div>
                                 <div className="text-lg font-bold text-growth">Visa Lodged</div>
                                 <div className="text-xs text-gray-400 mt-2">Est. decision: 24 Days</div>
                              </div>
                              <div className="bg-navy p-4 rounded-xl shadow-sm text-white mb-4">
                                 <div className="text-xs font-bold text-white/60 mb-1">PENDING ACTION</div>
                                 <div className="font-bold mb-2">Upload Police Check</div>
                                 <MockButton className="w-full py-2 bg-white text-navy font-bold rounded text-xs">Tap to Upload</MockButton>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* AGENT PORTAL VIEW */}
               {activeTab === 'AGENT' && (
                  <div className="grid md:grid-cols-2 gap-12 items-center w-full animate-fade-in">
                     <div>
                        <h3 className="text-3xl font-bold text-navy mb-4">The Caseworker's Command Center</h3>
                        <p className="text-gray-600 mb-6">
                           Designed for speed. Agents manage tasks, draft forms, and log file notes without clicking through endless menus.
                        </p>
                        <ul className="space-y-4">
                           <li className="flex items-start gap-3">
                              <div className="p-1.5 bg-techBlue/10 rounded-full mt-0.5"><Briefcase className="h-4 w-4 text-techBlue" /></div>
                              <div>
                                 <strong className="block text-navy">Kanban Case Boards</strong>
                                 <span className="text-sm text-gray-500">Drag-and-drop cases through stages (Intake &rarr; Lodgement &rarr; Decision).</span>
                              </div>
                           </li>
                           <li className="flex items-start gap-3">
                              <div className="p-1.5 bg-techBlue/10 rounded-full mt-0.5"><Lock className="h-4 w-4 text-techBlue" /></div>
                              <div>
                                 <strong className="block text-navy">Smart Form Automation</strong>
                                 <span className="text-sm text-gray-500">Auto-fill Form 80, 1221, and 956 from client data in 1 click.</span>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-2 w-full max-w-lg transform rotate-2 hover:rotate-0 transition-all">
                        <div className="bg-gray-50 border-b border-gray-200 p-3 flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-400"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                           <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <div className="p-4 grid grid-cols-3 gap-4 h-64">
                           <div className="bg-gray-100 rounded p-2">
                              <div className="text-xs font-bold text-gray-500 mb-2">TO DO (4)</div>
                              <div className="bg-white p-2 rounded shadow-sm text-xs border-l-2 border-red-500 mb-2">
                                 <div className="font-bold text-navy">Draft Submission</div>
                                 <div className="text-gray-400">Smith - 482</div>
                              </div>
                              <div className="bg-white p-2 rounded shadow-sm text-xs mb-2">
                                 <div className="font-bold text-navy">Call Client</div>
                                 <div className="text-gray-400">Wong - 189</div>
                              </div>
                           </div>
                           <div className="bg-gray-100 rounded p-2">
                              <div className="text-xs font-bold text-gray-500 mb-2">LODGED (12)</div>
                              <div className="bg-white p-2 rounded shadow-sm text-xs border-l-2 border-green-500">
                                 <div className="font-bold text-navy">Nomination</div>
                                 <div className="text-gray-400">TechCorp</div>
                              </div>
                           </div>
                           <div className="bg-gray-100 rounded p-2">
                              <div className="text-xs font-bold text-gray-500 mb-2">DECIDED (52)</div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* ADMIN PORTAL VIEW */}
               {activeTab === 'ADMIN' && (
                  <div className="grid md:grid-cols-2 gap-12 items-center w-full animate-fade-in">
                     <div>
                        <h3 className="text-3xl font-bold text-navy mb-4">Executive Oversight & Control</h3>
                        <p className="text-gray-600 mb-6">
                           Manage risk, revenue, and resources across multiple branches or countries from one dashboard.
                        </p>
                        <ul className="space-y-4">
                           <li className="flex items-start gap-3">
                              <div className="p-1.5 bg-navy/10 rounded-full mt-0.5"><Shield className="h-4 w-4 text-navy" /></div>
                              <div>
                                 <strong className="block text-navy">Role-Based Access</strong>
                                 <span className="text-sm text-gray-500">Granular permissions, backed by Postgres row-level security so a tenant boundary cannot be crossed even by the application role.</span>
                              </div>
                           </li>
                           <li className="flex items-start gap-3">
                              <div className="p-1.5 bg-navy/10 rounded-full mt-0.5"><LayoutDashboard className="h-4 w-4 text-navy" /></div>
                              <div>
                                 <strong className="block text-navy">Financial Reporting</strong>
                                 <span className="text-sm text-gray-500">Real-time revenue tracking, arrears by matter, and staff utilization reports.</span>
                              </div>
                           </li>
                        </ul>
                     </div>
                     <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 w-full max-w-lg">
                        <div className="flex justify-between mb-6">
                           <h4 className="font-bold text-navy">Firm Performance</h4>
                           <select className="text-xs bg-gray-100 rounded px-2"><option>This Month</option></select>
                        </div>
                        <div className="flex items-end gap-2 h-32 mb-4 border-b border-gray-100 pb-2">
                           <div className="w-full bg-navy/10 rounded-t h-[40%]"></div>
                           <div className="w-full bg-navy/20 rounded-t h-[60%]"></div>
                           <div className="w-full bg-navy/30 rounded-t h-[50%]"></div>
                           <div className="w-full bg-navy rounded-t h-[85%] relative">
                              <div className="absolute -top-6 left-0 w-full text-center text-xs font-bold text-navy">$42k</div>
                           </div>
                           <div className="w-full bg-gray-100 rounded-t h-[20%]"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-3 bg-gray-50 rounded border border-gray-100">
                              <div className="text-xs text-gray-500">Staff Utilization</div>
                              <div className="font-bold text-navy">92%</div>
                           </div>
                           <div className="p-3 bg-gray-50 rounded border border-gray-100">
                              <div className="text-xs text-gray-500">Churn Rate</div>
                              <div className="font-bold text-red-500">1.2%</div>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

            </div>
         </div>
         
         <div className="text-center">
            <Button onClick={onOpenWaitlist} variant="gold" className="px-8 py-4 text-lg">
               Explore the Ecosystem <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
         </div>
      </div>

    </div>
  );
};