import React from 'react';
import { Scale, GraduationCap, Building2, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { Page } from '../types';

interface IndustriesProps {
  onOpenWaitlist: () => void;
  onNavigate: (page: Page) => void;
}

export const Industries: React.FC<IndustriesProps> = ({onOpenWaitlist, onNavigate}) => {
  return (
    <div className="pt-32 pb-24 bg-slate animate-fade-in">
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
             <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">Tailored for your workflow.</h1>
             <p className="text-xl text-gray-600">Select your industry vertical to see specific features.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
             
             {/* INDUSTRY 1: Migration Agents */}
             <div 
               onClick={() => onNavigate('INDUSTRY_AGENTS')}
               className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col h-full"
             >
                <div className="p-3 bg-gold/10 rounded-lg w-fit mb-6"><Scale className="h-8 w-8 text-goldDark" /></div>
                <h2 className="text-2xl font-bold text-navy mb-4 group-hover:text-goldDark transition-colors">Migration Agents</h2>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed flex-grow">
                   For registered agents (OMARA/OISC) who need rigorous compliance, a tamper-evident audit trail, and CPD tracking.
                </p>
                <div className="flex items-center text-goldDark font-bold text-sm mt-auto">
                   View Features <ArrowRight className="h-4 w-4 ml-2" />
                </div>
             </div>

             {/* INDUSTRY 2: Education Consultants */}
             <div 
               onClick={() => onNavigate('INDUSTRY_EDUCATION')}
               className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col h-full"
             >
                <div className="p-3 bg-techBlue/10 rounded-lg w-fit mb-6"><GraduationCap className="h-8 w-8 text-techBlue" /></div>
                <h2 className="text-2xl font-bold text-navy mb-4 group-hover:text-techBlue transition-colors">Education Consultants</h2>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed flex-grow">
                   Manage high-volume student intakes, track university commissions, and manage sub-agent networks.
                </p>
                <div className="flex items-center text-techBlue font-bold text-sm mt-auto">
                   View Features <ArrowRight className="h-4 w-4 ml-2" />
                </div>
             </div>

             {/* INDUSTRY 3: Corporate HR */}
             <div 
               onClick={() => onNavigate('INDUSTRY_CORPORATE')}
               className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all group flex flex-col h-full"
             >
                <div className="p-3 bg-navy/5 rounded-lg w-fit mb-6"><Building2 className="h-8 w-8 text-navy" /></div>
                <h2 className="text-2xl font-bold text-navy mb-4 group-hover:text-navy transition-colors">Corporate HR</h2>
                <p className="text-gray-600 mb-8 text-sm leading-relaxed flex-grow">
                   Internal mobility management. Track expat assignments, sponsorship obligations, and right-to-work checks.
                </p>
                <div className="flex items-center text-navy font-bold text-sm mt-auto">
                   View Features <ArrowRight className="h-4 w-4 ml-2" />
                </div>
             </div>

          </div>
       </div>
    </div>
  );
};