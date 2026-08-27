
import { describe, expect, it } from "bun:test"
import { readFileSync } from "node:fs"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  REAPER_TICK_DEADLINE_MS,
  type ReaperState,
  runBoundedReaperTick,
} from "../lib/memory-reaper-tick.ts"

const fresh = (): ReaperState => ({ lastGlobalKillAtMs: null })
const hang = (): Promise<void> => new Promise<void>(() => {})

interface Observation {
  readonly atLeast30s: boolean | null
  readonly outcome: string | null
  readonly errorName: string | null
  readonly ran: boolean | null
  readonly secondRan: boolean | null
  readonly rejectionDefined: boolean | null
}

const NOTHING: Observation = {
  atLeast30s: null,
  outcome: null,
  errorName: null,
  ran: null,
  secondRan: null,
  rejectionDefined: null,
}

const STANDING: Readonly<Record<string, Observation>> = {
  "deadline is generous against the 10s cadence": { ...NOTHING, atLeast30s: true },
  "a hung tick rejects with the deadline error": { ...NOTHING, outcome: "rejected", errorName: "TickDeadlineExceededError" },
  "a fast tick resolves inside the deadline": { ...NOTHING, outcome: "resolved", ran: true },
  "the loop pattern continues after a hung tick": { ...NOTHING, secondRan: true },
  "a pre-aborted signal short-circuits": { ...NOTHING, outcome: "rejected", rejectionDefined: true, ran: false },
}

async function observe(name: string): Promise<Observation> {
  switch (name) {
    case "deadline is generous against the 10s cadence":
      return { ...NOTHING, atLeast30s: REAPER_TICK_DEADLINE_MS >= 30_000 }
    case "a hung tick rejects with the deadline error": {
      const ac = new AbortController()
      try {
        await runBoundedReaperTick(fresh(), ac.signal, 20, hang)
        return { ...NOTHING, outcome: "resolved", errorName: null }
      } catch (err) {
        return {
          ...NOTHING,
          outcome: "rejected",
          errorName: err instanceof Error ? err.name : String(err),
        }
      }
    }
    case "a fast tick resolves inside the deadline": {
      const ac = new AbortController()
      let ran = false
      let outcome = "resolved"
      try {
        await runBoundedReaperTick(fresh(), ac.signal, 1_000, async () => {
          ran = true
        })
      } catch {
        outcome = "rejected"
      }
      return { ...NOTHING, outcome, ran }
    }
    case "the loop pattern continues after a hung tick": {
      const ac = new AbortController()
      let secondRan = false
      const ticks: Array<() => Promise<void>> = [
        hang,
        async () => {
          secondRan = true
        },
      ]
      for (const t of ticks) {
        try {
          await runBoundedReaperTick(fresh(), ac.signal, 20, t)
        } catch {
        }
      }
      return { ...NOTHING, secondRan }
    }
    case "a pre-aborted signal short-circuits": {
      const ac = new AbortController()
      ac.abort()
      let ran = false
      let outcome = "resolved"
      let rejectionDefined = false
      try {
        await runBoundedReaperTick(fresh(), ac.signal, 1_000, async () => {
          ran = true
        })
      } catch (err) {
        outcome = "rejected"
        rejectionDefined = err !== undefined
      }
      return { ...NOTHING, outcome, rejectionDefined, ran }
    }
    default:
      throw new Error(`no carried scenario named '${name}'`)
  }
}

describe("the reaper's bounded tick, held against what it did in the code repository", () => {
  for (const [name, standing] of Object.entries(STANDING)) {
    it(name, async () => {
      const answered = decided("ported", { value: await observe(name), notice: null })
      const verdict = hold(name, standing, answered)
      expect(verdict.matches).toBe(true)
    })
  }

  it("carries all five of the source suite's scenarios and compares a decided field in each", () => {
    expect(Object.keys(STANDING).length).toBe(5)
    for (const [name, observation] of Object.entries(STANDING)) {
      const carried = Object.values(observation).filter((each) => each !== null)
      expect(carried.length, `${name} projects nothing`).toBeGreaterThan(0)
    }
  })
})

describe("nothing this tick reaches can exit the process", () => {
  const walk = (entry: string): readonly string[] => {
    const seen = new Set<string>()
    const stack = [entry]
    while (stack.length > 0) {
      const at = stack.pop()
      if (at === undefined || seen.has(at)) continue
      seen.add(at)
      for (const match of readFileSync(at, "utf8").matchAll(/from "(\.[^"]+)"/g)) {
        const relative = match[1]
        if (relative === undefined) continue
        stack.push(new URL(relative, `file://${at}`).pathname)
      }
    }
    return [...seen]
  }

  const ENTRY = new URL("../lib/memory-reaper-tick.ts", import.meta.url).pathname

  it("no module the tick imports, at any depth, calls process.exit", () => {
    const exiting = walk(ENTRY).filter((each) => readFileSync(each, "utf8").includes("process.exit"))
    expect(exiting).toEqual([])
  })

  it("the walk reaches past the entry file, so an empty graph cannot pass it", () => {
    expect(walk(ENTRY).length).toBeGreaterThan(5)
  })
})
