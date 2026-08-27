import "./test-eso-load-globals"

import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { requireMatchPositional } from "../../../shared/utils-narrow/src/require-match-positional"
import { z } from "zod"

import type { CompiledRuleConfig } from "./generated/rule-types.generated"
import { dispatchBuyRules } from "./rules-dispatch-buy"
import { setSavedVarsInstance } from "./saved-variables-ref"
import { SAVED_VARIABLES_DEFAULTS } from "./types"

const BUY_ITEM_ID = 4000
const BUY_TARGET = 4000
const CURRENT_CHAR_ID = "1"
const LIVE_CURRENT_BACKPACK = 200
const BANK_HOLDING = 1784
const UNIT_PRICE = 10
const PLAYER_MONEY = 1_000_000

function backpackSnapshot(): Record<string, number> {
  const byChar: Record<string, number> = { "11": 212 }
  for (let charId = 1; charId <= 10; charId++) byChar[String(charId)] = 200
  return byChar
}

interface Purchase {
  entryIndex: number
  quantity: number
}

interface StoreEntry {
  itemId: number
  price: number
  maxBuyable: number
  meetsRequirements: boolean
}

let purchases: Purchase[] = []
let messages: string[] = []
let storeEntries: StoreEntry[] = []
let backpack: { itemId: number; stack: number }[] = []

function linkFor(itemId: number): string {
  return `|H0:item:${itemId}|h|h`
}

const STUBBED_KEYS = [
  "BAG_BACKPACK",
  "LINK_STYLE_BRACKETS",
  "CURT_MONEY",
  "CURRENCY_LOCATION_CHARACTER",
  "GetCurrentCharacterId",
  "GetBagSize",
  "GetSlotStackSize",
  "GetItemLink",
  "GetItemLinkItemId",
  "IsItemStolen",
  "GetCurrencyAmount",
  "GetNumStoreItems",
  "GetStoreItemLink",
  "GetStoreEntryInfo",
  "GetStoreEntryMaxBuyable",
  "BuyStoreItem",
  "TemperInventoryConfig",
  "d",
] as const

const originals = new Map<string, unknown>()

function installStubs(): undefined {
  for (const key of STUBBED_KEYS) originals.set(key, Reflect.get(globalThis, key))

  const set = (key: string, value: unknown): undefined => {
    Reflect.set(globalThis, key, value)
  }

  set("BAG_BACKPACK", 1)
  set("LINK_STYLE_BRACKETS", 1)
  set("CURT_MONEY", 1)
  set("CURRENCY_LOCATION_CHARACTER", 1)

  set("GetCurrentCharacterId", (): string => CURRENT_CHAR_ID)
  set("GetBagSize", (): number => backpack.length)
  set("GetSlotStackSize", (_bag: number, slot: number): [number, number] => {
    const item = backpack[slot]
    return item === undefined ? [0, 200] : [item.stack, 200]
  })
  set("GetItemLink", (_bag: number, slot: number): string => {
    const item = backpack[slot]
    return item === undefined ? "" : linkFor(item.itemId)
  })
  set("GetItemLinkItemId", (link: string): number => {
    if (!/item:\d+/.test(link)) return 0
    const [itemId] = requireMatchPositional(/item:(\d+)/, z.tuple([z.coerce.number().int()]), link)
    return itemId
  })
  set("IsItemStolen", (): boolean => false)
  set("GetCurrencyAmount", (): number => PLAYER_MONEY)

  set("GetNumStoreItems", (): number => storeEntries.length)
  set("GetStoreItemLink", (index: number): string => {
    const entry = storeEntries[index - 1]
    return entry === undefined ? "" : linkFor(entry.itemId)
  })
  set("GetStoreEntryInfo", (index: number): [string, string, number, number, number, boolean] => {
    const entry = storeEntries[index - 1]
    if (entry === undefined) return ["", "", 0, 0, 0, false]
    return ["Fabricated Ware", "", 1, entry.price, 1, entry.meetsRequirements]
  })
  set(
    "GetStoreEntryMaxBuyable",
    (index: number): number => storeEntries[index - 1]?.maxBuyable ?? 0
  )
  set("BuyStoreItem", (entryIndex: number, quantity: number): undefined => {
    purchases.push({ entryIndex, quantity })
  })

  set("d", (message: unknown): undefined => {
    messages.push(String(message))
  })
}

function restoreStubs(): undefined {
  for (const [key, value] of originals) Reflect.set(globalThis, key, value)
  originals.clear()
}

interface BuyStockShape {
  buyStockAvailable?: boolean
  buyStockByChar?: Record<number, Record<string, number>>
  buyStockAccount?: Record<number, number>
}

