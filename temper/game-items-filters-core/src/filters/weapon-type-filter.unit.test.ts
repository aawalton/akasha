import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { createSearchRequestCollector } from "../filter-types"
import { weaponTypeFilter } from "./weapon-type-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const sword: ItemFacts = { ...baseFacts, weaponType: 3 }
const bow: ItemFacts = { ...baseFacts, weaponType: 8 }
const unknown: ItemFacts = { ...baseFacts }

describe("weaponTypeFilter", () => {
  it("matches anything when the selection is empty", () => {
    expect(weaponTypeFilter.matches(sword, [])).toBe(true)
    expect(weaponTypeFilter.matches(unknown, [])).toBe(true)
  })

  it("matches an item whose weapon type is selected", () => {
    expect(weaponTypeFilter.matches(sword, ["3"])).toBe(true)
  })

  it("rejects an item whose weapon type is not selected", () => {
    expect(weaponTypeFilter.matches(bow, ["3"])).toBe(false)
  })

  it("fails closed when weaponType is undefined", () => {
    expect(weaponTypeFilter.matches(unknown, ["3"])).toBe(false)
  })

  it("deserialize round-trips an array and rejects non-arrays", () => {
    expect(weaponTypeFilter.deserialize(weaponTypeFilter.serialize(["3", "8"]))).toEqual(["3", "8"])
    expect(weaponTypeFilter.deserialize("nonsense")).toBeUndefined()
    expect(weaponTypeFilter.deserialize(42)).toBeUndefined()
    expect(weaponTypeFilter.deserialize([1, 2])).toBeUndefined()
  })

  describe("applyToSearch", () => {
    it("accumulates the selected weapon-type ids as server terms", () => {
      const req = createSearchRequestCollector()
      weaponTypeFilter.applyToSearch?.(req, ["3", "8", "12"])
      expect(req.terms.get("weapon-type")).toEqual([3, 8, 12])
    })

    it("contributes nothing for an empty selection", () => {
      const req = createSearchRequestCollector()
      weaponTypeFilter.applyToSearch?.(req, [])
      expect(req.terms.size).toBe(0)
    })
  })
})
