
import { describe, expect, it } from "bun:test"
import {
  decideUncertainBlockEscalation,
  INITIAL_UNCERTAIN_BLOCK_STATE,
} from "../lib/decide-uncertain-wait.ts"

describe("decideUncertainBlockEscalation", () => {
  const B = 30 * 60_000

  it("does not escalate while nothing is blocking, and holds no clock", () => {
    const r = decideUncertainBlockEscalation(INITIAL_UNCERTAIN_BLOCK_STATE, {
      blockedByUncertainClaimant: false,
      nowMs: 1_000,
      boundMs: B,
    })
    expect(r.escalate).toBe(false)
    expect(r.state.sinceMs).toBeNull()
  })

  it("starts the clock on the first blocked tick without escalating", () => {
    const r = decideUncertainBlockEscalation(INITIAL_UNCERTAIN_BLOCK_STATE, {
      blockedByUncertainClaimant: true,
      nowMs: 1_000,
      boundMs: B,
    })
    expect(r.escalate).toBe(false)
    expect(r.state.sinceMs).toBe(1_000)
  })

  it("stays silent inside the bound", () => {
    const started = { sinceMs: 1_000, escalated: false }
    const r = decideUncertainBlockEscalation(started, {
      blockedByUncertainClaimant: true,
      nowMs: 1_000 + B - 1,
      boundMs: B,
    })
    expect(r.escalate).toBe(false)
  })

  it("ESCALATES once the wait passes the bound — the whole point", () => {
    const started = { sinceMs: 1_000, escalated: false }
    const r = decideUncertainBlockEscalation(started, {
      blockedByUncertainClaimant: true,
      nowMs: 1_000 + B,
      boundMs: B,
    })
    expect(r.escalate).toBe(true)
    expect(r.state.escalated).toBe(true)
  })

  it("escalates ONCE per episode, not every tick after", () => {
    const latched = { sinceMs: 1_000, escalated: true }
    const r = decideUncertainBlockEscalation(latched, {
      blockedByUncertainClaimant: true,
      nowMs: 1_000 + B * 10,
      boundMs: B,
    })
    expect(r.escalate).toBe(false)
  })

  it("a resolved block resets the clock, so a later episode escalates again", () => {
    const latched = { sinceMs: 1_000, escalated: true }
    const cleared = decideUncertainBlockEscalation(latched, {
      blockedByUncertainClaimant: false,
      nowMs: 2_000,
      boundMs: B,
    })
    expect(cleared.state).toEqual(INITIAL_UNCERTAIN_BLOCK_STATE)
    const restarted = decideUncertainBlockEscalation(cleared.state, {
      blockedByUncertainClaimant: true,
      nowMs: 3_000,
      boundMs: B,
    })
    expect(restarted.state.sinceMs).toBe(3_000)
  })
})
