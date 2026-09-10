import { beforeAll, describe, expect, test } from "bun:test"
import type {
  InventoryDatabase,
  InventoryItemData,
} from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import {
  allBagItems,
  type ExplainCapabilities,
  explainCapabilities,
  resolveItemFromInventory,
} from "./inventory-explain-capabilities.module.code.ts"

function itemAt(itemId: number, itemName: string): InventoryItemData {
  return {
    itemId,
    itemName,
    itemLink: "",
    quality: 1,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount: 1,
  }
}

const DB: InventoryDatabase = {
  locations: {
    "1000": {
      displayName: "1000",
      lastScanned: 100,
      bags: {
        0: { 1: itemAt(45336, "worn ore") },
        1: { 2: itemAt(45337, "packed ore") },
      },
    },
    "2000": {
      displayName: "2000",
      lastScanned: 900,
      bags: {
        1: { 3: itemAt(45336, "newer ore") },
      },
    },
    Bank: {
      displayName: "Bank",
      lastScanned: 50,
      bags: {
        1: { 4: itemAt(45338, "banked ore") },
      },
    },
  },
  meta: { displayName: "tester", worldName: "NA Megaserver", lastFullScan: 900 },
}

let caps: ExplainCapabilities

beforeAll(async () => {
  caps = await explainCapabilities()
})

describe("explainCapabilities", () => {
  test("hands over every part an explanation needs together", async () => {
    expect(Object.keys(await explainCapabilities()).sort()).toEqual([
      "buildCliEvalEnv",
      "classifyItemToNodeIds",
      "cliItemFactsFromInventoryItem",
      "computeStockGroups",
      "loadTemperCharactersFromPath",
      "loadTemperInventoryConfigFromPath",
      "locationConditionFromKeyAndBag",
      "parseInventoryContent",
      "parseItemLink",
      "walkRules",
    ])
  })
})

describe("resolveItemFromInventory", () => {
  test("without a character it takes the most recently scanned place", () => {
    const found = resolveItemFromInventory(caps, DB, 45336)
    expect(found?.item.itemName).toBe("newer ore")
    expect(found?.location).toBe("backpack")
  })

  test("with a character it takes that character alone", () => {
    const found = resolveItemFromInventory(caps, DB, 45336, "1000")
    expect(found?.item.itemName).toBe("worn ore")
    expect(found?.location).toBe("worn")
  })

  test("a character holding nothing asked for answers nothing", () => {
    expect(resolveItemFromInventory(caps, DB, 45338, "1000")).toBeUndefined()
  })

  test("a character nobody knows answers nothing", () => {
    expect(resolveItemFromInventory(caps, DB, 45336, "9999")).toBeUndefined()
  })

  test("an item nobody holds answers nothing", () => {
    expect(resolveItemFromInventory(caps, DB, 1, undefined)).toBeUndefined()
  })
})

describe("allBagItems", () => {
  test("reaches every item in every bag of every place", () => {
    expect(
      allBagItems(caps, DB)
        .map((one) => one.item.itemName)
        .sort()
    ).toEqual(["banked ore", "newer ore", "packed ore", "worn ore"])
  })

  test("carries the place each item is held in", () => {
    const held = new Map(allBagItems(caps, DB).map((one) => [one.item.itemName, one.location]))
    expect(held.get("worn ore")).toBe("worn")
    expect(held.get("packed ore")).toBe("backpack")
    expect(held.get("banked ore")).toBe("bank")
  })
})
