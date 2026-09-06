import React from 'react';
import type { CapabilityRow, CapabilityStatus } from '../types';

const STATUS_LABEL: Record<CapabilityStatus, string> = {
  live: 'Live',
  pack: 'Config pack',
  sandbox: 'Sandbox',
  caution: 'Caution',
  'not-integrated': 'Not integrated',
};

const STATUS_CLASS: Record<CapabilityStatus, string> = {
  live: 't-live',
  pack: 't-pack',
  sandbox: 't-cont',
  caution: 't-block',
  'not-integrated': 't-neutral',
};

/**
 * "What's built today" — the honesty pattern from GovX. Five states:
 * populated (below), empty (`rows.length === 0`), overflowing (the `.t-wrap`
 * horizontal-scroll affordance in globals.css handles >12 rows on narrow
 * viewports), row hover (`table.dt tbody tr:hover`), and every sandbox row
 * carries its tag inline — never in a separate legend.
 */
export const CapabilityTable: React.FC<{ rows: CapabilityRow[]; caption?: string }> = ({ rows, caption }) => {
  if (rows.length === 0) {
    return (
      <div className="panel-soft" role="status">
        <p className="mb-0 text-sm" style={{ color: 'var(--s-muted)' }}>
          Capability data unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="t-wrap" role="region" aria-label={caption ?? 'Capability table'} tabIndex={0}>
      <table className="dt">
        <thead>
          <tr>
            <th scope="col">Capability</th>
            <th scope="col">Status</th>
            <th scope="col">Detail</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.capability}>
              <th scope="row">{row.capability}</th>
              <td>
                <span className={`tag ${STATUS_CLASS[row.status]}`}>{STATUS_LABEL[row.status]}</span>
                {row.tier && <span className="tag t-neutral" style={{ marginInlineStart: '0.35rem' }}>{row.tier}</span>}
              </td>
              <td>{row.detail ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
