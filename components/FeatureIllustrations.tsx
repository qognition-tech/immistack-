import React from 'react';
import { Settings, Paperclip, ChevronRight, BarChart3, Users } from 'lucide-react';
import { SampleTag } from './FeatureSection';

/** Workflow editor — ported from the live site's "Workflow Editor: Intake"
 *  card (git HEAD `components/FeaturePillars.tsx`), retokened. */
export const WorkflowEditorIllustration: React.FC = () => (
  <div className="panel-soft" style={{ position: 'relative' }}>
    <SampleTag />
    <div className="card" style={{ overflow: 'hidden' }}>
      <div
        className="px-4 sm:px-6 py-3 sm:py-4 flex flex-wrap justify-between items-center gap-2"
        style={{ borderBottom: '1px solid var(--s-line)', background: 'var(--s-soft)' }}
      >
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4" style={{ color: 'var(--s-muted)' }} aria-hidden="true" />
          <h4 className="text-sm font-bold" style={{ color: 'var(--s-ink)', marginTop: 0 }}>Workflow editor: intake</h4>
        </div>
        <span className="tag t-live">Active</span>
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="p-3 rounded" style={{ border: '1px solid var(--s-accent)', background: 'color-mix(in srgb, var(--s-accent) 8%, transparent)' }}>
          <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1">
            <span className="text-sm font-bold" style={{ color: 'var(--s-ink)' }}>1. Subclass identification</span>
            <span className="text-xs" style={{ color: 'var(--s-muted)' }}>Conditional</span>
          </div>
        </div>
        <div className="flex justify-center"><div className="h-4 w-0.5" style={{ background: 'var(--s-line)' }} /></div>
        <div className="p-3 rounded card" style={{ borderRadius: '0.25rem' }}>
          <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1">
            <span className="text-sm font-bold" style={{ color: 'var(--s-ink)' }}>2. Upload passport</span>
            <span className="text-xs" style={{ color: 'var(--s-muted)' }}>Required</span>
          </div>
        </div>
        <div className="flex justify-center"><div className="h-4 w-0.5" style={{ background: 'var(--s-line)' }} /></div>
        <div className="p-3 rounded text-center text-xs" style={{ border: '1px dashed var(--s-line)', background: 'var(--s-soft)', color: 'var(--s-muted)' }}>
          + Add step (e.g. payment, engagement letter)
        </div>
      </div>
    </div>
  </div>
);

/** Per-subclass document checklist — new illustration, not in the original
 *  site (which had none), built for the product's real differentiator per
 *  Elena's design brief §3. Three-valued states only: never a false positive. */
