import { afterEach, beforeEach } from "bun:test"
import { requireMatchPositional } from "../../../../shared/utils-narrow/src/require-match-positional"
import { z } from "zod"

import type { CompiledRuleConfig, ResolvedEntry } from "../generated/rule-types.generated"
import { clearAllPendingActions } from "../rules-core"
import type { BankSlotContext } from "../rules-dispatch-bank-slots"
import { onTradingHouseClosed } from "../rules-list"
import { setSavedVarsInstance } from "../saved-variables-ref"
import { SAVED_VARIABLES_DEFAULTS } from "../types"

export const BAG_BACKPACK_ID = 1
export const BAG_BANK_ID = 2
const BAG_VIRTUAL_ID = 5
const BAG_SUBSCRIBER_BANK_ID = 6

export interface Slot {
  itemId: number
  stack: number
  maxStack: number
  stolen: boolean
  junk: boolean
}

export interface BagWorld {
  bags: Map<number, (Slot | undefined)[]>
  currentCharId: string
  moves: { srcBag: number; srcSlot: number; tgtBag: number; tgtSlot: number; count: number }[]
}

export let world: BagWorld

function newBag(size: number): (Slot | undefined)[] {
  const arr: (Slot | undefined)[] = []
  for (let i = 0; i < size; i++) arr.push(undefined)
  return arr
}

export function getSlot(bag: number, slot: number): Slot | undefined {
  return world.bags.get(bag)?.[slot]
}

export function setSlot(bag: number, slot: number, value: Slot | undefined): undefined {
  const arr = world.bags.get(bag)
  if (arr === undefined) return
  arr[slot] = value
}

export function makeSlot(
  itemId: number,
  stack: number,
  opts?: { stolen?: boolean; junk?: boolean }
): Slot {
  return {
    itemId,
    stack,
    maxStack: 200,
    stolen: opts?.stolen ?? false,
    junk: opts?.junk ?? false,
  }
}

function linkFor(itemId: number): string {
  return `|H0:item:${itemId}|h|h`
}

const STUBBED_KEYS = [
  "BAG_BACKPACK",
  "BAG_BANK",
  "BAG_VIRTUAL",
  "BAG_SUBSCRIBER_BANK",
  "LINK_STYLE_BRACKETS",
  "GetCurrentCharacterId",
  "GetBagSize",
  "GetSlotStackSize",
  "GetItemLink",
  "GetItemLinkItemId",
  "GetItemUniqueId",
  "Id64ToString",
  "IsItemStolen",
  "IsItemJunk",
  "SetItemIsJunk",
  "GetInteractionType",
  "GetGameTimeMilliseconds",
  "IsItemPlayerLocked",
  "IsESOPlusSubscriber",
  "HasCraftBagAccess",
  "CanItemBeVirtual",
  "GetSelectedTradingHouseGuildId",
  "CanSellOnTradingHouse",
  "GetTradingHouseListingCounts",
  "GetTradingHouseCooldownRemaining",
  "IsItemSellableOnTradingHouse",
  "GetTradingHousePostPriceInfo",
  "GetCurrencyAmount",
  "RequestPostItemOnTradingHouse",
  "CURT_MONEY",
  "CURRENCY_LOCATION_CHARACTER",
  "TamrielTradeCentrePrice",
  "TemperInventoryConfig",
  "zo_callLater",
  "d",
] as const

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

export function stubCompiledConfig(itemRules: Record<number, ResolvedEntry>): undefined {
  Reflect.set(globalThis, "TemperInventoryConfig", {
    version: 1,
    sellCompiled: compiledWithItemRules(itemRules),
    logging: { actionReports: "none" },
    safety: { confirmActions: [] },
    automation: {},
    backpack: { bufferSlots: 0 },
  })
}

const originals = new Map<string, unknown>()

