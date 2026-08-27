import { describe, expect, test } from "bun:test"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import type {
  ItemCentricEntry,
  ItemLocationEntry,
} from "@temper/game-items-core/item-centric-inventory"
import { buildLocationTooltipLines } from "./location-tooltip-lines"

const ITEM: InventoryItemData = {
  itemId: 123,
  itemName: "Rubedite Ingot",
  itemLink: "|H1:item:123:0|h|h",
  quality: 3,
  filterType: 0,
  itemType: 0,
  traitType: 0,
  requiredLevel: 0,
  requiredCP: 0,
  stackCount: 1,
}

function loc(over: Partial<ItemLocationEntry>): ItemLocationEntry {
  return {
    locationKey: "k",
    locationType: "bank",
    displayName: "Bank",
    bagId: 1,
    slotIndex: 0,
    stackCount: 1,
    lastScanned: 0,
    ...over,
  }
}

function entry(locations: ItemLocationEntry[]): ItemCentricEntry {
  return {
    itemId: 123,
    item: ITEM,
    aggregatedQty: 0,
    worn: false,
    wornCompanion: false,
    locations,
  }
}

function texts(entryArg: ItemCentricEntry | undefined): string[] {
  return buildLocationTooltipLines(entryArg).map((l) => l.text)
}

describe("buildLocationTooltipLines", () => {
  test("undefined entry yields no lines", () => {
    expect(buildLocationTooltipLines(undefined)).toEqual([])
  })

  test("entry with no locations yields no lines", () => {
    expect(texts(entry([]))).toEqual([])
  })

  test("single bank location renders 'name x count' with bank color, no worn marker", () => {
    expect(
      texts(entry([loc({ locationKey: "Bank", displayName: "Bank", stackCount: 5 })]))
    ).toEqual(["|c6fb7e8Bank x 5|r"])
  })

  test("character backpack slot uses character color and no worn marker", () => {
    expect(
      texts(
        entry([
          loc({
            locationKey: "char-1",
            locationType: "character",
            displayName: "Alice",
            bagId: 1,
            stackCount: 3,
          }),
        ])
      )
    ).toEqual(["|cffffffAlice x 3|r"])
  })

  test("character worn slot (bagId 0) appends the ' *' worn marker", () => {
    expect(
      texts(
        entry([
          loc({
            locationKey: "char-1",
            locationType: "character",
            displayName: "Alice",
            bagId: 0,
            stackCount: 1,
          }),
        ])
      )
    ).toEqual(["|cffffffAlice x 1 *|r"])
  })

  test("worn + backpack slots on the same character collapse to one summed, worn-marked line", () => {
    expect(
      texts(
        entry([
          loc({
            locationKey: "char-1",
            locationType: "character",
            displayName: "Alice",
            bagId: 0,
            slotIndex: 0,
            stackCount: 1,
          }),
          loc({
            locationKey: "char-1",
            locationType: "character",
            displayName: "Alice",
            bagId: 1,
            slotIndex: 4,
            stackCount: 2,
          }),
        ])
      )
    ).toEqual(["|cffffffAlice x 3 *|r"])
  })

  test("companion location is always worn-marked with companion color", () => {
    expect(
      texts(
        entry([
          loc({
            locationKey: "Companion:Bastian",
            locationType: "companion",
            displayName: "Bastian",
            bagId: 0,
            stackCount: 1,
          }),
        ])
      )
    ).toEqual(["|cc98fe8Bastian x 1 *|r"])
  })

  test("multiple location types render one colored line each, preserving input order", () => {
    expect(
      texts(
        entry([
          loc({
            locationKey: "char-1",
            locationType: "character",
            displayName: "Alice",
            bagId: 1,
            stackCount: 4,
          }),
          loc({ locationKey: "Bank", locationType: "bank", displayName: "Bank", stackCount: 10 }),
          loc({
            locationKey: "CraftBag",
            locationType: "craftbag",
            displayName: "Crafting Bag",
            stackCount: 200,
          }),
          loc({
            locationKey: "Elderborn",
            locationType: "guild",
            displayName: "Elderborn",
            stackCount: 7,
          }),
        ])
      )
    ).toEqual([
      "|cffffffAlice x 4|r",
      "|c6fb7e8Bank x 10|r",
      "|ce8a96fCrafting Bag x 200|r",
      "|ce8d96fElderborn x 7|r",
    ])
  })

  test("housing-storage and house location types carry distinct colors", () => {
    expect(
      texts(
        entry([
          loc({
            locationKey: "HouseBank:1:2",
            locationType: "housing-storage",
            displayName: "Grand Psijic Villa Chest",
            stackCount: 1,
          }),
          loc({
            locationKey: "House:3",
            locationType: "house",
            displayName: "Grand Psijic Villa",
            stackCount: 1,
          }),
        ])
      )
    ).toEqual(["|c9ad98fGrand Psijic Villa Chest x 1|r", "|c8fd9b5Grand Psijic Villa x 1|r"])
  })
})
