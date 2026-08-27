import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { createSearchRequestCollector } from "../filter-types"
import { equipSlotFilter } from "./equip-slot-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const chest: ItemFacts = { ...baseFacts, equipType: 3 }
const head: ItemFacts = { ...baseFacts, equipType: 1 }
const unknown: ItemFacts = { ...baseFacts }

describe("equipSlotFilter", () => {
  it("matches anything when the selection is empty", () => {
    expect(equipSlotFilter.matches(chest, [])).toBe(true)
    expect(equipSlotFilter.matches(unknown, [])).toBe(true)
  })

  it("matches an item whose equip type is selected", () => {
    expect(equipSlotFilter.matches(chest, ["3"])).toBe(true)
  })

  it("rejects an item whose equip type is not selected", () => {
    expect(equipSlotFilter.matches(head, ["3"])).toBe(false)
  })

  it("fails closed when equipType is undefined", () => {
    expect(equipSlotFilter.matches(unknown, ["3"])).toBe(false)
  })

  it("deserialize round-trips an array and rejects non-arrays", () => {
    expect(equipSlotFilter.deserialize(equipSlotFilter.serialize(["3", "1"]))).toEqual(["3", "1"])
    expect(equipSlotFilter.deserialize("nonsense")).toBeUndefined()
    expect(equipSlotFilter.deserialize(42)).toBeUndefined()
    expect(equipSlotFilter.deserialize([1, 2])).toBeUndefined()
  })

  describe("applyToSearch", () => {
    it("accumulates the selected equip-type ids as server terms", () => {
      const req = createSearchRequestCollector()
      equipSlotFilter.applyToSearch?.(req, ["1", "3", "14"])
      expect(req.terms.get("equip-type")).toEqual([1, 3, 14])
    })

    it("contributes nothing for an empty selection", () => {
      const req = createSearchRequestCollector()
      equipSlotFilter.applyToSearch?.(req, [])
      expect(req.terms.size).toBe(0)
    })
  })
})
