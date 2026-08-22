import React from 'react';
import { CreditCard, DollarSign, RefreshCw, Receipt, Globe, Upload } from 'lucide-react';
import { Button } from '../components/Button';
import { MockButton } from '../components/SandboxBadge';

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
               <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
                 Turn quotes into cash, instantly.
               </h1>
               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                 Create beautiful, itemized invoices that clients can pay in one click. We support diverse payment methods including local bank transfers, global gateways, and automated installment plans.
               </p>
               <Button onClick={onOpenWaitlist} variant="primary" className="px-8 py-4">
                  Start Free Trial
               </Button>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
               <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-6">
                  <div>
                     <div className="text-2xl font-bold text-navy">$4,500.00</div>
                     <div className="text-xs text-gray-400">Total Due</div>
                  </div>
                  <MockButton className="bg-navy text-white px-6 py-2 rounded-lg font-bold text-sm">Pay Now</MockButton>
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
                     <CreditCard className="h-4 w-4" /> Paid via Card ending 4242
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <CreditCard className="h-8 w-8 text-indigo-600 mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Universal Gateway Support</h3>
               <p className="text-gray-600 text-sm mb-4">Don't change your provider. We integrate with Stripe, Square, PayPal, Authorize.net, LawPay, and eWay.</p>
               <div className="flex gap-2 flex-wrap">
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold">Stripe</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold">LawPay</span>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600 font-semibold">Square</span>
               </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <Globe className="h-8 w-8 text-green-600 mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Bank Transfer & Wise</h3>
               <p className="text-gray-600 text-sm mb-2">Clients prefer local transfers. Issue virtual account numbers via Wise or accept direct deposits.</p>
               <div className="flex items-center gap-2 text-xs text-techBlue font-bold cursor-pointer">
                  <Upload className="h-3 w-3" /> Upload Bank CSV for auto-reconciliation
               </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <RefreshCw className="h-8 w-8 text-techBlue mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Automated Installments</h3>
               <p className="text-gray-600 text-sm">Break fees into monthly milestones. The system automatically charges the client's card on the due date.</p>
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