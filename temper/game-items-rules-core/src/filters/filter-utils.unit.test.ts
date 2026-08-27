import { describe, expect, it } from "bun:test"
import type { ItemCategoryNode } from "@temper/game-items-core/item-category-tree-types"
import { checkAncestorRoots } from "./filter-utils"

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
      {
        id: "armor",
        name: "Armor",
        children: [{ id: "light", name: "Light" }],
      },
    ],
  },
  consumables: {
    id: "consumables",
    name: "Consumables",
    children: [{ id: "potions", name: "Potions" }],
  },
  currency: { id: "currency", name: "Currency" },
}

describe("checkAncestorRoots — opt-in", () => {
  const roots = new Set(["equipment"])

  it("returns true when the node IS one of the roots", () => {
    expect(checkAncestorRoots("equipment", roots, "opt-in", tree)).toBe(true)
  })

  it("returns true when an ancestor of the node is in roots", () => {
    expect(checkAncestorRoots("one-handed", roots, "opt-in", tree)).toBe(true)
  })

  it("returns true for a direct child of a root", () => {
    expect(checkAncestorRoots("weapons", roots, "opt-in", tree)).toBe(true)
  })

  it("returns false when neither the node nor any ancestor is in roots", () => {
    expect(checkAncestorRoots("potions", roots, "opt-in", tree)).toBe(false)
  })

  it("returns false for a top-level node outside the roots", () => {
    expect(checkAncestorRoots("currency", roots, "opt-in", tree)).toBe(false)
  })

  it("returns false (the opt-in default) for a node not present in the tree", () => {
    expect(checkAncestorRoots("ghost-id", roots, "opt-in", tree)).toBe(false)
  })
})

describe("checkAncestorRoots — opt-out (mode inverts the answer)", () => {
  const roots = new Set(["equipment"])

  it("returns false when the node IS one of the roots", () => {
    expect(checkAncestorRoots("equipment", roots, "opt-out", tree)).toBe(false)
  })

  it("returns false for descendants of a root", () => {
    expect(checkAncestorRoots("one-handed", roots, "opt-out", tree)).toBe(false)
  })

  it("returns true for nodes outside the roots", () => {
    expect(checkAncestorRoots("potions", roots, "opt-out", tree)).toBe(true)
  })

  it("returns true (the opt-out default) for a node not present in the tree", () => {
    expect(checkAncestorRoots("ghost-id", roots, "opt-out", tree)).toBe(true)
  })
})

describe("checkAncestorRoots — multi-root", () => {
  const roots = new Set(["weapons", "consumables"])

  it("matches a node in either root family (opt-in)", () => {
    expect(checkAncestorRoots("one-handed", roots, "opt-in", tree)).toBe(true)
    expect(checkAncestorRoots("potions", roots, "opt-in", tree)).toBe(true)
  })

  it("rejects nodes in neither root family (opt-in)", () => {
    expect(checkAncestorRoots("light", roots, "opt-in", tree)).toBe(false)
    expect(checkAncestorRoots("currency", roots, "opt-in", tree)).toBe(false)
  })
})

describe("checkAncestorRoots — empty roots", () => {
  it("opt-in always returns false when roots is empty", () => {
    const empty = new Set<string>()
    expect(checkAncestorRoots("equipment", empty, "opt-in", tree)).toBe(false)
    expect(checkAncestorRoots("one-handed", empty, "opt-in", tree)).toBe(false)
  })

  it("opt-out always returns true when roots is empty", () => {
    const empty = new Set<string>()
    expect(checkAncestorRoots("equipment", empty, "opt-out", tree)).toBe(true)
    expect(checkAncestorRoots("one-handed", empty, "opt-out", tree)).toBe(true)
  })
})
