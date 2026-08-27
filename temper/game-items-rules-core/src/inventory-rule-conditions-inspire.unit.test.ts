import { describe, expect, it } from "bun:test"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import { itemPassesConditions } from "./generated/inventory-rule-conditions.generated"
import { makeItem } from "./inventory-rule-test-utils"
import type { RuleMatcherContext } from "./rule-matcher-context-types"

describe("itemPassesConditions — canInspire", () => {
  const CRAFTING_TYPE_BLACKSMITHING = 1
  const CRAFTING_TYPE_CLOTHIER = 2
  const CRAFTING_TYPE_WOODWORKING = 6
  const CRAFTING_TYPE_JEWELRYCRAFTING = 7

  const HEAVY_ARMOR: Partial<InventoryItemData> = { equipType: 3, armorType: 3 }
  const LIGHT_ARMOR: Partial<InventoryItemData> = { equipType: 3, armorType: 1 }
  const BOW: Partial<InventoryItemData> = { equipType: 6, weaponType: 8 }
  const RING: Partial<InventoryItemData> = { equipType: 12 }

  function makeInspireContext(
    levelsByChar: Record<string, Record<number, number>>
  ): RuleMatcherContext {
    const craftingLevels = new Map<string, Map<number, number>>()
    for (const [charId, levels] of Object.entries(levelsByChar)) {
      const inner = new Map<number, number>()
      for (const [craftType, rank] of Object.entries(levels)) {
        inner.set(Number(craftType), rank)
      }
      craftingLevels.set(charId, inner)
    }
    return {
      wantedEquipment: [],
      wantedCompanionEquipment: [],
      wantedConsumables: new Map(),
      consumableStock: new Map(),
      bankStock: new Map(),
      characterLevels: new Map(),
      knownRecipesByCharacter: new Map(),
      knownMotifsByCharacter: new Map(),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map(),
      characterPriority: Object.keys(levelsByChar),
      craftingLevels,
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }
  }

  it("passes through without context", () => {
    const item = makeItem(HEAVY_ARMOR)
    expect(itemPassesConditions(item, { canInspire: "can-inspire" })).toBe(true)
    expect(itemPassesConditions(item, { canInspire: "cannot-inspire" })).toBe(true)
  })

  it("passes through with empty craftingLevels", () => {
    const item = makeItem(HEAVY_ARMOR)
    const ctx = makeInspireContext({})
    expect(itemPassesConditions(item, { canInspire: "can-inspire" }, ctx)).toBe(true)
  })

  it("can-inspire matches heavy armor when at least one char is below BS cap", () => {
    const item = makeItem(HEAVY_ARMOR)
    const ctx = makeInspireContext({ char1: { [CRAFTING_TYPE_BLACKSMITHING]: 8 } })
    expect(itemPassesConditions(item, { canInspire: "can-inspire" }, ctx)).toBe(true)
  })

  it("can-inspire rejects heavy armor when every char is at BS cap", () => {
    const item = makeItem(HEAVY_ARMOR)
    const ctx = makeInspireContext({
      char1: { [CRAFTING_TYPE_BLACKSMITHING]: 10 },
      char2: { [CRAFTING_TYPE_BLACKSMITHING]: 10 },
    })
    expect(itemPassesConditions(item, { canInspire: "can-inspire" }, ctx)).toBe(false)
  })

  it("cannot-inspire passes when every char is at BS cap", () => {
    const item = makeItem(HEAVY_ARMOR)
    const ctx = makeInspireContext({ char1: { [CRAFTING_TYPE_BLACKSMITHING]: 10 } })
    expect(itemPassesConditions(item, { canInspire: "cannot-inspire" }, ctx)).toBe(true)
  })

  it("cannot-inspire rejects when at least one char is below BS cap", () => {
    const item = makeItem(HEAVY_ARMOR)
    const ctx = makeInspireContext({
      char1: { [CRAFTING_TYPE_BLACKSMITHING]: 10 },
      char2: { [CRAFTING_TYPE_BLACKSMITHING]: 9 },
    })
    expect(itemPassesConditions(item, { canInspire: "cannot-inspire" }, ctx)).toBe(false)
  })

  it("matches light armor against clothier rank", () => {
    const item = makeItem(LIGHT_ARMOR)
    const ctx = makeInspireContext({ char1: { [CRAFTING_TYPE_CLOTHIER]: 5 } })
    expect(itemPassesConditions(item, { canInspire: "can-inspire" }, ctx)).toBe(true)
  })

  it("matches bow against woodworking rank", () => {
    const item = makeItem(BOW)
    const ctx = makeInspireContext({ char1: { [CRAFTING_TYPE_WOODWORKING]: 9 } })
    expect(itemPassesConditions(item, { canInspire: "can-inspire" }, ctx)).toBe(true)
  })

  it("rejects bow when only blacksmithing rank is recorded", () => {
    const item = makeItem(BOW)
    const ctx = makeInspireContext({ char1: { [CRAFTING_TYPE_BLACKSMITHING]: 5 } })
    expect(itemPassesConditions(item, { canInspire: "can-inspire" }, ctx)).toBe(false)
  })

  it("matches jewelry against JC rank with cap of 5", () => {
    const item = makeItem(RING)
    const ctxBelow = makeInspireContext({ char1: { [CRAFTING_TYPE_JEWELRYCRAFTING]: 4 } })
    const ctxAtCap = makeInspireContext({ char1: { [CRAFTING_TYPE_JEWELRYCRAFTING]: 5 } })
    expect(itemPassesConditions(item, { canInspire: "can-inspire" }, ctxBelow)).toBe(true)
    expect(itemPassesConditions(item, { canInspire: "can-inspire" }, ctxAtCap)).toBe(false)
  })

  it("rejects unidentifiable items (no equip/armor/weapon shape)", () => {
    const item = makeItem({})
    const ctx = makeInspireContext({ char1: { [CRAFTING_TYPE_BLACKSMITHING]: 5 } })
    expect(itemPassesConditions(item, { canInspire: "can-inspire" }, ctx)).toBe(false)
  })
})
