
import { describe, it } from "bun:test"
import type { ReviveVerifySignal } from "../lib/decide-revive-verify-signal.ts"
import { HARNESS_LEAD_NAME, runRecipientResolverTick } from "../lib/recipient-resolver-tick.ts"
import { ALAN_ROUTE, harness, holds, spec, wakeRule } from "./recipient-resolver-fixture.ts"

const WORKER = "some-worker"

function seatHarness(name: string, reviveSignal: ReviveVerifySignal): ReturnType<typeof harness> {
  return harness({
    specs: [spec(name, [wakeRule("boss")])],
    rows: { [name]: { id: "a1" } },
    inbound: { a1: [{ sender: "boss", content: "go" }] },
    reviveSignal,
  })
}

interface Scenario {
  readonly name: string
  readonly seat: string
  readonly signal: ReviveVerifySignal
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "escalates to Alan when the keeper's own revive is unverified, nobody in the harness being left to tell",
    seat: HARNESS_LEAD_NAME,
    signal: "unverified",
    standing: { notified: [[HARNESS_LEAD_NAME, "a1", ALAN_ROUTE]] },
  },
  {
    name: "escalates to Alan when the keeper's own revive failed outright",
    seat: HARNESS_LEAD_NAME,
    signal: "failed",
    standing: { notified: [[HARNESS_LEAD_NAME, "a1", ALAN_ROUTE]] },
  },
  {
    name: "stays silent when the keeper's revive verified — a revive that took is not news",
    seat: HARNESS_LEAD_NAME,
    signal: "revived",
    standing: { notified: [] },
  },
  {
    name: "stays silent on a benign revive exit — an idempotent live-holder reject is not a failure",
    seat: HARNESS_LEAD_NAME,
    signal: "benign",
    standing: { notified: [] },
  },
  {
    name: "tells the keeper about any other seat whose revive is unverified, rather than telling nobody",
    seat: WORKER,
    signal: "unverified",
    standing: { notified: [[WORKER, "a1", HARNESS_LEAD_NAME]] },
  },
  {
    name: "tells the keeper about any other seat whose revive failed outright",
    seat: WORKER,
    signal: "failed",
    standing: { notified: [[WORKER, "a1", HARNESS_LEAD_NAME]] },
  },
  {
    name: "stays silent for another seat that came back, the same as for the keeper",
    seat: WORKER,
    signal: "revived",
    standing: { notified: [] },
  },
]

describe("recipient-resolver tick — a seat is down and the revive did not take", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const h = seatHarness(scenario.seat, scenario.signal)
      await runRecipientResolverTick(h.deps)
      holds(scenario.name, scenario.standing, h.observed())
    })
  }
})
