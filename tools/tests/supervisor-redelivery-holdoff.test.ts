
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { redeliveryHoldoff } from "../lib/supervisor-redelivery-holdoff.ts"

interface Trace {
  readonly safe: boolean
}

interface Scenario {
  readonly name: string
  readonly drive: () => Promise<boolean>
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "resolves true when the holdoff elapses first",
    drive: () => redeliveryHoldoff(new Promise<never>(() => {}), 1),
    standing: { safe: true },
  },
  {
    name: "resolves false when the child exits first",
    drive: () => redeliveryHoldoff(Promise.resolve(0), 60_000),
    standing: { safe: false },
  },
  {
    name: "a rejecting child-exit promise still cancels rather than throwing",
    drive: () => redeliveryHoldoff(Promise.reject(new Error("boom")), 60_000),
    standing: { safe: false },
  },
]

async function run(scenario: Scenario): Promise<Trace> {
  return { safe: await scenario.drive() }
}

function projected(trace: Trace, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = (trace as unknown as Record<string, unknown>)[key]
  return picked
}

describe("redeliveryHoldoff, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const trace = decided("ported", { value: await run(scenario), notice: null })
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
