import React from 'react';
import { Settings, Users, Globe, BarChart3, CreditCard, Lock } from 'lucide-react';
import { Button } from '../components/Button';
import { SandboxBadge } from '../components/SandboxBadge';

export const FeatureAdminPortal: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
         <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Features</span>
            <span>/</span>
            <span className="text-navy font-bold">Admin Portal</span>
         </div>
         <div className="bg-navy rounded-3xl p-8 md:p-16 border border-gray-700 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="relative z-10 max-w-3xl text-white">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 mb-6">
                 <Settings className="h-4 w-4 text-gold" />
                 <span className="text-xs font-bold uppercase tracking-wide text-gold">Mission Control</span>
               </div>
               <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mb-6">
                 Complete firm oversight.
               </h1>
               <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                 Manage users, billing rules, and global settings from one dashboard. The Admin Portal gives you the controls to scale your firm securely.
               </p>
               <Button onClick={onOpenWaitlist} variant="gold" className="px-8 py-4">
                  Access Admin Demo
               </Button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid gap-20">
            
            {/* Section 1: Staff & Roles */}
            <div className="grid md:grid-cols-3 gap-8">
               <div className="md:col-span-1">
                  <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-6">
                     <Users className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4">Staff & Role Management</h3>
                  <p className="text-gray-600">
                     Create custom roles (e.g., "Senior Agent", "Paralegal", "Accountant") with granular permissions.
                  </p>
               </div>
               <div className="md:col-span-2 bg-white border border-gray-200 rounded-xl shadow-sm p-6 sm:p-8">
                  <h4 className="font-bold text-navy mb-4 border-b border-gray-100 pb-2">Permission Matrix</h4>
                  <div className="overflow-x-auto -mx-2 px-2">
                  <div className="grid grid-cols-4 gap-x-3 gap-y-4 text-sm min-w-[420px]">
                     <div className="font-bold text-gray-500">Action</div>
                     <div className="text-center font-bold text-navy">Admin</div>
                     <div className="text-center font-bold text-navy">Agent</div>
                     <div className="text-center font-bold text-navy">Junior</div>
                     
                     <div className="text-gray-600">View Client Data</div>
                     <div className="text-center text-growth">✓</div>
                     <div className="text-center text-growth">✓</div>
                     <div className="text-center text-growth">✓</div>

                     <div className="text-gray-600">Approve Refunds</div>
                     <div className="text-center text-growth">✓</div>
                     <div className="text-center text-gray-300">-</div>
                     <div className="text-center text-gray-300">-</div>

                     <div className="text-gray-600">Delete Files</div>
                     <div className="text-center text-growth">✓</div>
                     <div className="text-center text-gray-300">-</div>
                     <div className="text-center text-gray-300">-</div>
                  </div>
                  </div>
               </div>
            </div>

            {/* Section 2: Global Configuration */}
            <div className="grid md:grid-cols-2 gap-12">
               <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                     <Globe className="h-6 w-6 text-techBlue" />
                     <h3 className="text-xl font-bold text-navy">Country & Module Enablement</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm">
                     Operating in multiple jurisdictions? Toggle modules on/off for specific branches.
                  </p>
                  <div className="space-y-4">
                     <div className="flex justify-between items-center p-3 border border-gray-100 rounded bg-slate-50">
                        <span className="font-bold text-navy text-sm">Australia (OMARA)</span>
                        <div className="w-10 h-5 bg-green-500 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1"></div></div>
                     </div>
                     <div className="flex justify-between items-center p-3 border border-gray-100 rounded bg-slate-50">
                        <span className="font-bold text-navy text-sm">New Zealand (IAA)</span>
                        <div className="w-10 h-5 bg-gray-300 rounded-full relative"><div className="w-3 h-3 bg-white rounded-full absolute top-1 left-1"></div></div>
                     </div>
                  </div>
               </div>

               <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                  <div className="flex items-center gap-3 mb-6">
                     <CreditCard className="h-6 w-6 text-goldDark" />
                     <h3 className="text-xl font-bold text-navy">Pricing & Payment Rules</h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-sm">
                     Set default professional fees for visa types, pulled from the country config pack, and record settlement against each matter.
                  </p>
                  <div className="space-y-4">
                     <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Client settlement</span>
                        <span className="font-bold text-navy">Staff-recorded</span>
                     </div>
                     <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                        <span className="text-gray-600">Tax Rate (GST)</span>
                        <span className="font-bold text-navy">10%</span>
                     </div>
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Currency</span>
                        <span className="font-bold text-navy">AUD (Base)</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Section 3: Analytics */}
            <div className="bg-navyLight rounded-2xl p-8 border border-gray-700">
               <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
                  <div className="flex items-center gap-3">
                     <BarChart3 className="h-6 w-6 text-gold" />
                     <h3 className="text-2xl font-bold text-white">Advanced Analytics Dashboard</h3>
                  </div>
                  <SandboxBadge dark />
               </div>
               <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-navy p-4 rounded-lg border border-gray-600">
                     <div className="text-xs text-gray-400 uppercase tracking-widest">Revenue</div>
                     <div className="text-2xl font-bold text-white mt-1">$1.2M</div>
                  </div>
                  <div className="bg-navy p-4 rounded-lg border border-gray-600">
                     <div className="text-xs text-gray-400 uppercase tracking-widest">Active Cases</div>
                     <div className="text-2xl font-bold text-white mt-1">482</div>
                  </div>
                  <div className="bg-navy p-4 rounded-lg border border-gray-600">
                     <div className="text-xs text-gray-400 uppercase tracking-widest">Staff Count</div>
                     <div className="text-2xl font-bold text-white mt-1">12</div>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};