
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { shouldWriteTerminalStoppedStatus } from "../lib/supervisor-lifecycle-death-write"

interface Scenario {
  readonly name: string
  readonly drive: () => Record<string, unknown>
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "skips the stopped write during a self-heal re-exec",
    drive: () => ({ writes: shouldWriteTerminalStoppedStatus(true) }),
    standing: { writes: false },
  },
  {
    name: "writes the stopped status on a clean, non-re-exec shutdown",
    drive: () => ({ writes: shouldWriteTerminalStoppedStatus(false) }),
    standing: { writes: true },
  },
]

function projected(
  observed: Record<string, unknown>,
  standing: Record<string, unknown>
): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(standing)) picked[key] = observed[key]
  return picked
}

describe("shouldWriteTerminalStoppedStatus, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      const observed = decided("ported", { value: scenario.drive(), notice: null })
      const verdict = hold(scenario.name, scenario.standing, projected(observed, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })
})
