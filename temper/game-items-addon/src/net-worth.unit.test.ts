import { describe, expect, test } from "bun:test"
import { computeLiveNetWorth } from "./net-worth"
import type { InventoryDatabase, ItemData } from "./types"

function item(partial: Partial<ItemData> & { itemId: number; stackCount: number }): ItemData {
  return {
    itemName: "",
    itemLink: "",
    quality: 0,
    filterType: 0,
    itemType: 0,
    traitType: 0,
    requiredLevel: 0,
    requiredCP: 0,
    ...partial,
  }
}

function db(locations: InventoryDatabase["locations"]): InventoryDatabase {
  return {
    locations,
    meta: { displayName: "", worldName: "", lastFullScan: 0 },
  }
}

describe("computeLiveNetWorth", () => {
  test("sums estimatedValue * stackCount", () => {
    const d = db({
      char1: {
        bags: { 1: { 0: item({ itemId: 100, stackCount: 5, estimatedValue: 10 }) } },
        bagSizes: {},
        displayName: "",
        lastScanned: 0,
      },
    })
    expect(computeLiveNetWorth(d, undefined, undefined)).toBe(50)
  })

  test("uses max of estimated and merchant value", () => {
    const d = db({
      char1: {
        bags: {
          1: { 0: item({ itemId: 100, stackCount: 1, estimatedValue: 10, merchantValue: 40 }) },
        },
        bagSizes: {},
        displayName: "",
        lastScanned: 0,
      },
    })
    expect(computeLiveNetWorth(d, undefined, undefined)).toBe(40)
  })

  test("crown replacement cost wins when highest and table present", () => {
    const d = db({
      char1: {
        bags: { 1: { 0: item({ itemId: 100, stackCount: 2, merchantValue: 5 }) } },
        bagSizes: {},
        displayName: "",
        lastScanned: 0,
      },
    })
    expect(computeLiveNetWorth(d, undefined, { 100: 1000 })).toBe(2000)
  })

  test("crown table absent falls back to est/merchant", () => {
    const d = db({
      char1: {
        bags: { 1: { 0: item({ itemId: 100, stackCount: 1, merchantValue: 7 }) } },
        bagSizes: {},
        displayName: "",
        lastScanned: 0,
      },
    })
    expect(computeLiveNetWorth(d, undefined, undefined)).toBe(7)
  })

  test("items with no value contribute nothing", () => {
    const d = db({
      char1: {
        bags: { 1: { 0: item({ itemId: 100, stackCount: 99 }) } },
        bagSizes: {},
        displayName: "",
        lastScanned: 0,
      },
    })
    expect(computeLiveNetWorth(d, undefined, undefined)).toBe(0)
  })

  test("includes placed furnishing estimated values", () => {
    const d = db({
      house: {
        bags: {},
        bagSizes: {},
        displayName: "",
        lastScanned: 0,
        placedFurnishings: {
          a: { itemName: "", quality: 0, itemLink: "", collectibleLink: "", estimatedValue: 500 },
          b: { itemName: "", quality: 0, itemLink: "", collectibleLink: "" },
        },
      },
    })
    expect(computeLiveNetWorth(d, undefined, undefined)).toBe(500)
  })

  test("converts currencies with rates; gold counts directly", () => {
    const base = db({})
    const d: InventoryDatabase = {
      ...base,
      currencies: {
        characters: {
          c1: { displayName: "", lastScanned: 0, balances: { gold: 1000, telvarStones: 2000 } },
        },
        bank: { gold: 500, alliancePoints: 10000 },
      },
    }
    expect(computeLiveNetWorth(d, { telvarStones: 0.1, alliancePoints: 0.005 }, undefined)).toBe(
      1750
    )
  })

  test("without rates, only gold is counted", () => {
    const base = db({})
    const d: InventoryDatabase = {
      ...base,
      currencies: {
        characters: {
          c1: { displayName: "", lastScanned: 0, balances: { gold: 800, telvarStones: 9999 } },
        },
      },
    }
    expect(computeLiveNetWorth(d, undefined, undefined)).toBe(800)
  })

  test("empty db is zero", () => {
    expect(computeLiveNetWorth(db({}), undefined, undefined)).toBe(0)
  })
})
