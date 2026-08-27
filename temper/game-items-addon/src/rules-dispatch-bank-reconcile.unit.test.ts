import "./test-eso-load-globals"

import { afterEach, beforeEach, describe, expect, test } from "bun:test"

import type { CompiledRuleConfig, ResolvedEntry } from "./generated/rule-types.generated"
import { clearAllPendingActions, setPendingAction } from "./rules-core"
import { freezeStockBackpackCounts, frozenStockCount } from "./rules-dispatch-bank-reconcile"
import { setSavedVarsInstance } from "./saved-variables-ref"
import { SAVED_VARIABLES_DEFAULTS } from "./types"

const BAG_BACKPACK_ID = 1

interface Slot {
  itemId: number
  stack: number
  stolen: boolean
}

let backpack: (Slot | undefined)[]

function linkFor(itemId: number): string {
  return `|H0:item:${itemId}|h|h`
}

const STUBBED_KEYS = [
  "BAG_BACKPACK",
  "LINK_STYLE_BRACKETS",
  "GetBagSize",
  "GetSlotStackSize",
  "GetItemLink",
  "GetItemLinkItemId",
  "GetItemUniqueId",
  "Id64ToString",
  "IsItemStolen",
  "IsItemPlayerLocked",
  "TemperInventoryConfig",
  "d",
] as const

const originals = new Map<string, unknown>()

function compiledWithItemRules(itemRules: Record<number, ResolvedEntry>): CompiledRuleConfig {
  return {
    version: 3,
    orderedRules: [],
    itemRules,
    wantedEquipment: [],
    wantedCompanionEquipment: [],
    wantedConsumables: {},
    consumableStock: {},
    characterPriority: [],
    currencyRules: {},
  }
}

function installStubs(): undefined {
  for (const k of STUBBED_KEYS) originals.set(k, Reflect.get(globalThis, k))
  const set = (k: string, v: unknown): undefined => {
    Reflect.set(globalThis, k, v)
  }
  set("BAG_BACKPACK", BAG_BACKPACK_ID)
  set("LINK_STYLE_BRACKETS", 1)
  set("GetBagSize", (): number => backpack.length)
  set("GetSlotStackSize", (_bag: number, slot: number): [number, number] => {
    const s = backpack[slot]
    return s === undefined ? [0, 200] : [s.stack, 200]
  })
  set("GetItemLink", (_bag: number, slot: number): string => {
    const s = backpack[slot]
    return s === undefined ? "" : linkFor(s.itemId)
  })
  set("GetItemLinkItemId", (link: string): number => {
    const afterItem = link.split("item:")[1]
    if (afterItem === undefined) return 0
    const idText = afterItem.split("|")[0]
    return idText === undefined ? 0 : Number.parseInt(idText, 10)
  })
  set("GetItemUniqueId", (): string => "uid")
  set("Id64ToString", (id: string): string => id)
  set("IsItemStolen", (_bag: number, slot: number): boolean => backpack[slot]?.stolen ?? false)
  set("IsItemPlayerLocked", (): boolean => false)
  set("d", (): undefined => undefined)
}

function restoreStubs(): undefined {
  for (const [k, v] of originals) Reflect.set(globalThis, k, v)
  originals.clear()
}

const STOCK_ITEM = 4242
function stubStockItemRule(targetQuantity: number): undefined {
  const itemRules: Record<number, ResolvedEntry> = {
    [STOCK_ITEM]: {
      action: "stock",
      destination: "bank",
      targetQuantity,
      stockScope: "any-character",
    },
  }
  Reflect.set(globalThis, "TemperInventoryConfig", {
    version: 1,
    sellCompiled: compiledWithItemRules(itemRules),
    logging: { actionReports: "none" },
    safety: { confirmActions: [] },
    automation: {},
    backpack: { bufferSlots: 0 },
  })
}

beforeEach(() => {
  backpack = []
  for (let i = 0; i < 20; i++) backpack.push(undefined)
  installStubs()
  setSavedVarsInstance({ ...SAVED_VARIABLES_DEFAULTS })
  clearAllPendingActions()
})

afterEach(() => {
  clearAllPendingActions()
  restoreStubs()
})

describe("freezeStockBackpackCounts — counts holdings, not pending tags", () => {
  test("counts a backpack stack at target even with NO pending action (the runaway-withdraw regression)", () => {
    stubStockItemRule(200)
    backpack[0] = { itemId: STOCK_ITEM, stack: 200, stolen: false }

    const frozen = freezeStockBackpackCounts()

    expect(frozenStockCount(frozen, undefined, STOCK_ITEM)).toBe(200)
  })

  test("aggregates multiple stacks of the group across slots", () => {
    stubStockItemRule(200)
    backpack[0] = { itemId: STOCK_ITEM, stack: 150, stolen: false }
    backpack[3] = { itemId: STOCK_ITEM, stack: 90, stolen: false }

    const frozen = freezeStockBackpackCounts()
    expect(frozenStockCount(frozen, undefined, STOCK_ITEM)).toBe(240)
  })

  test("count is identical whether or not a stale pending tag is present", () => {
    stubStockItemRule(200)
    backpack[0] = { itemId: STOCK_ITEM, stack: 200, stolen: false }

    const without = frozenStockCount(freezeStockBackpackCounts(), undefined, STOCK_ITEM)
    setPendingAction(BAG_BACKPACK_ID, 0, "stock", "bank", 200, "any-character")
    const withTag = frozenStockCount(freezeStockBackpackCounts(), undefined, STOCK_ITEM)

    expect(without).toBe(200)
    expect(withTag).toBe(200)
  })

  test("excludes stolen stacks (they resolve to fence verdicts, never stock)", () => {
    stubStockItemRule(200)
    backpack[0] = { itemId: STOCK_ITEM, stack: 50, stolen: true }

    const frozen = freezeStockBackpackCounts()
    expect(frozenStockCount(frozen, undefined, STOCK_ITEM)).toBe(0)
  })

  test("absent group reads 0", () => {
    stubStockItemRule(200)
    const frozen = freezeStockBackpackCounts()
    expect(frozenStockCount(frozen, undefined, 9999)).toBe(0)
  })
})
