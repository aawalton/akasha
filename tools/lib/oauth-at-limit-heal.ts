
import { MAX_AT_LIMIT_BACKOFF_MS } from "./oauth-at-limit-expiry.ts"
import type { AccountState } from "./oauth-types.ts"

export const AT_LIMIT_HEAL_THRESHOLD_MS = MAX_AT_LIMIT_BACKOFF_MS

export type StaleAtLimitMark = {
  account: string
  fiveHour: boolean
}

export function selectStaleAtLimitMarks(
  states: readonly AccountState[],
  now: number,
  thresholdMs: number = AT_LIMIT_HEAL_THRESHOLD_MS
): readonly StaleAtLimitMark[] {
  const cutoff = now + thresholdMs
  const out: StaleAtLimitMark[] = []
  for (const s of states) {
    const fiveHour = s.fiveHourAtLimitUntil != null && s.fiveHourAtLimitUntil > cutoff
    if (fiveHour) out.push({ account: s.account, fiveHour })
  }
  return out
}
