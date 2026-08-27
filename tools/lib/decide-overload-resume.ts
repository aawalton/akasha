
export const OVERLOAD_FIRST_WAIT_MS = 30_000

export const OVERLOAD_MAX_WAIT_MS = 1_800_000

export interface OverloadResumeInput {
  readonly overloadDetected: boolean
  readonly consecutiveOverloads: number
  readonly lastNudgeAtMs: number | null
  readonly now: number
}

export type OverloadResumeDecision =
  | { readonly kind: "nudge"; readonly reason: string; readonly attempt: number }
  | { readonly kind: "wait"; readonly reason: string; readonly readyAtMs: number }
  | { readonly kind: "hold"; readonly reason: string }

export function overloadWaitMs(consecutiveOverloads: number): number {
  const seen = Number.isFinite(consecutiveOverloads) ? Math.floor(consecutiveOverloads) : 1
  const doublings = Math.max(0, seen - 2)
  const grown = OVERLOAD_FIRST_WAIT_MS * 2 ** Math.min(doublings, 64)
  return Math.min(grown, OVERLOAD_MAX_WAIT_MS)
}

function seconds(ms: number): string {
  return `${Math.round(ms / 1000)}s`
}

export function decideOverloadResume(input: OverloadResumeInput): OverloadResumeDecision {
  if (!input.overloadDetected) {
    return { kind: "hold", reason: "the last turn did not end in an overload" }
  }
  const seen = Math.max(1, Math.floor(input.consecutiveOverloads) || 1)
  if (input.lastNudgeAtMs === null) {
    return {
      kind: "nudge",
      attempt: 1,
      reason: "overloaded and never nudged — nothing has been tried yet",
    }
  }
  const waitMs = overloadWaitMs(seen)
  const readyAtMs = input.lastNudgeAtMs + waitMs
  if (input.now >= readyAtMs) {
    return {
      kind: "nudge",
      attempt: seen,
      reason: `overloaded ${seen} time(s) running and the ${seconds(waitMs)} wait has passed`,
    }
  }
  return {
    kind: "wait",
    readyAtMs,
    reason: `overloaded ${seen} time(s) running, ${seconds(
      readyAtMs - input.now
    )} left of the ${seconds(waitMs)} wait`,
  }
}
