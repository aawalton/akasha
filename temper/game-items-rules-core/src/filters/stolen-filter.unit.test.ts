import { describe, expect, it } from "bun:test"
import type { ItemCategoryNode } from "@temper/game-items-core/item-category-tree-types"
import { stolenFilter } from "./stolen-filter"

const tree: Record<string, ItemCategoryNode> = {
  equipment: {
    id: "equipment",
    name: "Equipment",
    children: [{ id: "weapons", name: "Weapons" }],
  },
  consumables: { id: "consumables", name: "Consumables" },
  companion: {
    id: "companion",
    name: "Companion",
    children: [{ id: "companion-weapons", name: "Companion Weapons" }],
  },
  currency: { id: "currency", name: "Currency" },
  treasure: { id: "treasure", name: "Treasure" },
}

describe("stolenFilter.isEligible — opt-out", () => {
  it("is INELIGIBLE on the listed ineligible roots (companion, currency)", () => {
    expect(stolenFilter.isEligible("companion", tree)).toBe(false)
    expect(stolenFilter.isEligible("currency", tree)).toBe(false)
  })

  it("is INELIGIBLE for descendants of ineligible roots", () => {
    expect(stolenFilter.isEligible("companion-weapons", tree)).toBe(false)
  })

  it("is eligible for any other root", () => {
    expect(stolenFilter.isEligible("equipment", tree)).toBe(true)
    expect(stolenFilter.isEligible("consumables", tree)).toBe(true)
    expect(stolenFilter.isEligible("treasure", tree)).toBe(true)
  })

  it("is eligible for descendants of other roots", () => {
    expect(stolenFilter.isEligible("weapons", tree)).toBe(true)
  })

  it("is eligible for unknown ids (opt-out default = true)", () => {
    expect(stolenFilter.isEligible("ghost", tree)).toBe(true)
  })
})

describe("stolenFilter.mutuallyExclusive", () => {
  it("conflicts with crafted (an item is one or the other, not both)", () => {
    expect(stolenFilter.mutuallyExclusive).toContain("crafted")
  })
})
