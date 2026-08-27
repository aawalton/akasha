import { describe, expect, it } from "bun:test"

import {
  decidePreCliffRestart,
  type PreCliffObservation,
} from "../lib/supervisor-precliff-restart-decide.ts"

const THRESHOLD = 27_600_000

function obs(over: Partial<PreCliffObservation>): PreCliffObservation {
  return {
    childAgeMs: THRESHOLD,
    alreadyArmed: false,
    deferredOrActionPending: false,
    ...over,
  }
}

describe("decidePreCliffRestart", () => {
  it("arms exactly at the threshold and beyond", () => {
    expect(decidePreCliffRestart(obs({ childAgeMs: THRESHOLD }), THRESHOLD)).toBe("arm")
    expect(decidePreCliffRestart(obs({ childAgeMs: THRESHOLD + 1 }), THRESHOLD)).toBe("arm")
    expect(decidePreCliffRestart(obs({ childAgeMs: THRESHOLD * 3 }), THRESHOLD)).toBe("arm")
  })

  it("waits below the threshold", () => {
    expect(decidePreCliffRestart(obs({ childAgeMs: 0 }), THRESHOLD)).toBe("wait")
    expect(decidePreCliffRestart(obs({ childAgeMs: THRESHOLD - 1 }), THRESHOLD)).toBe("wait")
  })

  it("once per generation: an already-armed generation never re-arms", () => {
    expect(
      decidePreCliffRestart(obs({ alreadyArmed: true, childAgeMs: THRESHOLD * 2 }), THRESHOLD)
    ).toBe("wait")
  })

  it("fail-safe: an unreadable process age (null) is NEVER an arm — it waits", () => {
    expect(decidePreCliffRestart(obs({ childAgeMs: null }), THRESHOLD)).toBe("wait")
  })

  it("one restart satisfies both: stands down when a deferred monitor / action is already pending", () => {
    expect(
      decidePreCliffRestart(
        obs({ childAgeMs: THRESHOLD + 1, deferredOrActionPending: true }),
        THRESHOLD
      )
    ).toBe("wait")
  })

  it("precedence: the already-armed latch wins over a pending arm and over the age gate", () => {
    expect(
      decidePreCliffRestart(
        obs({ alreadyArmed: true, deferredOrActionPending: true, childAgeMs: THRESHOLD * 2 }),
        THRESHOLD
      )
    ).toBe("wait")
  })
})
