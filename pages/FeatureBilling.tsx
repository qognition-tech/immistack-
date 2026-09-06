import React from 'react';
import { CreditCard, DollarSign, RefreshCw, Receipt, Globe } from 'lucide-react';
import { BookCallTrigger } from '../components/BookCallTrigger';
import { MockButton, SandboxBadge } from '../components/SandboxBadge';

export const FeatureBilling: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
         <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Features</span>
            <span>/</span>
            <span className="text-navy font-bold">Billing & Invoicing</span>
         </div>
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-techBlue/10 border border-techBlue/20 mb-6">
                 <CreditCard className="h-4 w-4 text-techBlue" />
                 <span className="text-xs font-bold uppercase tracking-wide text-techBlue">Smart Payments</span>
               </div>
               <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
                 Itemized invoices. Settlement stays yours.
               </h1>
               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                 Create itemized, per-matter invoices with fee schedules pulled from the country config pack. Clients settle with the provider you already use — there is no client-facing payment processor — and staff record each payment against the matter the moment it lands.
               </p>
               <BookCallTrigger variant="primary" className="px-8 py-4">
                  Book a Demo
               </BookCallTrigger>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
               <div className="flex justify-end mb-4">
                  <SandboxBadge />
               </div>
               <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                  <div>
                     <div className="text-2xl font-bold text-navy">$4,500.00</div>
                     <div className="text-xs text-gray-400">Total Due</div>
                  </div>
                  <MockButton className="bg-navy text-white px-6 py-2 rounded-lg font-bold text-sm">Mark as Paid</MockButton>
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-600">Professional Fees (Stage 1)</span>
                     <span className="font-bold text-navy">$2,500.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                     <span className="text-gray-600">Visa Application Charge</span>
                     <span className="font-bold text-navy">$2,000.00</span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded text-xs text-gray-500 flex items-center gap-2 mt-4">
                     <CreditCard className="h-4 w-4" /> Marked paid by staff — settled outside the platform
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <CreditCard className="h-8 w-8 text-indigo-600 mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Keep Your Provider</h3>
               <p className="text-gray-600 text-sm mb-4">Clients settle with you the way they already do. Staff record each payment against the matter, and the ledger keeps receivables and payables in separate columns — they are never added together.</p>
               <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold">Receivable</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold">Payable</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold">Government fee</span>
               </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <Globe className="h-8 w-8 text-green-600 mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Fees You Pay, Tracked Separately</h3>
               <p className="text-gray-600 text-sm mb-2">Government charges the firm pays on a client's behalf — a visa application charge, a disbursement — are recorded as outbound, with their own kind and reference, so a receivables report is never inflated by money that went the other way.</p>
               <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Globe className="h-3 w-3" /> Fee schedules come from the country config pack
               </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <RefreshCw className="h-8 w-8 text-techBlue mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Milestone Billing</h3>
               <p className="text-gray-600 text-sm">Break professional fees into stage-based milestones — on intake, on lodgement, on decision. Each milestone is its own invoice; staff record payment against it as the client settles.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <DollarSign className="h-8 w-8 text-growth mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Multi-Currency</h3>
               <p className="text-gray-600 text-sm">Invoice in USD, AUD, GBP, or CAD. Ideal for firms with international offices or clients.</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <Receipt className="h-8 w-8 text-goldDark mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Payment-Gated Workflow</h3>
               <p className="text-gray-600 text-sm">Turn on <code className="text-xs">blockProgressOnArrears</code> and a matter cannot advance to the next stage while an invoice is overdue. No chasing, no exceptions.</p>
            </div>
         </div>
      </div>
    </div>
  );
};