
import { describe, expect, it, mock } from "bun:test"
import { hold } from "../lib/digest-harness.ts"

const BEAT = "../lib/supervisor-heartbeat-beat.ts"

type Behaviour = "ok" | "reject" | "throw"

const events: string[] = []
let behaviour: Behaviour = "ok"

const stub = (id: string): Promise<void> => {
  events.push(`beat:${id}`)
  if (behaviour === "throw") throw new Error("the write refused synchronously")
  if (behaviour === "reject") return Promise.reject(new Error("the write refused"))
  return Promise.resolve()
}

const real = await import(BEAT)
mock.module(BEAT, () => ({ ...real, recordHeartbeat: stub }))

const monitor = await import("../lib/supervisor-heartbeat.ts")

interface Vector {
  readonly label: string
  readonly ids: readonly (string | null)[]
  readonly behaviour: Behaviour
  readonly ticks: number
  readonly standing: { readonly events: readonly string[]; readonly handleIsTheScheduled: boolean }
}

const VECTORS: readonly Vector[] = [
  {
    label: "steady id: one beat at install and one on every tick",
    ids: ["unbound-seat-a", "unbound-seat-a", "unbound-seat-a"],
    behaviour: "ok",
    ticks: 2,
    standing: {
      events: [
        "beat:unbound-seat-a",
        "schedule:30000",
        "beat:unbound-seat-a",
        "beat:unbound-seat-a",
      ],
      handleIsTheScheduled: true,
    },
  },
  {
    label: "no agent bound: the timer is still installed and nothing beats",
    ids: [null, null, null],
    behaviour: "ok",
    ticks: 2,
    standing: { events: ["schedule:30000"], handleIsTheScheduled: true },
  },
  {
    label: "the id arrives late and then rotates: every tick re-reads it",
    ids: [null, "unbound-seat-b", "unbound-seat-c"],
    behaviour: "ok",
    ticks: 2,
    standing: {
      events: ["schedule:30000", "beat:unbound-seat-b", "beat:unbound-seat-c"],
      handleIsTheScheduled: true,
    },
  },
  {
    label: "the write rejects on every beat: the timer keeps beating and each failure is logged",
    ids: ["unbound-seat-a", "unbound-seat-a", "unbound-seat-a"],
    behaviour: "reject",
    ticks: 2,
    standing: {
      events: [
        "beat:unbound-seat-a",
        "schedule:30000",
        "console.error:[local] heartbeat: recordHeartbeat threw:",
        "beat:unbound-seat-a",
        "console.error:[local] heartbeat: recordHeartbeat threw:",
        "beat:unbound-seat-a",
        "console.error:[local] heartbeat: recordHeartbeat threw:",
      ],
      handleIsTheScheduled: true,
    },
  },
  {
    label: "the write throws synchronously: caught in the same tick, before the timer is scheduled",
    ids: ["unbound-seat-a", "unbound-seat-a", "unbound-seat-a"],
    behaviour: "throw",
    ticks: 2,
    standing: {
      events: [
        "beat:unbound-seat-a",
        "console.error:[local] heartbeat: recordHeartbeat threw:",
        "schedule:30000",
        "beat:unbound-seat-a",
        "console.error:[local] heartbeat: recordHeartbeat threw:",
        "beat:unbound-seat-a",
        "console.error:[local] heartbeat: recordHeartbeat threw:",
      ],
      handleIsTheScheduled: true,
    },
  },
]

async function drain(): Promise<void> {
  for (let i = 0; i < 8; i++) await Promise.resolve()
}

async function observe(
  vector: Vector
): Promise<{ events: readonly string[]; handleIsTheScheduled: boolean }> {
  events.length = 0
  behaviour = vector.behaviour
  const realSetInterval = globalThis.setInterval
  const realConsoleError = console.error
  const scheduled = { thisOne: true } as unknown as ReturnType<typeof setInterval>
  let tick: (() => void) | null = null
  let read = 0
  // @ts-expect-error the substitute answers the one call shape the monitor makes of it
  globalThis.setInterval = (fn: () => void, ms: number) => {
    events.push(`schedule:${ms}`)
    tick = fn
    return scheduled
  }
  console.error = (first: unknown): void => {
    events.push(`console.error:${String(first)}`)
  }
  try {
    const { heartbeatTimer } = monitor.buildHeartbeatMonitor({
      getAgentId: () => vector.ids[read++] ?? null,
      polls: [],
    })
    await drain()
    for (let t = 0; t < vector.ticks; t++) {
      if (tick !== null) (tick as () => void)()
      await drain()
    }
    return { events: [...events], handleIsTheScheduled: heartbeatTimer === scheduled }
  } finally {
    globalThis.setInterval = realSetInterval
    console.error = realConsoleError
  }
}

describe("the stub stands where the database write would", () => {
  it("is what the beat module hands out, so a real write cannot reach this file", () => {
    const reached = (real as { recordHeartbeat: unknown }).recordHeartbeat
    expect(reached).toBe(stub)
  })
})

describe("held against the code repository by digest", () => {
  for (const vector of VECTORS) {
    it(vector.label, async () => {
      const ported = await observe(vector)
      const verdict = hold(vector.label, vector.standing, ported)
      expect(verdict.ported).toBe(verdict.standing)
      expect(verdict.matches).toBe(true)
    })
  }
})
