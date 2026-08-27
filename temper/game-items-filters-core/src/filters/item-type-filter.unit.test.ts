import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { createSearchRequestCollector } from "../filter-types"
import { itemTypeFilter } from "./item-type-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const weapon: ItemFacts = { ...baseFacts, itemType: 1 }
const armor: ItemFacts = { ...baseFacts, itemType: 2 }
const unknown: ItemFacts = { ...baseFacts }

describe("itemTypeFilter", () => {
  it("matches anything when the selection is empty", () => {
    expect(itemTypeFilter.matches(weapon, [])).toBe(true)
    expect(itemTypeFilter.matches(unknown, [])).toBe(true)
  })

  it("matches an item whose item type is selected", () => {
    expect(itemTypeFilter.matches(weapon, ["1"])).toBe(true)
  })

  it("rejects an item whose item type is not selected", () => {
    expect(itemTypeFilter.matches(armor, ["1"])).toBe(false)
  })

  it("fails closed when itemType is undefined", () => {
    expect(itemTypeFilter.matches(unknown, ["1"])).toBe(false)
  })

  it("deserialize round-trips an array and rejects non-arrays", () => {
    expect(itemTypeFilter.deserialize(itemTypeFilter.serialize(["1", "2"]))).toEqual(["1", "2"])
    expect(itemTypeFilter.deserialize("nonsense")).toBeUndefined()
    expect(itemTypeFilter.deserialize(42)).toBeUndefined()
    expect(itemTypeFilter.deserialize([1, 2])).toBeUndefined()
  })

  describe("applyToSearch", () => {
    it("accumulates the selected item-type ids as server terms", () => {
      const req = createSearchRequestCollector()
      itemTypeFilter.applyToSearch?.(req, ["1", "2", "29"])
      expect(req.terms.get("item-type")).toEqual([1, 2, 29])
    })

    it("contributes nothing for an empty selection", () => {
      const req = createSearchRequestCollector()
      itemTypeFilter.applyToSearch?.(req, [])
      expect(req.terms.size).toBe(0)
    })
  })
})
