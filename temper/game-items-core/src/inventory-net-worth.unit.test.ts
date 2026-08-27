import { describe, expect, it } from "bun:test"
import { makeInventoryItem as makeItem } from "./inventory-item-test-utils"
import { computeNetWorth } from "./inventory-net-worth"
import type {
  CharacterCurrencies,
  CurrencyBalances,
  InventoryCurrencies,
  InventoryDatabase,
  InventoryItemData,
  InventoryLocationData,
} from "./inventory-types"

function makeLocation(
  displayName: string,
  items: readonly InventoryItemData[]
): InventoryLocationData {
  const slots: Record<number, InventoryItemData> = {}
  items.forEach((item, index) => {
    slots[index] = item
  })
  return { bags: { 1: slots }, displayName, lastScanned: 1000 }
}

function makeDatabase(
  locations: Record<string, InventoryLocationData> = {},
  currencies?: InventoryCurrencies
): InventoryDatabase {
  const base: InventoryDatabase = {
    locations,
    meta: { displayName: "Account", worldName: "NA", lastFullScan: 1000 },
  }
  return currencies === undefined ? base : { ...base, currencies }
}

function makeCurrencies(
  characterBalances: readonly CurrencyBalances[],
  bank?: CurrencyBalances
): InventoryCurrencies {
  const characters: Record<string, CharacterCurrencies> = {}
  characterBalances.forEach((balances, index) => {
    const key = String(index + 1)
    characters[key] = { displayName: `Char ${key}`, lastScanned: 1000, balances }
  })
  return bank === undefined ? { characters } : { characters, bank }
}

const RATES: Record<string, number> = {
  gold: 1,
  telvarStones: 0.1,
  alliancePoints: 0.005,
  writVouchers: 20,
}

describe("computeNetWorth — composition", () => {
  it("sums item value, gold and converted currencies into netWorth", () => {
    const db = makeDatabase(
      { "1": makeLocation("Char 1", [makeItem(4000, 2, { estimatedValue: 100 })]) },
      makeCurrencies([{ gold: 1000, telvarStones: 2000 }, { gold: 200 }], {
        gold: 500,
        alliancePoints: 10000,
      })
    )

    const result = computeNetWorth(db, RATES)

    expect(result).toEqual({
      itemValue: 200,
      goldAmount: 1700,
      currencyGoldValue: 250,
      netWorth: 2150,
      breakdown: {
        currencies: [
          {
            currency: "telvarStones",
            label: "Tel Var Stones",
            rawAmount: 2000,
            goldEquivalent: 200,
            rate: 0.1,
          },
          {
            currency: "alliancePoints",
            label: "Alliance Points",
            rawAmount: 10000,
            goldEquivalent: 50,
            rate: 0.005,
          },
        ],
      },
    })
    expect(result.netWorth).toBe(result.itemValue + result.goldAmount + result.currencyGoldValue)
  })

  it("reports zeros and an empty breakdown when the snapshot carries no currencies", () => {
    const db = makeDatabase({
      "1": makeLocation("Char 1", [makeItem(4000, 1, { estimatedValue: 100 })]),
    })

    expect(computeNetWorth(db, RATES)).toEqual({
      itemValue: 100,
      goldAmount: 0,
      currencyGoldValue: 0,
      netWorth: 100,
      breakdown: { currencies: [] },
    })
  })

  it("rounds itemValue and netWorth, and passes the gold balance through unrounded", () => {
    const db = makeDatabase(
      { "1": makeLocation("Char 1", [makeItem(4000, 3, { estimatedValue: 10.5 })]) },
      makeCurrencies([{ gold: 1.5 }])
    )

    const result = computeNetWorth(db, RATES)

    expect(result.itemValue).toBe(32)
    expect(result.goldAmount).toBe(1.5)
    expect(result.netWorth).toBe(33)
  })
})

