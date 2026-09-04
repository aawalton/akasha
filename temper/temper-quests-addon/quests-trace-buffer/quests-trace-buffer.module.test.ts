import { describe, expect, test } from "bun:test"
import type { AutoQuestTraceEntry } from "@akasha/temper-quests-trace/auto-quest-trace"
import { appendBounded, TRACE_CAP } from "./quests-trace-buffer.module.code.ts"

function action(at: number): AutoQuestTraceEntry {
  return { kind: "action", at, action: `a${at}` }
}

function fill(count: number, cap: number): readonly AutoQuestTraceEntry[] {
  let buffer: readonly AutoQuestTraceEntry[] = []
  for (let i = 1; i <= count; i++) buffer = appendBounded(buffer, action(i), cap)
  return buffer
}

describe("quests-trace-buffer", () => {
  test("an entry arriving below the cap is appended whole", () => {
    expect(appendBounded([action(1)], action(2), 5)).toEqual([action(1), action(2)])
  })

  test("appending returns a new list rather than changing the one handed in", () => {
    const buffer = [action(1)]
    const next = appendBounded(buffer, action(2), 5)
    expect(buffer).toEqual([action(1)])
    expect(next).not.toBe(buffer)
  })

  test("the buffer holds the number of entries the cap names", () => {
    expect(fill(8, 3).length).toBe(3)
  })

  test("the oldest entry goes first when the buffer is full", () => {
    expect(fill(5, 3)).toEqual([action(3), action(4), action(5)])
  })

  test("filling the buffer to exactly the cap drops nothing", () => {
    expect(fill(3, 3)).toEqual([action(1), action(2), action(3)])
  })

  test("an entry of any kind is kept as found across a drop", () => {
    const menu: AutoQuestTraceEntry = {
      kind: "menu",
      at: 1,
      interactionType: 2,
      offerPending: false,
      pendingCompletion: false,
      options: [],
      decision: "none",
    }
    const done: AutoQuestTraceEntry = {
      kind: "complete-dialog",
      at: 2,
      journalIndex: 3,
      numRewards: 4,
    }
    let buffer: readonly AutoQuestTraceEntry[] = [action(0)]
    buffer = appendBounded(buffer, menu, 2)
    buffer = appendBounded(buffer, done, 2)
    expect(buffer).toEqual([menu, done])
  })

  test("the cap the addon keeps is a whole count above zero", () => {
    expect(TRACE_CAP).toBeGreaterThan(0)
    expect(Number.isInteger(TRACE_CAP)).toBe(true)
  })
})
