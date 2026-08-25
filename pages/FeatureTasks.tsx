import React from 'react';
import { ListTodo, CalendarClock, Users, BellRing } from 'lucide-react';
import { Button } from '../components/Button';

export const FeatureTasks: React.FC<{onOpenWaitlist: () => void}> = ({onOpenWaitlist}) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
         <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Features</span>
            <span>/</span>
            <span className="text-navy font-bold">Task Management</span>
         </div>
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 mb-6">
                 <ListTodo className="h-4 w-4 text-goldDark" />
                 <span className="text-xs font-bold uppercase tracking-wide text-goldDark">Project Management</span>
               </div>
               <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
                 Chaos, managed.
               </h1>
               <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                 A dedicated Kanban board for immigration cases. Track every deadline, RFI, and expiry date without sticky notes.
               </p>
               <Button onClick={onOpenWaitlist} variant="primary" className="px-8 py-4">
                  See Kanban Board
               </Button>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 overflow-hidden transform rotate-1 hover:rotate-0 transition-transform">
               <div className="flex gap-4 overflow-x-auto pb-4">
                  <div className="w-48 shrink-0 bg-gray-50 rounded-lg p-3">
                     <div className="text-xs font-bold text-gray-400 mb-3 uppercase">To Do</div>
                     <div className="bg-white p-3 rounded shadow-sm border-l-4 border-red-400 mb-2">
                        <div className="text-xs font-bold text-navy">Draft Submission</div>
                        <div className="text-[10px] text-gray-500 mt-1">Due: Tomorrow</div>
                     </div>
                  </div>
                  <div className="w-48 shrink-0 bg-gray-50 rounded-lg p-3">
                     <div className="text-xs font-bold text-gray-400 mb-3 uppercase">In Progress</div>
                     <div className="bg-white p-3 rounded shadow-sm border-l-4 border-techBlue mb-2">
                        <div className="text-xs font-bold text-navy">Review Documents</div>
                        <div className="text-[10px] text-gray-500 mt-1">Assignee: Sarah</div>
                     </div>
                     <div className="bg-white p-3 rounded shadow-sm border-l-4 border-techBlue">
                        <div className="text-xs font-bold text-navy">Client Meeting</div>
                        <div className="text-[10px] text-gray-500 mt-1">2:00 PM</div>
                     </div>
                  </div>
                  <div className="w-48 shrink-0 bg-gray-50 rounded-lg p-3">
                     <div className="text-xs font-bold text-gray-400 mb-3 uppercase">Lodged</div>
                     <div className="bg-white p-3 rounded shadow-sm border-l-4 border-growth">
                        <div className="text-xs font-bold text-navy">Partner Visa 820</div>
                        <div className="text-[10px] text-gray-500 mt-1">Checklist complete · 12/12</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <CalendarClock className="h-8 w-8 text-techBlue mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Critical Dates</h3>
               <p className="text-gray-600 text-sm">Never miss a visa expiry or RFI deadline. System sends email/SMS reminders 90, 60, and 30 days out.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <Users className="h-8 w-8 text-growth mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Workload Balancing</h3>
               <p className="text-gray-600 text-sm">See which agents are overloaded. Re-assign cases in one click to balance the team's capacity.</p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
               <BellRing className="h-8 w-8 text-goldDark mb-4" />
               <h3 className="font-bold text-navy text-lg mb-2">Smart Triggers</h3>
               <p className="text-gray-600 text-sm">Automatically create a "Lodgement" task when a client pays their invoice.</p>
            </div>
         </div>
      </div>
    </div>
  );
};