function installStubs(): undefined {
  for (const k of STUBBED_KEYS) originals.set(k, Reflect.get(globalThis, k))

  const set = (k: string, v: unknown): undefined => {
    Reflect.set(globalThis, k, v)
  }

  set("BAG_BACKPACK", BAG_BACKPACK_ID)
  set("BAG_BANK", BAG_BANK_ID)
  set("BAG_VIRTUAL", BAG_VIRTUAL_ID)
  set("BAG_SUBSCRIBER_BANK", BAG_SUBSCRIBER_BANK_ID)
  set("LINK_STYLE_BRACKETS", 1)
  set("CURT_MONEY", 1)
  set("CURRENCY_LOCATION_CHARACTER", 1)

  set("GetCurrentCharacterId", (): string => world.currentCharId)
  set("GetBagSize", (bag: number): number => world.bags.get(bag)?.length ?? 0)
  set("GetSlotStackSize", (bag: number, slot: number): [number, number] => {
    const s = getSlot(bag, slot)
    return s === undefined ? [0, 200] : [s.stack, s.maxStack]
  })
  set("GetItemLink", (bag: number, slot: number): string => {
    const s = getSlot(bag, slot)
    return s === undefined ? "" : linkFor(s.itemId)
  })
  set("GetItemLinkItemId", (link: string): number => {
    if (!/item:\d+/.test(link)) return 0
    const [itemId] = requireMatchPositional(/item:(\d+)/, z.tuple([z.coerce.number().int()]), link)
    return itemId
  })
  set("GetItemUniqueId", (_bag: number, _slot: number): string | undefined => "uid")
  set("Id64ToString", (id: string): string => id)
  set("IsItemStolen", (bag: number, slot: number): boolean => getSlot(bag, slot)?.stolen ?? false)
  set("IsItemJunk", (bag: number, slot: number): boolean => getSlot(bag, slot)?.junk ?? false)
  set("SetItemIsJunk", (bag: number, slot: number, junk: boolean): undefined => {
    const s = getSlot(bag, slot)
    if (s !== undefined) s.junk = junk
  })
  set("GetInteractionType", (): number => 0)
  set("GetGameTimeMilliseconds", (): number => 0)
  set("IsItemPlayerLocked", (): boolean => false)
  set("IsESOPlusSubscriber", (): boolean => false)
  set("HasCraftBagAccess", (): boolean => false)
  set("CanItemBeVirtual", (): boolean => false)

  set("GetSelectedTradingHouseGuildId", (): number => 1)
  set("CanSellOnTradingHouse", (): boolean => true)
  set("GetTradingHouseListingCounts", (): [number, number] => [0, 30])
  set("GetTradingHouseCooldownRemaining", (): number => 0)
  set("IsItemSellableOnTradingHouse", (): boolean => true)
  set("GetTradingHousePostPriceInfo", (): [number] => [0])
  set("GetCurrencyAmount", (): number => 1_000_000)
  set("RequestPostItemOnTradingHouse", (bag: number, slot: number, count: number): undefined => {
    world.moves.push({ srcBag: bag, srcSlot: slot, tgtBag: -1, tgtSlot: -1, count })
  })
  set("TamrielTradeCentrePrice", {
    GetPriceInfo: (): { SuggestedPrice: number } => ({ SuggestedPrice: 100 }),
  })

  set("zo_callLater", (fn: () => void): undefined => {
    fn()
  })
  set("d", (): undefined => undefined)
}

function restoreStubs(): undefined {
  for (const [k, v] of originals) Reflect.set(globalThis, k, v)
  originals.clear()
}

function makeWorld(currentCharId: string): BagWorld {
  const bags = new Map<number, (Slot | undefined)[]>()
  bags.set(BAG_BACKPACK_ID, newBag(20))
  bags.set(BAG_BANK_ID, newBag(20))
  return { bags, currentCharId, moves: [] }
}

export function bankCtx(): BankSlotContext {
  return {
    reserved: new LuaMap<number, true>(),
    vacated: new LuaMap<number, true>(),
    isBank: true,
    isHouseStorage: false,
    bankingBag: BAG_BANK_ID,
    currentChestId: undefined,
  }
}

export function recordMove(
  srcBag: number,
  srcSlot: number,
  tgtBag: number,
  tgtSlot: number,
  count: number
): undefined {
  world.moves.push({ srcBag, srcSlot, tgtBag, tgtSlot, count })
}

export const SELF = "char-self"
export const OTHER = "char-other"

export function useBagWorld(): undefined {
  beforeEach(() => {
    world = makeWorld(SELF)
    installStubs()
    setSavedVarsInstance({ ...SAVED_VARIABLES_DEFAULTS })
    Reflect.set(globalThis, "TemperInventoryConfig", undefined)
    clearAllPendingActions()
  })

  afterEach(() => {
    clearAllPendingActions()
    onTradingHouseClosed()
    restoreStubs()
  })
}
