import { describe, expect, it } from "bun:test"
import {
  ESO_ITEMTYPE_RECIPE,
  type InventoryItemData,
} from "@temper/game-items-core/inventory-types"
import { makeItem as makeBaseItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import {
  buildItemFactsFromInventoryItem,
  resolveStaticItemKey,
} from "./build-item-facts-from-inventory-item"

const makeItem = (overrides: Partial<InventoryItemData> = {}): InventoryItemData =>
  makeBaseItem({
    itemName: "thing",
    itemLink: "|H1:item:1|h|h",
    quality: 1,
    requiredLevel: 0,
    itemType: 0,
    filterType: 0,
    ...overrides,
  })

describe("buildItemFactsFromInventoryItem", () => {
  it("threads the caller-supplied location through verbatim", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({}),
      nodeIds: ["equipment"],
      location: "backpack",
      itemKey: undefined,
    })
    expect(facts.location).toBe("backpack")
  })

  it("preserves an undefined location as unknown (eval contract)", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({}),
      nodeIds: [],
      location: undefined,
      itemKey: undefined,
    })
    expect(facts.location).toBeUndefined()
  })

  it("prepends the synthetic ALL_CATEGORIES_ID root to nodeIds", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({}),
      nodeIds: ["knowledge", "recipes", "food-recipes"],
      location: "backpack",
      itemKey: undefined,
    })
    expect(facts.categoryNodeIds).toEqual(["all", "knowledge", "recipes", "food-recipes"])
  })

  it("passes the caller-resolved itemKey through verbatim", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({}),
      nodeIds: [],
      location: "backpack",
      itemKey: { kind: "consumable", itemId: 1 },
    })
    expect(facts.itemKey).toEqual({ kind: "consumable", itemId: 1 })
  })

  it("maps the optional bag-slot booleans without fabricating absent values", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({ stolen: true }),
      nodeIds: [],
      location: "backpack",
      itemKey: undefined,
    })
    expect(facts.isStolen).toBe(true)
    expect(facts.isBound).toBeUndefined()
  })

  it("threads stackCount and maxStackSize through for the stack-fullness condition", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({ stackCount: 137, maxStackSize: 200 }),
      nodeIds: [],
      location: "backpack",
      itemKey: undefined,
    })
    expect(facts.stackCount).toBe(137)
    expect(facts.maxStackSize).toBe(200)
  })

  it("preserves an undefined maxStackSize as unknown (eval contract)", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({}),
      nodeIds: [],
      location: "backpack",
      itemKey: undefined,
    })
    expect(facts.maxStackSize).toBeUndefined()
  })
})

describe("buildItemFactsFromInventoryItem — potion restore effects", () => {
  it("resolves a crown tri-restoration potion (itemId 64710) to all three restores", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({
        itemId: 64710,
        itemName: "Crown Tri-Restoration Potion",
        itemLink: "|H1:item:64710:30:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
      }),
      nodeIds: ["potions"],
      location: "backpack",
      itemKey: undefined,
    })
    expect([...(facts.potionEffectMetricIds ?? [])].sort()).toEqual([
      "health-restore",
      "magicka-restore",
      "stamina-restore",
    ])
  })

  it("resolves a crafted tri-stat potion via its encoded-traits link (PotionData 8454917)", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({
        itemId: 45849,
        itemName: "Essence of Health",
        itemLink: "|H1:item:45849:30:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:8454917|h|h",
      }),
      nodeIds: ["potions"],
      location: "backpack",
      itemKey: undefined,
    })
    expect([...(facts.potionEffectMetricIds ?? [])].sort()).toEqual([
      "health-restore",
      "magicka-restore",
      "stamina-restore",
    ])
  })

  it("leaves potionEffectMetricIds undefined for a non-potion item", () => {
    const facts = buildItemFactsFromInventoryItem({
      item: makeItem({
        itemId: 30148,
        itemName: "Blue Entoloma",
        itemLink: "|H1:item:30148:30|h|h",
      }),
      nodeIds: ["materials"],
      location: "backpack",
      itemKey: undefined,
    })
    expect(facts.potionEffectMetricIds).toBeUndefined()
  })
})

describe("resolveStaticItemKey", () => {
  it("resolves a recipe to a recipe key keyed by the result item id", () => {
    const key = resolveStaticItemKey(makeItem({ itemType: ESO_ITEMTYPE_RECIPE, itemId: 99 }))
    expect(key?.kind).toBe("recipe")
  })

  it("returns undefined for a non-knowledge item (consumables are layered by the caller)", () => {
    expect(resolveStaticItemKey(makeItem({ itemType: 0 }))).toBeUndefined()
  })
})
