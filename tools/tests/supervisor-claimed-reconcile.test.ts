
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import {
  type ClaimedCandidate,
  type ClaimedReconcileDeps,
  reconcileClaimedRedelivery,
} from "../lib/supervisor-claimed-reconcile.ts"

const A = "019f4bfd-2a3a-7757-9644-159e53fdb8a3"
const B = "019efb4f-ebd7-760c-af44-a0cf841c3dbb"
const START = 1_000_000

const ABSENT = "«absent»"

const held = <T>(value: T | undefined): T | string => (value === undefined ? ABSENT : value)

const wrapper = (id: string): string =>
  `<channel source="messages" sender="019ef9fd-2704-727a-9cda-5b38ce1669f2" source_type="user" message_id="${id}">\nbody`

const enqueueLine = (id: string): string =>
  JSON.stringify({
    type: "queue-operation",
    operation: "enqueue",
    timestamp: "2026-07-10T12:25:11.893Z",
    sessionId: "s1",
    content: wrapper(id),
  })

const userInjection = (id: string): string =>
  JSON.stringify({
    type: "user",
    isMeta: true,
    sessionId: "s1",
    message: { role: "user", content: wrapper(id) },
  })

const assistantTurn = (): string =>
  JSON.stringify({ type: "assistant", sessionId: "s1", message: { role: "assistant", content: "x" } })

const dead = (id: string): ClaimedCandidate => ({ id, claimedAtMs: START - 5_000 })

function gate() {
  let settle: (safe: boolean) => void = () => {}
  const promise = new Promise<boolean>((resolve) => {
    settle = resolve
  })
  let awaited = false
  return {
    awaited: () => awaited,
    wait: () => {
      awaited = true
      return promise
    },
    pass: () => settle(true),
    cancel: () => settle(false),
  }
}

type Decide = NonNullable<ClaimedReconcileDeps["decide"]>
type Question = Parameters<Decide>[0]

function harness(opts: {
  candidates?: readonly ClaimedCandidate[]
  transcript?: string | null
  waitForRedeliveryWindow?: () => Promise<boolean>
  releaseImpl?: (id: string) => Promise<void>
  onReadTail?: () => void
  decide?: Decide
}) {
  const released: string[] = []
  const queried: number[] = []
  const asked: Question[] = []
  const logs: string[] = []
  const errors: string[] = []
  const decide: Decide = async (question) => {
    asked.push(question)
    if (opts.decide !== undefined) return opts.decide(question)
    return { release: question.candidates.map((c) => c.id), skipped: [] }
  }
  return {
    released,
    queried,
    asked,
    logs,
    errors,
    run: () =>
      reconcileClaimedRedelivery(
        { agentId: "agent-1", processStartedAtMs: START },
        {
          readClaimed: async (_agentId, beforeMs) => {
            queried.push(beforeMs)
            return opts.candidates ?? []
          },
          readTail: () => {
            opts.onReadTail?.()
            return opts.transcript === undefined ? assistantTurn() : opts.transcript
          },
          release: async (id) => {
            released.push(id)
            if (opts.releaseImpl) await opts.releaseImpl(id)
          },
          waitForRedeliveryWindow: opts.waitForRedeliveryWindow ?? (async () => true),
          decide,
          log: (m) => logs.push(m),
          logError: (m) => errors.push(m),
        }
      ),
  }
}

interface Scenario {
  readonly name: string
  readonly drive: () => Promise<Record<string, unknown>>
  readonly standing: Record<string, unknown>
}

