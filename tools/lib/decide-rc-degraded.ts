
import type { RcDegradedThresholds } from "./rc-degraded-thresholds.ts"
import {
  CLEAR_RC_CONFIRM_LATCH,
  INITIAL_RC_SEAT_STREAK,
  type RcConfirmLatch,
  type RcDegradedAction,
  type RcSeatStreak,
} from "./rc-degraded-state.ts"

export interface RcDegradedDecideInput {
  readonly edgeCount: number | null
  readonly childAgeMs: number | null
  readonly priorStreak: RcSeatStreak
  readonly latch: RcConfirmLatch
  readonly healthyFloor: number
  readonly debounceStreak: number
  readonly recoveryStreak: number
  readonly reAlertCooldownMs: number
  readonly bootSettleMs: number
  readonly bootCeilingMs: number
  readonly maintenanceResumeQuiet: boolean
  readonly now: number
}

export interface RcDegradedDecision {
  readonly action: RcDegradedAction
  readonly nextStreak: RcSeatStreak
  readonly nextLatch: RcConfirmLatch
}

export function decideRcDegraded(input: RcDegradedDecideInput): RcDegradedDecision {
  const {
    edgeCount,
    childAgeMs,
    priorStreak,
    latch,
    healthyFloor,
    debounceStreak,
    recoveryStreak,
    reAlertCooldownMs,
    bootSettleMs,
    bootCeilingMs,
    maintenanceResumeQuiet,
    now,
  } = input

  if (edgeCount === null) {
    return { action: "none", nextStreak: priorStreak, nextLatch: latch }
  }

  if (edgeCount >= healthyFloor) {
    if (latch.alertedAt === null) {
      return { action: "none", nextStreak: INITIAL_RC_SEAT_STREAK, nextLatch: latch }
    }
    const healthyStreak = priorStreak.healthyStreak + 1
    if (healthyStreak >= recoveryStreak && now - latch.alertedAt >= reAlertCooldownMs) {
      return {
        action: "none",
        nextStreak: INITIAL_RC_SEAT_STREAK,
        nextLatch: CLEAR_RC_CONFIRM_LATCH,
      }
    }
    return { action: "none", nextStreak: { degradedStreak: 0, healthyStreak }, nextLatch: latch }
  }

  const degradedStreak = priorStreak.degradedStreak + 1
  const nextStreak: RcSeatStreak = { degradedStreak, healthyStreak: 0 }

  if (degradedStreak < debounceStreak) {
    return { action: "none", nextStreak, nextLatch: latch }
  }

  if (maintenanceResumeQuiet) {
    return { action: "none", nextStreak, nextLatch: latch }
  }

  if (latch.alertedAt !== null) {
    return { action: "none", nextStreak, nextLatch: latch }
  }

  if (childAgeMs !== null && childAgeMs < bootCeilingMs) {
    if (childAgeMs < bootSettleMs) {
      return { action: "none", nextStreak, nextLatch: latch }
    }
    return { action: "boot-dark", nextStreak, nextLatch: { alertedAt: now } }
  }

  return { action: "alert", nextStreak, nextLatch: { alertedAt: now } }
}

export interface RcDegradedObservation {
  readonly edgeCount: number | null
  readonly childAgeMs: number | null
  readonly maintenanceResumeQuiet: boolean
  readonly now: number
}

export interface RcDegradedSeat {
  readonly seat: string
  readonly priorStreak: RcSeatStreak
  readonly latch: RcConfirmLatch
  readonly observation: RcDegradedObservation
  readonly thresholds: RcDegradedThresholds
}

export interface RcDegradedVerdict {
  readonly seat: string
  readonly action: RcDegradedAction
  readonly nextStreak: RcSeatStreak
  readonly nextLatch: RcConfirmLatch
}

export function decideRcDegradedBatch(
  seats: readonly RcDegradedSeat[]
): RcDegradedVerdict[] {
  return seats.map(({ seat, priorStreak, latch, observation, thresholds }) => {
    const { action, nextStreak, nextLatch } = decideRcDegraded({
      edgeCount: observation.edgeCount,
      childAgeMs: observation.childAgeMs,
      priorStreak,
      latch,
      healthyFloor: thresholds.healthyFloor,
      debounceStreak: thresholds.debounceStreak,
      recoveryStreak: thresholds.recoveryStreak,
      reAlertCooldownMs: thresholds.reAlertCooldownMs,
      bootSettleMs: thresholds.bootSettleMs,
      bootCeilingMs: thresholds.bootCeilingMs,
      maintenanceResumeQuiet: observation.maintenanceResumeQuiet,
      now: observation.now,
    })
    return { seat, action, nextStreak, nextLatch }
  })
}
