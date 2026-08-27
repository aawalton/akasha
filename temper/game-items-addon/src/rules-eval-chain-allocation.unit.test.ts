import "./test-eso-load-globals"

import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import type { ResolvedEntry } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { DestinationChain } from "@temper/game-items-rules-core/inventory-rule-types"
import type { ItemKey } from "@temper/game-items-rules-core/use-destination-types"
import { resolveItemKey } from "./build-item-facts"
import {
  type ResolveEntryAllocationCtx,
  resolveEntryAllocation,
  resolveFlatStockByPriority,
  resolveStockChainForCurrentChar,
} from "./rules-eval-allocation"
import { setSavedVarsInstance } from "./saved-variables-ref"
import { SAVED_VARIABLES_DEFAULTS } from "./types"

const SELF = "char-self"

const LOCKPICKS_CHAIN: DestinationChain = [
  { destination: "character:by-priority", targetQuantity: 200 },
  { destination: "bank" },
]

const EXP_SCROLL_CHAIN: DestinationChain = [
  {
    destination: "character:by-priority",
    targetQuantity: 5,
    charEligibility: { canLevelMorphs: { mode: "can-level" } },
  },
  { destination: "bank", targetQuantity: 200 },
  { destination: "house-storage:4677" },
]

const STUBBED_KEYS = [
  "GetCurrentCharacterId",
  "GetSlotStackSize",
  "IsItemLinkRecipeKnown",
  "GetItemLinkItemType",
  "GetItemLinkRecipeResultItemLink",
  "GetItemLinkItemId",
  "ITEMTYPE_RECIPE",
] as const
const originals = new Map<string, unknown>()

function installStubs(): undefined {
  for (const k of STUBBED_KEYS) originals.set(k, Reflect.get(globalThis, k))
  Reflect.set(globalThis, "GetCurrentCharacterId", (): string => SELF)
  Reflect.set(globalThis, "GetSlotStackSize", (): readonly number[] => [1])
  Reflect.set(globalThis, "IsItemLinkRecipeKnown", (): boolean => false)
  setSavedVarsInstance({ ...SAVED_VARIABLES_DEFAULTS })
  return undefined
}

function restoreStubs(): undefined {
  for (const [k, v] of originals) Reflect.set(globalThis, k, v)
  originals.clear()
  return undefined
}

beforeEach(() => {
  installStubs()
})

afterEach(() => {
  restoreStubs()
})

describe("resolveStockChainForCurrentChar", () => {
  test("reduces an ungated 2-tier chain to a stable fill target + bank surplus sink", () => {
    const result = resolveStockChainForCurrentChar(LOCKPICKS_CHAIN)
    expect(result).not.toBeUndefined()
    expect(result?.targetQuantity).toBe(200)
    expect(result?.destination).toBe("bank")
  })

  test("resolution does NOT vary with stack/holding state (no redistribution surface)", () => {
    const a = resolveStockChainForCurrentChar(LOCKPICKS_CHAIN)
    const b = resolveStockChainForCurrentChar(LOCKPICKS_CHAIN)
    expect(a).toEqual(b)
    expect(a?.targetQuantity).toBe(200)
    expect(a?.destination).toBe("bank")
  })

  test("returns undefined for a pure fixed-destination chain (no by-priority tier)", () => {
    expect(resolveStockChainForCurrentChar([{ destination: "bank" }])).toBeUndefined()
  })

  test("a terminal by-priority tier resolves to its target with no surplus sink", () => {
    const result = resolveStockChainForCurrentChar([
      { destination: "character:by-priority", targetQuantity: 200 },
    ])
    expect(result?.targetQuantity).toBe(200)
    expect(result?.destination).toBeUndefined()
  })

  test("a 3-tier gated chain resolves to the bank as the primary sink; an ineligible char keeps 0", () => {
    const result = resolveStockChainForCurrentChar(EXP_SCROLL_CHAIN)
    expect(result?.destination).toBe("bank")
    expect(result?.targetQuantity).toBe(0)
  })
})

describe("resolveFlatStockByPriority", () => {
  test("an ungated flat rule resolves to its target + the bank surplus sink", () => {
    const result = resolveFlatStockByPriority({ targetQuantity: 10 })
    expect(result.destination).toBe("bank")
    expect(result.targetQuantity).toBe(10)
  })

  test("a missing targetQuantity resolves to 0 (keep none, bank all)", () => {
    const result = resolveFlatStockByPriority({})
    expect(result.destination).toBe("bank")
    expect(result.targetQuantity).toBe(0)
  })

  test("a gated flat rule whose gate excludes the current char resolves to target 0, still bank", () => {
    const result = resolveFlatStockByPriority({
      targetQuantity: 10,
      canLevelMorphs: { mode: "can-level" },
    })
    expect(result.destination).toBe("bank")
    expect(result.targetQuantity).toBe(0)
  })
})

