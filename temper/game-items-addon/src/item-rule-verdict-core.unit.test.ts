import { describe, expect, test } from "bun:test"
import {
  selectConfirmedVerdictItemIds,
  selectEffectiveAction,
  verdictActionForJunk,
} from "./item-rule-verdict-core"

describe("verdictActionForJunk", () => {
  test("a junk toggle maps to a sell verdict", () => {
    expect(verdictActionForJunk(true)).toBe("sell")
  })
  test("a keep toggle maps to a nothing verdict", () => {
    expect(verdictActionForJunk(false)).toBe("nothing")
  })
})

describe("selectEffectiveAction", () => {
  test("an outbox verdict wins over the compiled rule (round-trip window)", () => {
    expect(selectEffectiveAction("nothing", "sell")).toBe("nothing")
  })
  test("falls back to the compiled action when the outbox has no verdict", () => {
    expect(selectEffectiveAction(undefined, "sell")).toBe("sell")
  })
  test("returns undefined when neither side has an action", () => {
    expect(selectEffectiveAction(undefined, undefined)).toBeUndefined()
  })
})

describe("selectConfirmedVerdictItemIds", () => {
  test("returns the outbox itemIds now present in the compiled rules (existence-based prune)", () => {
    expect(selectConfirmedVerdictItemIds([1, 2, 3], new Set([2, 3]))).toEqual([2, 3])
  })
  test("returns empty when no outbox itemId has materialized yet", () => {
    expect(selectConfirmedVerdictItemIds([1, 2], new Set([9]))).toEqual([])
  })
  test("returns empty for an empty outbox", () => {
    expect(selectConfirmedVerdictItemIds([], new Set([1]))).toEqual([])
  })
  test("preserves outbox order", () => {
    expect(selectConfirmedVerdictItemIds([3, 1, 2], new Set([1, 2, 3]))).toEqual([3, 1, 2])
  })
})
