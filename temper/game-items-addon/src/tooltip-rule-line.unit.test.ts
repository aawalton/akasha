import "./test-eso-load-globals"

import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { requireMatchPositional } from "../../../shared/utils-narrow/src/require-match-positional"
import { z } from "zod"

import type {
  CompiledCurrencyRule,
  CompiledRuleConfig,
  ResolvedEntry,
} from "./generated/rule-types.generated"
import { classifyPendingVenue, computePlanVenues, type VenuePlan } from "./plan"
import { clearAllPendingActions, setPendingAction } from "./rules-core"
import { setSavedVarsInstance } from "./saved-variables-ref"
import { resolveTooltipDecision } from "./tooltip-rule-line"
import { SAVED_VARIABLES_DEFAULTS } from "./types"

const BAG_BACKPACK_ID = 1
const BAG_BANK_ID = 2

interface Slot {
  itemId: number
  stack: number
  stolen: boolean
  junk: boolean
}

interface BagWorld {
  bags: Map<number, (Slot | undefined)[]>
  currentCharId: string
}

let world: BagWorld

function newBag(size: number): (Slot | undefined)[] {
  const arr: (Slot | undefined)[] = []
  for (let i = 0; i < size; i++) arr.push(undefined)
  return arr
}

function getSlot(bag: number, slot: number): Slot | undefined {
  return world.bags.get(bag)?.[slot]
}

function setSlot(bag: number, slot: number, value: Slot | undefined): undefined {
  const arr = world.bags.get(bag)
  if (arr === undefined) return
  arr[slot] = value
}

function makeSlot(itemId: number, opts?: { stolen?: boolean; junk?: boolean }): Slot {
  return { itemId, stack: 1, stolen: opts?.stolen ?? false, junk: opts?.junk ?? false }
}

function linkFor(itemId: number): string {
  return `|H0:item:${itemId}|h|h`
}

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

function stubCompiledConfig(itemRules: Record<number, ResolvedEntry>): undefined {
  Reflect.set(globalThis, "TemperInventoryConfig", {
    version: 1,
    sellCompiled: compiledWithItemRules(itemRules),
    logging: { actionReports: "none" },
    safety: { confirmActions: [] },
    automation: {},
    backpack: { bufferSlots: 0 },
  })
}

function stubConfigWithCurrencies(currencyRules: Record<string, CompiledCurrencyRule>): undefined {
  Reflect.set(globalThis, "TemperInventoryConfig", {
    version: 1,
    sellCompiled: { ...compiledWithItemRules({}), currencyRules },
    logging: { actionReports: "none" },
    safety: { confirmActions: [] },
    automation: {},
    backpack: { bufferSlots: 0 },
  })
}

const STUBBED_KEYS = [
  "BAG_BACKPACK",
  "BAG_BANK",
  "GetCurrentCharacterId",
  "GetBagSize",
  "GetSlotStackSize",
  "GetItemLink",
  "GetItemLinkItemId",
  "GetItemUniqueId",
  "Id64ToString",
  "IsItemStolen",
  "IsItemJunk",
  "IsItemPlayerLocked",
  "GetInteractionType",
  "IsESOPlusSubscriber",
  "HasCraftBagAccess",
  "CanItemBeVirtual",
  "BAG_VIRTUAL",
  "BAG_SUBSCRIBER_BANK",
  "LINK_STYLE_BRACKETS",
  "TemperInventoryConfig",
  "d",
] as const

const originals = new Map<string, unknown>()

