
export const REPOLL_MIN_INTERVAL_MS = 60_000

export const REPOLL_BREAKER_MS = 300_000

export type RepollGateState = {
  readonly lastAttemptMs: number | null
  readonly breakerUntilMs: number | null
}

export const INITIAL_REPOLL_GATE_STATE: RepollGateState = {
  lastAttemptMs: null,
  breakerUntilMs: null,
}

export type RepollDecision =
  | { readonly kind: "allow" }
  | { readonly kind: "skip"; readonly reason: string }

export function decideUsageRepoll(state: RepollGateState, now: number): RepollDecision {
  if (state.breakerUntilMs != null && now < state.breakerUntilMs) {
    const seconds = Math.ceil((state.breakerUntilMs - now) / 1000)
    return { kind: "skip", reason: `usage-endpoint breaker open for another ${seconds}s` }
  }
  if (state.lastAttemptMs != null && now - state.lastAttemptMs < REPOLL_MIN_INTERVAL_MS) {
    const seconds = Math.ceil((REPOLL_MIN_INTERVAL_MS - (now - state.lastAttemptMs)) / 1000)
    return { kind: "skip", reason: `re-polled ${seconds}s ago, inside the minimum interval` }
  }
  return { kind: "allow" }
}

export function recordRepollAttempt(state: RepollGateState, now: number): RepollGateState {
  return { ...state, lastAttemptMs: now }
}

export function recordUsageRateLimited(state: RepollGateState, now: number): RepollGateState {
  return { ...state, lastAttemptMs: now, breakerUntilMs: now + REPOLL_BREAKER_MS }
}
