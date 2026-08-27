import { describe, expect, it } from "bun:test"
import {
  ESO_ITEMTYPE_CONTAINER,
  ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
  ESO_ITEMTYPE_RECIPE,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
} from "@temper/game-items-core/inventory-types"
import { makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import { ALL_CATEGORIES_ID } from "@temper/game-items-rules-core/inventory-rule-types"
import { cliItemFactsFromInventoryItem } from "../lib/temper-inventory/cli-item-facts.ts"
import { classifyItemToNodeIds } from "../lib/temper-inventory/game-code.ts"
import type { InventoryItemData } from "../lib/temper-inventory/game-item-types.ts"

const factsOf = (item: InventoryItemData, nodeIds: readonly string[]) =>
  cliItemFactsFromInventoryItem(item, nodeIds, "backpack")

describe("cliItemFactsFromInventoryItem", () => {
  it("prepends ALL_CATEGORIES_ID to categoryNodeIds so 'all' rules resolve", () => {
    const facts = factsOf(makeItem({}), ["equipment", "weapons", "sword"])
    expect(facts.categoryNodeIds?.[0]).toBe(ALL_CATEGORIES_ID)
    expect(facts.categoryNodeIds).toContain("equipment")
    expect(facts.categoryNodeIds).toContain("sword")
  })

  it("threads the caller-supplied location through to facts.location", () => {
    expect(cliItemFactsFromInventoryItem(makeItem({}), [], "worn").location).toBe("worn")
    expect(cliItemFactsFromInventoryItem(makeItem({}), [], undefined).location).toBeUndefined()
  })

  it("propagates identity, numeric scan signals, and optional type signals", () => {
    const facts = factsOf(
      makeItem({
        itemId: 42,
        itemName: "X",
        itemLink: "|H1:item|h",
        stackCount: 3,
        quality: 5,
        requiredLevel: 50,
        requiredCP: 160,
        itemType: 7,
        traitType: 12,
        filterType: 4,
        equipType: 5,
        weaponType: 3,
        armorType: 2,
        setId: 999,
      }),
      []
    )
    expect(facts.itemId).toBe(42)
    expect(facts.itemName).toBe("X")
    expect(facts.itemLink).toBe("|H1:item|h")
    expect(facts.stackCount).toBe(3)
    expect(facts.quality).toBe(5)
    expect(facts.requiredLevel).toBe(50)
    expect(facts.requiredCP).toBe(160)
    expect(facts.itemType).toBe(7)
    expect(facts.traitType).toBe(12)
    expect(facts.filterType).toBe(4)
    expect(facts.equipType).toBe(5)
    expect(facts.weaponType).toBe(3)
    expect(facts.armorType).toBe(2)
    expect(facts.setId).toBe(999)
  })

  it("propagates the account-wide known bit (collectible itemKey-less fallback)", () => {
    expect(factsOf(makeItem({ known: true }), []).known).toBe(true)
    expect(factsOf(makeItem({ known: false }), []).known).toBe(false)
    expect(factsOf(makeItem({}), []).known).toBeUndefined()
  })

  it("sets isKnowledgeItem authoritatively from static type signals", () => {
    expect(factsOf(makeItem({ itemType: ESO_ITEMTYPE_RECIPE }), []).isKnowledgeItem).toBe(true)
    expect(
      factsOf(makeItem({ itemType: ESO_ITEMTYPE_CONTAINER, specializedItemType: 850 }), [])
        .isKnowledgeItem
    ).toBe(false)
  })

  it("propagates all six bag-slot status booleans as-is", () => {
    const facts = factsOf(
      makeItem({
        stolen: true,
        bound: false,
        locked: true,
        reconstructed: false,
        transmuted: true,
        crafted: false,
      }),
      []
    )
    expect(facts.isStolen).toBe(true)
    expect(facts.isBound).toBe(false)
    expect(facts.isLocked).toBe(true)
    expect(facts.isReconstructed).toBe(false)
    expect(facts.isTransmuted).toBe(true)
    expect(facts.isCrafted).toBe(false)
  })

  it("preserves undefined for every bag-slot status when genuinely absent", () => {
    const facts = factsOf(makeItem({}), [])
    expect(facts.isStolen).toBeUndefined()
    expect(facts.isBound).toBeUndefined()
    expect(facts.isLocked).toBeUndefined()
    expect(facts.isReconstructed).toBeUndefined()
    expect(facts.isTransmuted).toBeUndefined()
    expect(facts.isCrafted).toBeUndefined()
  })

  it("recognizes recipes via itemType and resolves resultItemId", () => {
    const facts = factsOf(
      makeItem({ itemId: 100, itemName: "Some Recipe", itemType: ESO_ITEMTYPE_RECIPE }),
      []
    )
    expect(facts.itemKey?.kind).toBe("recipe")
    if (facts.itemKey?.kind === "recipe") {
      expect(facts.itemKey.resultItemId).toBe(100)
    }
  })

  it("recognizes scribing scripts via itemType and strips 'Group: ' prefix", () => {
    const facts = factsOf(
      makeItem({
        itemId: 200,
        itemName: "Group: ScriptName",
        itemType: ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
      }),
      []
    )
    expect(facts.itemKey?.kind).toBe("script")
  })

  it("returns undefined itemKey for motif chapters whose name does not match the lookup", () => {
    const facts = factsOf(
      makeItem({
        itemId: 300,
        itemName: "Unknown Motif",
        specializedItemType: ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
      }),
      []
    )
    expect(facts.itemKey).toBeUndefined()
  })

  it("returns undefined itemKey for non-knowledge items (CLI does not fabricate consumables)", () => {
    const facts = factsOf(makeItem({ itemId: 500, itemType: 1 }), [])
    expect(facts.itemKey).toBeUndefined()
  })
})

describe("classifyItemToNodeIds", () => {
  it("returns the miscellaneous fallback for items that match no signal branch", () => {
    const path = classifyItemToNodeIds(makeItem({ itemType: 0, filterType: 0 }))
    expect(path).toEqual(["miscellaneous", "other"])
  })

  it("emits a leaf-down chain for recipe items", () => {
    const path = classifyItemToNodeIds(
      makeItem({ itemId: 16424, itemType: ESO_ITEMTYPE_RECIPE, itemName: "Recipe X" })
    )
    expect(path.length).toBeGreaterThan(0)
    expect(path[0]).not.toBe(ALL_CATEGORIES_ID)
  })
})
