/**
 * Durable lead store — written BEFORE any Twenty CRM call, so a Twenty outage
 * (or a bad API key) never loses a submission. Backed by Upstash Redis over
 * its REST API via the official `@upstash/redis` client.
 *
 * Upstash, not Vercel KV: the operator's standing rule across this workspace
 * is Upstash for Redis. ../govx-marketing/api/_lib/store.ts accepts
 * `UPSTASH_REDIS_REST_URL/TOKEN` *or* `KV_REST_API_URL/TOKEN` as a fallback —
 * this file takes only the Upstash names, deliberately, per that rule.
 *
 * Key shape: `immistack:lead:<uuid>`. TTL 90 days — long enough to recover a
 * lead by hand after a CRM outage, not a permanent PII store.
 */
import { Redis } from '@upstash/redis';

const URL = process.env.UPSTASH_REDIS_REST_URL || '';
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || '';

export const LEAD_TTL_SECONDS = 60 * 60 * 24 * 90; // 90 days

export interface LeadStore {
  configured: boolean;
  put(key: string, value: unknown, ttlSeconds?: number): Promise<boolean>;
}

// Auto-pipelining batches multiple commands issued in the same microtask into
// one HTTP request. This handler only ever issues one `put` per invocation,
// so it buys nothing and only adds a wire-format surprise (an array-wrapped
// response) for no benefit — disabled explicitly rather than left implicit.
const client = URL && TOKEN ? new Redis({ url: URL, token: TOKEN, enableAutoPipelining: false }) : null;

export const leadStore: LeadStore = client
  ? {
      configured: true,
      async put(key, value, ttlSeconds = LEAD_TTL_SECONDS) {
        await client.set(key, JSON.stringify(value), { ex: ttlSeconds });
        return true;
      },
    }
  : {
      configured: false,
      async put(key) {
        // Loud, every call — a silent no-op here means a lost lead looks
        // identical to a saved one in the response the visitor sees.
        console.error(
          `[lead-store] NO DURABLE STORE CONFIGURED — lead ${key} was NOT persisted. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.`,
        );
        return false;
      },
    };

export function leadKey(id: string): string {
  return `immistack:lead:${id}`;
}