function compiledWithBuyStock(stock: BuyStockShape): CompiledRuleConfig {
  return {
    version: 3,
    orderedRules: [],
    itemRules: {},
    wantedEquipment: [],
    wantedCompanionEquipment: [],
    wantedConsumables: {},
    consumableStock: {},
    characterPriority: [],
    currencyRules: {},
    buyRules: { [BUY_ITEM_ID]: { targetQuantity: BUY_TARGET, source: "merchant" } },
    ...stock,
  }
}

function stubConfig(stock: BuyStockShape): undefined {
  setSavedVarsInstance(SAVED_VARIABLES_DEFAULTS)
  Reflect.set(globalThis, "TemperInventoryConfig", {
    version: 1,
    sellCompiled: compiledWithBuyStock(stock),
    logging: { actionReports: "minimal" },
    safety: { confirmActions: [] },
    automation: {},
    backpack: { bufferSlots: 0 },
  })
}

const FULL_STOCK: BuyStockShape = {
  buyStockAvailable: true,
  buyStockByChar: { [BUY_ITEM_ID]: backpackSnapshot() },
  buyStockAccount: { [BUY_ITEM_ID]: BANK_HOLDING },
}

beforeEach(() => {
  purchases = []
  messages = []
  backpack = [{ itemId: BUY_ITEM_ID, stack: LIVE_CURRENT_BACKPACK }]
  storeEntries = [
    { itemId: BUY_ITEM_ID, price: UNIT_PRICE, maxBuyable: 5000, meetsRequirements: true },
  ]
  installStubs()
})

afterEach(() => {
  restoreStubs()
})

describe("dispatchBuyRules — an unavailable stock figure declines", () => {
  it("buys nothing when buyStockAvailable is absent", () => {
    stubConfig({})
    dispatchBuyRules()
    expect(purchases).toEqual([])
  })

  it("buys nothing when buyStockAvailable is explicitly false", () => {
    stubConfig({ buyStockAvailable: false })
    dispatchBuyRules()
    expect(purchases).toEqual([])
  })

  it("buys nothing even though the live backpack is 3800 short of the target", () => {
    stubConfig({ buyStockAvailable: false, buyStockByChar: {}, buyStockAccount: {} })
    dispatchBuyRules()
    expect(BUY_TARGET - LIVE_CURRENT_BACKPACK).toBe(3800)
    expect(purchases).toEqual([])
  })

  it("tells the player why, naming the read failure rather than failing silently", () => {
    stubConfig({})
    dispatchBuyRules()
    expect(messages.length).toBeGreaterThan(0)
    expect(messages.join("\n")).toContain("could not read your inventory")
  })

  it("does not read the store at all — it declines before touching the merchant", () => {
    let storeReads = 0
    Reflect.set(globalThis, "GetNumStoreItems", (): number => {
      storeReads++
      return storeEntries.length
    })
    stubConfig({})
    dispatchBuyRules()
    expect(storeReads).toBe(0)
  })
})

describe("dispatchBuyRules — an available stock figure still buys", () => {
  it("buys exactly the shortfall the hybrid global total implies", () => {
    stubConfig(FULL_STOCK)
    dispatchBuyRules()
    expect(purchases).toEqual([{ entryIndex: 1, quantity: 4 }])
  })

  it("reports the purchase to the player", () => {
    stubConfig(FULL_STOCK)
    dispatchBuyRules()
    expect(messages.join("\n")).toContain("Bought")
  })

  it("buys nothing when the snapshot already covers the target", () => {
    stubConfig({
      buyStockAvailable: true,
      buyStockByChar: { [BUY_ITEM_ID]: backpackSnapshot() },
      buyStockAccount: { [BUY_ITEM_ID]: 9000 },
    })
    dispatchBuyRules()
    expect(purchases).toEqual([])
  })

  it("skips a store entry the player does not meet the requirements for", () => {
    storeEntries = [
      { itemId: BUY_ITEM_ID, price: UNIT_PRICE, maxBuyable: 5000, meetsRequirements: false },
    ]
    stubConfig(FULL_STOCK)
    dispatchBuyRules()
    expect(purchases).toEqual([])
  })
})

describe("dispatchBuyRules — availability is the only thing between empty and 3800", () => {
  it("buys 3800 from the same empty records once availability says true", () => {
    stubConfig({ buyStockAvailable: true, buyStockByChar: {}, buyStockAccount: {} })
    dispatchBuyRules()
    expect(purchases).toEqual([{ entryIndex: 1, quantity: 3800 }])
  })

  it("buys 0 from those identical records when availability is false", () => {
    stubConfig({ buyStockAvailable: false, buyStockByChar: {}, buyStockAccount: {} })
    dispatchBuyRules()
    expect(purchases).toEqual([])
  })
})
