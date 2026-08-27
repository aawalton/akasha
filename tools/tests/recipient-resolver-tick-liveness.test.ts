
import { describe, it } from "bun:test"
import { runRecipientResolverTick } from "../lib/recipient-resolver-tick.ts"
import { type Setup, harness, holds, spec, wakeRule } from "./recipient-resolver-fixture.ts"

interface Scenario {
  readonly name: string
  readonly setup: Setup
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "no page stands and the inbound matches → revive",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: { a1: [{ sender: "boss", content: "go" }] },
    },
    standing: { reviveCalls: ["a1"] },
  },
  {
    name: "a page stands → no revive, it is already up",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: { a1: [{ sender: "boss", content: "go" }] },
      seatPresent: { a1: true },
    },
    standing: { reviveCalls: [] },
  },
  {
    name: "no page stands but nothing matches the inbound → no revive",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: { a1: [{ sender: "stranger", content: "noise" }] },
    },
    standing: { reviveCalls: [] },
  },
  {
    name: "no page stands and no inbound at all → no revive",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: {},
    },
    standing: { reviveCalls: [] },
  },
  {
    name: "no row resolves for the name → nothing is read and nothing is revived",
    setup: {
      specs: [spec("ghost", [wakeRule("boss")])],
      rows: {},
      inbound: {},
    },
    standing: { reviveCalls: [], inboundReads: [] },
  },
]

describe("runRecipientResolverTick decides on the seat's page, not on the row", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const h = harness(scenario.setup)
      await runRecipientResolverTick(h.deps)
      holds(scenario.name, scenario.standing, h.observed())
    })
  }
})
