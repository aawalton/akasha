
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
const COOLDOWN = 1_800_000
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

describe("decideRcDegraded — healthy / indeterminate", () => {
  it("edge at the floor is healthy → no action, clean slate, latch untouched", () => {
    const { action, nextStreak, nextLatch } = decide({ edgeCount: FLOOR })
    expect(action).toBe("none")
    expect(nextStreak).toEqual(INITIAL_RC_SEAT_STREAK)
    expect(nextLatch).toEqual(CLEAR_RC_CONFIRM_LATCH)
  })

  it("edge above the floor is healthy", () => {
    const { action } = decide({ edgeCount: 7 })
    expect(action).toBe("none")
  })

  it("a healthy observation zeroes an in-progress sub-floor streak but an UNLATCHED seat holds nothing", () => {
    const mid: RcSeatStreak = { degradedStreak: 3, healthyStreak: 0 }
    const { action, nextStreak, nextLatch } = decide({ edgeCount: FLOOR, priorStreak: mid })
    expect(action).toBe("none")
    expect(nextStreak).toEqual(INITIAL_RC_SEAT_STREAK)
    expect(nextLatch).toEqual(CLEAR_RC_CONFIRM_LATCH)
  })

  it("null edge (unobservable) HOLDS streak AND latch, never acts", () => {
    const mid: RcSeatStreak = { degradedStreak: 3, healthyStreak: 0 }
    const latch: RcConfirmLatch = { alertedAt: T0 }
    const { action, nextStreak, nextLatch } = decide({ edgeCount: null, priorStreak: mid, latch })
    expect(action).toBe("none")
    expect(nextStreak).toBe(mid)
    expect(nextLatch).toBe(latch)
  })
})

describe("decideRcDegraded — pre-filter debounce then ONE human-confirm alert", () => {
  it("sub-floor below debounce only observes (increments streak), no alert", () => {
    let streak = INITIAL_RC_SEAT_STREAK
    for (let i = 1; i < DEBOUNCE; i++) {
      const { action, nextStreak, nextLatch } = decide({ edgeCount: 1, priorStreak: streak })
      expect(action).toBe("none")
      expect(nextStreak.degradedStreak).toBe(i)
      expect(nextLatch.alertedAt).toBeNull()
      streak = nextStreak
    }
  })

  it("reaching the debounce streak fires exactly one alert and records alertedAt on the latch", () => {
    const priorStreak: RcSeatStreak = { degradedStreak: DEBOUNCE - 1, healthyStreak: 0 }
    const { action, nextStreak, nextLatch } = decide({ edgeCount: 1, priorStreak, now: T0 })
    expect(action).toBe("alert")
    expect(nextLatch.alertedAt).toBe(T0)
    expect(nextStreak.degradedStreak).toBe(DEBOUNCE)
  })

  it("already alerted (durable latch set), still sub-floor → hold, NO repeat alert", () => {
    const latch: RcConfirmLatch = { alertedAt: T0 }
    const { action, nextLatch } = decide({
      edgeCount: 1,
      priorStreak: { degradedStreak: DEBOUNCE, healthyStreak: 0 },
      latch,
      now: T0 + 10_000_000,
    })
    expect(action).toBe("none")
    expect(nextLatch).toBe(latch)
  })
})

describe("decideRcDegraded — recovery is DEBOUNCED (the #15279 self-sustaining-loop fix)", () => {
  it("a single healthy tick after an alert does NOT clear the latch (transient blip)", () => {
    const latch: RcConfirmLatch = { alertedAt: T0 }
    const { action, nextStreak, nextLatch } = decide({
      edgeCount: FLOOR,
      priorStreak: { degradedStreak: DEBOUNCE, healthyStreak: 0 },
      latch,
    })
    expect(action).toBe("none")
    expect(nextLatch).toEqual(latch)
    expect(nextStreak.healthyStreak).toBe(1)
  })

  it("the latch clears only after recoveryStreak SUSTAINED healthy observations", () => {
    const latch: RcConfirmLatch = { alertedAt: T0 }
    let streak: RcSeatStreak = { degradedStreak: DEBOUNCE, healthyStreak: 0 }
    for (let i = 1; i < RECOVERY; i++) {
      const r = decide({ edgeCount: FLOOR, priorStreak: streak, latch })
      expect(r.nextLatch).toEqual(latch)
      expect(r.nextStreak.healthyStreak).toBe(i)
      streak = r.nextStreak
    }
    const cleared = decide({ edgeCount: FLOOR, priorStreak: streak, latch })
    expect(cleared.nextLatch).toEqual(CLEAR_RC_CONFIRM_LATCH)
    expect(cleared.nextStreak).toEqual(INITIAL_RC_SEAT_STREAK)
  })

  it("a sub-floor tick mid-recovery RESETS the healthy streak (must restart the recovery debounce)", () => {
    const latch: RcConfirmLatch = { alertedAt: T0 }
    const partial = decide({
      edgeCount: FLOOR,
      priorStreak: { degradedStreak: 0, healthyStreak: 2 },
      latch,
    })
    expect(partial.nextStreak.healthyStreak).toBe(3)
    const relapsed = decide({
      edgeCount: 1,
      priorStreak: partial.nextStreak,
      latch,
    })
    expect(relapsed.action).toBe("none")
    expect(relapsed.nextStreak.healthyStreak).toBe(0)
    expect(relapsed.nextLatch).toEqual(latch)
  })
})

describe("decideRcDegraded — re-alert cooldown (#15343: a floor-flap is ONE incident)", () => {
  it("sustained recovery INSIDE the cooldown HOLDS the latch (no clear, no future re-alert)", () => {
    const latch: RcConfirmLatch = { alertedAt: T0 }
    const { action, nextLatch, nextStreak } = decide({
      edgeCount: FLOOR,
      priorStreak: { degradedStreak: 0, healthyStreak: RECOVERY - 1 },
      latch,
      now: T0 + 600_000,
      reAlertCooldownMs: COOLDOWN,
    })
    expect(action).toBe("none")
    expect(nextLatch).toEqual(latch)
    expect(nextStreak.healthyStreak).toBe(RECOVERY)
  })

  it("sustained recovery AFTER the cooldown clears the latch (a real recovery re-arms)", () => {
    const latch: RcConfirmLatch = { alertedAt: T0 }
    const { action, nextLatch } = decide({
      edgeCount: FLOOR,
      priorStreak: { degradedStreak: 0, healthyStreak: RECOVERY - 1 },
      latch,
      now: T0 + COOLDOWN,
      reAlertCooldownMs: COOLDOWN,
    })
    expect(action).toBe("none")
    expect(nextLatch).toEqual(CLEAR_RC_CONFIRM_LATCH)
  })

  it("flap cycle inside the cooldown never re-alerts: dip → recover → dip stays latched", () => {
    const latch: RcConfirmLatch = { alertedAt: T0 }
    const dip = decide({
      edgeCount: 1,
      priorStreak: { degradedStreak: DEBOUNCE - 1, healthyStreak: 0 },
      latch,
      now: T0 + 900_000,
      reAlertCooldownMs: COOLDOWN,
    })
    expect(dip.action).toBe("none")
    expect(dip.nextLatch).toEqual(latch)
  })
})
