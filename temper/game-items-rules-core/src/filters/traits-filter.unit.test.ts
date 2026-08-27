import { describe, expect, it } from "bun:test"
import type { ItemCategoryNode } from "@temper/game-items-core/item-category-tree-types"
import { getTraitFamily, traitsFilter } from "./traits-filter"

const tree: Record<string, ItemCategoryNode> = {
  equipment: {
    id: "equipment",
    name: "Equipment",
    children: [
      {
        id: "weapons",
        name: "Weapons",
        children: [{ id: "one-handed", name: "One-Handed" }],
      },
      { id: "armor", name: "Armor", children: [{ id: "light", name: "Light" }] },
      { id: "jewelry", name: "Jewelry" },
    ],
  },
  companion: {
    id: "companion",
    name: "Companion",
    children: [
      { id: "companion-weapons", name: "Companion Weapons" },
      { id: "companion-armor", name: "Companion Armor" },
      { id: "companion-jewelry", name: "Companion Jewelry" },
    ],
  },
  consumables: { id: "consumables", name: "Consumables" },
}

describe("getTraitFamily", () => {
  it("returns the family for a direct trait root", () => {
    expect(getTraitFamily("weapons", tree)).toBe("weapon")
    expect(getTraitFamily("armor", tree)).toBe("armor")
    expect(getTraitFamily("jewelry", tree)).toBe("jewelry")
  })

  it("returns 'companion' for any of the three companion roots", () => {
    expect(getTraitFamily("companion-weapons", tree)).toBe("companion")
    expect(getTraitFamily("companion-armor", tree)).toBe("companion")
    expect(getTraitFamily("companion-jewelry", tree)).toBe("companion")
  })

  it("walks ancestors to find a trait root", () => {
    expect(getTraitFamily("one-handed", tree)).toBe("weapon")
    expect(getTraitFamily("light", tree)).toBe("armor")
  })

  it("returns null for nodes outside any trait family", () => {
    expect(getTraitFamily("equipment", tree)).toBeNull()
    expect(getTraitFamily("consumables", tree)).toBeNull()
    expect(getTraitFamily("companion", tree)).toBeNull()
  })

  it("returns null for an unknown node id", () => {
    expect(getTraitFamily("does-not-exist", tree)).toBeNull()
  })
})

describe("traitsFilter.isEligible", () => {
  it("is eligible iff the category has a trait family", () => {
    expect(traitsFilter.isEligible("weapons", tree)).toBe(true)
    expect(traitsFilter.isEligible("one-handed", tree)).toBe(true)
    expect(traitsFilter.isEligible("companion-weapons", tree)).toBe(true)
    expect(traitsFilter.isEligible("consumables", tree)).toBe(false)
    expect(traitsFilter.isEligible("equipment", tree)).toBe(false)
  })
})

describe("traitsFilter.transferToCategory", () => {
  it("keeps traits when moving within the same family (weapon → weapon)", () => {
    const result = traitsFilter.transferToCategory(
      { traits: ["sharpened", "infused"] },
      "weapons",
      "one-handed",
      tree
    )
    expect(result).toEqual({ traits: ["sharpened", "infused"] })
  })

  it("strips traits when moving across families (weapon → armor)", () => {
    const result = traitsFilter.transferToCategory(
      { traits: ["sharpened"] },
      "weapons",
      "armor",
      tree
    )
    expect(result).toEqual({})
  })

  it("strips traits when destination has no trait family", () => {
    const result = traitsFilter.transferToCategory(
      { traits: ["sharpened"] },
      "weapons",
      "consumables",
      tree
    )
    expect(result).toEqual({})
  })

  it("strips traits when companion → character (different family)", () => {
    const result = traitsFilter.transferToCategory(
      { traits: ["aggressive"] },
      "companion-weapons",
      "weapons",
      tree
    )
    expect(result).toEqual({})
  })

  it("returns empty when there are no traits to carry forward", () => {
    expect(traitsFilter.transferToCategory({}, "weapons", "armor", tree)).toEqual({})
  })

  it("treats an empty traits array as no traits", () => {
    expect(traitsFilter.transferToCategory({ traits: [] }, "weapons", "armor", tree)).toEqual({})
  })
})

describe("traitsFilter.applyDefault", () => {
  it("returns an empty patch (no preselected trait)", () => {
    expect(traitsFilter.applyDefault()).toEqual({})
  })
})

describe("traitsFilter.fingerprint", () => {
  it("normalizes order so equivalent selections fingerprint identically", () => {
    const a = traitsFilter.fingerprint({ traits: ["infused", "divines"] })
    const b = traitsFilter.fingerprint({ traits: ["divines", "infused"] })
    expect(a).toBe(b)
  })

  it("returns undefined when no traits are selected", () => {
    expect(traitsFilter.fingerprint({})).toBeUndefined()
    expect(traitsFilter.fingerprint({ traits: [] })).toBeUndefined()
  })
})
