import React from 'react';
import { ArrowRight, CheckCircle2, Layout, MessageSquare, Zap, CreditCard, Landmark, DollarSign } from 'lucide-react';
import { Button } from '../components/Button';

export const FeatureCRM: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
         <div className="bg-white rounded-3xl p-8 md:p-16 border border-gray-100 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-techBlue/5 skew-x-12 transform translate-x-20"></div>
            
            <div className="relative z-10 max-w-2xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-techBlue/10 border border-techBlue/20 mb-6">
                 <Layout className="h-4 w-4 text-techBlue" />
                 <span className="text-xs font-bold uppercase tracking-wide text-techBlue">Intelligent CRM</span>
               </div>
               <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-navy mb-6">
                 Stop doing data entry.
               </h1>
               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                 Immistack captures leads from your website, WhatsApp, and email, then automatically creates client profiles. No more copying details from PDFs to spreadsheets.
               </p>
               <Button onClick={onOpenWaitlist} variant="secondary" className="px-8 py-4">
                  See CRM in Action
               </Button>
            </div>
         </div>
      </div>

      {/* Feature Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
            <div>
               <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-4">Smart Questionnaires</h3>
               <p className="text-lg text-gray-600 mb-6">
                  Build intake forms with conditional logic. If a client selects "Married", the form automatically asks for Spousal details. If they select "Single", it skips.
               </p>
               <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                     <CheckCircle2 className="h-5 w-5 text-growth" />
                     <span className="text-gray-700">Embed directly on your website</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <CheckCircle2 className="h-5 w-5 text-growth" />
                     <span className="text-gray-700">Multi-language support</span>
                  </li>
                  <li className="flex items-center gap-3">
                     <CheckCircle2 className="h-5 w-5 text-growth" />
                     <span className="text-gray-700">Auto-save progress for clients</span>
                  </li>
               </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
               {/* Mock Form */}
               <div className="space-y-4">
                  <div className="h-4 bg-gray-100 rounded w-1/3 mb-4"></div>
                  <div className="p-4 border border-techBlue rounded-lg bg-techBlue/5 relative">
                     <div className="absolute -top-3 left-3 bg-white px-2 text-xs font-bold text-techBlue">Conditional Logic Active</div>
                     <div className="text-sm font-bold text-navy mb-2">Relationship Status</div>
                     <div className="flex gap-2">
                        <div className="bg-techBlue text-white px-4 py-2 rounded text-sm">Married</div>
                        <div className="bg-white border border-gray-200 text-gray-500 px-4 py-2 rounded text-sm">Single</div>
                     </div>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 animate-fade-in-up">
                     <div className="text-sm font-bold text-navy mb-2">Spouse Name</div>
                     <div className="h-8 bg-white border border-gray-200 rounded"></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid md:grid-cols-2 gap-16 mb-24 items-center">
            <div className="order-2 md:order-1 bg-navy p-8 rounded-2xl shadow-lg border border-gray-700">
               {/* Mock Automation */}
               <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                     <MessageSquare className="h-5 w-5 text-growth" />
                     <div className="text-sm text-white">Client sends WhatsApp: "Is my visa approved?"</div>
                  </div>
                  <div className="flex justify-center">
                     <div className="h-8 w-px bg-gray-600"></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-techBlue/20 rounded-lg border border-techBlue/30">
                     <Zap className="h-5 w-5 text-techBlue" />
                     <div className="text-sm text-white">AI Agent checks database status</div>
                  </div>
                  <div className="flex justify-center">
                     <div className="h-8 w-px bg-gray-600"></div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                     <MessageSquare className="h-5 w-5 text-growth" />
                     <div className="text-sm text-white">Auto-Reply: "Hi John, it is currently in 'Further Assessment'."</div>
                  </div>
               </div>
            </div>
            <div className="order-1 md:order-2">
               <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-4">WhatsApp & Email Sync</h3>
               <p className="text-lg text-gray-600 mb-6">
                  Stop searching through your phone for client messages. Immistack syncs WhatsApp and Email conversations directly to the client's timeline.
               </p>
               <Button onClick={onOpenWaitlist} variant="primary">
                  Connect Communication Channels <ArrowRight className="ml-2 h-4 w-4" />
               </Button>
            </div>
         </div>

         {/* New Section: Financial & Payments */}
         <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-sm mb-12">
            <div className="text-center mb-12">
               <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-4">Get Paid Faster, Your Way.</h2>
               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Invoices, stage payments and a payment-gated workflow: a matter cannot advance while an invoice is in arrears.
               </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
                     <CreditCard className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="font-bold text-navy text-lg mb-2">Settle However You Already Do</h4>
                  <p className="text-sm text-gray-500 mb-4">
                     Take payment by bank transfer or terminal, then record it against the matter. Money in and money out are kept in separate columns and never summed together.
                  </p>
                  <div className="flex gap-2 opacity-60">
                     <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded">Receivables</span>
                     <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded">Payables</span>
                  </div>
               </div>

               <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                     <Landmark className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-navy text-lg mb-2">Staged Plans With a Real Gate</h4>
                  <p className="text-sm text-gray-500 mb-4">
                     Upfront, instalment or stage-gated plans come from the config pack. When a plan says a stage is unpaid, the matter cannot advance past it — enforced by the workflow, not by a reminder.
                  </p>
                  <div className="flex gap-2 opacity-60">
                     <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded">Stage-gated</span>
                     <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded">Instalments</span>
                  </div>
               </div>

               <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                     <DollarSign className="h-6 w-6 text-orange-600" />
                  </div>
                  <h4 className="font-bold text-navy text-lg mb-2">Automated Installments</h4>
                  <p className="text-sm text-gray-500 mb-4">
                     Set up "Stage Payments" (e.g., 50% on Intake, 50% on Lodgement). System auto-charges cards on due dates.
                  </p>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};