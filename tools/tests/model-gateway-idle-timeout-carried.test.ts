import { describe, expect, test } from "bun:test"
import { buildIdleGuard, UPSTREAM_IDLE_TIMEOUT_TOKEN } from "../lib/model-gateway/idle-timeout.ts"

const tick = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

describe("buildIdleGuard — carried from packages/agents/oauth-proxy/src/idle-timeout.unit.test.ts", () => {
  test("is inert until armed by the first reset()", async () => {
    const guard = buildIdleGuard(20, "[test]", "acct /v1/messages")
    await tick(50)
    expect(guard.signal.aborted).toBe(false)
  })

  test("aborts the signal after idleMs of silence, with a classified TimeoutError", async () => {
    const guard = buildIdleGuard(20, "[test]", "acct /v1/messages")
    guard.reset()
    expect(guard.signal.aborted).toBe(false)
    await tick(60)
    expect(guard.signal.aborted).toBe(true)
    const reason: unknown = guard.signal.reason
    expect(reason).toBeInstanceOf(DOMException)
    if (!(reason instanceof DOMException)) throw new Error("unreachable")
    expect(reason.name).toBe("TimeoutError")
    expect(reason.message).toContain(UPSTREAM_IDLE_TIMEOUT_TOKEN)
  })

  test("reset() defers the abort — activity keeps the stream alive", async () => {
    const guard = buildIdleGuard(40, "[test]", "l")
    guard.reset()
    await tick(25)
    guard.reset()
    await tick(25)
    expect(guard.signal.aborted).toBe(false)
    const deadline = Date.now() + 400
    while (!guard.signal.aborted && Date.now() < deadline) {
      await tick(5)
    }
    expect(guard.signal.aborted).toBe(true)
  })

  test("stop() cancels a pending abort permanently", async () => {
    const guard = buildIdleGuard(20, "[test]", "l")
    guard.reset()
    guard.stop()
    await tick(50)
    expect(guard.signal.aborted).toBe(false)
  })

  test("reset() after stop() is a no-op — terminal stays terminal", async () => {
    const guard = buildIdleGuard(20, "[test]", "l")
    guard.reset()
    guard.stop()
    guard.reset()
    await tick(50)
    expect(guard.signal.aborted).toBe(false)
  })
})
