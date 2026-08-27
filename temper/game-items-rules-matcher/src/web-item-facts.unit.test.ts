import { describe, expect, it } from "bun:test"
import {
  ESO_ITEMTYPE_CONTAINER,
  ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
  ESO_ITEMTYPE_RECIPE,
  ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
} from "@temper/game-items-core/inventory-types"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeContext, makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import { ALL_CATEGORIES_ID } from "@temper/game-items-rules-core/inventory-rule-types"
import { webItemFactsFromClassified } from "./web-item-facts"

function classify(
  itemOverrides: Parameters<typeof makeItem>[0] = {},
  nodeIds: readonly string[] = ["miscellaneous", "other"]
): ClassifiedInventoryItem {
  return {
    item: makeItem(itemOverrides),
    locationKey: "1001",
    locationDisplayName: "Azara",
    nodeIds,
    bagId: 1,
  }
}

describe("webItemFactsFromClassified", () => {
  it("prepends ALL_CATEGORIES_ID to categoryNodeIds so 'all' rules resolve", () => {
    const facts = webItemFactsFromClassified(classify({}, ["equipment", "weapons", "sword"]))
    expect(facts.categoryNodeIds?.[0]).toBe(ALL_CATEGORIES_ID)
    expect(facts.categoryNodeIds).toContain("equipment")
    expect(facts.categoryNodeIds).toContain("sword")
  })

  it("propagates identity, numeric scan signals, and optional type signals", () => {
    const facts = webItemFactsFromClassified(
      classify({
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
      })
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
    expect(webItemFactsFromClassified(classify({ known: true })).known).toBe(true)
    expect(webItemFactsFromClassified(classify({ known: false })).known).toBe(false)
    expect(webItemFactsFromClassified(classify({})).known).toBeUndefined()
  })

  it("sets isKnowledgeItem authoritatively from static type signals", () => {
    expect(
      webItemFactsFromClassified(classify({ itemType: ESO_ITEMTYPE_RECIPE })).isKnowledgeItem
    ).toBe(true)
    expect(
      webItemFactsFromClassified(
        classify({ itemType: ESO_ITEMTYPE_CONTAINER, specializedItemType: 850 })
      ).isKnowledgeItem
    ).toBe(false)
  })

  it("propagates all six bag-slot status booleans as-is", () => {
    const facts = webItemFactsFromClassified(
      classify({
        stolen: true,
        bound: false,
        locked: true,
        reconstructed: false,
        transmuted: true,
        crafted: false,
      })
    )
    expect(facts.isStolen).toBe(true)
    expect(facts.isBound).toBe(false)
    expect(facts.isLocked).toBe(true)
    expect(facts.isReconstructed).toBe(false)
    expect(facts.isTransmuted).toBe(true)
    expect(facts.isCrafted).toBe(false)
  })

  it("preserves undefined for every bag-slot status when genuinely absent (legacy SV data)", () => {
    const facts = webItemFactsFromClassified(classify({}))
    expect(facts.isStolen).toBeUndefined()
    expect(facts.isBound).toBeUndefined()
    expect(facts.isLocked).toBeUndefined()
    expect(facts.isReconstructed).toBeUndefined()
    expect(facts.isTransmuted).toBeUndefined()
    expect(facts.isCrafted).toBeUndefined()
  })

  it("recognizes recipes via itemType and resolves resultItemId", () => {
    const facts = webItemFactsFromClassified(
      classify({ itemId: 100, itemName: "Some Recipe", itemType: ESO_ITEMTYPE_RECIPE })
    )
    expect(facts.itemKey?.kind).toBe("recipe")
    if (facts.itemKey?.kind === "recipe") {
      expect(facts.itemKey.resultItemId).toBe(100)
    }
  })

  it("recognizes scribing scripts via itemType", () => {
    const facts = webItemFactsFromClassified(
      classify({
        itemId: 200,
        itemName: "Group: ScriptName",
        itemType: ESO_ITEMTYPE_CRAFTED_ABILITY_SCRIPT,
      })
    )
    expect(facts.itemKey?.kind).toBe("script")
  })

  it("returns undefined itemKey for motif chapters whose name does not match the lookup", () => {
    const facts = webItemFactsFromClassified(
      classify({
        itemId: 300,
        itemName: "Unknown Motif",
        specializedItemType: ESO_SPECIALIZED_ITEMTYPE_MOTIF_CHAPTER,
      })
    )
    expect(facts.itemKey).toBeUndefined()
  })

  it("emits a consumable itemKey when context.wantedConsumables names this itemId", () => {
    const ctx = makeContext({})
    ctx.wantedConsumables.set(500, ["char-a"])

    const facts = webItemFactsFromClassified(classify({ itemId: 500 }), ctx)
    expect(facts.itemKey).toEqual({ kind: "consumable", itemId: 500 })
  })

  it("does not emit a consumable itemKey when context is omitted", () => {
    const facts = webItemFactsFromClassified(classify({ itemId: 500 }))
    expect(facts.itemKey).toBeUndefined()
  })

  it("does not emit a consumable itemKey when no character wants the item", () => {
    const ctx = makeContext({})
    const facts = webItemFactsFromClassified(classify({ itemId: 999 }), ctx)
    expect(facts.itemKey).toBeUndefined()
  })
})
