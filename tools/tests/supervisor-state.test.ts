
import { describe, expect, it } from "bun:test"
import { decided, hold } from "../lib/digest-harness.ts"
import { activeLifecycles, trackLifecycle } from "../lib/supervisor-state.ts"

interface Scenario {
  readonly name: string
  readonly drive: () => Promise<Record<string, unknown>>
  readonly standing: Record<string, unknown>
}

const flushMicrotasks = () => new Promise<void>((resolve) => setImmediate(resolve))

const SCENARIOS: readonly Scenario[] = [
  {
    name: "adds the tracker to activeLifecycles synchronously, removes after resolve",
    drive: async () => {
      const sizeBefore = activeLifecycles.size
      let resolveInner!: (v: number) => void
      const inner = new Promise<number>((r) => {
        resolveInner = r
      })

      const returned = trackLifecycle(inner)
      const deltaAfterTrack = activeLifecycles.size - sizeBefore
      const returnedIsInner = returned === inner

      resolveInner(42)
      const awaited = await returned
      await flushMicrotasks()
      return {
        deltaAfterTrack,
        returnedIsInner,
        awaited,
        deltaAfterSettle: activeLifecycles.size - sizeBefore,
      }
    },
    standing: { deltaAfterTrack: 1, returnedIsInner: true, awaited: 42, deltaAfterSettle: 0 },
  },
  {
    name: "removes the tracker after the original promise rejects",
    drive: async () => {
      const sizeBefore = activeLifecycles.size
      let rejectInner!: (e: Error) => void
      const inner = new Promise<number>((_, r) => {
        rejectInner = r
      })

      const returned = trackLifecycle(inner)
      const deltaAfterTrack = activeLifecycles.size - sizeBefore

      rejectInner(new Error("boom"))
      let rejectedMessage: string | null = null
      try {
        await returned
      } catch (error) {
        rejectedMessage = error instanceof Error ? error.message : String(error)
      }
      await flushMicrotasks()
      return {
        deltaAfterTrack,
        rejectedMessage,
        deltaAfterSettle: activeLifecycles.size - sizeBefore,
      }
    },
    standing: { deltaAfterTrack: 1, rejectedMessage: "boom", deltaAfterSettle: 0 },
  },
  {
    name: "multiple concurrent trackers all removed when their inners settle",
    drive: async () => {
      const sizeBefore = activeLifecycles.size
      const resolvers: ((v: number) => void)[] = []
      const promises = [0, 1, 2].map(
        (_, i) =>
          new Promise<number>((r) => {
            resolvers[i] = r
          })
      )
      for (const p of promises) trackLifecycle(p)
      const deltaAfterTrack = activeLifecycles.size - sizeBefore

      for (const [i, r] of resolvers.entries()) r(i)
      await Promise.all(promises)
      await flushMicrotasks()
      return { deltaAfterTrack, deltaAfterSettle: activeLifecycles.size - sizeBefore }
    },
    standing: { deltaAfterTrack: 3, deltaAfterSettle: 0 },
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

describe("trackLifecycle, held against what the code repository asserts", () => {
  for (const scenario of SCENARIOS) {
    it(scenario.name, async () => {
      const observed = decided("ported", { value: await scenario.drive(), notice: null })
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
