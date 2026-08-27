
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { type SeatCall, type SeatMode, defaultSeatCall } from "../lib/supervisor-seat-defaults.ts"

const ABSENT = "<absent>"

interface Scenario {
  readonly name: string
  readonly agentId: string
  readonly mode: SeatMode
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "writes only where nothing is held, so a named seat keeps what its front resolved",
    agentId: "agent-1",
    mode: "interactive",
    standing: { default: true },
  },
  {
    name: "names no slot, the tree being where the fallback identity is declared",
    agentId: "agent-1",
    mode: "interactive",
    standing: { persona: ABSENT, domain: ABSENT, role: ABSENT, task: ABSENT },
  },
  {
    name: "states on-call for an interactive boot",
    agentId: "agent-1",
    mode: "interactive",
    standing: { onCall: true },
  },
  {
    name: "and none for a headless one",
    agentId: "agent-1",
    mode: "headless",
    standing: { onCall: false },
  },
]

function projected(call: SeatCall, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) {
    const held = (call as unknown as Record<string, unknown>)[key]
    picked[key] = held === undefined ? ABSENT : held
  }
  return picked
}

describe("defaultSeatCall, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, () => {
      const call = decided("ported", {
        value: defaultSeatCall(scenario.agentId, scenario.mode),
        notice: null,
      })
      const verdict = hold(scenario.name, scenario.standing, projected(call, scenario.standing))
      expect(verdict.matches).toBe(true)
    })
  }

  it("compares something in every scenario, so no case passes on an empty projection", () => {
    for (const scenario of SCENARIOS) {
      expect(Object.keys(scenario.standing).length).toBeGreaterThan(0)
    }
  })

  it("still tells an absent slot from a held one, so the sentinel measures what it stands for", () => {
    const shape = { persona: ABSENT }
    const absent = projected(defaultSeatCall("agent-1", "interactive"), shape)
    const held = projected({ persona: "athena" } as SeatCall, shape)
    expect(hold("sentinel discriminates", absent, held).matches).toBe(false)
  })
})
