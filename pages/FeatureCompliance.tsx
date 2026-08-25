import React from 'react';
import { ShieldCheck, ListChecks, Link2, Calendar, AlertTriangle, GraduationCap, FileSearch } from 'lucide-react';
import { Button } from '../components/Button';
import { MockButton, SandboxBadge } from '../components/SandboxBadge';

export const FeatureCompliance: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
         <div className="bg-navy rounded-3xl p-8 md:p-16 border border-gray-700 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-growth/10 rounded-full blur-[100px]"></div>

            <div className="relative z-10 max-w-2xl text-white">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-growth/10 border border-growth/20 mb-6">
                 <ShieldCheck className="h-4 w-4 text-growth" />
                 <span className="text-xs font-bold uppercase tracking-wide text-growth">Compliance &amp; Audit Trail</span>
               </div>
               <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-bold mb-6">
                 Never miss a visa expiry again.
               </h1>
               <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                 Protect your registration and your clients. Per-subclass document checklists, expiry alerts from configurable rules, and an audit log that cannot be edited after the fact.
               </p>
               <Button onClick={onOpenWaitlist} variant="gold" className="px-8 py-4">
                  Join the Waitlist
               </Button>
            </div>
         </div>
      </div>

      {/* Feature Breakdown */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
               <div className="w-12 h-12 bg-growth/10 rounded-xl flex items-center justify-center mb-6">
                  <ListChecks className="h-6 w-6 text-growth" />
               </div>
               <h3 className="text-xl font-bold text-navy mb-3">Checklists per Subclass</h3>
               <p className="text-gray-600 text-sm">
                  Every matter resolves its document checklist from a versioned config pack for its visa subclass. When the pack changes, you can see which version a matter was assessed against.
               </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
               <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
               </div>
               <h3 className="text-xl font-bold text-navy mb-3">Expiry Alerts from Rules</h3>
               <p className="text-gray-600 text-sm">
                  Alert rules fire on visa expiry, passport expiry and checklist gaps at the thresholds you set. Thresholds live in the same config pack, per country.
               </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
               <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                  <Link2 className="h-6 w-6 text-navy" />
               </div>
               <h3 className="text-xl font-bold text-navy mb-3">Hash-Chained Audit Log</h3>
               <p className="text-gray-600 text-sm">
                  Audit entries are written by database triggers and chained by hash. They cannot be edited or deleted after the fact, not even by the application.
               </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
               <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                  <GraduationCap className="h-6 w-6 text-orange-500" />
               </div>
               <h3 className="text-xl font-bold text-navy mb-3">CPD &amp; PI Insurance Records</h3>
               <p className="text-gray-600 text-sm">
                  Record-keeping for the Migration Agents Regulations 2026: CPD points and professional indemnity cover logged per agent, with renewal dates on the same alert rules.
               </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
               <div className="w-12 h-12 bg-techBlue/10 rounded-xl flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-techBlue" />
               </div>
               <h3 className="text-xl font-bold text-navy mb-3">Deadline Calculator</h3>
               <p className="text-gray-600 text-sm">
                  Calculates review and bridging-visa deadlines from the decision date so the dates on the matter are the dates that count.
               </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
               <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <FileSearch className="h-6 w-6 text-amber-600" />
               </div>
               <h3 className="text-xl font-bold text-navy mb-3">Regulator Integrations</h3>
               <p className="text-gray-600 text-sm">
                  Sandbox integrations for eight regulators, production wiring pending accreditation. Every response carries its adapter, request id, timestamp and a sandbox flag. Visa entitlement checks in Australia are reachable via a commercial gateway provider with the visa holder's recorded consent; that wiring is not yet live.
               </p>
            </div>

         </div>

         {/* Visual Section */}
         <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 px-4 sm:px-8 py-4 flex flex-wrap gap-3 justify-between items-center">
               <div className="flex items-center gap-3">
                  <h3 className="font-bold text-navy">Compliance Dashboard</h3>
                  <SandboxBadge />
               </div>
               <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400"></div>
               </div>
            </div>
            <div className="p-4 sm:p-8 overflow-x-auto">
               <table className="w-full text-left min-w-[640px]">
                  <thead>
                     <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <th className="pb-4">Client</th>
                        <th className="pb-4">Visa Subclass</th>
                        <th className="pb-4">Expiry Date</th>
                        <th className="pb-4">Checklist</th>
                        <th className="pb-4 text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm">
                     <tr className="border-b border-gray-50">
                        <td className="py-4 font-bold text-navy">Sarah Connor</td>
                        <td className="py-4 text-gray-600">482 TSS</td>
                        <td className="py-4 text-red-500 font-bold">14 Days Left</td>
                        <td className="py-4"><span className="bg-green-100 text-growth px-2 py-1 rounded text-xs font-bold">12 / 12 · pack v4</span></td>
                        <td className="py-4 text-right"><MockButton className="text-techBlue font-bold">Extend</MockButton></td>
                     </tr>
                     <tr className="border-b border-gray-50">
                        <td className="py-4 font-bold text-navy">Kyle Reese</td>
                        <td className="py-4 text-gray-600">820 Partner</td>
                        <td className="py-4 text-gray-600">12 Nov 2025</td>
                        <td className="py-4"><span className="bg-green-100 text-growth px-2 py-1 rounded text-xs font-bold">9 / 9 · pack v4</span></td>
                        <td className="py-4 text-right"><MockButton className="text-gray-400">View</MockButton></td>
                     </tr>
                     <tr>
                        <td className="py-4 font-bold text-navy">T-800 Systems</td>
                        <td className="py-4 text-gray-600">Standard Business Sponsorship</td>
                        <td className="py-4 text-orange-500 font-bold">3 Months Left</td>
                        <td className="py-4"><span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded text-xs font-bold">7 / 10 · 3 missing</span></td>
                        <td className="py-4 text-right"><MockButton className="text-gray-400">View</MockButton></td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};
