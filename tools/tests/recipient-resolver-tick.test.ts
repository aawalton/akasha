
import { describe, expect, it } from "bun:test"
import { digestOf } from "../lib/digest-harness.ts"
import { runRecipientResolverTick } from "../lib/recipient-resolver-tick.ts"
import type { RecipientResolverTickDeps } from "../lib/recipient-resolver-tick-deps.ts"
import { NEVER_SETTLES, type Setup, harness, holds, spec, wakeRule } from "./recipient-resolver-fixture.ts"

interface Scenario {
  readonly name: string
  readonly setup: Setup
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "absent target + matching inbound work → revives once with the agent id",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: { a1: [{ sender: "boss", content: "go" }] },
    },
    standing: { reviveCalls: ["a1"] },
  },
  {
    name: "two matching inbound messages → revives exactly once (idempotent within a tick)",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: {
        a1: [
          { sender: "boss", content: "first" },
          { sender: "boss", content: "second" },
        ],
      },
    },
    standing: { reviveCalls: ["a1"] },
  },
  {
    name: "absent target but no matching work → no revive",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: { a1: [{ sender: "stranger", content: "noise" }] },
    },
    standing: { reviveCalls: [] },
  },
  {
    name: "a seat whose page stands + matching work → no revive, it is already up",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: { a1: [{ sender: "boss", content: "go" }] },
      seatPresent: { a1: true },
    },
    standing: { reviveCalls: [] },
  },
  {
    name: "agent row not found → no revive, no throw",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: null },
      inbound: {},
    },
    standing: { reviveCalls: [] },
  },
  {
    name: "a revive that throws is isolated per-spec — later specs still process",
    setup: {
      specs: [spec("agent-a", [wakeRule("boss")]), spec("agent-b", [wakeRule("boss")])],
      rows: {
        "agent-a": { id: "a1" },
        "agent-b": { id: "b1" },
      },
      inbound: {
        a1: [{ sender: "boss", content: "go" }],
        b1: [{ sender: "boss", content: "go" }],
      },
      reviveImpl: async (id) => {
        if (id === "a1") throw new Error("already live")
      },
    },
    standing: { reviveCalls: ["b1"] },
  },
  {
    name: "a revive that HANGS is bounded per-spec — the loop is not wedged and later specs still process",
    setup: {
      specs: [spec("agent-a", [wakeRule("boss")]), spec("agent-b", [wakeRule("boss")])],
      rows: {
        "agent-a": { id: "a1" },
        "agent-b": { id: "b1" },
      },
      inbound: {
        a1: [{ sender: "boss", content: "go" }],
        b1: [{ sender: "boss", content: "go" }],
      },
      perSpecTimeoutMs: 50,
      reviveImpl: async (id) => {
        if (id === "a1") await NEVER_SETTLES()
      },
    },
    standing: { reviveCalls: ["b1"] },
  },
  {
    name: "a running (live) idle persona with matching inbound is left running — no teardown, no revive",
    setup: {
      specs: [spec("iris", [wakeRule("boss")])],
      rows: { iris: { id: "a1" } },
      inbound: { a1: [{ sender: "boss", content: "go" }] },
      seatPresent: { a1: true },
    },
    standing: { reviveCalls: [] },
  },
  {
    name: "a running (live) persona with NO inbound is left running — the watcher is a no-op",
    setup: {
      specs: [spec("aria", [wakeRule("boss")])],
      rows: { aria: { id: "a1" } },
      inbound: {},
      seatPresent: { a1: true },
    },
    standing: { reviveCalls: [] },
  },
  {
    name: "hands the spec's own bootPrompt to the revive effect",
    setup: {
      specs: [
        { ...spec("amy-ki-handler", [wakeRule("sms:amy-ki-handler")]), bootPrompt: "/handler ki" },
      ],
      rows: { "amy-ki-handler": { id: "a1" } },
      inbound: { a1: [{ sender: "sms:amy-ki-handler", content: "hey" }] },
    },
    standing: { reviveCalls: ["a1"], reviveBootPrompts: ["/handler ki"] },
  },
  {
    name: "passes no boot prompt for a spec declaring none, rather than inventing one",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: { a1: [{ sender: "boss", content: "go" }] },
    },
    standing: { reviveBootPrompts: [null] },
  },
  {
    name: "asks under the project the seat declares, so an absent holder is not slept through",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: {},
    },
    standing: { inboundReads: [{ id: "a1" }] },
  },
  {
    name: "asks under no project where the seat declares none, rather than inventing one",
    setup: {
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: {},
    },
    standing: { inboundReads: [{ id: "a1" }] },
  },
  {
    name: "carries each seat's own seq, never the one beside it",
    setup: {
      specs: [spec("worker", [wakeRule("boss")]), spec("other", [wakeRule("boss")])],
      rows: {
        worker: { id: "a1" },
        other: { id: "a2" },
      },
      inbound: {},
    },
    standing: {
      inboundReads: [
        { id: "a1" },
        { id: "a2" },
      ],
    },
  },
]

describe("runRecipientResolverTick, held against what the code repository's suite asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const h = harness(scenario.setup)
      await runRecipientResolverTick(h.deps)
      holds(scenario.name, scenario.standing, h.observed())
    })
  }

  it("an already-aborted signal stops the tick before any revive", async () => {
    const ac = new AbortController()
    ac.abort()
    const h = harness({
      specs: [spec("worker", [wakeRule("boss")])],
      rows: { worker: { id: "a1" } },
      inbound: { a1: [{ sender: "boss", content: "go" }] },
      signal: ac.signal,
    })
    await runRecipientResolverTick(h.deps)
    holds("aborted signal", { reviveCalls: [] }, h.observed())
  })

  it("a transient resolve throw does not strand: the still-pending action is re-matched on a later clean tick", async () => {
    let resolveCalls = 0
    const h = harness({
      specs: [spec("worker", [wakeRule("boss")])],
      rows: {},
      inbound: { a1: [{ sender: "boss", content: "go" }] },
      resolveImpl: async (name) => {
        resolveCalls += 1
        if (resolveCalls === 1) throw new Error("canceling statement due to statement timeout")
        return name === "worker" ? { id: "a1" } : null
      },
    })
    await runRecipientResolverTick(h.deps)
    holds("transient resolve throw, tick N", { reviveCalls: [] }, h.observed())
    await runRecipientResolverTick(h.deps)
    holds("transient resolve throw, tick N+1", { reviveCalls: ["a1"] }, h.observed())
  })
})

describe("the null encoding absence crosses as", () => {
  it("tells a held boot prompt from an absent one from no slot at all", () => {
    const held = digestOf({ reviveBootPrompts: ["/handler ki"] })
    const absent = digestOf({ reviveBootPrompts: [null] })
    const none = digestOf({ reviveBootPrompts: [] })
    expect(new Set([held, absent, none]).size).toBe(3)
  })

  it("refuses a scenario whose standing side asserts nothing", () => {
    const h = harness({ specs: [], rows: {}, inbound: {} })
    expect(() => holds("empty", {}, h.observed())).toThrow(/asserts nothing/)
  })
})
