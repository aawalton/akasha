
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import type { LogSink } from "../lib/supervisor-console.ts"
import { recordShutdownEvent } from "../lib/supervisor-shutdown-procs.ts"
import { setShutdownSinkGetter } from "../lib/supervisor-state.ts"

interface Scenario {
  readonly name: string
  readonly drive: () => Record<string, unknown>
  readonly standing: Record<string, unknown>
}

interface Held {
  readonly sink: LogSink
  readonly lines: readonly string[]
}

function heldLines(): Held {
  const lines: string[] = []
  const sink: LogSink = (level, text): undefined => {
    lines.push(`[${level}] ${text}`)
  }
  return { sink, lines }
}

function withSink<T>(fn: (held: Held) => T): T {
  try {
    return fn(heldLines())
  } finally {
    setShutdownSinkGetter(null)
  }
}

function threw(drive: () => void): boolean {
  try {
    drive()
    return false
  } catch {
    return true
  }
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "renders a structured line through the registered sink",
    drive: () =>
      withSink((held) => {
        setShutdownSinkGetter(() => held.sink)
        recordShutdownEvent("entry", { signal: "SIGTERM", count: 3, pending: false })
        const line = held.lines[0] ?? ""
        return {
          carriesLevel: line.startsWith("[SHUTDOWN] "),
          hasTag: line.includes("tag=entry"),
          hasSignal: line.includes("signal=SIGTERM"),
          hasCount: line.includes("count=3"),
          hasPending: line.includes("pending=false"),
          carriesNoNewline: !line.includes("\n"),
        }
      }),
    standing: {
      carriesLevel: true,
      hasTag: true,
      hasSignal: true,
      hasCount: true,
      hasPending: true,
      carriesNoNewline: true,
    },
  },
  {
    name: "multiple events reach the sink in order",
    drive: () =>
      withSink((held) => {
        setShutdownSinkGetter(() => held.sink)
        recordShutdownEvent("entry", { signal: "SIGINT" })
        recordShutdownEvent("after-kill-procs", { preserveClaude: false })
        recordShutdownEvent("pre-process-exit")
        return {
          lineCount: held.lines.length,
          firstHasEntry: (held.lines[0] ?? "").includes("tag=entry"),
          secondHasAfterKillProcs: (held.lines[1] ?? "").includes("tag=after-kill-procs"),
          thirdHasPreProcessExit: (held.lines[2] ?? "").includes("tag=pre-process-exit"),
        }
      }),
    standing: {
      lineCount: 3,
      firstHasEntry: true,
      secondHasAfterKillProcs: true,
      thirdHasPreProcessExit: true,
    },
  },
  {
    name: "null fields render as the literal `null`",
    drive: () =>
      withSink((held) => {
        setShutdownSinkGetter(() => held.sink)
        recordShutdownEvent("err", { error: null })
        return { hasErrorNull: (held.lines[0] ?? "").includes("error=null") }
      }),
    standing: { hasErrorNull: true },
  },
  {
    name: "undefined fields are omitted entirely",
    drive: () =>
      withSink((held) => {
        setShutdownSinkGetter(() => held.sink)
        recordShutdownEvent("entry", { signal: "SIGTERM", note: undefined })
        const line = held.lines[0] ?? ""
        return { hasSignal: line.includes("signal=SIGTERM"), hasNote: line.includes("note=") }
      }),
    standing: { hasSignal: true, hasNote: false },
  },
  {
    name: "no-op when no sink is registered",
    drive: () => {
      setShutdownSinkGetter(null)
      return { threw: threw(() => recordShutdownEvent("entry", { signal: "SIGTERM" })) }
    },
    standing: { threw: false },
  },
  {
    name: "does not throw when the sink itself throws",
    drive: () => {
      setShutdownSinkGetter(() => () => {
        throw new Error("sink is gone")
      })
      const observed = { threw: threw(() => recordShutdownEvent("entry", { signal: "SIGTERM" })) }
      setShutdownSinkGetter(null)
      return observed
    },
    standing: { threw: false },
  },
  {
    name: "reads the sink at write time, so a redirect moves later events",
    drive: () =>
      withSink((first) => {
        const second = heldLines()
        let active = first
        setShutdownSinkGetter(() => active.sink)
        recordShutdownEvent("first")
        active = second
        recordShutdownEvent("second")
        return {
          firstHasFirst: first.lines.some((one) => one.includes("tag=first")),
          firstHasSecond: first.lines.some((one) => one.includes("tag=second")),
          secondHasSecond: second.lines.some((one) => one.includes("tag=second")),
        }
      }),
    standing: { firstHasFirst: true, firstHasSecond: false, secondHasSecond: true },
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

describe("recordShutdownEvent, held against what the code repository asserts", () => {
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
