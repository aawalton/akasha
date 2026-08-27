import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { valueFilter } from "./value-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const cheap: ItemFacts = { ...baseFacts, estimatedValue: 50 }
const pricey: ItemFacts = { ...baseFacts, estimatedValue: 200 }
const noValueSignals: ItemFacts = { ...baseFacts }

describe("valueFilter", () => {
  it("matches an item whose combined value satisfies the threshold", () => {
    expect(valueFilter.matches(cheap, { value: 100, op: "<=" })).toBe(true)
  })

  it("rejects an item whose combined value violates the threshold", () => {
    expect(valueFilter.matches(pricey, { value: 100, op: "<=" })).toBe(false)
  })

  it("fails closed when all value signals are undefined and the bound is non-vacuous", () => {
    expect(valueFilter.matches(noValueSignals, { value: 100, op: "<=" })).toBe(false)
  })

  it("deserialize round-trips a range and rejects garbage", () => {
    expect(valueFilter.deserialize(valueFilter.serialize({ value: 100, op: ">=" }))).toEqual({
      value: 100,
      op: ">=",
    })
    expect(valueFilter.deserialize("nonsense")).toBeUndefined()
    expect(valueFilter.deserialize({ value: "x" })).toBeUndefined()
    expect(valueFilter.deserialize({ value: 100, op: "??" })).toBeUndefined()
  })
})
