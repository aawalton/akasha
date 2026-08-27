
import { describe, expect, test } from "bun:test"
import {
  decideUsageRepoll,
  INITIAL_REPOLL_GATE_STATE,
  REPOLL_BREAKER_MS,
  REPOLL_MIN_INTERVAL_MS,
  type RepollGateState,
  recordRepollAttempt,
  recordUsageRateLimited,
} from "../lib/oauth-usage-repoll-gate.ts"

const T0 = 1_000_000

describe("the minimum interval", () => {
  test("the first re-poll for an account is allowed", () => {
    expect(decideUsageRepoll(INITIAL_REPOLL_GATE_STATE, T0).kind).toBe("allow")
  })

  test("a second re-poll inside the interval is skipped", () => {
    const state = recordRepollAttempt(INITIAL_REPOLL_GATE_STATE, T0)
    expect(decideUsageRepoll(state, T0 + 1_000).kind).toBe("skip")
  })

  test("a re-poll after the interval is allowed again", () => {
    const state = recordRepollAttempt(INITIAL_REPOLL_GATE_STATE, T0)
    expect(decideUsageRepoll(state, T0 + REPOLL_MIN_INTERVAL_MS).kind).toBe("allow")
  })

  test("the skip reason names the remaining wait", () => {
    const state = recordRepollAttempt(INITIAL_REPOLL_GATE_STATE, T0)
    const decision = decideUsageRepoll(state, T0 + 10_000)
    if (decision.kind !== "skip") throw new Error("expected skip")
    expect(decision.reason).toContain("minimum interval")
  })
})

describe("the usage-endpoint breaker", () => {
  test("opens on a usage 429 and blocks re-polls while open", () => {
    const state = recordUsageRateLimited(INITIAL_REPOLL_GATE_STATE, T0)
    expect(decideUsageRepoll(state, T0 + REPOLL_MIN_INTERVAL_MS + 1).kind).toBe("skip")
  })

  test("outlasts the minimum interval — that is the point of it", () => {
    const state = recordUsageRateLimited(INITIAL_REPOLL_GATE_STATE, T0)
    const decision = decideUsageRepoll(state, T0 + REPOLL_MIN_INTERVAL_MS + 1)
    if (decision.kind !== "skip") throw new Error("expected skip")
    expect(decision.reason).toContain("breaker open")
  })

  test("closes once the breaker window passes", () => {
    const state = recordUsageRateLimited(INITIAL_REPOLL_GATE_STATE, T0)
    expect(decideUsageRepoll(state, T0 + REPOLL_BREAKER_MS).kind).toBe("allow")
  })
})

describe("the incident burst", () => {
  test("4 re-polls/sec for 15 minutes collapses from 3600 fetches to 15", () => {
    let state: RepollGateState = INITIAL_REPOLL_GATE_STATE
    let allowed = 0
    const durationMs = 15 * 60_000
    for (let elapsed = 0; elapsed < durationMs; elapsed += 250) {
      const now = T0 + elapsed
      if (decideUsageRepoll(state, now).kind === "allow") {
        allowed++
        state = recordRepollAttempt(state, now)
      }
    }
    expect(allowed).toBe(15)
  })

  test("once the endpoint 429s, the burst stops reaching it almost entirely", () => {
    let state: RepollGateState = INITIAL_REPOLL_GATE_STATE
    let allowed = 0
    const durationMs = 15 * 60_000
    for (let elapsed = 0; elapsed < durationMs; elapsed += 250) {
      const now = T0 + elapsed
      if (decideUsageRepoll(state, now).kind === "allow") {
        allowed++
        state = recordUsageRateLimited(state, now)
      }
    }
    expect(allowed).toBe(3)
  })
})
