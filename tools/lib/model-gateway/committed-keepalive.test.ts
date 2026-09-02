import { expect, test } from "bun:test"
import { buildCommittedKeepaliveResponse } from "./committed-keepalive.ts"
import { buildHoldRegistry } from "./hold-registry.ts"
import type { KeepaliveTimers } from "./keepalive.ts"
import type { ObserverSlot } from "./observer-slot.ts"
import type { PickPipelineDeps, PickPipelineOutcome } from "./pick-pipeline-types.ts"

type Armed = { fn: () => void; handle: number }

function countingTimers(): { timers: KeepaliveTimers; armed: () => number; fireAll: () => void } {
  let next = 1
  const pending = new Map<number, Armed>()
  const timers: KeepaliveTimers = {
    set: (fn) => {
      const handle = next
      next += 1
      pending.set(handle, { fn, handle })
      return handle as unknown as ReturnType<typeof setTimeout>
    },
    clear: (handle) => {
      pending.delete(handle as unknown as number)
    },
  }
  return {
    timers,
    armed: () => pending.size,
    fireAll: () => {
      for (const [handle, armed] of [...pending]) {
        pending.delete(handle)
        armed.fn()
      }
    },
  }
}

const HELD_FOREVER: PickPipelineOutcome = {
  kind: "empty-pool",
  reason: "no-viable-account",
  trailDisplay: "-",
}

function heldResponse(timers: KeepaliveTimers): Response {
  const observerSlot: ObserverSlot = { current: null }
  const deps = { logPrefix: "[test]" } as unknown as PickPipelineDeps
  return buildCommittedKeepaliveResponse({
    req: new Request("http://localhost/v1/messages", { method: "POST" }),
    observerSlot,
    originalBody: null,
    method: "POST",
    pathname: "/v1/messages",
    deps,
    // Parking here is what keeps the stream in its hold phase for the whole test.
    sleep: () => new Promise<void>(() => {}),
    timers,
    runAttempt: () => Promise.resolve(HELD_FOREVER),
  })
}

test("a client that disconnects while held stops the keepalive rather than leaving it firing", async () => {
  const { timers, armed, fireAll } = countingTimers()
  const res = heldResponse(timers)
  const body = res.body
  if (body === null) throw new Error("the committed response carried no body")

  const reader = body.getReader()
  await reader.read()
  expect(armed()).toBe(1)

  await reader.cancel("client went away")

  expect(armed()).toBe(0)
  fireAll()
  expect(armed()).toBe(0)
})

test("a keepalive stopped by a disconnect does not re-arm itself when an already-armed timer fires", async () => {
  const { timers, armed, fireAll } = countingTimers()
  const res = heldResponse(timers)
  const body = res.body
  if (body === null) throw new Error("the committed response carried no body")

  const reader = body.getReader()
  await reader.read()
  await reader.cancel("client went away")

  for (let round = 0; round < 5; round += 1) fireAll()
  expect(armed()).toBe(0)
})

test("an attempt that rejects ends the stream and releases the hold rather than leaving both open", async () => {
  const { timers, armed } = countingTimers()
  const registry = buildHoldRegistry()
  const observerSlot: ObserverSlot = { current: null }
  const deps = { logPrefix: "[test]" } as unknown as PickPipelineDeps
  const res = buildCommittedKeepaliveResponse({
    req: new Request("http://localhost/v1/messages", { method: "POST" }),
    observerSlot,
    originalBody: null,
    method: "POST",
    pathname: "/v1/messages",
    deps,
    sleep: () => new Promise<void>(() => {}),
    timers,
    holdRegistry: registry,
    runAttempt: () => Promise.reject(new Error("the pick pipeline threw")),
  })
  const body = res.body
  if (body === null) throw new Error("the committed response carried no body")

  const reader = body.getReader()
  const decoder = new TextDecoder()
  let seen = ""
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value !== undefined) seen += decoder.decode(value)
  }

  expect(seen).toContain("api_error")
  expect(registry.snapshot(Date.now()).heldCount).toBe(0)
  expect(armed()).toBe(0)
})
