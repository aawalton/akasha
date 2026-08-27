import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { reconstructedFilter } from "./reconstructed-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const reconstructed: ItemFacts = { ...baseFacts, isReconstructed: true }
const notReconstructed: ItemFacts = { ...baseFacts, isReconstructed: false }
const unknown: ItemFacts = { ...baseFacts }

describe("reconstructedFilter", () => {
  it("include matches a reconstructed item and rejects a not-reconstructed item", () => {
    expect(reconstructedFilter.matches(reconstructed, "include")).toBe(true)
    expect(reconstructedFilter.matches(notReconstructed, "include")).toBe(false)
  })

  it("exclude matches a not-reconstructed item and rejects a reconstructed item", () => {
    expect(reconstructedFilter.matches(notReconstructed, "exclude")).toBe(true)
    expect(reconstructedFilter.matches(reconstructed, "exclude")).toBe(false)
  })

  it("fails closed when the flag is undefined (neither include nor exclude matches)", () => {
    expect(reconstructedFilter.matches(unknown, "include")).toBe(false)
    expect(reconstructedFilter.matches(unknown, "exclude")).toBe(false)
  })

  it("deserialize round-trips include / exclude and rejects garbage", () => {
    expect(reconstructedFilter.deserialize(reconstructedFilter.serialize("include"))).toBe(
      "include"
    )
    expect(reconstructedFilter.deserialize(reconstructedFilter.serialize("exclude"))).toBe(
      "exclude"
    )
    expect(reconstructedFilter.deserialize("nonsense")).toBeUndefined()
    expect(reconstructedFilter.deserialize(42)).toBeUndefined()
  })
})
