import { describe, expect, it } from "bun:test"
import { ESO_BAG_BACKPACK, ESO_BAG_WORN } from "./eso-bag-constants"
import { makeInventoryItem } from "./inventory-item-test-utils"
import type { InventoryDatabase, InventoryItemData, InventoryLocationData } from "./inventory-types"
import { buildItemCentricInventory } from "./item-centric-inventory"

function makeItem(itemId: number, stackCount: number): InventoryItemData {
  return makeInventoryItem(itemId, stackCount, {
    quality: 3,
    itemLink: `|H1:item:${itemId}|h|h`,
  })
}

function makeLocation(
  displayName: string,
  bags: Record<number, readonly InventoryItemData[]>,
  lastScanned = 1000
): InventoryLocationData {
  const bagRecord: Record<number, Record<number, InventoryItemData>> = {}
  for (const [bagId, items] of Object.entries(bags)) {
    const slots: Record<number, InventoryItemData> = {}
    items.forEach((item, index) => {
      slots[index] = item
    })
    bagRecord[Number(bagId)] = slots
  }
  return { bags: bagRecord, displayName, lastScanned }
}

function makeDatabase(): InventoryDatabase {
  return {
    locations: {
      "1": makeLocation(
        "Char A",
        { [ESO_BAG_WORN]: [makeItem(4000, 1)], [ESO_BAG_BACKPACK]: [makeItem(4000, 50)] },
        900
      ),
      "2": makeLocation(
        "Char B",
        { [ESO_BAG_BACKPACK]: [makeItem(4000, 150), makeItem(9999, 7)] },
        800
      ),
      Bank: makeLocation("Bank", { [ESO_BAG_BACKPACK]: [makeItem(4000, 1000)] }, 700),
      CraftBag: makeLocation("Crafting Bag", { 5: [makeItem(4000, 500)] }, 600),
      "HouseBank:1:2": makeLocation("House Storage", { 7: [makeItem(4000, 300)] }, 500),
      "Companion:Bastian": makeLocation(
        "Bastian",
        { 6: [makeItem(4000, 1), makeItem(7777, 1)] },
        400
      ),
    },
    meta: { displayName: "Account", worldName: "NA", lastFullScan: 1000 },
  }
}

describe("buildItemCentricInventory", () => {
  it("returns an empty map for null inventory", () => {
    expect(buildItemCentricInventory(null).size).toBe(0)
  })

  it("aggregates total quantity across every location type", () => {
    const view = buildItemCentricInventory(makeDatabase())
    const entry = view.get(4000)
    expect(entry).toBeDefined()
    expect(entry?.aggregatedQty).toBe(2002)
  })

  it("retains one location entry per physical slot, for every location type", () => {
    const view = buildItemCentricInventory(makeDatabase())
    const entry = view.get(4000)
    expect(entry?.locations.length).toBe(7)
    const types = new Set(entry?.locations.map((l) => l.locationType))
    expect(types.has("character")).toBe(true)
    expect(types.has("bank")).toBe(true)
    expect(types.has("craftbag")).toBe(true)
    expect(types.has("housing-storage")).toBe(true)
    expect(types.has("companion")).toBe(true)
  })

  it("carries locKey, displayName, bagId, slotIndex, stackCount, lastScanned per location", () => {
    const view = buildItemCentricInventory(makeDatabase())
    const entry = view.get(4000)
    const bank = entry?.locations.find((l) => l.locationKey === "Bank")
    expect(bank).toMatchObject({
      locationKey: "Bank",
      locationType: "bank",
      displayName: "Bank",
      bagId: ESO_BAG_BACKPACK,
      slotIndex: 0,
      stackCount: 1000,
      lastScanned: 700,
    })
    const craft = entry?.locations.find((l) => l.locationKey === "CraftBag")
    expect(craft?.displayName).toBe("Crafting Bag")
  })

  it("flags worn when the item sits in a character's worn bag", () => {
    const view = buildItemCentricInventory(makeDatabase())
    expect(view.get(4000)?.worn).toBe(true)
    expect(view.get(9999)?.worn).toBe(false)
  })

  it("flags wornCompanion when the item sits at a companion location", () => {
    const view = buildItemCentricInventory(makeDatabase())
    expect(view.get(4000)?.wornCompanion).toBe(true)
    expect(view.get(9999)?.wornCompanion).toBe(false)
    const c = view.get(7777)
    expect(c?.wornCompanion).toBe(true)
    expect(c?.worn).toBe(false)
    expect(c?.aggregatedQty).toBe(1)
  })

  it("exposes a representative item carrying the item's identity", () => {
    const view = buildItemCentricInventory(makeDatabase())
    const entry = view.get(9999)
    expect(entry?.item.itemId).toBe(9999)
    expect(entry?.item.itemName).toBe("Item 9999")
    expect(entry?.item.itemLink).toBe("|H1:item:9999|h|h")
  })

  it("orders locations deterministically by type, then display name", () => {
    const first = buildItemCentricInventory(makeDatabase()).get(4000)?.locations
    const second = buildItemCentricInventory(makeDatabase()).get(4000)?.locations
    expect(first?.map((l) => `${l.locationKey}:${l.bagId}:${l.slotIndex}`)).toEqual(
      second?.map((l) => `${l.locationKey}:${l.bagId}:${l.slotIndex}`)
    )
    expect(first?.[0]?.locationType).toBe("character")
  })

  it("omits an itemId with no holdings from the result map", () => {
    const view = buildItemCentricInventory(makeDatabase())
    expect(view.has(12345)).toBe(false)
  })
})
