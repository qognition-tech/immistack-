import React from 'react';
import { Scale, CheckCircle2, Shield } from 'lucide-react';
import { BookCallTrigger } from '../components/BookCallTrigger';

export const IndustryAgents: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Industries</span>
            <span>/</span>
            <span className="text-navy font-bold">Migration Agents</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-6">
                   <Scale className="h-4 w-4 text-goldDark" />
                   <span className="text-xs font-bold uppercase tracking-wide text-goldDark">Legal Professional</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
                   Compliance without the headache.
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                   Designed specifically for OMARA and OISC registered agents. Immistack enforces the Code of Conduct in your workflow automatically.
                </p>
                <BookCallTrigger variant="gold" className="px-8 py-4">
                   Book a Demo
                </BookCallTrigger>
             </div>
             <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="font-bold text-navy mb-6 border-b border-gray-100 pb-2">Agent Toolkit</h3>
                <div className="space-y-4">
                   {[
                      "Automated Code of Conduct delivery to client",
                      "Visa expiry alerts driven by configurable alert rules",
                      "Conflict of Interest checker",
                      "CPD Point logbook",
                      "Secure file note timestamping"
                   ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                         <CheckCircle2 className="h-5 w-5 text-growth shrink-0" />
                         <span className="text-gray-700 text-sm">{item}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </div>
  );
};