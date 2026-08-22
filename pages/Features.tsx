import React from 'react';
import { Layout, Globe, Users, ArrowRight, Bot, Smartphone, CreditCard, ListTodo, FileText, Briefcase, Shield, Settings, ToggleRight, BarChart3, Lock } from 'lucide-react';
import { Button } from '../components/Button';
import { Page } from '../types';

interface FeaturesProps {
  onOpenWaitlist: () => void;
  onNavigate: (page: Page) => void;
}

export const Features: React.FC<FeaturesProps> = ({ onOpenWaitlist, onNavigate }) => {
  return (
    <div className="pt-24 pb-24 animate-fade-in bg-slate">
      
      {/* Header */}
      <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
         <h1 className="text-4xl md:text-5xl font-heading font-bold text-navy mb-6">
           The complete operating system for <br/><span className="text-goldDark">Migration Agencies</span>.
         </h1>
         <p className="text-xl text-gray-600">
            Select a module below to explore how Immistack can transform your practice.
         </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Pillars Grid */}
        <h3 className="text-2xl font-bold text-navy mb-8 border-l-4 border-gold pl-4">Core Platform</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
           {/* Card 1: CRM */}
           <div onClick={() => onNavigate('FEATURE_CRM')} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-techBlue/10 rounded-lg flex items-center justify-center mb-4">
                  <Layout className="h-6 w-6 text-techBlue" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-techBlue">CRM & Intake</h3>
              <p className="text-sm text-gray-600 mb-4">Smart intake forms that sync directly to case files.</p>
              <span className="text-xs font-bold text-techBlue flex items-center gap-1">Learn more <ArrowRight className="h-3 w-3" /></span>
           </div>

           {/* Card 2: Compliance */}
           <div onClick={() => onNavigate('FEATURE_COMPLIANCE')} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-growth/10 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-growth" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-growth">Compliance & VEVO</h3>
              <p className="text-sm text-gray-600 mb-4">Automated VEVO and right-to-work status checks.</p>
              <span className="text-xs font-bold text-growth flex items-center gap-1">Learn more <ArrowRight className="h-3 w-3" /></span>
           </div>

           {/* Card 3: AI Engine */}
           <div onClick={() => onNavigate('FEATURE_AI')} className="bg-navy rounded-xl p-6 shadow-sm border border-navy hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 border border-white/10">
                    <Bot className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold">AI Automation</h3>
                <p className="text-sm text-slate-400 mb-4">Generate emails and parse documents instantly.</p>
                <span className="text-xs font-bold text-gold flex items-center gap-1">Explore AI <ArrowRight className="h-3 w-3" /></span>
              </div>
           </div>

           {/* Card 4: Portal */}
           <div onClick={() => onNavigate('FEATURE_PORTAL')} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="h-6 w-6 text-goldDark" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-goldDark">Client Portal</h3>
              <p className="text-sm text-gray-600 mb-4">White-labeled mobile app for your clients.</p>
              <span className="text-xs font-bold text-goldDark flex items-center gap-1">Learn more <ArrowRight className="h-3 w-3" /></span>
           </div>

            {/* Card 5: Tasks */}
           <div onClick={() => onNavigate('FEATURE_TASKS')} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <ListTodo className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-purple-600">Task Management</h3>
              <p className="text-sm text-gray-600 mb-4">Kanban boards and critical date reminders.</p>
              <span className="text-xs font-bold text-purple-600 flex items-center gap-1">Learn more <ArrowRight className="h-3 w-3" /></span>
           </div>

           {/* Card 6: Forms */}
           <div onClick={() => onNavigate('FEATURE_FORMS')} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-2 group-hover:text-red-600">Form Automation</h3>
              <p className="text-sm text-gray-600 mb-4">Auto-fill PDF government forms from case data.</p>
              <span className="text-xs font-bold text-red-600 flex items-center gap-1">Learn more <ArrowRight className="h-3 w-3" /></span>
           </div>
        </div>

        {/* Detailed Capabilities Grid */}
        <h3 className="text-2xl font-bold text-navy mb-8 border-l-4 border-techBlue pl-4">Finance & Admin Modules</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-24">
            <div 
                onClick={() => onNavigate('FEATURE_BILLING')}
                className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            >
                <CreditCard className="h-8 w-8 text-navy mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-navy mb-2 group-hover:text-techBlue">Billing & Invoicing</h4>
                <p className="text-sm text-gray-500">Invoices, staged payment plans and a receivables ledger that never mixes money in with money out.</p>
            </div>
            <div 
                onClick={() => onNavigate('FEATURE_MULTIOFFICE')}
                className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            >
                <Globe className="h-8 w-8 text-navy mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-navy mb-2 group-hover:text-techBlue">Multi-Office</h4>
                <p className="text-sm text-gray-500">Manage separate branches and currencies.</p>
            </div>
             <div 
                onClick={() => onNavigate('FEATURE_STAFF_PORTAL')}
                className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            >
                <Briefcase className="h-8 w-8 text-navy mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-navy mb-2 group-hover:text-techBlue">Staff Portal</h4>
                <p className="text-sm text-gray-500">High-velocity dashboard for processing teams.</p>
            </div>
             <div 
                onClick={() => onNavigate('FEATURE_ADMIN_PORTAL')}
                className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group"
            >
                <Shield className="h-8 w-8 text-navy mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-navy mb-2 group-hover:text-techBlue">Admin Portal</h4>
                <p className="text-sm text-gray-500">Global oversight, permissions and reporting.</p>
            </div>
        </div>

        {/* Admin Portal Detailed Subsection */}
        <div id="admin-portal-details" className="bg-slate-50 border border-gray-200 rounded-3xl p-8 md:p-12 mb-20">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
              <div>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 border border-navy/20 mb-4">
                    <Shield className="h-4 w-4 text-navy" />
                    <span className="text-xs font-bold uppercase tracking-wide text-navy">Command Center</span>
                 </div>
                 <h2 className="text-3xl font-heading font-bold text-navy">Admin Portal Overview</h2>
                 <p className="text-gray-600 mt-2 max-w-2xl">
                    Maintain complete control over your firm's operations, security, and configuration.
                 </p>
              </div>
              <Button onClick={() => onNavigate('FEATURE_ADMIN_PORTAL')} variant="outline">
                 View Full Feature Page <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Firm Configuration */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Settings className="h-5 w-5 text-gray-600" />
                 </div>
                 <h4 className="font-bold text-navy mb-2">Firm Configuration</h4>
                 <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    Customize your client portal branding, set global email signatures, and configure tax rates (GST/VAT) for invoicing.
                 </p>
                 <ul className="text-xs text-navy space-y-1">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-growth rounded-full"></div> White-label Branding</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-growth rounded-full"></div> Currency Settings</li>
                 </ul>
              </div>

              {/* Staff Management */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-5 w-5 text-gray-600" />
                 </div>
                 <h4 className="font-bold text-navy mb-2">Staff Management</h4>
                 <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    Onboard new team members and assign granular permissions. Ensure junior staff cannot access Trust Accounts.
                 </p>
                 <ul className="text-xs text-navy space-y-1">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-growth rounded-full"></div> Role-based Access</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-growth rounded-full"></div> Activity Logs</li>
                 </ul>
              </div>

              {/* Module Enablement */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <ToggleRight className="h-5 w-5 text-gray-600" />
                 </div>
                 <h4 className="font-bold text-navy mb-2">Module Enablement</h4>
                 <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    Toggle features on/off based on your branch needs. Enable OMARA compliance for Australia, turn it off for Canada.
                 </p>
                 <ul className="text-xs text-navy space-y-1">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-growth rounded-full"></div> Country Specific Rules</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-growth rounded-full"></div> Feature Toggles</li>
                 </ul>
              </div>

              {/* Analytics Dashboard */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="h-5 w-5 text-gray-600" />
                 </div>
                 <h4 className="font-bold text-navy mb-2">Analytics Dashboard</h4>
                 <p className="text-xs text-gray-500 leading-relaxed mb-4">
                    High-level oversight of firm performance. Track revenue, case velocity, and staff utilization rates in real-time.
                 </p>
                 <ul className="text-xs text-navy space-y-1">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-growth rounded-full"></div> Revenue Forecasting</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 bg-growth rounded-full"></div> Success Rates</li>
                 </ul>
              </div>
           </div>
        </div>

        {/* Integration Section */}
        <div className="bg-navy rounded-3xl p-12 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-techBlue/10 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px]"></div>
           
           <div className="relative z-10">
              <h2 className="text-3xl font-heading font-bold mb-6">Not sure where to start?</h2>
              <p className="text-slate-300 max-w-2xl mx-auto mb-10">
                 Our team can audit your current workflow and suggest the modules that will give you the highest ROI.
              </p>
              <Button onClick={onOpenWaitlist} variant="gold" className="px-8 py-4 text-lg">
                 Book a Workflow Audit
              </Button>
           </div>
        </div>

      </div>
    </div>
  );
};