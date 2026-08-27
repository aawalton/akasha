import { describe, expect, test } from "bun:test"
import { buildCommittedKeepaliveResponse } from "../lib/model-gateway/committed-keepalive.ts"
import type { PickPipelineOutcome } from "../lib/model-gateway/pick-pipeline-types"
import {
  baseArgs,
  drainToString,
  emptyPool,
  newObserverSlot,
  queued,
} from "./model-gateway-committed-keepalive-fixture.ts"

const served = (body: BodyInit | null, status: number): PickPipelineOutcome => ({
  kind: "served",
  response: new Response(body, { status }),
})

const argsFor = (
  outcomes: readonly PickPipelineOutcome[],
  slot = newObserverSlot()
): Parameters<typeof buildCommittedKeepaliveResponse>[0] =>
  baseArgs({ logPrefix: "[keepalive-test]", observerSlot: slot, runAttempt: queued(outcomes) })

describe("buildCommittedKeepaliveResponse", () => {
  test("commits a 200 text/event-stream response synchronously", () => {
    const res = buildCommittedKeepaliveResponse(argsFor([served("x", 200)]))
    expect(res.status).toBe(200)
    expect(res.headers.get("content-type")).toContain("text/event-stream")
  })

  test("installs a fresh committed observer into the slot at commit", () => {
    const slot = newObserverSlot()
    const sentinel = slot.current
    buildCommittedKeepaliveResponse(argsFor([served("x", 200)], slot))
    expect(slot.current).not.toBe(sentinel)
    expect(slot.current).not.toBeNull()
  })

  test("holds through an empty-pool attempt, then splices the served 200 body", async () => {
    const res = buildCommittedKeepaliveResponse(
      argsFor([emptyPool, served("data: upstream-chunk\n\n", 200)])
    )
    const out = await drainToString(res)
    expect(out).toContain(": keepalive\n")
    expect(out).toContain("data: upstream-chunk")
    expect(out.indexOf(": keepalive")).toBeLessThan(out.indexOf("data: upstream-chunk"))
  })

  test("a post-commit non-2xx becomes an in-stream SSE error frame, never a status", async () => {
    const res = buildCommittedKeepaliveResponse(argsFor([served("ignored-upstream-body", 500)]))
    expect(res.status).toBe(200)
    const out = await drainToString(res)
    expect(out).toContain("event: error")
    expect(out).toContain("api_error")
    expect(out).not.toContain("ignored-upstream-body")
  })

  test("a post-commit 529 maps to an overloaded_error frame", async () => {
    const res = buildCommittedKeepaliveResponse(argsFor([served(null, 529)]))
    const out = await drainToString(res)
    expect(out).toContain("event: error")
    expect(out).toContain("overloaded_error")
  })
})
