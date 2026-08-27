import { describe, expect, it } from "bun:test"
import {
  DAILY_WRIT_CRAFT_TYPES,
  type DailyWritStates,
  deriveWritCrafted,
  nextDailyWritReconcile,
  resolveDailyWritProfessionState,
} from "./daily-writs-state"

describe("DAILY_WRIT_CRAFT_TYPES", () => {
  it("lists the seven professions sorted alphabetically by label", () => {
    expect(DAILY_WRIT_CRAFT_TYPES.map((c) => c.label)).toEqual([
      "Alchemy",
      "Blacksmithing",
      "Clothier",
      "Enchanting",
      "Jewelry Crafting",
      "Provisioning",
      "Woodworking",
    ])
    expect(DAILY_WRIT_CRAFT_TYPES.map((c) => c.craftType)).toEqual([4, 1, 2, 3, 7, 5, 6])
  })
})

describe("nextDailyWritReconcile", () => {
  it("seeds an empty state from undefined", () => {
    expect(nextDailyWritReconcile(undefined, "2026-06-08", { present: [], crafted: [] })).toEqual({
      date: "2026-06-08",
      seen: [],
      completed: [],
    })
  })

  it("records currently-present writs as seen", () => {
    const out = nextDailyWritReconcile(undefined, "2026-06-08", { present: [1, 3], crafted: [] })
    expect(out.seen).toEqual([1, 3])
    expect(out.completed).toEqual([])
  })

  it("marks a previously-seen, now-absent writ as completed (turned in)", () => {
    const prev: DailyWritStates = { date: "2026-06-08", seen: [1, 3], completed: [] }
    const out = nextDailyWritReconcile(prev, "2026-06-08", { present: [3], crafted: [] })
    expect(out.completed).toEqual([1])
    expect(out.seen).toEqual([1, 3])
  })

  it("does not duplicate an already-completed writ", () => {
    const prev: DailyWritStates = { date: "2026-06-08", seen: [1], completed: [1] }
    const out = nextDailyWritReconcile(prev, "2026-06-08", { present: [], crafted: [] })
    expect(out.completed).toEqual([1])
  })

  it("resets when the logical day changes", () => {
    const prev: DailyWritStates = { date: "2026-06-07", seen: [1, 2], completed: [1] }
    const out = nextDailyWritReconcile(prev, "2026-06-08", { present: [4], crafted: [] })
    expect(out).toEqual({ date: "2026-06-08", seen: [4], completed: [] })
  })

  it("does not mutate the previous state", () => {
    const prev: DailyWritStates = { date: "2026-06-08", seen: [1], completed: [] }
    nextDailyWritReconcile(prev, "2026-06-08", { present: [], crafted: [] })
    expect(prev).toEqual({ date: "2026-06-08", seen: [1], completed: [] })
  })
})

describe("deriveWritCrafted", () => {
  it("is crafted when every craft-item condition has reached its count", () => {
    expect(deriveWritCrafted(3, 3)).toBe(true)
    expect(deriveWritCrafted(2, 2)).toBe(true)
    expect(deriveWritCrafted(1, 1)).toBe(true)
  })

  it("is not crafted while any craft-item condition is below its count", () => {
    expect(deriveWritCrafted(3, 1)).toBe(false)
    expect(deriveWritCrafted(1, 0)).toBe(false)
  })

  it("is not crafted when the writ exposes no craft-item conditions", () => {
    expect(deriveWritCrafted(0, 0)).toBe(false)
  })
})

describe("resolveDailyWritProfessionState", () => {
  const today = "2026-06-08"

  it("is notPickedUp when absent and never completed", () => {
    const states: DailyWritStates = { date: today, seen: [], completed: [] }
    expect(resolveDailyWritProfessionState(1, states, today, { present: [], crafted: [] })).toBe(
      "notPickedUp"
    )
  })

  it("is pickedUp when present but not crafted", () => {
    const states: DailyWritStates = { date: today, seen: [1], completed: [] }
    expect(resolveDailyWritProfessionState(1, states, today, { present: [1], crafted: [] })).toBe(
      "pickedUp"
    )
  })

  it("is crafted when present and all conditions complete", () => {
    const states: DailyWritStates = { date: today, seen: [1], completed: [] }
    expect(resolveDailyWritProfessionState(1, states, today, { present: [1], crafted: [1] })).toBe(
      "crafted"
    )
  })

  it("is completed when turned in (persisted), outranking the live scan", () => {
    const states: DailyWritStates = { date: today, seen: [1], completed: [1] }
    expect(resolveDailyWritProfessionState(1, states, today, { present: [], crafted: [] })).toBe(
      "completed"
    )
  })

  it("treats stale-day persisted state as absent", () => {
    const states: DailyWritStates = { date: "2026-06-07", seen: [1], completed: [1] }
    expect(resolveDailyWritProfessionState(1, states, today, { present: [], crafted: [] })).toBe(
      "notPickedUp"
    )
  })
})
