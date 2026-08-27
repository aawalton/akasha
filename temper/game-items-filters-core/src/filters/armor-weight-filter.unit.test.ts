import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { createSearchRequestCollector } from "../filter-types"
import { armorWeightFilter } from "./armor-weight-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const light: ItemFacts = { ...baseFacts, armorType: 1 }
const heavy: ItemFacts = { ...baseFacts, armorType: 3 }
const unknown: ItemFacts = { ...baseFacts }

describe("armorWeightFilter", () => {
  it("matches anything when the selection is empty", () => {
    expect(armorWeightFilter.matches(light, [])).toBe(true)
    expect(armorWeightFilter.matches(unknown, [])).toBe(true)
  })

  it("matches an item whose armor weight is selected", () => {
    expect(armorWeightFilter.matches(light, ["1"])).toBe(true)
  })

  it("rejects an item whose armor weight is not selected", () => {
    expect(armorWeightFilter.matches(heavy, ["1"])).toBe(false)
  })

  it("fails closed when armorType is undefined", () => {
    expect(armorWeightFilter.matches(unknown, ["1"])).toBe(false)
  })

  it("deserialize round-trips an array and rejects non-arrays", () => {
    expect(armorWeightFilter.deserialize(armorWeightFilter.serialize(["1", "3"]))).toEqual([
      "1",
      "3",
    ])
    expect(armorWeightFilter.deserialize("nonsense")).toBeUndefined()
    expect(armorWeightFilter.deserialize(42)).toBeUndefined()
    expect(armorWeightFilter.deserialize([1, 2])).toBeUndefined()
  })

  describe("applyToSearch", () => {
    it("accumulates the selected armor-type ids as server terms", () => {
      const req = createSearchRequestCollector()
      armorWeightFilter.applyToSearch?.(req, ["1", "3"])
      expect(req.terms.get("armor-type")).toEqual([1, 3])
    })

    it("contributes nothing for an empty selection", () => {
      const req = createSearchRequestCollector()
      armorWeightFilter.applyToSearch?.(req, [])
      expect(req.terms.size).toBe(0)
    })
  })
})
