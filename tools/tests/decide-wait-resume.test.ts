
import { describe, expect, it } from "bun:test"
import {
  decideWaitResume,
  WAIT_FIRST_MS,
  WAIT_MAX_MS,
  type WaitResumeInput,
} from "../lib/decide-wait-resume.ts"

const NOW = 1_000_000

function input(overrides: Partial<WaitResumeInput> = {}): WaitResumeInput {
  return {
    deathDetected: true,
    consecutiveDeaths: 1,
    lastNudgeAtMs: null,
    now: NOW,
    ...overrides,
  }
}

describe("decideWaitResume", () => {
  it("no death ending → hold (a seat that ended its turn itself is not ours)", () => {
    const d = decideWaitResume(input({ deathDetected: false }))
    expect(d.kind).toBe("hold")
  })

  it("a successful turn between deaths reads as no death → hold", () => {
    expect(
      decideWaitResume(input({ deathDetected: false, consecutiveDeaths: 0 })).kind
    ).toBe("hold")
  })

  it("first death, never nudged → nudge at once (nothing has been tried)", () => {
    const d = decideWaitResume(input({ lastNudgeAtMs: null }))
    expect(d.kind).toBe("nudge")
  })

  it("nudged this instant → wait, not a second nudge", () => {
    const d = decideWaitResume(input({ consecutiveDeaths: 2, lastNudgeAtMs: NOW }))
    expect(d.kind).toBe("wait")
  })

  it("waits the first window after one failed nudge, then nudges", () => {
    const held = input({ consecutiveDeaths: 2, lastNudgeAtMs: NOW - WAIT_FIRST_MS + 1 })
    expect(decideWaitResume(held).kind).toBe("wait")
    const ready = input({ consecutiveDeaths: 2, lastNudgeAtMs: NOW - WAIT_FIRST_MS })
    expect(decideWaitResume(ready).kind).toBe("nudge")
  })

  it("the window doubles with each further consecutive death", () => {
    const waitedMs = WAIT_FIRST_MS * 2
    expect(
      decideWaitResume(input({ consecutiveDeaths: 3, lastNudgeAtMs: NOW - waitedMs })).kind
    ).toBe("nudge")
    expect(
      decideWaitResume(input({ consecutiveDeaths: 4, lastNudgeAtMs: NOW - waitedMs })).kind
    ).toBe("wait")
  })

  it("the window never grows past its ceiling", () => {
    const d = decideWaitResume(
      input({ consecutiveDeaths: 40, lastNudgeAtMs: NOW - WAIT_MAX_MS })
    )
    expect(d.kind).toBe("nudge")
  })

  it("a wait says when it will be ready, so a caller need not recompute the window", () => {
    const d = decideWaitResume(input({ consecutiveDeaths: 2, lastNudgeAtMs: NOW }))
    if (d.kind !== "wait") throw new Error(`expected wait, got ${d.kind}`)
    expect(d.readyAtMs).toBe(NOW + WAIT_FIRST_MS)
  })

  it("every decision carries a reason", () => {
    for (const one of [
      input({ deathDetected: false }),
      input(),
      input({ consecutiveDeaths: 2, lastNudgeAtMs: NOW }),
    ]) {
      expect(decideWaitResume(one).reason.length).toBeGreaterThan(0)
    }
  })
})
