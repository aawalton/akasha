import { describe, expect, test } from "bun:test"
import type { ShoppingPlan } from "@akasha/temper-shopping/ttc-shopping-types"
import { readSSEStream, type SseReadOutcome } from "./shopping-sse-reader.module.code.ts"

const ENCODER = new TextEncoder()

const PLAN: ShoppingPlan = {
  purchases: [],
  locations: [],
  totalCost: 0,
  missingItems: [],
  budgets: [],
  alternatives: {},
}
const PLAN_JSON = JSON.stringify({ plan: PLAN })
const PROGRESS_FRAME = 'event: progress\ndata: {"completed":1,"total":2}\n\n'
const COMPLETE_FRAME = `event: complete\ndata: ${PLAN_JSON}\n\n`

function responseOf(...chunks: readonly (string | Uint8Array)[]): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(typeof chunk === "string" ? ENCODER.encode(chunk) : chunk)
      }
      controller.close()
    },
  })
  return new Response(stream)
}

async function readAll(...chunks: readonly (string | Uint8Array)[]): Promise<{
  outcome: SseReadOutcome
  progress: { completed: number; total: number }[]
  complete: { plan: ShoppingPlan }[]
  failed: { error: string }[]
}> {
  const progress: { completed: number; total: number }[] = []
  const complete: { plan: ShoppingPlan }[] = []
  const failed: { error: string }[] = []
  const outcome = await readSSEStream(
    responseOf(...chunks),
    (d) => progress.push(d),
    (d) => complete.push(d),
    (d) => failed.push(d)
  )
  return { outcome, progress, complete, failed }
}

describe("readSSEStream", () => {
  test("delivers progress then complete and reports a complete terminal", async () => {
    const { outcome, progress, complete } = await readAll(PROGRESS_FRAME, COMPLETE_FRAME)

    expect(progress).toEqual([{ completed: 1, total: 2 }])
    expect(complete).toEqual([{ plan: PLAN }])
    expect(outcome).toEqual({ terminal: "complete", dropped: [] })
  })

  test("recovers a complete frame that ends without its trailing blank line", async () => {
    const { outcome, complete } = await readAll(`event: complete\ndata: ${PLAN_JSON}`)

    expect(complete).toEqual([{ plan: PLAN }])
    expect(outcome).toEqual({ terminal: "complete", dropped: [] })
  })

  test("accepts an error frame carrying a field beyond the known envelope", async () => {
    const { outcome, failed } = await readAll(
      'event: error\ndata: {"error":"TTC unreachable","code":503}\n\n'
    )

    expect(failed).toEqual([{ error: "TTC unreachable" }])
    expect(outcome).toEqual({ terminal: "error", dropped: [] })
  })

  test("reports a mid-JSON truncation as an unparseable drop, not a terminal", async () => {
    const { outcome, complete } = await readAll('event: complete\ndata: {"plan":{"purch')

    expect(complete).toEqual([])
    expect(outcome).toEqual({
      terminal: "none",
      dropped: [{ event: "complete", reason: "unparseable" }],
    })
  })

  test("reports a complete payload missing purchases as a schema-rejected drop", async () => {
    const { outcome, complete } = await readAll(
      'event: complete\ndata: {"plan":{"locations":[]}}\n\n'
    )

    expect(complete).toEqual([])
    expect(outcome).toEqual({
      terminal: "none",
      dropped: [{ event: "complete", reason: "schema-rejected" }],
    })
  })

  test("delivers the terminal frame at every byte split of a two-frame stream", async () => {
    const bytes = ENCODER.encode(PROGRESS_FRAME + COMPLETE_FRAME)

    for (let cut = 0; cut <= bytes.length; cut++) {
      const { outcome, complete } = await readAll(bytes.slice(0, cut), bytes.slice(cut))

      expect({ cut, plans: complete.length }).toEqual({ cut, plans: 1 })
      expect({ cut, terminal: outcome.terminal }).toEqual({ cut, terminal: "complete" })
    }
  })
})
