
import { describe, expect, it } from "bun:test"
import {
  decideOverloadResume,
  OVERLOAD_FIRST_WAIT_MS,
  OVERLOAD_MAX_WAIT_MS,
  type OverloadResumeInput,
} from "../lib/decide-overload-resume.ts"

const NOW = 1_000_000

function input(overrides: Partial<OverloadResumeInput> = {}): OverloadResumeInput {
  return {
    overloadDetected: true,
    consecutiveOverloads: 1,
    lastNudgeAtMs: null,
    now: NOW,
    ...overrides,
  }
}

describe("decideOverloadResume", () => {
  it("no overload ending → hold (a seat that ended its turn itself is not ours)", () => {
    const d = decideOverloadResume(input({ overloadDetected: false }))
    expect(d.kind).toBe("hold")
  })

  it("a successful turn between overloads reads as no overload → hold", () => {
    expect(
      decideOverloadResume(input({ overloadDetected: false, consecutiveOverloads: 0 })).kind
    ).toBe("hold")
  })

  it("first overload, never nudged → nudge at once (nothing has been tried)", () => {
    const d = decideOverloadResume(input({ lastNudgeAtMs: null }))
    expect(d.kind).toBe("nudge")
  })

  it("nudged this instant → wait, not a second nudge", () => {
    const d = decideOverloadResume(input({ consecutiveOverloads: 2, lastNudgeAtMs: NOW }))
    expect(d.kind).toBe("wait")
  })

  it("waits the first window after one failed nudge, then nudges", () => {
    const held = input({ consecutiveOverloads: 2, lastNudgeAtMs: NOW - OVERLOAD_FIRST_WAIT_MS + 1 })
    expect(decideOverloadResume(held).kind).toBe("wait")
    const ready = input({ consecutiveOverloads: 2, lastNudgeAtMs: NOW - OVERLOAD_FIRST_WAIT_MS })
    expect(decideOverloadResume(ready).kind).toBe("nudge")
  })

  it("the window doubles with each further consecutive overload", () => {
    const waitedMs = OVERLOAD_FIRST_WAIT_MS * 2
    expect(
      decideOverloadResume(input({ consecutiveOverloads: 3, lastNudgeAtMs: NOW - waitedMs })).kind
    ).toBe("nudge")
    expect(
      decideOverloadResume(input({ consecutiveOverloads: 4, lastNudgeAtMs: NOW - waitedMs })).kind
    ).toBe("wait")
  })

  it("the window never grows past its ceiling", () => {
    const d = decideOverloadResume(
      input({ consecutiveOverloads: 40, lastNudgeAtMs: NOW - OVERLOAD_MAX_WAIT_MS })
    )
    expect(d.kind).toBe("nudge")
  })

  it("a wait says when it will be ready, so a caller need not recompute the window", () => {
    const d = decideOverloadResume(input({ consecutiveOverloads: 2, lastNudgeAtMs: NOW }))
    if (d.kind !== "wait") throw new Error(`expected wait, got ${d.kind}`)
    expect(d.readyAtMs).toBe(NOW + OVERLOAD_FIRST_WAIT_MS)
  })

  it("every decision carries a reason", () => {
    for (const one of [
      input({ overloadDetected: false }),
      input(),
      input({ consecutiveOverloads: 2, lastNudgeAtMs: NOW }),
    ]) {
      expect(decideOverloadResume(one).reason.length).toBeGreaterThan(0)
    }
  })
})