describe("resolveEntryAllocation", () => {
  function itemCtx(): ResolveEntryAllocationCtx {
    return {
      bagId: 1,
      slotIndex: 0,
      itemKey: undefined,
      itemLink: "|H0:item:1|h|h",
      claims: new Map(),
    }
  }

  test("item entry with a destinationChain resolves via the chain (bank sink + tier target)", () => {
    const entry: ResolvedEntry = { action: "stock", destinationChain: LOCKPICKS_CHAIN }
    const r = resolveEntryAllocation(entry, "stock", entry.destination, itemCtx())
    expect(r.destination).toBe("bank")
    expect(r.targetQuantity).toBe(200)
    expect(r.useAllocation).toBeUndefined()
  })

  test("item entry with flat stock × by-priority resolves to bank + its target (ungated → all-eligible)", () => {
    const entry: ResolvedEntry = {
      action: "stock",
      destination: "character:by-priority",
      targetQuantity: 10,
    }
    const r = resolveEntryAllocation(entry, "stock", entry.destination, itemCtx())
    expect(r.destination).toBe("bank")
    expect(r.targetQuantity).toBe(10)
    expect(r.useAllocation).toBeUndefined()
  })

  test("use × by-priority with no itemKey skips allocation (resolver guard — key absent ⇒ branch A off)", () => {
    const entry: ResolvedEntry = { action: "use", destination: "character:by-priority" }
    const r = resolveEntryAllocation(entry, "use", entry.destination, itemCtx())
    expect(r.useAllocation).toBeUndefined()
    expect(r.destination).toBe("character:by-priority")
    expect(r.targetQuantity).toBeUndefined()
  })

  test("plain move-to item entry passes through with no target and no allocation", () => {
    const entry: ResolvedEntry = { action: "move-to", destination: "bank" }
    const r = resolveEntryAllocation(entry, "move-to", entry.destination, itemCtx())
    expect(r.destination).toBe("bank")
    expect(r.targetQuantity).toBeUndefined()
    expect(r.useAllocation).toBeUndefined()
  })

  test("plain stock item entry (concrete destination, no chain/by-priority) passes its target through", () => {
    const entry: ResolvedEntry = { action: "stock", destination: "bank", targetQuantity: 5 }
    const r = resolveEntryAllocation(entry, "stock", entry.destination, itemCtx())
    expect(r.destination).toBe("bank")
    expect(r.targetQuantity).toBe(5)
    expect(r.useAllocation).toBeUndefined()
  })

  test("use × by-priority FIRES with a recipe key: allocates to the current char + concrete destination", () => {
    const entry: ResolvedEntry = { action: "use", destination: "character:by-priority" }
    const recipeKey: ItemKey = { kind: "recipe", resultItemId: 999 }
    const r = resolveEntryAllocation(entry, "use", entry.destination, {
      bagId: 1,
      slotIndex: 0,
      itemKey: recipeKey,
      itemLink: "|H0:item:1|h|h",
      claims: new Map(),
    })
    expect(r.useAllocation).toEqual({ currentCharQty: 1, otherCharDeposits: [] })
    expect(r.destination).toBe(`character:${SELF}`)
    expect(r.targetQuantity).toBeUndefined()
  })

  test("ITEM path: use × by-priority derives its recipe key on demand and resolves an allocation (#14294 (c))", () => {
    const RECIPE_ITEMTYPE = 29
    Reflect.set(globalThis, "ITEMTYPE_RECIPE", RECIPE_ITEMTYPE)
    Reflect.set(globalThis, "GetItemLinkItemType", (): readonly number[] => [RECIPE_ITEMTYPE, 0])
    Reflect.set(globalThis, "GetItemLinkRecipeResultItemLink", (): string => "|H0:item:777|h|h")
    Reflect.set(globalThis, "GetItemLinkItemId", (): number => 777)

    const itemLink = "|H0:item:55|h|h"
    const [itemType] = GetItemLinkItemType(itemLink)
    const itemKey = resolveItemKey(itemLink, itemType, 55)
    expect(itemKey).toEqual({ kind: "recipe", resultItemId: 777 })

    const entry: ResolvedEntry = { action: "use", destination: "character:by-priority" }
    const r = resolveEntryAllocation(entry, entry.action, entry.destination, {
      bagId: 1,
      slotIndex: 0,
      itemKey,
      itemLink,
      claims: new Map(),
    })
    expect(r.useAllocation).toEqual({ currentCharQty: 1, otherCharDeposits: [] })
    expect(r.destination).toBe(`character:${SELF}`)
  })
})
