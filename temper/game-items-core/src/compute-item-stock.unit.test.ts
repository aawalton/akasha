import { describe, expect, it } from "bun:test"
import { computeItemStock } from "./compute-item-stock"
import { makeInventoryItem as makeItem } from "./inventory-item-test-utils"
import type { InventoryDatabase, InventoryItemData, InventoryLocationData } from "./inventory-types"

function makeLocation(
  displayName: string,
  items: readonly InventoryItemData[]
): InventoryLocationData {
  const slots: Record<number, InventoryItemData> = {}
  items.forEach((item, index) => {
    slots[index] = item
  })
  return { bags: { 1: slots }, displayName, lastScanned: Date.now() }
}

function makeDatabase(): InventoryDatabase {
  return {
    locations: {
      "1": makeLocation("Char A", [makeItem(4000, 50)]),
      "2": makeLocation("Char B", [makeItem(4000, 150), makeItem(9999, 7)]),
      Bank: makeLocation("Bank", [makeItem(4000, 1000)]),
      CraftBag: makeLocation("Crafting Bag", [makeItem(4000, 500)]),
      "HouseBank:1:2": makeLocation("House Storage", [makeItem(4000, 300)]),
    },
    meta: { displayName: "Account", worldName: "NA", lastFullScan: Date.now() },
  }
}

describe("computeItemStock", () => {
  it("aggregates a tracked itemId across character backpacks and account storage", () => {
    const result = computeItemStock(makeDatabase(), new Set([4000]))

    const breakdown = result.get(4000)
    expect(breakdown).toBeDefined()
    expect(breakdown?.byChar.get("1")).toBe(50)
    expect(breakdown?.byChar.get("2")).toBe(150)
    expect(breakdown?.byChar.size).toBe(2)
    expect(breakdown?.accountStorage).toBe(1800)
    expect(breakdown?.total).toBe(2000)
  })

  it("returns an empty map for null inventory", () => {
    expect(computeItemStock(null, new Set([4000])).size).toBe(0)
  })

  it("omits an itemId with no holdings from the result map", () => {
    const result = computeItemStock(makeDatabase(), new Set([4000, 12345]))
    expect(result.has(12345)).toBe(false)
  })
})
