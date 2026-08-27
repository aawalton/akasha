
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { killPidWithTimeout, killTreeWithTimeout } from "../lib/memory-reaper-kill.ts"

interface Plan {
  readonly term: string
  readonly kill: string
  readonly probe: readonly string[]
}

interface Observation {
  readonly signals: readonly string[]
  readonly logs: readonly string[]
  readonly threw: string | null
}

interface Case {
  readonly name: string
  readonly fn: "pid" | "tree"
  readonly pids: readonly number[]
  readonly plan: Readonly<Record<number, Plan>>
  readonly standing: Observation
}

const CASES: readonly Case[] = [
  {
    name: "pid: SIGTERM answers ESRCH — the process was already gone",
    fn: "pid",
    pids: [4001],
    plan: {
      4001: { term: "ESRCH", kill: "ok", probe: ["ESRCH"] },
    },
    standing: {
      signals: ["SIGTERM 4001"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "pid: SIGTERM answers EPERM — a foreign uid, logged and swallowed",
    fn: "pid",
    pids: [4002],
    plan: {
      4002: { term: "EPERM", kill: "ok", probe: ["ok"] },
    },
    standing: {
      signals: ["SIGTERM 4002"],
      logs: ["memory-reaper: SIGTERM pid=4002 failed: EPERM: fake"],
      threw: null,
    },
  },
  {
    name: "pid: SIGTERM throws a non-errno value",
    fn: "pid",
    pids: [4003],
    plan: {
      4003: { term: "PLAIN", kill: "ok", probe: ["ok"] },
    },
    standing: {
      signals: ["SIGTERM 4003"],
      logs: ["memory-reaper: SIGTERM pid=4003 failed: not an error object"],
      threw: null,
    },
  },
  {
    name: "pid: SIGTERM lands and the first probe proves ESRCH",
    fn: "pid",
    pids: [4004],
    plan: {
      4004: { term: "ok", kill: "ok", probe: ["ESRCH"] },
    },
    standing: {
      signals: ["SIGTERM 4004","probe 4004"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "pid: the process outlives the grace window and takes SIGKILL",
    fn: "pid",
    pids: [4005],
    plan: {
      4005: { term: "ok", kill: "ok", probe: ["ok"] },
    },
    standing: {
      signals: ["SIGTERM 4005","probe 4005","probe 4005","SIGKILL 4005"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "pid: EPERM on the probe reads as alive and escalates",
    fn: "pid",
    pids: [4006],
    plan: {
      4006: { term: "ok", kill: "ok", probe: ["EPERM"] },
    },
    standing: {
      signals: ["SIGTERM 4006","probe 4006","probe 4006","SIGKILL 4006"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "pid: an unrecognised probe errno folds toward alive and escalates",
    fn: "pid",
    pids: [4007],
    plan: {
      4007: { term: "ok", kill: "ok", probe: ["EIO"] },
    },
    standing: {
      signals: ["SIGTERM 4007","probe 4007","probe 4007","SIGKILL 4007"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "pid: a probe throwing a non-errno value folds toward alive",
    fn: "pid",
    pids: [4008],
    plan: {
      4008: { term: "ok", kill: "ok", probe: ["PLAIN"] },
    },
    standing: {
      signals: ["SIGTERM 4008","probe 4008","probe 4008","SIGKILL 4008"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "pid: the process exits during the grace window, so no SIGKILL",
    fn: "pid",
    pids: [4009],
    plan: {
      4009: { term: "ok", kill: "ok", probe: ["ESRCH"] },
    },
    standing: {
      signals: ["SIGTERM 4009","probe 4009"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "pid: SIGKILL itself answers ESRCH — it exited in the race",
    fn: "pid",
    pids: [4010],
    plan: {
      4010: { term: "ok", kill: "ESRCH", probe: ["ok"] },
    },
    standing: {
      signals: ["SIGTERM 4010","probe 4010","probe 4010","SIGKILL 4010"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "pid: SIGKILL answers EPERM, logged and swallowed",
    fn: "pid",
    pids: [4011],
    plan: {
      4011: { term: "ok", kill: "EPERM", probe: ["ok"] },
    },
    standing: {
      signals: ["SIGTERM 4011","probe 4011","probe 4011","SIGKILL 4011"],
      logs: ["memory-reaper: SIGKILL pid=4011 failed: EPERM: fake"],
      threw: null,
    },
  },
  {
    name: "tree: every pid gone before the sweep",
    fn: "tree",
    pids: [5001,5002,5003],
    plan: {
      5001: { term: "ESRCH", kill: "ok", probe: ["ESRCH"] },
      5002: { term: "ESRCH", kill: "ok", probe: ["ESRCH"] },
      5003: { term: "ESRCH", kill: "ok", probe: ["ESRCH"] },
    },
    standing: {
      signals: ["SIGTERM 5001","SIGTERM 5002","SIGTERM 5003","probe 5001","probe 5002","probe 5003"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "tree: descendants then root, all alive, all escalate",
    fn: "tree",
    pids: [5011,5012,5013],
    plan: {
      5011: { term: "ok", kill: "ok", probe: ["ok"] },
      5012: { term: "ok", kill: "ok", probe: ["ok"] },
      5013: { term: "ok", kill: "ok", probe: ["ok"] },
    },
    standing: {
      signals: ["SIGTERM 5011","SIGTERM 5012","SIGTERM 5013","probe 5011","probe 5011","SIGKILL 5011","probe 5012","SIGKILL 5012","probe 5013","SIGKILL 5013"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "tree: one survivor among the dead takes the only SIGKILL",
    fn: "tree",
    pids: [5021,5022,5023],
    plan: {
      5021: { term: "ok", kill: "ok", probe: ["ESRCH"] },
      5022: { term: "ok", kill: "ok", probe: ["ok"] },
      5023: { term: "ok", kill: "ok", probe: ["ESRCH"] },
    },
    standing: {
      signals: ["SIGTERM 5021","SIGTERM 5022","SIGTERM 5023","probe 5021","probe 5022","probe 5021","probe 5022","SIGKILL 5022","probe 5023"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "tree: a mid-list ESRCH on SIGTERM does not stop the later pids",
    fn: "tree",
    pids: [5031,5032,5033],
    plan: {
      5031: { term: "ok", kill: "ok", probe: ["ESRCH"] },
      5032: { term: "ESRCH", kill: "ok", probe: ["ESRCH"] },
      5033: { term: "ok", kill: "ok", probe: ["ESRCH"] },
    },
    standing: {
      signals: ["SIGTERM 5031","SIGTERM 5032","SIGTERM 5033","probe 5031","probe 5032","probe 5033"],
      logs: [],
      threw: null,
    },
  },
  {
    name: "tree: a mid-list EPERM on SIGTERM is logged and the sweep continues",
    fn: "tree",
    pids: [5041,5042,5043],
    plan: {
      5041: { term: "ok", kill: "ok", probe: ["ESRCH"] },
      5042: { term: "EPERM", kill: "ok", probe: ["ESRCH"] },
      5043: { term: "ok", kill: "ok", probe: ["ESRCH"] },
    },
    standing: {
      signals: ["SIGTERM 5041","SIGTERM 5042","SIGTERM 5043","probe 5041","probe 5042","probe 5043"],
      logs: ["memory-reaper: SIGTERM pid=5042 failed: EPERM: fake"],
      threw: null,
    },
  },
  {
    name: "tree: an empty pid list signals nothing and returns at the first check",
    fn: "tree",
    pids: [],
    plan: {},
    standing: {
      signals: [],
      logs: [],
      threw: null,
    },
  },
  {
    name: "tree: a pid that dies between the probe sweep and its SIGKILL",
    fn: "tree",
    pids: [5051,5052],
    plan: {
      5051: { term: "ok", kill: "ok", probe: ["ok"] },
      5052: { term: "ok", kill: "ESRCH", probe: ["ok"] },
    },
    standing: {
      signals: ["SIGTERM 5051","SIGTERM 5052","probe 5051","probe 5051","SIGKILL 5051","probe 5052","SIGKILL 5052"],
      logs: [],
      threw: null,
    },
  },
]

function raise(code: string): never {
  if (code === "PLAIN") throw "not an error object"
  const err = new Error(`${code}: fake`) as Error & { code: string }
  err.code = code
  throw err
}

const ADVANCE_MS = 3000

async function observe(one: Case): Promise<Observation> {
  const signals: string[] = []
  const logs: string[] = []
  const probeCount = new Map<number, number>()

  const realKill = process.kill
  const realNow = Date.now
  const realError = console.error

  let clock = 0
  Date.now = (): number => {
    clock += ADVANCE_MS
    return clock
  }
  ;(process as { kill: unknown }).kill = (pid: number, signal?: string | number): true => {
    const plan = one.plan[pid]
    const named = signal === undefined ? "SIGTERM" : String(signal)
    if (named === "0") {
      signals.push(`probe ${pid}`)
      const seen = probeCount.get(pid) ?? 0
      probeCount.set(pid, seen + 1)
      const steps = plan?.probe ?? ["ESRCH"]
      const step = steps[Math.min(seen, steps.length - 1)] ?? "ESRCH"
      if (step !== "ok") raise(step)
      return true
    }
    signals.push(`${named} ${pid}`)
    const outcome = named === "SIGKILL" ? (plan?.kill ?? "ESRCH") : (plan?.term ?? "ESRCH")
    if (outcome !== "ok") raise(outcome)
    return true
  }
  console.error = (...args: unknown[]): undefined => {
    logs.push(args.map((each) => String(each)).join(" "))
  }

  let threw: string | null = null
  try {
    if (one.fn === "pid") {
      await killPidWithTimeout(one.pids[0] ?? 0)
    } else {
      await killTreeWithTimeout(one.pids)
    }
  } catch (err) {
    threw = err instanceof Error ? `${err.name}: ${err.message}` : String(err)
  } finally {
    process.kill = realKill
    Date.now = realNow
    console.error = realError
  }

  return { signals, logs, threw }
}

describe("the reaper's kill leaf, held against what it did in the code repository", () => {
  for (const one of CASES) {
    it(one.name, async () => {
      const answered = decided("ported", { value: await observe(one), notice: null })
      const verdict = hold(one.name, one.standing, answered)
      expect(verdict.matches).toBe(true)
    })
  }

  it("every case compares a signal sequence rather than an empty projection", () => {
    const silent = CASES.filter((one) => one.standing.signals.length === 0).map((one) => one.name)
    expect(silent).toEqual(["tree: an empty pid list signals nothing and returns at the first check"])
  })

  it("carries both exported functions and every escalation ending", () => {
    expect(CASES.filter((one) => one.fn === "pid").length).toBeGreaterThan(0)
    expect(CASES.filter((one) => one.fn === "tree").length).toBeGreaterThan(0)
    const every = CASES.flatMap((one) => one.standing.signals)
    expect(every.some((each) => each.startsWith("SIGKILL"))).toBe(true)
    expect(every.some((each) => each.startsWith("probe"))).toBe(true)
    expect(CASES.some((one) => one.standing.logs.length > 0)).toBe(true)
  })
})
