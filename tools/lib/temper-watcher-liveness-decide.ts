export type LivenessReason = "ok" | "down" | "stalled"

export interface LivenessDecision {
  readonly healthy: boolean
  readonly reason: LivenessReason
}

export function decideWatcherLiveness(input: {
  readonly lastHealthyHeartbeatAgeMs: number | null
  readonly unitActive: boolean
  readonly stalenessThresholdMs: number
}): LivenessDecision {
  const fresh =
    input.lastHealthyHeartbeatAgeMs !== null &&
    input.lastHealthyHeartbeatAgeMs < input.stalenessThresholdMs
  if (fresh) return { healthy: true, reason: "ok" }
  return { healthy: false, reason: input.unitActive ? "stalled" : "down" }
}

export interface AlertDecision {
  readonly page: boolean
  readonly nextAlertedAtMs: number | null
}

export function decideLivenessAlert(input: {
  readonly healthy: boolean
  readonly priorAlertedAtMs: number | null
  readonly nowMs: number
  readonly cooldownMs: number
}): AlertDecision {
  if (input.healthy) return { page: false, nextAlertedAtMs: null }
  if (input.priorAlertedAtMs === null) return { page: true, nextAlertedAtMs: input.nowMs }
  if (input.nowMs - input.priorAlertedAtMs >= input.cooldownMs) {
    return { page: true, nextAlertedAtMs: input.nowMs }
  }
  return { page: false, nextAlertedAtMs: input.priorAlertedAtMs }
}

export interface CrashAlertDecision {
  readonly page: boolean
  readonly nextFatalAlertedAtMs: number | null
}

export function decideCrashAlert(input: {
  readonly latestFatalMs: number | null
  readonly priorFatalAlertedAtMs: number | null
  readonly cooldownMs: number
}): CrashAlertDecision {
  const prior = input.priorFatalAlertedAtMs
  if (input.latestFatalMs === null) return { page: false, nextFatalAlertedAtMs: prior }
  if (prior === null) return { page: true, nextFatalAlertedAtMs: input.latestFatalMs }
  if (input.latestFatalMs <= prior) return { page: false, nextFatalAlertedAtMs: prior }
  if (input.latestFatalMs - prior >= input.cooldownMs) {
    return { page: true, nextFatalAlertedAtMs: input.latestFatalMs }
  }
  return { page: false, nextFatalAlertedAtMs: prior }
}
