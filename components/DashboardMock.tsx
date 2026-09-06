import React from 'react';
import { LayoutDashboard, Users, FileText, CreditCard, Settings, Bell, MoreHorizontal } from 'lucide-react';
import { SandboxBadge } from './SandboxBadge';

/**
 * The hero product mock — ported from the live site's "Enterprise Dashboard
 * Mockup" (git HEAD `components/HeroSection.tsx`) onto Tailwind 4 tokens.
 *
 * Per the operator's reskin direction: sample figures are allowed ONLY
 * inside this badged mock, never in body copy. Two things from the original
 * are deliberately NOT carried over, per Elena's kill list and
 * meru-core/CLAUDE.md §7.3 ("never render unknown data as a positive
 * result"): invented client names ("TechCorp Inc.", "Sarah Connor") are
 * replaced with the literal placeholder `[Client Name]`, which cannot be
 * mistaken for a real record.
 * claims-ok: explicit negative disclosure, naming the removed claim to explain why it's gone
 * "Paid (Stripe)" is replaced with "Paid" — Stripe is not an integration this product has.
 */
export const DashboardMock: React.FC = () => (
  <div className="relative">
    <div className="card" style={{ overflow: 'hidden' }}>
      {/* Top nav */}
      <div
        className="h-12 sm:h-14 flex items-center justify-between px-3 sm:px-4"
        style={{ borderBottom: '1px solid var(--s-line)', background: 'var(--s-bg)' }}
      >
        <div className="flex items-center gap-3 sm:gap-6 min-w-0">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-sm flex items-center justify-center text-xs font-bold"
              style={{ background: 'var(--s-ink)', color: 'var(--s-bg)' }}
            >
              IS
            </div>
            <span className="text-sm font-bold" style={{ color: 'var(--s-ink)' }}>ImmiStack</span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Full disclosure from `sm:` up; below that (a 375px phone toolbar)
              the short form still says "sandbox" rather than being dropped —
              this mock is the highest-traffic sandbox disclosure on the site
              and must stay visible at every viewport, not just desktop. */}
          <SandboxBadge className="hidden sm:inline-flex" label="Sandbox preview · sample data" />
          <SandboxBadge className="sm:hidden" label="Sandbox" />
          <span className="p-2 rounded-full relative" style={{ color: 'var(--s-muted)' }} aria-hidden="true">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full border" style={{ background: 'var(--s-danger)', borderColor: 'var(--s-bg)' }} />
          </span>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border"
            style={{ background: 'var(--s-accent)', color: '#fff', borderColor: 'var(--s-bg)' }}
            aria-hidden="true"
          >
            JD
          </div>
        </div>
      </div>

      <div className="flex" style={{ background: 'var(--s-soft)' }}>
        {/* Sidebar */}
        <div className="w-11 sm:w-16 md:w-40 lg:w-56 shrink-0 flex flex-col pt-4" style={{ background: 'var(--s-ink)' }}>
          <div className="px-1.5 sm:px-3 mb-6">
            <div className="text-[10px] font-bold uppercase tracking-wider mb-2 hidden md:block" style={{ color: '#8C939D' }}>Main</div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-md text-white cursor-default" style={{ background: 'rgba(255,255,255,0.1)', borderInlineStart: '2px solid var(--s-accent)' }}>
                <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium hidden md:block">Dashboard</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md" style={{ color: '#8C939D' }}>
                <Users className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium hidden md:block">Cases</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md" style={{ color: '#8C939D' }}>
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium hidden md:block">Documents</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-md" style={{ color: '#8C939D' }}>
                <CreditCard className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium hidden md:block">Billing</span>
              </div>
            </div>
          </div>
          <div className="mt-auto px-1.5 sm:px-3 pb-6">
            <div className="flex items-center gap-3 px-3 py-2 rounded-md" style={{ color: '#8C939D' }}>
              <Settings className="h-4 w-4" aria-hidden="true" />
              <span className="text-sm font-medium hidden md:block">Settings</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6">
          <div className="flex flex-wrap justify-between items-end gap-2 mb-4 sm:mb-6">
            <div>
              <h2 className="text-base sm:text-xl lg:text-2xl font-bold" style={{ color: 'var(--s-ink)', fontFamily: 'var(--font-serif)' }}>Executive overview</h2>
              <p className="text-[10px] sm:text-xs" style={{ color: 'var(--s-muted)' }}>Sample tenant — not a real firm's data.</p>
            </div>
          </div>

          {/* KPI tiles — sample data, badged above */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
            <div className="card p-2.5 sm:p-3 lg:p-4">
              <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: 'var(--s-muted)' }}>Active matters</div>
              <div className="text-base sm:text-lg lg:text-2xl font-bold u-num" style={{ color: 'var(--s-ink)' }}>84</div>
            </div>
            <div className="card p-2.5 sm:p-3 lg:p-4">
              <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: 'var(--s-muted)' }}>Documents outstanding</div>
              <div className="text-base sm:text-lg lg:text-2xl font-bold u-num" style={{ color: 'var(--s-ink)' }}>12</div>
            </div>
            <div className="card p-2.5 sm:p-3 lg:p-4">
              <div className="text-[10px] uppercase tracking-wide mb-1" style={{ color: 'var(--s-muted)' }}>Approaching expiry</div>
              <div className="text-base sm:text-lg lg:text-2xl font-bold u-num" style={{ color: 'var(--s-warning)' }}>3</div>
            </div>
          </div>

          {/* Recent matters */}
          <div className="card" style={{ overflow: 'hidden' }}>
            <div className="px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center" style={{ borderBottom: '1px solid var(--s-line)', background: 'var(--s-soft)' }}>
              <h3 className="text-sm font-bold" style={{ color: 'var(--s-ink)' }}>Recent matters</h3>
              <MoreHorizontal className="h-4 w-4" style={{ color: 'var(--s-muted)' }} aria-hidden="true" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[320px] text-left dt" style={{ fontSize: '0.75rem' }}>
                <thead>
                  <tr>
                    <th scope="col">Client / matter</th>
                    <th scope="col">Stage</th>
                    <th scope="col">Fees</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="font-bold" style={{ color: 'var(--s-ink)' }}>[Client Name]</div>
                      <div style={{ color: 'var(--s-muted)' }}>TSS 482 nomination</div>
                    </td>
                    <td><span className="tag t-pack">Lodged</span></td>
                    <td>Paid</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="font-bold" style={{ color: 'var(--s-ink)' }}>[Client Name]</div>
                      <div style={{ color: 'var(--s-muted)' }}>Partner 820</div>
                    </td>
                    <td><span className="tag t-cont">Info requested</span></td>
                    <td>Pending</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
