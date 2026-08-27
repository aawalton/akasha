import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { marketValueFilter } from "./market-value-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const cheap: ItemFacts = { ...baseFacts, estimatedValue: 50 }
const pricey: ItemFacts = { ...baseFacts, estimatedValue: 200 }
const noEstimate: ItemFacts = { ...baseFacts }

describe("marketValueFilter", () => {
  it("matches an item whose market value satisfies the threshold", () => {
    expect(marketValueFilter.matches(cheap, { value: 100, op: "<=" })).toBe(true)
  })

  it("rejects an item whose market value violates the threshold", () => {
    expect(marketValueFilter.matches(pricey, { value: 100, op: "<=" })).toBe(false)
  })

  it("fails closed when estimatedValue is undefined and the bound is non-vacuous", () => {
    expect(marketValueFilter.matches(noEstimate, { value: 100, op: "<=" })).toBe(false)
  })

  it("deserialize round-trips a range and rejects garbage", () => {
    expect(
      marketValueFilter.deserialize(marketValueFilter.serialize({ value: 100, op: ">=" }))
    ).toEqual({ value: 100, op: ">=" })
    expect(marketValueFilter.deserialize("nonsense")).toBeUndefined()
    expect(marketValueFilter.deserialize({ value: "x" })).toBeUndefined()
    expect(marketValueFilter.deserialize({ value: 100, op: "??" })).toBeUndefined()
  })
})
