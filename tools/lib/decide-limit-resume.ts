
export const ELIGIBILITY_HOLD_MS = 60_000

export const LIMIT_RESUME_FLOOR_MS = 120_000

export interface LimitResumeInput {
  readonly deathDetected: boolean
  readonly poolHasCapacity: boolean
  readonly eligibilityHeldMs: number | null
  readonly eligibilityHoldMs?: number
  readonly earliestResetMs: number | null
  readonly now: number
  readonly recentlyNudged: boolean
}

export type LimitResumeDecision =
  | { readonly kind: "nudge"; readonly reason: string }
  | { readonly kind: "wait"; readonly reason: string }
  | { readonly kind: "hold"; readonly reason: string }

export function decideLimitResume(input: LimitResumeInput): LimitResumeDecision {
  if (!input.deathDetected) {
    return { kind: "hold", reason: "no usage-limit death on the last assistant turn" }
  }
  if (input.recentlyNudged) {
    return { kind: "hold", reason: "resume nudge already sent inside the floor window" }
  }
  if (input.poolHasCapacity) {
    const holdMs = input.eligibilityHoldMs ?? ELIGIBILITY_HOLD_MS
    const heldMs = input.eligibilityHeldMs
    if (heldMs != null && heldMs >= holdMs) {
      return {
        kind: "nudge",
        reason: `pool has an eligible account, held ${Math.round(heldMs / 1000)}s — resume`,
      }
    }
    return {
      kind: "wait",
      reason: `pool reads eligible but has held only ${
        heldMs == null ? 0 : Math.round(heldMs / 1000)
      }s of ${Math.round(holdMs / 1000)}s — re-check next tick`,
    }
  }
  if (input.earliestResetMs != null && input.now >= input.earliestResetMs) {
    return { kind: "nudge", reason: "earliest account-eligible reset has arrived — resume" }
  }
  const detail =
    input.earliestResetMs == null ? "no computable reset yet" : "awaiting earliest reset"
  return { kind: "wait", reason: `pool exhausted, ${detail} — re-check next tick` }
}
