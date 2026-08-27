
import { describe, expect, test } from "bun:test"
import {
  decidePending,
  type OutboundRecency,
  pendingAllowsStopAlone,
} from "../lib/pending-decide.ts"

const sentAt = (atMs: number): OutboundRecency => ({ kind: "sent", atMs })

const NOTHING = {
  selfStopped: false,
  liveChildren: 0,
  openQuestions: 0,
  outbound: { kind: "none-sent" },
} as const

describe("decidePending", () => {
  test("a seat that left nothing behind grants nothing", () => {
    expect(decidePending(NOTHING)).toBe("none")
  })

  test("a seat whose own row is stopped needs no start", () => {
    expect(decidePending({ ...NOTHING, selfStopped: true })).toBe("stopped")
  })

  test("the specimen shape: a manager parked on children it spawned turns earlier", () => {
    expect(decidePending({ ...NOTHING, liveChildren: 4 })).toBe("live-child")
  })

  test("a seat blocked on an answer from Alan is parked on it", () => {
    expect(decidePending({ ...NOTHING, openQuestions: 1 })).toBe("open-question")
  })

  test("a blocked send of its own still standing unread is what it is awaiting", () => {
    expect(decidePending({ ...NOTHING, outbound: sentAt(1000) })).toBe("awaiting-reply")
  })

  test("an ended seat reads ended whatever else it holds", () => {
    expect(
      decidePending({
        selfStopped: true,
        liveChildren: 4,
        openQuestions: 2,
        outbound: sentAt(2000),
      })
    ).toBe("stopped")
  })

  test("a live child outranks a send still standing", () => {
    expect(decidePending({ ...NOTHING, liveChildren: 1, outbound: sentAt(1000) })).toBe("live-child")
  })
})

describe("pendingAllowsStopAlone", () => {
  test("three verdicts stand on their own; awaiting-reply does not", () => {
    expect(pendingAllowsStopAlone("stopped")).toBe(true)
    expect(pendingAllowsStopAlone("live-child")).toBe(true)
    expect(pendingAllowsStopAlone("open-question")).toBe(true)
    expect(pendingAllowsStopAlone("awaiting-reply")).toBe(false)
    expect(pendingAllowsStopAlone("none")).toBe(false)
  })
})
