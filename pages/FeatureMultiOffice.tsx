import React from 'react';
import { Globe, Building, Shield, Coins } from 'lucide-react';
import { Button } from '../components/Button';

export const FeatureMultiOffice: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
         <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Features</span>
            <span>/</span>
            <span className="text-navy font-bold">Multi-Office</span>
         </div>
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 mb-6">
                 <Globe className="h-4 w-4 text-navy" />
                 <span className="text-xs font-bold uppercase tracking-wide text-navy">Global Scale</span>
               </div>
               <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
                 One platform. Unlimited branches.
               </h1>
               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                 Manage a global network of offices from a single headquarters view. Segregate data by branch while centralizing financial reporting.
               </p>
               <Button onClick={onOpenWaitlist} variant="primary" className="px-8 py-4">
                  Contact Enterprise Sales
               </Button>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 sm:p-8">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                     <div className="text-xs font-bold text-gray-400 uppercase">Melbourne HQ</div>
                     <div className="text-xl font-bold text-navy">$842k</div>
                     <div className="text-[10px] text-green-600">AUD Revenue</div>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                     <div className="text-xs font-bold text-gray-400 uppercase">London Branch</div>
                     <div className="text-xl font-bold text-navy">£120k</div>
                     <div className="text-[10px] text-blue-600">GBP Revenue</div>
                  </div>
               </div>
               <div className="bg-navy p-4 rounded-lg text-white">
                  <div className="flex items-center gap-3 mb-2">
                     <Shield className="h-4 w-4 text-gold" />
                     <span className="font-bold text-sm">Permission Fence Active</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                     Staff in <span className="text-white font-bold">London</span> cannot access files from <span className="text-white font-bold">Melbourne</span> unless explicitly assigned.
                  </p>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <Building className="h-8 w-8 text-techBlue mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Branch Partitioning</h3>
               <p className="text-gray-600 text-sm">Keep client databases separate for data sovereignty and privacy compliance (GDPR vs Australian Privacy Principles).</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <Coins className="h-8 w-8 text-goldDark mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Multi-Currency</h3>
               <p className="text-gray-600 text-sm">Issue invoices in local currencies for each branch. Consolidate reporting into a single base currency for HQ.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <Shield className="h-8 w-8 text-growth mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Unified Compliance</h3>
               <p className="text-gray-600 text-sm">Apply different compliance rules per branch (e.g., OMARA rules for AU office, OISC rules for UK office).</p>
            </div>
         </div>
      </div>
    </div>
  );
};