const SCENARIOS: readonly Scenario[] = [
  {
    name: "releases the rows the decision selects, and queries with this process's start",
    drive: async () => {
      const h = harness({ candidates: [dead(A)] })
      await h.run()
      return { released: h.released, queried: h.queried }
    },
    standing: { released: [A], queried: [START] },
  },
  {
    name: "releases nothing until the holdoff resolves — the redelivery must miss the boot drain",
    drive: async () => {
      const g = gate()
      const h = harness({ candidates: [dead(A)], waitForRedeliveryWindow: g.wait })
      const done = h.run()
      await Promise.resolve()
      const beforeHoldoff = [...h.released]
      g.pass()
      await done
      return { releasedBeforeHoldoff: beforeHoldoff, released: h.released }
    },
    standing: { releasedBeforeHoldoff: [], released: [A] },
  },
  {
    name: "a cancelled holdoff releases nothing AND never spends the query",
    drive: async () => {
      const g = gate()
      const h = harness({ candidates: [dead(A)], waitForRedeliveryWindow: g.wait })
      const done = h.run()
      g.cancel()
      await done
      return { released: h.released, queried: h.queried, errors: h.errors }
    },
    standing: { released: [], queried: [], errors: [] },
  },
  {
    name: "reads the transcript BEFORE awaiting the holdoff",
    drive: async () => {
      const g = gate()
      let readAt = -1
      let step = 0
      const h = harness({
        candidates: [dead(A)],
        waitForRedeliveryWindow: () => {
          step++
          return g.wait()
        },
        onReadTail: () => {
          readAt = step
        },
      })
      const done = h.run()
      await Promise.resolve()
      const observed = { readAt, awaited: g.awaited() }
      g.pass()
      await done
      return observed
    },
    standing: { readAt: 0, awaited: true },
  },
  {
    name: "classifies the transcript HERE and hands the rule one finding per candidate",
    drive: async () => {
      const transcript = [enqueueLine(B), userInjection(B), assistantTurn()].join("\n")
      const h = harness({ candidates: [dead(A), dead(B)], transcript })
      await h.run()
      return {
        askedCount: h.asked.length,
        askedProcessStartedAtMs: held(h.asked[0]?.processStartedAtMs),
        askedCandidates: held(h.asked[0]?.candidates),
      }
    },
    standing: {
      askedCount: 1,
      askedProcessStartedAtMs: START,
      askedCandidates: [
        { id: A, claimedAtMs: START - 5_000, finding: { outcome: "absent", selfRead: false } },
        { id: B, claimedAtMs: START - 5_000, finding: { outcome: "injected", selfRead: false } },
      ],
    },
  },
  {
    name: "an unreadable transcript sends `finding: null` for every candidate",
    drive: async () => {
      const h = harness({ candidates: [dead(A), dead(B)], transcript: null })
      await h.run()
      return { askedFindings: held(h.asked[0]?.candidates.map((c) => c.finding)) }
    },
    standing: { askedFindings: [null, null] },
  },
  {
    name: "logs each skip with its reason — a silent backstop cannot be audited",
    drive: async () => {
      const h = harness({
        candidates: [dead(B)],
        decide: async () => ({ release: [], skipped: [{ id: B, reason: "injected" }] }),
      })
      await h.run()
      return {
        released: h.released,
        loggedSkip: h.logs.some((l) => l.includes(B) && l.includes("injected")),
      }
    },
    standing: { released: [], loggedSkip: true },
  },
  {
    name: "a rule that cannot be reached releases NOTHING and is logged",
    drive: async () => {
      const h = harness({
        candidates: [dead(A), dead(B)],
        decide: async () => {
          throw new Error("supervisor-decide: no instructions root")
        },
      })
      await h.run()
      return { released: h.released, errorCount: h.errors.length }
    },
    standing: { released: [], errorCount: 1 },
  },
  {
    name: "a failing release is contained — the remaining ids still release, and it never throws",
    drive: async () => {
      const h = harness({
        candidates: [dead(A), dead(B)],
        releaseImpl: async (id) => {
          if (id === A) throw new Error("db down")
        },
      })
      await h.run()
      return { released: h.released, errorNamesA: h.errors.some((e) => e.includes(A)) }
    },
    standing: { released: [A, B], errorNamesA: true },
  },
  {
    name: "a throwing query is contained (best-effort, never throws into its void dispatch)",
    drive: async () => {
      let logged = false
      await reconcileClaimedRedelivery(
        { agentId: "agent-1", processStartedAtMs: START },
        {
          readClaimed: async () => {
            throw new Error("pg down")
          },
          readTail: () => assistantTurn(),
          release: async () => {},
          waitForRedeliveryWindow: async () => true,
          decide: async () => ({ release: [], skipped: [] }),
          log: () => {},
          logError: () => {
            logged = true
          },
        }
      )
      return { logged }
    },
    standing: { logged: true },
  },
  {
    name: "no claimed rows is a silent no-op",
    drive: async () => {
      const h = harness({ candidates: [] })
      await h.run()
      return { released: h.released, asked: h.asked, logs: h.logs, errors: h.errors }
    },
    standing: { released: [], asked: [], logs: [], errors: [] },
  },
  {
    name: "the DEFAULT holdoff defers — omitting the dep cannot release into the boot window",
    drive: async () => {
      const released: string[] = []
      const queried: number[] = []
      void reconcileClaimedRedelivery(
        { agentId: "agent-1", processStartedAtMs: START },
        {
          readClaimed: async (_agentId, beforeMs) => {
            queried.push(beforeMs)
            return [dead(A)]
          },
          readTail: () => assistantTurn(),
          release: async (id) => {
            released.push(id)
          },
          log: () => {},
          logError: () => {},
        }
      )
      await Promise.resolve()
      await Promise.resolve()
      return { released, queried }
    },
    standing: { released: [], queried: [] },
  },
]

function projected(trace: Record<string, unknown>, shape: Record<string, unknown>): Record<string, unknown> {
  const picked: Record<string, unknown> = {}
  for (const key of Object.keys(shape)) picked[key] = trace[key]
  return picked
}

describe("reconcileClaimedRedelivery, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const trace = decided("ported", { value: await scenario.drive(), notice: null })
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
