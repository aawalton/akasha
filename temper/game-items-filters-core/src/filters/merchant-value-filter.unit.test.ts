import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { merchantValueFilter } from "./merchant-value-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const cheap: ItemFacts = { ...baseFacts, merchantValue: 50 }
const pricey: ItemFacts = { ...baseFacts, merchantValue: 200 }
const noMerchantValue: ItemFacts = { ...baseFacts }

describe("merchantValueFilter", () => {
  it("matches an item whose merchant value satisfies the threshold", () => {
    expect(merchantValueFilter.matches(cheap, { value: 100, op: "<=" })).toBe(true)
  })

  it("rejects an item whose merchant value violates the threshold", () => {
    expect(merchantValueFilter.matches(pricey, { value: 100, op: "<=" })).toBe(false)
  })

  it("treats a missing merchantValue as 0 (web canonical), so a `>= 100` bound rejects it", () => {
    expect(merchantValueFilter.matches(noMerchantValue, { value: 100, op: ">=" })).toBe(false)
  })

  it("deserialize round-trips a range and rejects garbage", () => {
    expect(
      merchantValueFilter.deserialize(merchantValueFilter.serialize({ value: 100, op: ">=" }))
    ).toEqual({ value: 100, op: ">=" })
    expect(merchantValueFilter.deserialize("nonsense")).toBeUndefined()
    expect(merchantValueFilter.deserialize({ value: "x" })).toBeUndefined()
    expect(merchantValueFilter.deserialize({ value: 100, op: "??" })).toBeUndefined()
  })
})
