import { describe, expect, test } from "bun:test"
import {
  decideProxyLiveness,
  INITIAL_PROXY_LIVENESS_STATE,
  PROXY_LIVENESS_FAILURE_THRESHOLD,
  PROXY_LIVENESS_MAX_CONSECUTIVE_RESPAWNS,
  type ProxyLivenessAction,
  type ProxyLivenessState,
} from "../lib/supervisor-proxy-liveness-decide.ts"

function feedMisses(
  start: ProxyLivenessState,
  count: number
): { state: ProxyLivenessState; action: ProxyLivenessAction } {
  let result: { state: ProxyLivenessState; action: ProxyLivenessAction } = {
    state: start,
    action: "none",
  }
  for (let i = 0; i < count; i++) {
    result = decideProxyLiveness(result.state, false)
  }
  return result
}

describe("decideProxyLiveness", () => {
  test("healthy tick on initial state is a no-op", () => {
    const { state, action } = decideProxyLiveness(INITIAL_PROXY_LIVENESS_STATE, true)
    expect(action).toBe("none")
    expect(state).toEqual(INITIAL_PROXY_LIVENESS_STATE)
  })

  test("misses below the threshold accumulate without acting", () => {
    const { state, action } = feedMisses(
      INITIAL_PROXY_LIVENESS_STATE,
      PROXY_LIVENESS_FAILURE_THRESHOLD - 1
    )
    expect(action).toBe("none")
    expect(state.consecutiveFailures).toBe(PROXY_LIVENESS_FAILURE_THRESHOLD - 1)
    expect(state.consecutiveRespawns).toBe(0)
    expect(state.gaveUp).toBe(false)
  })

  test("threshold-th consecutive miss fires a respawn and resets the failure count", () => {
    const { state, action } = feedMisses(
      INITIAL_PROXY_LIVENESS_STATE,
      PROXY_LIVENESS_FAILURE_THRESHOLD
    )
    expect(action).toBe("respawn")
    expect(state.consecutiveFailures).toBe(0)
    expect(state.consecutiveRespawns).toBe(1)
    expect(state.gaveUp).toBe(false)
  })

  test("a healthy tick resets the failure count (no single-miss memory across recoveries)", () => {
    const belowThreshold = feedMisses(
      INITIAL_PROXY_LIVENESS_STATE,
      PROXY_LIVENESS_FAILURE_THRESHOLD - 1
    )
    const healthy = decideProxyLiveness(belowThreshold.state, true)
    expect(healthy.action).toBe("none")
    expect(healthy.state).toEqual(INITIAL_PROXY_LIVENESS_STATE)
    const again = feedMisses(healthy.state, PROXY_LIVENESS_FAILURE_THRESHOLD - 1)
    expect(again.action).toBe("none")
  })

  test("a healthy tick after a respawn clears the respawn count", () => {
    const respawned = feedMisses(INITIAL_PROXY_LIVENESS_STATE, PROXY_LIVENESS_FAILURE_THRESHOLD)
    expect(respawned.action).toBe("respawn")
    const healthy = decideProxyLiveness(respawned.state, true)
    expect(healthy.state).toEqual(INITIAL_PROXY_LIVENESS_STATE)
  })

  test("fruitless respawns escalate to a single give-up", () => {
    let state = INITIAL_PROXY_LIVENESS_STATE
    for (let respawn = 1; respawn <= PROXY_LIVENESS_MAX_CONSECUTIVE_RESPAWNS; respawn++) {
      const result = feedMisses(state, PROXY_LIVENESS_FAILURE_THRESHOLD)
      expect(result.action).toBe("respawn")
      expect(result.state.consecutiveRespawns).toBe(respawn)
      state = result.state
    }
    const gaveUp = feedMisses(state, PROXY_LIVENESS_FAILURE_THRESHOLD)
    expect(gaveUp.action).toBe("give-up")
    expect(gaveUp.state.gaveUp).toBe(true)
  })

  test("give-up fires once — further misses stay silent", () => {
    let state = INITIAL_PROXY_LIVENESS_STATE
    for (let respawn = 1; respawn <= PROXY_LIVENESS_MAX_CONSECUTIVE_RESPAWNS; respawn++) {
      state = feedMisses(state, PROXY_LIVENESS_FAILURE_THRESHOLD).state
    }
    state = feedMisses(state, PROXY_LIVENESS_FAILURE_THRESHOLD).state
    expect(state.gaveUp).toBe(true)
    const after = feedMisses(state, PROXY_LIVENESS_FAILURE_THRESHOLD * 2)
    expect(after.action).toBe("none")
    expect(after.state.gaveUp).toBe(true)
  })

  test("a healthy tick after give-up fully resets — respawns are re-armed", () => {
    let state = INITIAL_PROXY_LIVENESS_STATE
    for (let respawn = 1; respawn <= PROXY_LIVENESS_MAX_CONSECUTIVE_RESPAWNS; respawn++) {
      state = feedMisses(state, PROXY_LIVENESS_FAILURE_THRESHOLD).state
    }
    state = feedMisses(state, PROXY_LIVENESS_FAILURE_THRESHOLD).state
    expect(state.gaveUp).toBe(true)
    const healthy = decideProxyLiveness(state, true)
    expect(healthy.state).toEqual(INITIAL_PROXY_LIVENESS_STATE)
    const respawnAgain = feedMisses(healthy.state, PROXY_LIVENESS_FAILURE_THRESHOLD)
    expect(respawnAgain.action).toBe("respawn")
  })

  test("does not mutate the input state", () => {
    const input: ProxyLivenessState = { ...INITIAL_PROXY_LIVENESS_STATE }
    decideProxyLiveness(input, false)
    expect(input).toEqual(INITIAL_PROXY_LIVENESS_STATE)
  })
})
