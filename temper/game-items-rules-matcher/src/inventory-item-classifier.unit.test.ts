import { describe, expect, it } from "bun:test"
import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import type { InventoryDatabase } from "@temper/game-items-core/inventory-types"
import { makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import { classifyAllInventoryItems } from "./inventory-item-classifier"

function emptyInventory(): InventoryDatabase {
  return {
    locations: {},
    meta: { displayName: "Account", worldName: "NA Megaserver", lastFullScan: 0 },
  }
}

describe("classifyAllInventoryItems", () => {
  it("returns empty when inventory has no locations", () => {
    expect(classifyAllInventoryItems(emptyInventory())).toEqual([])
  })

  it("emits one entry per item across all locations and bags", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: {
            1: {
              0: makeItem({ itemId: 100, itemName: "A" }),
              1: makeItem({ itemId: 101, itemName: "B" }),
            },
            0: { 0: makeItem({ itemId: 102, itemName: "C" }) },
          },
          displayName: "Azara",
          lastScanned: 0,
        },
        Bank: {
          bags: { 2: { 0: makeItem({ itemId: 200, itemName: "D" }) } },
          displayName: "Bank",
          lastScanned: 0,
        },
      },
    }

    const result = classifyAllInventoryItems(inv)

    expect(result.map((c) => c.item.itemId).sort()).toEqual([100, 101, 102, 200])
  })

  it("preserves locationKey, bagId, and item identity per emitted entry", () => {
    const item = makeItem({ itemId: 100, itemName: "Test" })
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        Bank: {
          bags: { 2: { 0: item } },
          displayName: "Bank",
          lastScanned: 0,
        },
      },
    }

    const classified = requireFirst(classifyAllInventoryItems(inv), "classifyAllInventoryItems")

    expect(classified.item).toBe(item)
    expect(classified.locationKey).toBe("Bank")
    expect(classified.bagId).toBe(2)
  })

  it("classifies an item by its filterType into the full ancestor → leaf path", () => {
    const swordCompanion = makeItem({
      itemId: 1,
      filterType: 27,
      traitType: 36,
      equipType: 5,
      weaponType: 3,
    })
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: { 1: { 0: swordCompanion } },
          displayName: "Azara",
          lastScanned: 0,
        },
      },
    }

    const classified = requireFirst(classifyAllInventoryItems(inv), "classifyAllInventoryItems")

    expect(classified.nodeIds[0]).toBe("companion")
    expect(classified.nodeIds).toContain("companion-weapons")
    expect(classified.nodeIds[classified.nodeIds.length - 1]).toBe("companion-sword")
  })

  it("falls back to ['miscellaneous','other'] for items that match no tree signal", () => {
    const unclassifiable = makeItem({
      itemId: 1,
      filterType: 999,
      itemType: 999,
      traitType: 0,
    })
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: { 1: { 0: unclassifiable } },
          displayName: "Azara",
          lastScanned: 0,
        },
      },
    }

    const classified = requireFirst(classifyAllInventoryItems(inv), "classifyAllInventoryItems")

    expect(classified.nodeIds).toEqual(["miscellaneous", "other"])
  })

  it("substitutes the special displayName for CraftBag and FurnitureVault", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        CraftBag: {
          bags: { 5: { 0: makeItem({ itemId: 1 }) } },
          displayName: "stored",
          lastScanned: 0,
        },
        FurnitureVault: {
          bags: { 6: { 0: makeItem({ itemId: 2 }) } },
          displayName: "stored",
          lastScanned: 0,
        },
        "1001": {
          bags: { 1: { 0: makeItem({ itemId: 3 }) } },
          displayName: "Azara",
          lastScanned: 0,
        },
      },
    }

    const byLoc = new Map(
      classifyAllInventoryItems(inv).map((c) => [c.locationKey, c.locationDisplayName])
    )
    expect(byLoc.get("CraftBag")).toBe("Crafting Bag")
    expect(byLoc.get("FurnitureVault")).toBe("Furniture Vault")
    expect(byLoc.get("1001")).toBe("Azara")
  })

  it("coerces numeric bagId keys from the JSON-stringified bag map", () => {
    const inv: InventoryDatabase = {
      ...emptyInventory(),
      locations: {
        "1001": {
          bags: { 1: { 0: makeItem({ itemId: 100 }) } },
          displayName: "Azara",
          lastScanned: 0,
        },
      },
    }

    const classified = requireFirst(classifyAllInventoryItems(inv), "classifyAllInventoryItems")
    expect(typeof classified.bagId).toBe("number")
    expect(classified.bagId).toBe(1)
  })
})
