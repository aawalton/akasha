import { describe, expect, it } from "bun:test"
import { makeInventoryItem as makeItem } from "./inventory-item-test-utils"
import type {
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
  PlacedFurnishingData,
} from "./inventory-types"
import { computeInventoryTotalValue } from "./inventory-value"

function makeBag(items: readonly InventoryItemData[]): Record<number, InventoryItemData> {
  const slots: Record<number, InventoryItemData> = {}
  items.forEach((item, index) => {
    slots[index] = item
  })
  return slots
}

function makeLocation(
  displayName: string,
  items: readonly InventoryItemData[]
): InventoryLocationData {
  return { bags: { 1: makeBag(items) }, displayName, lastScanned: 1000 }
}

function makeDatabase(locations: Record<string, InventoryLocationData>): InventoryDatabase {
  return {
    locations,
    meta: { displayName: "Account", worldName: "NA", lastFullScan: 1000 },
  }
}

function makeFurnishing(itemName: string, estimatedValue?: number): PlacedFurnishingData {
  const base: PlacedFurnishingData = {
    itemName,
    quality: 2,
    itemLink: "|H1:item:1:1|h|h",
    collectibleLink: "",
  }
  return estimatedValue === undefined ? base : { ...base, estimatedValue }
}

describe("computeInventoryTotalValue — per-item value", () => {
  it("multiplies each item's value by its stack count", () => {
    const db = makeDatabase({
      "1": makeLocation("Char A", [makeItem(4000, 5, { estimatedValue: 10 })]),
    })

    expect(computeInventoryTotalValue(db)).toBe(50)
  })

  it("takes the max of estimatedValue, merchantValue and replacementCost", () => {
    const merchantWins = makeDatabase({
      "1": makeLocation("Char A", [makeItem(4000, 1, { estimatedValue: 10, merchantValue: 40 })]),
    })
    const replacementWins = makeDatabase({
      "1": makeLocation("Char A", [
        makeItem(4000, 1, { estimatedValue: 10, merchantValue: 40, replacementCost: 900 }),
      ]),
    })
    const estimatedWins = makeDatabase({
      "1": makeLocation("Char A", [
        makeItem(4000, 1, { estimatedValue: 1200, merchantValue: 40, replacementCost: 900 }),
      ]),
    })

    expect(computeInventoryTotalValue(merchantWins)).toBe(40)
    expect(computeInventoryTotalValue(replacementWins)).toBe(900)
    expect(computeInventoryTotalValue(estimatedWins)).toBe(1200)
  })

  it("values an item carrying only replacementCost at that cost, per unit of stack", () => {
    const db = makeDatabase({
      Bank: makeLocation("Bank", [makeItem(4000, 2, { replacementCost: 250 })]),
    })

    expect(computeInventoryTotalValue(db)).toBe(500)
  })

  it("floors a negative field at zero instead of letting it drag the max down", () => {
    const db = makeDatabase({
      "1": makeLocation("Char A", [makeItem(4000, 3, { estimatedValue: -100, merchantValue: 5 })]),
    })

    expect(computeInventoryTotalValue(db)).toBe(15)
  })

  it("contributes nothing for an item with no value fields at all", () => {
    const db = makeDatabase({ "1": makeLocation("Char A", [makeItem(4000, 99)]) })

    expect(computeInventoryTotalValue(db)).toBe(0)
  })

  it("contributes nothing for an item whose value is zero or negative", () => {
    const zero = makeDatabase({
      "1": makeLocation("Char A", [makeItem(4000, 200, { estimatedValue: 0, merchantValue: 0 })]),
    })
    const negative = makeDatabase({
      "1": makeLocation("Char A", [makeItem(4000, 200, { merchantValue: -5 })]),
    })

    expect(computeInventoryTotalValue(zero)).toBe(0)
    expect(computeInventoryTotalValue(negative)).toBe(0)
  })
})

describe("computeInventoryTotalValue — placed furnishings", () => {
  it("adds each placed furnishing's estimatedValue exactly once, with no stack multiplier", () => {
    const db = makeDatabase({
      "House:1": {
        bags: {},
        displayName: "Grand Topal Hideaway",
        lastScanned: 1000,
        placedFurnishings: {
          "furn-1": makeFurnishing("Alinor Chair", 500),
          "furn-2": makeFurnishing("Alinor Table", 250),
        },
      },
    })

    expect(computeInventoryTotalValue(db)).toBe(750)
  })

  it("skips a furnishing whose estimatedValue is absent, zero or negative", () => {
    const db = makeDatabase({
      "House:1": {
        bags: {},
        displayName: "Grand Topal Hideaway",
        lastScanned: 1000,
        placedFurnishings: {
          collectible: makeFurnishing("Sturdy Wooden Stool"),
          unpriced: makeFurnishing("Rough Crate", 0),
          nonsense: makeFurnishing("Broken Barrel", -10),
          priced: makeFurnishing("Redguard Fountain", 400),
        },
      },
    })

    expect(computeInventoryTotalValue(db)).toBe(400)
  })

  it("adds furnishings on top of the bag items in the same location", () => {
    const db = makeDatabase({
      "House:1": {
        bags: { 1: makeBag([makeItem(4000, 2, { estimatedValue: 30 })]) },
        displayName: "Grand Topal Hideaway",
        lastScanned: 1000,
        placedFurnishings: { "furn-1": makeFurnishing("Alinor Chair", 500) },
      },
    })

    expect(computeInventoryTotalValue(db)).toBe(560)
  })
})

describe("computeInventoryTotalValue — accumulation", () => {
  it("returns 0 for an inventory with no locations", () => {
    expect(computeInventoryTotalValue(makeDatabase({}))).toBe(0)
  })

  it("returns 0 for a location holding no bags and no furnishings", () => {
    const db = makeDatabase({ "1": { bags: {}, displayName: "Char A", lastScanned: 1000 } })

    expect(computeInventoryTotalValue(db)).toBe(0)
  })

  it("accumulates across every bag of a location", () => {
    const db = makeDatabase({
      "1": {
        bags: {
          1: makeBag([makeItem(4000, 2, { estimatedValue: 10 })]),
          4: makeBag([makeItem(4001, 1, { estimatedValue: 300 })]),
          20: makeBag([makeItem(4002, 5, { merchantValue: 4 })]),
        },
        displayName: "Char A",
        lastScanned: 1000,
      },
    })

    expect(computeInventoryTotalValue(db)).toBe(340)
  })

  it("accumulates across every location", () => {
    const db = makeDatabase({
      "1": makeLocation("Char A", [makeItem(4000, 1, { estimatedValue: 100 })]),
      "2": makeLocation("Char B", [makeItem(4001, 2, { estimatedValue: 50 })]),
      Bank: makeLocation("Bank", [makeItem(4002, 1, { estimatedValue: 700 })]),
      CraftBag: makeLocation("Crafting Bag", [makeItem(4003, 100, { estimatedValue: 3 })]),
      "HouseBank:1:2": makeLocation("House Storage", [makeItem(4004, 1, { merchantValue: 25 })]),
    })

    expect(computeInventoryTotalValue(db)).toBe(1225)
  })

  it("counts a guild-bank location too — this walk is deliberately unscoped", () => {
    const withGuild = makeDatabase({
      "1": makeLocation("Char A", [makeItem(4000, 1, { estimatedValue: 100 })]),
      "Walton Mountain": makeLocation("Walton Mountain", [
        makeItem(4001, 1, { estimatedValue: 4000 }),
      ]),
    })

    expect(computeInventoryTotalValue(withGuild)).toBe(4100)
  })
})
