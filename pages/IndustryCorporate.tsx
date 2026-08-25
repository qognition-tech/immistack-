import React from 'react';
import { Building2, Globe, Shield } from 'lucide-react';
import { Button } from '../components/Button';

export const IndustryCorporate: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Industries</span>
            <span>/</span>
            <span className="text-navy font-bold">Corporate HR</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/5 border border-navy/10 mb-6">
                   <Building2 className="h-4 w-4 text-navy" />
                   <span className="text-xs font-bold uppercase tracking-wide text-navy">Global Mobility</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
                   Internal mobility, simplified.
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                   For in-house HR teams managing expat assignments. Ensure 100% right-to-work compliance for your global workforce.
                </p>
                <Button onClick={onOpenWaitlist} variant="primary" className="px-8 py-4">
                   Contact Enterprise
                </Button>
             </div>
             <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="font-bold text-navy mb-6 border-b border-gray-100 pb-2">Corporate Features</h3>
                <div className="space-y-4">
                   {[
                      "Right-to-Work check automation",
                      "Sponsorship obligation tracking",
                      "Assignment cost forecasting",
                      "Vendor management portal (External Counsel)",
                      "Executive reporting dashboard"
                   ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                         <Shield className="h-5 w-5 text-navy shrink-0" />
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