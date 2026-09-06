import React from 'react';
import { GraduationCap, Users, PieChart } from 'lucide-react';
import { Button } from '../components/Button';

export const IndustryEducation: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Industries</span>
            <span>/</span>
            <span className="text-navy font-bold">Education Consultants</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-techBlue/10 border border-techBlue/20 mb-6">
                   <GraduationCap className="h-4 w-4 text-techBlue" />
                   <span className="text-xs font-bold uppercase tracking-wide text-techBlue">Student Recruitment</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
                   Scale your student intake.
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                   High volume processing for education agents. Manage thousands of applications per semester and track university commissions.
                </p>
                <Button onClick={onOpenWaitlist} variant="primary" className="px-8 py-4">
                   Request Demo
                </Button>
             </div>
             <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h3 className="font-bold text-navy mb-6 border-b border-gray-100 pb-2">Education Features</h3>
                <div className="space-y-4">
                   {[
                      "Bulk student upload (CSV)",
                      "Sub-agent portal with commission splitting",
                      "Course search database (CRICOS)",
                      "University offer letter tracking",
                      "OSHC health insurance integration"
                   ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                         <Users className="h-5 w-5 text-techBlue shrink-0" />
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