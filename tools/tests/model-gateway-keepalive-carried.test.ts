import { describe, expect, it } from "bun:test"
import {
  buildKeepaliveEmitter,
  type KeepaliveEmitter,
  KEEPALIVE_COMMENT_BYTES,
  type KeepaliveTimers,
} from "../lib/model-gateway/keepalive.ts"

function makeFakeTimers(): {
  timers: KeepaliveTimers
  readonly armedCount: number
  fire: () => void
} {
  const pending = new Map<ReturnType<typeof setTimeout>, () => void>()
  const timers: KeepaliveTimers = {
    set(fn, _ms) {
      const handle = setTimeout(() => {}, 0)
      clearTimeout(handle)
      pending.set(handle, fn)
      return handle
    },
    clear(handle) {
      pending.delete(handle)
    },
  }
  return {
    timers,
    get armedCount(): number {
      return pending.size
    },
    fire(): void {
      const entry = [...pending.entries()][0]
      if (entry == null) throw new Error("no armed timer to fire")
      const [handle, fn] = entry
      pending.delete(handle)
      fn()
    },
  }
}

describe("KEEPALIVE_COMMENT_BYTES — carried from packages/agents/oauth-proxy/src/keepalive.unit.test.ts", () => {
  it("is an SSE comment line (colon prefix, single newline, no field)", () => {
    expect(new TextDecoder().decode(KEEPALIVE_COMMENT_BYTES)).toBe(": keepalive\n")
  })
})

describe("buildKeepaliveEmitter", () => {
  it("is inert until the first reset(): no armed timer, no emit", () => {
    const fake = makeFakeTimers()
    let emits = 0
    buildKeepaliveEmitter(1000, () => (emits += 1), fake.timers)
    expect(fake.armedCount).toBe(0)
    expect(emits).toBe(0)
  })

  it("arms on reset() and calls emit once after the interval fires", () => {
    const fake = makeFakeTimers()
    let emits = 0
    const ka = buildKeepaliveEmitter(1000, () => (emits += 1), fake.timers)
    ka.reset()
    expect(fake.armedCount).toBe(1)
    fake.fire()
    expect(emits).toBe(1)
  })

  it("repeats: continued silence emits once per interval", () => {
    const fake = makeFakeTimers()
    let emits = 0
    const ka = buildKeepaliveEmitter(1000, () => (emits += 1), fake.timers)
    ka.reset()
    fake.fire()
    fake.fire()
    fake.fire()
    expect(emits).toBe(3)
    expect(fake.armedCount).toBe(1)
  })

  it("reset() re-arms without stacking timers (one armed at a time)", () => {
    const fake = makeFakeTimers()
    let emits = 0
    const ka = buildKeepaliveEmitter(1000, () => (emits += 1), fake.timers)
    ka.reset()
    ka.reset()
    ka.reset()
    expect(fake.armedCount).toBe(1)
    fake.fire()
    expect(emits).toBe(1)
  })

  it("stop() is terminal: clears the armed timer and makes reset() a no-op", () => {
    const fake = makeFakeTimers()
    let emits = 0
    const ka = buildKeepaliveEmitter(1000, () => (emits += 1), fake.timers)
    ka.reset()
    ka.stop()
    expect(fake.armedCount).toBe(0)
    ka.reset()
    expect(fake.armedCount).toBe(0)
    expect(emits).toBe(0)
  })

  it("does not re-arm when emit() itself calls stop() (racing teardown)", () => {
    const fake = makeFakeTimers()
    let emits = 0
    let emitter: KeepaliveEmitter | null = null
    emitter = buildKeepaliveEmitter(
      1000,
      () => {
        emits += 1
        emitter?.stop()
      },
      fake.timers
    )
    emitter.reset()
    fake.fire()
    expect(emits).toBe(1)
    expect(fake.armedCount).toBe(0)
  })
})
