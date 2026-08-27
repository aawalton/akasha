import { describe, expect, it } from "bun:test"
import { type AutoQuestTraceEntry, appendBounded, TRACE_CAP } from "./trace-buffer"

function actionEntry(at: number): AutoQuestTraceEntry {
  return { kind: "action", at, action: `select ${at}` }
}

describe("appendBounded", () => {
  it("appends below the cap without dropping", () => {
    const a = actionEntry(1)
    const b = actionEntry(2)
    const out = appendBounded([a], b, 5)
    expect(out).toEqual([a, b])
  })

  it("returns a new array (does not mutate the input buffer)", () => {
    const buffer: AutoQuestTraceEntry[] = [actionEntry(1)]
    const out = appendBounded(buffer, actionEntry(2), 5)
    expect(out).not.toBe(buffer)
    expect(buffer).toHaveLength(1)
  })

  it("keeps exactly cap entries once full, dropping oldest-first (FIFO)", () => {
    let buffer: AutoQuestTraceEntry[] = []
    for (let i = 1; i <= 5; i++) buffer = appendBounded(buffer, actionEntry(i), 3)
    expect(buffer).toHaveLength(3)
    expect(buffer.map((e) => e.at)).toEqual([3, 4, 5])
  })

  it("at the cap boundary, appending the cap-th entry retains all of them", () => {
    let buffer: AutoQuestTraceEntry[] = []
    for (let i = 1; i <= 3; i++) buffer = appendBounded(buffer, actionEntry(i), 3)
    expect(buffer.map((e) => e.at)).toEqual([1, 2, 3])
  })

  it("preserves entry kinds across a mixed FIFO drop", () => {
    const menu: AutoQuestTraceEntry = {
      kind: "menu",
      at: 1,
      interactionType: 1,
      offerPending: false,
      pendingCompletion: false,
      options: [],
      decision: "none",
    }
    const dialog: AutoQuestTraceEntry = {
      kind: "complete-dialog",
      at: 2,
      journalIndex: 7,
      numRewards: 2,
    }
    const action = actionEntry(3)
    const out = appendBounded([menu, dialog], action, 2)
    expect(out).toEqual([dialog, action])
  })

  it("TRACE_CAP is a positive integer", () => {
    expect(TRACE_CAP).toBeGreaterThan(0)
    expect(Number.isInteger(TRACE_CAP)).toBe(true)
  })
})
