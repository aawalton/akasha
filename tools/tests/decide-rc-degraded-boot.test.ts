
import { describe, expect, it } from "bun:test"
import { decideRcDegraded } from "../lib/decide-rc-degraded.ts"
import {
  CLEAR_RC_CONFIRM_LATCH,
  INITIAL_RC_SEAT_STREAK,
  type RcConfirmLatch,
  type RcSeatStreak,
} from "../lib/rc-degraded-state.ts"

const FLOOR = 2
const DEBOUNCE = 4
const RECOVERY = 4
const BOOT_SETTLE = 90_000
const BOOT_CEILING = 600_000
const T0 = 1_000_000_000_000

function decide(over: {
  edgeCount: number | null
  childAgeMs?: number | null
  priorStreak?: RcSeatStreak
  latch?: RcConfirmLatch
  now?: number
  reAlertCooldownMs?: number
  maintenanceResumeQuiet?: boolean
}) {
  return decideRcDegraded({
    edgeCount: over.edgeCount,
    childAgeMs: over.childAgeMs ?? null,
    priorStreak: over.priorStreak ?? INITIAL_RC_SEAT_STREAK,
    latch: over.latch ?? CLEAR_RC_CONFIRM_LATCH,
    healthyFloor: FLOOR,
    debounceStreak: DEBOUNCE,
    recoveryStreak: RECOVERY,
    reAlertCooldownMs: over.reAlertCooldownMs ?? 0,
    bootSettleMs: BOOT_SETTLE,
    bootCeilingMs: BOOT_CEILING,
    maintenanceResumeQuiet: over.maintenanceResumeQuiet ?? false,
    now: over.now ?? T0,
  })
}

describe("decideRcDegraded — boot-dark self-check (#15611): child-age routing", () => {
  const AT_DEBOUNCE: RcSeatStreak = { degradedStreak: DEBOUNCE - 1, healthyStreak: 0 }

  it("YOUNG child (settled, sub-floor, debounce reached) → boot-dark, latch stamped", () => {
    const { action, nextLatch, nextStreak } = decide({
      edgeCount: 1,
      childAgeMs: BOOT_SETTLE,
      priorStreak: AT_DEBOUNCE,
      now: T0,
    })
    expect(action).toBe("boot-dark")
    expect(nextLatch.alertedAt).toBe(T0)
    expect(nextStreak.degradedStreak).toBe(DEBOUNCE)
  })

  it("YOUNG child BEFORE the settle window (debounce reached) → HOLD, no action, no latch", () => {
    const { action, nextLatch, nextStreak } = decide({
      edgeCount: 1,
      childAgeMs: BOOT_SETTLE - 1,
      priorStreak: AT_DEBOUNCE,
    })
    expect(action).toBe("none")
    expect(nextLatch.alertedAt).toBeNull()
    expect(nextStreak.degradedStreak).toBe(DEBOUNCE)
  })

  it("OLD child (age ≥ ceiling) sub-floor → generic human-confirm alert, NOT boot-dark (#15296 intact)", () => {
    const { action, nextLatch } = decide({
      edgeCount: 1,
      childAgeMs: BOOT_CEILING,
      priorStreak: AT_DEBOUNCE,
      now: T0,
    })
    expect(action).toBe("alert")
    expect(nextLatch.alertedAt).toBe(T0)
  })

  it("NULL age (unobservable) sub-floor → generic alert, never boot-dark (fail-safe)", () => {
    const { action } = decide({ edgeCount: 1, childAgeMs: null, priorStreak: AT_DEBOUNCE })
    expect(action).toBe("alert")
  })

  it("boot-dark is single-shot: an already-latched young sub-floor seat holds (no repeat retry)", () => {
    const latch: RcConfirmLatch = { alertedAt: T0 }
    const { action, nextLatch } = decide({
      edgeCount: 1,
      childAgeMs: BOOT_SETTLE + 10_000,
      priorStreak: { degradedStreak: DEBOUNCE, healthyStreak: 0 },
      latch,
      now: T0 + 30_000,
    })
    expect(action).toBe("none")
    expect(nextLatch).toBe(latch)
  })

  it("young sub-floor BELOW debounce only observes (no premature boot-dark)", () => {
    const { action, nextStreak } = decide({
      edgeCount: 1,
      childAgeMs: BOOT_SETTLE + 10_000,
      priorStreak: { degradedStreak: 1, healthyStreak: 0 },
    })
    expect(action).toBe("none")
    expect(nextStreak.degradedStreak).toBe(2)
  })

  it("boot-dark recovery clears the shared latch on sustained health (same path as the alert latch)", () => {
    const latch: RcConfirmLatch = { alertedAt: T0 }
    const cleared = decide({
      edgeCount: FLOOR,
      childAgeMs: BOOT_SETTLE + 60_000,
      priorStreak: { degradedStreak: 0, healthyStreak: RECOVERY - 1 },
      latch,
    })
    expect(cleared.action).toBe("none")
    expect(cleared.nextLatch).toEqual(CLEAR_RC_CONFIRM_LATCH)
  })
})

describe("decideRcDegraded — maintenance-resume boot-dark EXEMPTION (#15761)", () => {
  const AT_DEBOUNCE: RcSeatStreak = { degradedStreak: DEBOUNCE - 1, healthyStreak: 0 }
  const bootDarkShaped = {
    edgeCount: 1,
    childAgeMs: BOOT_SETTLE + 5_000,
    priorStreak: AT_DEBOUNCE,
    now: T0,
  } as const

  it("side A — a maintenance-quiet seat HOLDS (no boot-dark retry, no latch) on the boot-dark shape", () => {
    const { action, nextLatch, nextStreak } = decide({
      ...bootDarkShaped,
      maintenanceResumeQuiet: true,
    })
    expect(action).toBe("none")
    expect(nextLatch.alertedAt).toBeNull()
    expect(nextStreak.degradedStreak).toBe(DEBOUNCE)
  })

  it("side B — the SAME shape with the marker cleared boot-darks (the exemption is the only difference)", () => {
    const quiet = decide({ ...bootDarkShaped, maintenanceResumeQuiet: true })
    const woken = decide({ ...bootDarkShaped, maintenanceResumeQuiet: false })
    expect(quiet.action).toBe("none")
    expect(woken.action).toBe("boot-dark")
  })

  it("a maintenance-quiet seat also holds the generic human-confirm alert (not just boot-dark)", () => {
    const { action } = decide({
      edgeCount: 1,
      childAgeMs: BOOT_CEILING + 60_000,
      priorStreak: AT_DEBOUNCE,
      maintenanceResumeQuiet: true,
    })
    expect(action).toBe("none")
  })

  it("the exemption does not fire early: a quiet seat BELOW debounce still just observes", () => {
    const { action, nextStreak } = decide({
      edgeCount: 1,
      childAgeMs: BOOT_SETTLE + 5_000,
      priorStreak: { degradedStreak: 1, healthyStreak: 0 },
      maintenanceResumeQuiet: true,
    })
    expect(action).toBe("none")
    expect(nextStreak.degradedStreak).toBe(2)
  })
})
