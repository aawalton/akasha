
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { type OAuthProxyState, decideProxyStop } from "../lib/supervisor-proxy-ownership.ts"

interface Scenario {
  readonly name: string
  readonly run: () => Record<string, unknown>
  readonly standing: Record<string, unknown>
}

function projected(answer: Record<string, unknown>, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = answer[key]
  return picked
}

function holdScenario(scenario: Scenario): void {
  const answer = decided("ported", { value: scenario.run(), notice: null })
  const verdict = hold(scenario.name, scenario.standing, projected(answer, scenario.standing))
  expect(verdict.matches).toBe(true)
}

const baseState: OAuthProxyState = {
  pid: 500,
  port: 44395,
  oauthProxyVersion: "deadbeef",
}

const DECISIONS: readonly Scenario[] = [
  {
    name: "stops when the seat states no proxy (already torn down; SIGTERM is idempotent)",
    run: () => decideProxyStop({ selfPid: 100, handlePid: 500, state: null }),
    standing: { stop: true, reason: "no-state" },
  },
  {
    name: "skips when the live state describes a different pid than this handle",
    run: () => decideProxyStop({ selfPid: 100, handlePid: 999, state: { ...baseState, pid: 500 } }),
    standing: { stop: false, reason: "state-pid-mismatch" },
  },
  {
    name: "stops a proxy with no recorded owner",
    run: () => decideProxyStop({ selfPid: 100, handlePid: 500, state: baseState }),
    standing: { stop: true, reason: "no-owner-recorded" },
  },
  {
    name: "stops when this supervisor is the recorded owner",
    run: () =>
      decideProxyStop({ selfPid: 100, handlePid: 500, state: { ...baseState, supervisorPid: 100 } }),
    standing: { stop: true, reason: "owner" },
  },
  {
    name: "skips when a successor supervisor has claimed the proxy (the astra incident shape)",
    run: () =>
      decideProxyStop({ selfPid: 100, handlePid: 500, state: { ...baseState, supervisorPid: 200 } }),
    standing: { stop: false, reason: "owned-by-other-supervisor" },
  },
]

describe("decideProxyStop, held against what the code repository asserts", () => {
  for (const scenario of DECISIONS) {
    it(scenario.name, () => {
      holdScenario(scenario)
    })
  }
})

describe("the arm itself", () => {
  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of DECISIONS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })
})