describe("computeNetWorth — gold", () => {
  it("sums gold across every character and the bank without applying its rate", () => {
    const db = makeDatabase({}, makeCurrencies([{ gold: 800 }, { gold: 200 }], { gold: 500 }))

    const result = computeNetWorth(db, { gold: 5 })

    expect(result.goldAmount).toBe(1500)
    expect(result.currencyGoldValue).toBe(0)
    expect(result.netWorth).toBe(1500)
  })

  it("never emits a breakdown entry for gold, even when the table carries a gold rate", () => {
    const db = makeDatabase({}, makeCurrencies([{ gold: 1000 }]))

    expect(computeNetWorth(db, RATES).breakdown.currencies).toEqual([])
  })
})

describe("computeNetWorth — convertible currencies", () => {
  it("rounds each gold equivalent, half away from zero", () => {
    const db = makeDatabase({}, makeCurrencies([{ telvarStones: 2001, alliancePoints: 5 }]))

    const result = computeNetWorth(db, { telvarStones: 0.1, alliancePoints: 0.5 })

    expect(result.breakdown.currencies.map((entry) => entry.goldEquivalent)).toEqual([200, 3])
    expect(result.currencyGoldValue).toBe(203)
  })

  it("adds a currency's character and bank balances before converting the total", () => {
    const db = makeDatabase(
      {},
      makeCurrencies([{ telvarStones: 1000 }, { telvarStones: 500 }], { telvarStones: 500 })
    )

    const result = computeNetWorth(db, { telvarStones: 0.1 })

    expect(result.breakdown.currencies).toEqual([
      {
        currency: "telvarStones",
        label: "Tel Var Stones",
        rawAmount: 2000,
        goldEquivalent: 200,
        rate: 0.1,
      },
    ])
  })

  it("contributes nothing and emits no entry for a currency with no rate in the table", () => {
    const db = makeDatabase({}, makeCurrencies([{ telvarStones: 9999, eventTickets: 12 }]))

    const result = computeNetWorth(db, { gold: 1 })

    expect(result.currencyGoldValue).toBe(0)
    expect(result.breakdown.currencies).toEqual([])
    expect(result.netWorth).toBe(0)
  })

  it("ignores balances of zero or less, wherever they are held", () => {
    const db = makeDatabase(
      {},
      makeCurrencies([{ gold: 0, telvarStones: 0, alliancePoints: -50 }], {
        gold: -10,
        writVouchers: 0,
      })
    )

    expect(computeNetWorth(db, RATES)).toEqual({
      itemValue: 0,
      goldAmount: 0,
      currencyGoldValue: 0,
      netWorth: 0,
      breakdown: { currencies: [] },
    })
  })

  it("labels the known currencies and falls back to the raw key for an unknown one", () => {
    const db = makeDatabase(
      {},
      makeCurrencies([
        { telvarStones: 100, alliancePoints: 100, writVouchers: 1, undauntedKeys: 3 },
      ])
    )

    const result = computeNetWorth(db, { ...RATES, undauntedKeys: 500 })

    expect(result.breakdown.currencies.map((entry) => [entry.currency, entry.label])).toEqual([
      ["telvarStones", "Tel Var Stones"],
      ["alliancePoints", "Alliance Points"],
      ["writVouchers", "Writ Vouchers"],
      ["undauntedKeys", "undauntedKeys"],
    ])
  })

  it("orders breakdown entries by the rate table, not by size", () => {
    const db = makeDatabase({}, makeCurrencies([{ telvarStones: 5000, writVouchers: 1 }]))

    const result = computeNetWorth(db, { writVouchers: 20, telvarStones: 0.1 })

    expect(result.breakdown.currencies.map((entry) => entry.currency)).toEqual([
      "writVouchers",
      "telvarStones",
    ])
    expect(result.currencyGoldValue).toBe(520)
  })

  it("leaves account-wide balances out of every total", () => {
    const db = makeDatabase(
      {},
      {
        characters: {},
        account: { gold: 5000, telvarStones: 1000 },
      }
    )

    expect(computeNetWorth(db, RATES)).toEqual({
      itemValue: 0,
      goldAmount: 0,
      currencyGoldValue: 0,
      netWorth: 0,
      breakdown: { currencies: [] },
    })
  })
})
