import { describe, expect, it } from "bun:test"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"
import { createSearchRequestCollector } from "../filter-types"
import { qualityFilter } from "./quality-filter"

const baseFacts = { itemId: 1, itemName: "Test Item", itemLink: "|H0:item:1:|h|h" } as const

const fine: ItemFacts = { ...baseFacts, quality: 2 }
const epic: ItemFacts = { ...baseFacts, quality: 4 }
const unknown: ItemFacts = { ...baseFacts }

describe("qualityFilter", () => {
  it("matches anything when the selection is empty", () => {
    expect(qualityFilter.matches(fine, [])).toBe(true)
    expect(qualityFilter.matches(unknown, [])).toBe(true)
  })

  it("matches an item whose quality is selected", () => {
    expect(qualityFilter.matches(epic, ["4"])).toBe(true)
  })

  it("rejects an item whose quality is not selected", () => {
    expect(qualityFilter.matches(fine, ["4"])).toBe(false)
  })

  it("fails closed when quality is undefined", () => {
    expect(qualityFilter.matches(unknown, ["4"])).toBe(false)
  })

  it("deserialize round-trips an array and rejects non-arrays", () => {
    expect(qualityFilter.deserialize(qualityFilter.serialize(["3", "4"]))).toEqual(["3", "4"])
    expect(qualityFilter.deserialize("nonsense")).toBeUndefined()
    expect(qualityFilter.deserialize(42)).toBeUndefined()
    expect(qualityFilter.deserialize([1, 2])).toBeUndefined()
  })

  describe("applyToSearch", () => {
    it("accumulates the selected quality ids as server terms", () => {
      const req = createSearchRequestCollector()
      qualityFilter.applyToSearch?.(req, ["3", "4", "5"])
      expect(req.terms.get("quality")).toEqual([3, 4, 5])
    })

    it("contributes nothing for an empty selection", () => {
      const req = createSearchRequestCollector()
      qualityFilter.applyToSearch?.(req, [])
      expect(req.terms.size).toBe(0)
    })
  })
})