export const DocumentChecklistIllustration: React.FC = () => (
  <div className="panel-soft" style={{ position: 'relative' }}>
    <SampleTag />
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="px-4 sm:px-6 py-3 sm:py-4" style={{ borderBottom: '1px solid var(--s-line)', background: 'var(--s-soft)' }}>
        <h4 className="text-sm font-bold" style={{ color: 'var(--s-ink)', marginTop: 0 }}>Subclass 482 — document checklist</h4>
      </div>
      <table className="dt" style={{ fontSize: '0.8125rem' }}>
        <thead>
          <tr>
            <th scope="col">Document</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Passport</th>
            <td><span className="tag t-live">Uploaded</span></td>
          </tr>
          <tr>
            <th scope="row">Police certificate</th>
            <td><span className="tag t-cont">Not yet uploaded</span></td>
          </tr>
          <tr>
            <th scope="row">Skills assessment</th>
            <td><span className="tag t-neutral">Not required — this subclass</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

/** Payments & installments — new illustration, showing the real,
 *  payment-gated workflow (an unpaid invoice blocks the next stage). */
export const PaymentsIllustration: React.FC = () => (
  <div className="panel-soft" style={{ position: 'relative' }}>
    <SampleTag />
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center" style={{ borderBottom: '1px solid var(--s-line)', background: 'var(--s-soft)' }}>
        <h4 className="text-sm font-bold" style={{ color: 'var(--s-ink)', marginTop: 0 }}>Invoice — [Client Name]</h4>
        <span className="tag t-cont">Unpaid</span>
      </div>
      <div className="p-4 sm:p-6">
        <table className="dt" style={{ fontSize: '0.8125rem', marginBottom: '1rem' }}>
          <thead>
            <tr><th scope="col">Installment</th><th scope="col">Due</th><th scope="col">Status</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">1 of 2</th><td>Paid</td><td><span className="tag t-live">Paid</span></td></tr>
            <tr><th scope="row">2 of 2</th><td>Overdue</td><td><span className="tag t-block">Unpaid</span></td></tr>
          </tbody>
        </table>
        <div className="panel" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Paperclip className="h-4 w-4 shrink-0" style={{ color: 'var(--s-danger)' }} aria-hidden="true" />
          <span className="text-sm" style={{ color: 'var(--s-body)' }}>Next stage blocked — installment 2 of 2 is unpaid.</span>
        </div>
      </div>
    </div>
  </div>
);

/** Client portal — ported from the live site's client-portal mock (git HEAD
 *  `components/FeaturePillars.tsx`), retokened, firm name genericised. */
export const ClientPortalIllustration: React.FC = () => (
  <div style={{ position: 'relative' }}>
    <SampleTag />
    <div className="card" style={{ overflow: 'hidden' }}>
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between gap-3" style={{ background: 'var(--s-ink)' }}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 shrink-0 rounded flex items-center justify-center font-bold border" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.2)', fontFamily: 'var(--font-serif)' }}>F</div>
          <div className="leading-tight">
            <div className="text-white font-bold text-sm">[Firm Name] portal</div>
            <div className="text-[10px]" style={{ color: '#8C939D' }}>Powered by ImmiStack</div>
          </div>
        </div>
        <div className="h-8 w-8 shrink-0 rounded-full flex items-center justify-center font-bold text-xs border" style={{ background: 'var(--s-accent)', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>JD</div>
      </div>
      <div className="p-4 sm:p-6" style={{ background: 'var(--s-soft)' }}>
        <div className="card p-4 sm:p-5 mb-4">
          <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
            <div>
              <h4 className="font-bold" style={{ color: 'var(--s-ink)', marginTop: 0, fontSize: 'var(--text-base)' }}>Subclass 482 visa</h4>
              <div className="text-xs" style={{ color: 'var(--s-muted)' }}>Matter #[sample]</div>
            </div>
            <span className="tag t-live">On track</span>
          </div>
          <div className="w-full rounded-full h-2 mb-2" style={{ background: 'var(--s-line)' }}>
            <div className="h-2 rounded-full" style={{ width: '75%', background: 'var(--s-success)' }} />
          </div>
          <div className="flex justify-between gap-1 text-[10px] uppercase font-bold tracking-tight" style={{ color: 'var(--s-muted)' }}>
            <span>Intake</span><span>Preparation</span><span style={{ color: 'var(--s-success)' }}>Lodgement</span><span>Decision</span>
          </div>
        </div>
        <div className="card flex items-center justify-between gap-2 p-3 sm:p-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Paperclip className="h-4 w-4 shrink-0" style={{ color: 'var(--s-danger)' }} aria-hidden="true" />
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--s-ink)' }}>Action required</div>
              <div className="text-xs" style={{ color: 'var(--s-muted)' }}>Please upload police certificate</div>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0" style={{ color: 'var(--s-muted)' }} aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
);

/**
 * Dark analytics band — ported from the live site's "Firm Performance" panel
 * (git HEAD `components/FeaturePillars.tsx`, pillar 3), retokened via
 * `.band-dark`. The precise-looking "98.2% success rate" stat from the
 * original is dropped — that reads as a performance claim about the product,
 * not a data-visualisation capability demo. Revenue/utilisation stay as
 * clearly-tagged sample figures illustrating the capability itself.
 */
export const AnalyticsBand: React.FC = () => (
  <section className="py-16 sm:py-20 lg:py-24 band-dark">
    <div className="wrap">
      <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
        <div className="order-2 lg:order-1" style={{ position: 'relative' }}>
          <SampleTag />
          <div className="card p-5 sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4" style={{ borderBottom: '1px solid #2B3038' }}>
              <h3 className="font-bold flex items-center gap-2" style={{ color: '#fff', marginTop: 0, fontSize: 'var(--text-lg)' }}>
                <BarChart3 className="h-5 w-5" style={{ color: 'var(--s-accent)' }} aria-hidden="true" /> Firm performance
              </h3>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #2B3038' }}>
                <div className="text-xs mb-1 uppercase tracking-wider font-bold" style={{ color: '#8C939D' }}>Revenue</div>
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#fff' }}>A$142k</div>
              </div>
              <div className="p-4 sm:p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid #2B3038' }}>
                <div className="text-xs mb-1 uppercase tracking-wider font-bold" style={{ color: '#8C939D' }}>Team utilisation</div>
                <div className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--s-accent)' }}>85%</div>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="kicker">Business intelligence</span>
          <h2 style={{ marginTop: 0 }}>Know how the practice is performing.</h2>
          <p className="lede mb-6">
            Analytics dashboards are a Practice Pro and Firm capability — see the pricing page for which tier includes them.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <BarChart3 className="h-6 w-6 shrink-0" style={{ color: 'var(--s-accent)' }} aria-hidden="true" />
              <div>
                <h4 className="font-bold" style={{ color: '#fff', marginTop: 0 }}>Revenue forecasting</h4>
                <p className="text-sm" style={{ color: '#C7CBD1' }}>Upcoming cash flow, based on installment schedules already in the system.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Users className="h-6 w-6 shrink-0" style={{ color: 'var(--s-accent)' }} aria-hidden="true" />
              <div>
                <h4 className="font-bold" style={{ color: '#fff', marginTop: 0 }}>Staff productivity</h4>
                <p className="text-sm" style={{ color: '#C7CBD1' }}>Where matters are held up, by stage and by staff member.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
