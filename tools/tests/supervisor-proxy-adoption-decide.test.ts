
import { describe, expect, test } from "bun:test"
import { decideProxyAdoption } from "../lib/supervisor-proxy-adoption-decide.ts"

describe("decideProxyAdoption", () => {
  test("spawns fresh when there is no live proxy (dead pid or missing state)", () => {
    for (const versionMatches of [true, false]) {
      for (const healthy of [true, false]) {
        expect(decideProxyAdoption({ hasLiveProxy: false, versionMatches, healthy })).toBe(
          "spawn-fresh"
        )
      }
    }
  })

  test("adopts a live proxy at the current version regardless of the health signal", () => {
    expect(decideProxyAdoption({ hasLiveProxy: true, versionMatches: true, healthy: true })).toBe(
      "adopt"
    )
    expect(decideProxyAdoption({ hasLiveProxy: true, versionMatches: true, healthy: false })).toBe(
      "adopt"
    )
  })

  test("adopts a live, healthy, stale-version proxy as drift instead of swapping it", () => {
    expect(decideProxyAdoption({ hasLiveProxy: true, versionMatches: false, healthy: true })).toBe(
      "adopt-with-drift"
    )
  })

  test("respawns a stale-version proxy only when it also fails healthz", () => {
    expect(decideProxyAdoption({ hasLiveProxy: true, versionMatches: false, healthy: false })).toBe(
      "spawn-fresh"
    )
  })
})
