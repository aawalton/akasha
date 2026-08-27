
import { describe, expect, it } from "bun:test"
import {
  decideLimitResume,
  ELIGIBILITY_HOLD_MS,
  type LimitResumeInput,
} from "../lib/decide-limit-resume.ts"

const NOW = 1_000_000

function input(overrides: Partial<LimitResumeInput> = {}): LimitResumeInput {
  return {
    deathDetected: true,
    poolHasCapacity: false,
    eligibilityHeldMs: null,
    earliestResetMs: null,
    now: NOW,
    recentlyNudged: false,
    ...overrides,
  }
}

describe("decideLimitResume", () => {
  it("no death → hold (nothing to resume)", () => {
    expect(decideLimitResume(input({ deathDetected: false })).kind).toBe("hold")
  })

  it("death but recently nudged → hold (anti-hammer floor)", () => {
    expect(decideLimitResume(input({ recentlyNudged: true, poolHasCapacity: true })).kind).toBe(
      "hold"
    )
  })

  it("death + capacity that has HELD long enough → nudge", () => {
    expect(
      decideLimitResume(input({ poolHasCapacity: true, eligibilityHeldMs: ELIGIBILITY_HOLD_MS }))
        .kind
    ).toBe("nudge")
  })

  it("death + capacity observed only this instant → wait, not nudge", () => {
    const d = decideLimitResume(input({ poolHasCapacity: true, eligibilityHeldMs: 0 }))
    expect(d.kind).toBe("wait")
    expect(d.reason).toContain("held only 0s")
  })

  it("capacity held for less than the requirement → wait", () => {
    expect(
      decideLimitResume(
        input({ poolHasCapacity: true, eligibilityHeldMs: ELIGIBILITY_HOLD_MS - 1 })
      ).kind
    ).toBe("wait")
  })

  it("a null hold (pool not eligible this observation) never nudges on capacity", () => {
    expect(decideLimitResume(input({ poolHasCapacity: true, eligibilityHeldMs: null })).kind).toBe(
      "wait"
    )
  })

  it("the hold requirement is overridable by the shell", () => {
    expect(
      decideLimitResume(
        input({ poolHasCapacity: true, eligibilityHeldMs: 10, eligibilityHoldMs: 10 })
      ).kind
    ).toBe("nudge")
  })

  it("no capacity, earliest reset already arrived → nudge", () => {
    expect(decideLimitResume(input({ poolHasCapacity: false, earliestResetMs: NOW - 1 })).kind).toBe(
      "nudge"
    )
  })

  it("no capacity, reset in the future → wait", () => {
    const d = decideLimitResume(input({ poolHasCapacity: false, earliestResetMs: NOW + 10_000 }))
    expect(d.kind).toBe("wait")
    expect(d.reason).toContain("awaiting earliest reset")
  })

  it("no capacity, no computable reset → wait (re-check next tick)", () => {
    const d = decideLimitResume(input({ poolHasCapacity: false, earliestResetMs: null }))
    expect(d.kind).toBe("wait")
    expect(d.reason).toContain("no computable reset")
  })

  it("recentlyNudged gate takes precedence over an arrived reset", () => {
    expect(decideLimitResume(input({ recentlyNudged: true, earliestResetMs: NOW - 1 })).kind).toBe(
      "hold"
    )
  })
})
