
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { ARM_SCENARIOS } from "./supervisor-agent-action-arm-vectors.ts"
import { FIRE_SCENARIOS } from "./supervisor-agent-action-fire-vectors.ts"
import type { Scenario } from "./supervisor-agent-action-harness.ts"

const SCENARIOS: readonly Scenario[] = [...ARM_SCENARIOS, ...FIRE_SCENARIOS]

function projected(trace: Record<string, unknown>, fields: Record<string, unknown>) {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(fields)) picked[key] = trace[key]
  return picked
}

describe("buildAgentActionSubsystem, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const trace = decided("ported", { value: await scenario.drive(), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(trace, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })
})