function installStubs(): undefined {
  for (const k of STUBBED_KEYS) originals.set(k, Reflect.get(globalThis, k))
  const set = (k: string, v: unknown): undefined => {
    Reflect.set(globalThis, k, v)
  }
  set("BAG_BACKPACK", BAG_BACKPACK_ID)
  set("BAG_BANK", BAG_BANK_ID)
  set("BAG_VIRTUAL", 5)
  set("BAG_SUBSCRIBER_BANK", 6)
  set("IsItemPlayerLocked", (): boolean => false)
  set("GetInteractionType", (): number => 0)
  set("IsESOPlusSubscriber", (): boolean => false)
  set("HasCraftBagAccess", (): boolean => false)
  set("CanItemBeVirtual", (): boolean => false)
  set("LINK_STYLE_BRACKETS", 1)
  set("GetCurrentCharacterId", (): string => world.currentCharId)
  set("GetBagSize", (bag: number): number => world.bags.get(bag)?.length ?? 0)
  set("GetSlotStackSize", (bag: number, slot: number): [number, number] => {
    const s = getSlot(bag, slot)
    return s === undefined ? [0, 200] : [s.stack, 200]
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
  return { bags, currentCharId }
}

const SELF = "char-self"

beforeEach(() => {
  world = makeWorld(SELF)
  installStubs()
  setSavedVarsInstance({ ...SAVED_VARIABLES_DEFAULTS })
  stubCompiledConfig({})
  clearAllPendingActions()
})

afterEach(() => {
  clearAllPendingActions()
  restoreStubs()
})

describe("resolveTooltipDecision — renders the recorded pending decision", () => {
  test("stock→bank surplus: returns the recorded stock decision, NOT a claim-blind 'Keep'", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(500))
    setPendingAction(BAG_BACKPACK_ID, 0, "stock", "bank", 200)

    const decision = resolveTooltipDecision(BAG_BACKPACK_ID, 0)
    expect(decision).toBeDefined()
    expect(decision?.action).toBe("stock")
    expect(decision?.destination).toBe("bank")
    expect(decision?.targetQuantity).toBe(200)
  })

  test("move-to bank: returns the recorded move-to decision", () => {
    setSlot(BAG_BACKPACK_ID, 1, makeSlot(501))
    setPendingAction(BAG_BACKPACK_ID, 1, "move-to", "bank")

    const decision = resolveTooltipDecision(BAG_BACKPACK_ID, 1)
    expect(decision?.action).toBe("move-to")
    expect(decision?.destination).toBe("bank")
  })

  test("cross-char sell carrier: returns sell + the carried destination", () => {
    setSlot(BAG_BACKPACK_ID, 2, makeSlot(502))
    setPendingAction(BAG_BACKPACK_ID, 2, "sell", "character:char-other")

    const decision = resolveTooltipDecision(BAG_BACKPACK_ID, 2)
    expect(decision?.action).toBe("sell")
    expect(decision?.destination).toBe("character:char-other")
  })

  test("open-stolen-when-safe pending maps to the shared 'open' label action", () => {
    setSlot(BAG_BACKPACK_ID, 3, makeSlot(503))
    setPendingAction(BAG_BACKPACK_ID, 3, "open-stolen-when-safe")

    const decision = resolveTooltipDecision(BAG_BACKPACK_ID, 3)
    expect(decision?.action).toBe("open")
  })

  test("no pending recorded: falls back to findMatchedRule (worn / unscanned surfaces)", () => {
    stubCompiledConfig({ 600: { action: "list" } })
    setSlot(BAG_BACKPACK_ID, 4, makeSlot(600))

    const decision = resolveTooltipDecision(BAG_BACKPACK_ID, 4)
    expect(decision?.action).toBe("list")
  })
})

function tally(plan: VenuePlan[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const entry of plan) {
    for (const v of entry.verbs) {
      out[`${entry.venue}/${v.verb}`] = (out[`${entry.venue}/${v.verb}`] ?? 0) + v.count
    }
  }
  return out
}

function tooltipVenueCounts(): Record<string, number> {
  const out: Record<string, number> = {}
  const size = GetBagSize(BAG_BACKPACK_ID)
  for (let slot = 0; slot < size; slot++) {
    const [stack] = GetSlotStackSize(BAG_BACKPACK_ID, slot)
    if (stack === 0) continue
    const decision = resolveTooltipDecision(BAG_BACKPACK_ID, slot)
    if (decision === undefined) continue
    const c = classifyPendingVenue(
      decision.action,
      decision.destination,
      IsItemStolen(BAG_BACKPACK_ID, slot)
    )
    if (c === undefined) continue
    out[`${c.venue}/${c.verb}`] = (out[`${c.venue}/${c.verb}`] ?? 0) + 1
  }
  return out
}

describe("tooltip ≡ plan: pending-backed backpack slots aggregate identically", () => {
  test("a mixed set of recorded decisions yields matching venue/verb counts", () => {
    setSlot(BAG_BACKPACK_ID, 0, makeSlot(700))
    setPendingAction(BAG_BACKPACK_ID, 0, "stock", "bank", 200)
    setSlot(BAG_BACKPACK_ID, 1, makeSlot(701))
    setPendingAction(BAG_BACKPACK_ID, 1, "move-to", "bank")
    setSlot(BAG_BACKPACK_ID, 2, makeSlot(702))
    setPendingAction(BAG_BACKPACK_ID, 2, "deconstruct")
    setSlot(BAG_BACKPACK_ID, 3, makeSlot(703))
    setPendingAction(BAG_BACKPACK_ID, 3, "mail", "mail:@someone")
    setSlot(BAG_BACKPACK_ID, 4, makeSlot(704))
    setPendingAction(BAG_BACKPACK_ID, 4, "fence-sell")
    setSlot(BAG_BACKPACK_ID, 5, makeSlot(705))
    setPendingAction(BAG_BACKPACK_ID, 5, "list", "character:char-other")

    const planCounts = tally(computePlanVenues() ?? [])
    const toolCounts = tooltipVenueCounts()

    expect(toolCounts).toEqual(planCounts)
  })
})

describe("computePlanVenues — currencies excluded from the plan", () => {
  test("currency rules (incl. bank-destination ones) contribute no venue entry", () => {
    stubConfigWithCurrencies({
      gold: { action: "stock", destination: "character", targetAmount: 1_000_000 },
      alliancePoints: { action: "move-to", destination: "bank" },
      telvarStones: { action: "move-to", destination: "bank" },
      writVouchers: { action: "move-to", destination: "bank" },
    })
    const plan = computePlanVenues() ?? []
    expect(plan.find((v) => v.venue === "bank")).toBeUndefined()
    expect(plan.some((v) => v.verbs.some((x) => x.verb === "transfer"))).toBe(false)
    expect(plan).toHaveLength(0)
  })
})
