import React from 'react';
import { Briefcase, UserPlus, FileText, PenTool, BellRing, ShieldCheck, CheckCircle2, FileSearch } from 'lucide-react';
import { Button } from '../components/Button';
import { MockButton } from '../components/SandboxBadge';

export const FeatureStaffPortal: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
         <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Features</span>
            <span>/</span>
            <span className="text-navy font-bold">Staff Portal</span>
         </div>
         <div className="bg-white rounded-3xl p-8 md:p-16 border border-gray-200 shadow-xl">
            <div className="max-w-3xl">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-techBlue/10 border border-techBlue/20 mb-6">
                 <Briefcase className="h-4 w-4 text-techBlue" />
                 <span className="text-xs font-bold uppercase tracking-wide text-techBlue">The Engine Room</span>
               </div>
               <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold text-navy mb-6">
                 Where work actually gets done.
               </h1>
               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                 The Staff Portal is optimized for high-velocity casework. Agents can switch between lead handling, document review, and visa drafting without ever leaving the interface.
               </p>
               <Button onClick={onOpenWaitlist} variant="secondary" className="px-8 py-4">
                  Tour the Staff Portal
               </Button>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid gap-20">
            
            {/* SUBSECTION 1: Lead Handling */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
               <div>
                  <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center mb-6">
                     <UserPlus className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-4">1. Lead Handling</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                     Don't let leads go cold. The Staff Portal aggregates inquiries from your website, WhatsApp, and email into a single "New Leads" pipeline.
                  </p>
                  <ul className="space-y-3 mt-6">
                     <li className="flex items-center gap-3 text-sm text-navy">
                        <CheckCircle2 className="h-5 w-5 text-growth" /> One-click "Convert to Client"
                     </li>
                     <li className="flex items-center gap-3 text-sm text-navy">
                        <CheckCircle2 className="h-5 w-5 text-growth" /> Auto-assign to available agents
                     </li>
                     <li className="flex items-center gap-3 text-sm text-navy">
                        <CheckCircle2 className="h-5 w-5 text-growth" /> Send fee quotes instantly
                     </li>
                  </ul>
               </div>
               <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
                     <span className="font-bold text-navy">Incoming Leads</span>
                     <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-1 rounded">3 New</span>
                  </div>
                  <div className="space-y-3">
                     <div className="p-3 bg-slate-50 border border-gray-100 rounded hover:border-techBlue cursor-pointer transition-colors">
                        <div className="flex justify-between mb-1">
                           <span className="font-bold text-navy text-sm">John Doe</span>
                           <span className="text-xs text-gray-400">2m ago</span>
                        </div>
                        <div className="text-xs text-gray-500">Interested in Partner Visa 820.</div>
                     </div>
                     <div className="p-3 bg-slate-50 border border-gray-100 rounded hover:border-techBlue cursor-pointer transition-colors">
                        <div className="flex justify-between mb-1">
                           <span className="font-bold text-navy text-sm">TechStart Pty Ltd</span>
                           <span className="text-xs text-gray-400">15m ago</span>
                        </div>
                        <div className="text-xs text-gray-500">Corporate Sponsorship enquiry.</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* SUBSECTION 2: Case Processing */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="order-2 md:order-1 bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                   <div className="mb-4">
                      <div className="text-xs font-bold text-gray-400 uppercase mb-2">Kanban Board: Processing</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                         <div className="bg-gray-100 p-2 rounded">
                            <div className="text-[10px] font-bold text-navy mb-1">In Progress (12)</div>
                            <div className="bg-white p-2 rounded shadow-sm text-xs mb-1">Smith - 482 Visa</div>
                            <div className="bg-white p-2 rounded shadow-sm text-xs">Jones - 186 Visa</div>
                         </div>
                         <div className="bg-gray-100 p-2 rounded">
                            <div className="text-[10px] font-bold text-navy mb-1">Review (4)</div>
                            <div className="bg-white p-2 rounded shadow-sm text-xs border-l-2 border-growth">Lee - 500 Visa</div>
                         </div>
                      </div>
                   </div>
               </div>
               <div className="order-1 md:order-2">
                  <div className="w-12 h-12 bg-growth/10 rounded-xl flex items-center justify-center mb-6">
                     <Briefcase className="h-6 w-6 text-growth" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-4">2. Case Processing</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                     Move cases through a visual pipeline. From "Intake" to "Lodged" to "Finalized". 
                  </p>
                  <ul className="space-y-3 mt-6">
                     <li className="flex items-center gap-3 text-sm text-navy">
                        <CheckCircle2 className="h-5 w-5 text-growth" /> Visual Kanban Boards
                     </li>
                     <li className="flex items-center gap-3 text-sm text-navy">
                        <CheckCircle2 className="h-5 w-5 text-growth" /> Critical Date Reminders
                     </li>
                     <li className="flex items-center gap-3 text-sm text-navy">
                        <CheckCircle2 className="h-5 w-5 text-growth" /> Email syncing to Case File
                     </li>
                  </ul>
               </div>
            </div>

            {/* SUBSECTION 3: Document Requests */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <div className="w-12 h-12 bg-techBlue/10 rounded-xl flex items-center justify-center mb-6">
                     <FileSearch className="h-6 w-6 text-techBlue" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-4">3. Document Requests</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                     Stop chasing clients via email. Send secure upload links to the Client Portal in one click.
                  </p>
                  <p className="text-gray-600">
                     Review documents side-by-side with the case file without downloading. AI flags expiring passports or low-quality scans automatically.
                  </p>
               </div>
               <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
                  <div className="flex gap-2 mb-4">
                     <span className="px-3 py-1 bg-navy text-white text-xs font-bold rounded">Documents</span>
                     <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-bold rounded">Forms</span>
                  </div>
                  <div className="space-y-3">
                     <div className="flex items-center justify-between p-3 border border-gray-100 rounded">
                        <div className="flex items-center gap-3">
                           <FileText className="h-5 w-5 text-red-500" />
                           <span className="text-sm font-bold text-navy">Passport Bio Page</span>
                        </div>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">Verified</span>
                     </div>
                     <div className="flex items-center justify-between p-3 border border-gray-100 rounded bg-orange-50/50">
                        <div className="flex items-center gap-3">
                           <FileText className="h-5 w-5 text-gray-400" />
                           <span className="text-sm font-bold text-navy">Police Check (AFP)</span>
                        </div>
                        <MockButton className="text-xs font-bold text-white bg-techBlue px-3 py-1 rounded">Request</MockButton>
                     </div>
                  </div>
               </div>
            </div>

            {/* SUBSECTION 4: Visa Drafting */}
            <div className="grid md:grid-cols-2 gap-12 items-start">
               <div className="order-2 md:order-1 bg-white border border-gray-200 rounded-xl shadow-lg p-6 relative">
                  <div className="absolute top-4 right-4 text-xs font-mono text-gray-400">ID: #FN-9921</div>
                  <h4 className="font-bold text-navy mb-4">Visa Drafting</h4>
                  <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4 text-sm text-gray-600">
                     <div className="font-bold text-navy mb-1">Form 80 Auto-Fill</div>
                     Populated 42 fields from client profile. 
                     <br/>
                     <span className="text-green-600">✓ Address History verified (No gaps)</span>
                  </div>
                  <div className="flex gap-2">
                     <MockButton className="bg-navy text-white text-xs px-4 py-2 rounded font-bold">Generate PDF</MockButton>
                     <MockButton className="bg-white border border-gray-300 text-gray-600 text-xs px-4 py-2 rounded font-bold">Send for Signature</MockButton>
                  </div>
               </div>
               <div className="order-1 md:order-2">
                  <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center mb-6">
                     <PenTool className="h-6 w-6 text-goldDark" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-4">4. Visa Drafting</h3>
                  <p className="text-gray-600 mb-4 text-lg">
                     Map client data directly into government forms (Form 80, 1221, 956). 
                  </p>
                  <p className="text-gray-600">
                     Generate submission letters using custom templates. Record every interaction in the "Compliance Notes" section for Safe Harbor protection.
                  </p>
                  <ul className="space-y-3 mt-6">
                     <li className="flex items-center gap-3 text-sm text-navy">
                        <CheckCircle2 className="h-5 w-5 text-growth" /> Auto-fill PDFs
                     </li>
                     <li className="flex items-center gap-3 text-sm text-navy">
                        <CheckCircle2 className="h-5 w-5 text-growth" /> Digital Signatures (DocuSign)
                     </li>
                  </ul>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};