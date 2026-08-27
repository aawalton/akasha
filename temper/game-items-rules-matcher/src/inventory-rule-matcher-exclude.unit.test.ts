import { describe, expect, it } from "bun:test"
import { ESO_BAG_BACKPACK, ESO_BAG_WORN } from "@temper/game-items-core/eso-bag-constants"
import { ESO_ITEMTYPE_CONTAINER } from "@temper/game-items-core/inventory-types"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import type { CategoryRule } from "@temper/game-items-rules-core/inventory-rule-types"
import {
  getExcludeLocation,
  isAlreadyAtDestination,
  isContainerBlockedByAction,
  toAffectedItem,
} from "./inventory-rule-matcher-exclude"

function classified(
  overrides: Partial<Omit<ClassifiedInventoryItem, "item">> & {
    item?: Partial<Parameters<typeof makeItem>[0]>
  } = {}
): ClassifiedInventoryItem {
  return {
    item: makeItem(overrides.item ?? {}),
    locationKey: overrides.locationKey ?? "1001",
    locationDisplayName: overrides.locationDisplayName ?? "Azara",
    nodeIds: overrides.nodeIds ?? ["miscellaneous", "other"],
    bagId: overrides.bagId ?? ESO_BAG_BACKPACK,
  }
}

describe("getExcludeLocation", () => {
  it("returns undefined for rules without a destination", () => {
    const rule: Pick<CategoryRule, "action" | "destination"> = { action: "sell" }
    expect(getExcludeLocation(rule)).toBeUndefined()
  })

  it("returns undefined for character-equip when destination is by-priority", () => {
    expect(
      getExcludeLocation({ action: "character-equip", destination: "character-worn:by-priority" })
    ).toBeUndefined()
  })

  it("targets the worn bag when character-equip points at a specific char", () => {
    const exclude = getExcludeLocation({
      action: "character-equip",
      destination: "character-worn:1001",
    })
    expect(exclude).toEqual({ locationKey: "1001", bagId: ESO_BAG_WORN })
  })

  it("targets the Bank for move-to:bank", () => {
    expect(getExcludeLocation({ action: "move-to", destination: "bank" })).toEqual({
      locationKey: "Bank",
    })
  })

  it("returns undefined for guild-bank with no specific guild (any-guild)", () => {
    expect(getExcludeLocation({ action: "move-to", destination: "guild-bank" })).toBeUndefined()
  })

  it("targets the named guild for guild-bank:<guildName>", () => {
    expect(getExcludeLocation({ action: "move-to", destination: "guild-bank:My Guild" })).toEqual({
      locationKey: "My Guild",
    })
  })

  it("returns undefined for actions that don't have a destination concept", () => {
    expect(getExcludeLocation({ action: "sell", destination: "bank" })).toBeUndefined()
    expect(getExcludeLocation({ action: "deconstruct", destination: "bank" })).toBeUndefined()
  })
})

describe("isAlreadyAtDestination", () => {
  it("returns true when locationKey matches and no bag constraint", () => {
    const ci = classified({ locationKey: "Bank", bagId: 2 })
    expect(isAlreadyAtDestination(ci, { locationKey: "Bank" })).toBe(true)
  })

  it("returns false when locationKey differs", () => {
    const ci = classified({ locationKey: "1001", bagId: ESO_BAG_BACKPACK })
    expect(isAlreadyAtDestination(ci, { locationKey: "Bank" })).toBe(false)
  })

  it("requires both locationKey and bagId to match when bagId is constrained", () => {
    const wornOnChar = classified({ locationKey: "1001", bagId: ESO_BAG_WORN })
    const inBackpack = classified({ locationKey: "1001", bagId: ESO_BAG_BACKPACK })
    const exclude = { locationKey: "1001", bagId: ESO_BAG_WORN }

    expect(isAlreadyAtDestination(wornOnChar, exclude)).toBe(true)
    expect(isAlreadyAtDestination(inBackpack, exclude)).toBe(false)
  })

  it("matches by locationType for generic housing-storage targeting", () => {
    const inFurniture = classified({ locationKey: "FurnitureVault" })
    const inBank = classified({ locationKey: "Bank" })
    const exclude = { locationType: "housing-storage" as const }

    expect(isAlreadyAtDestination(inFurniture, exclude)).toBe(true)
    expect(isAlreadyAtDestination(inBank, exclude)).toBe(false)
  })

  it("matches HouseBank coffer suffix for house-storage:<chestId>", () => {
    const inCoffer = classified({ locationKey: "HouseBank:42" })
    const inOtherCoffer = classified({ locationKey: "HouseBank:99" })
    const exclude = { locationKeyEndsWith: ":42" }

    expect(isAlreadyAtDestination(inCoffer, exclude)).toBe(true)
    expect(isAlreadyAtDestination(inOtherCoffer, exclude)).toBe(false)
  })
})

describe("isContainerBlockedByAction", () => {
  it("returns false for non-container items", () => {
    const sword = { itemType: 2 }
    expect(isContainerBlockedByAction(sword, "fence-launder")).toBe(false)
    expect(isContainerBlockedByAction(sword, "fence-sell")).toBe(false)
  })

  it("blocks containers from fence-launder and fence-sell", () => {
    const container = { itemType: ESO_ITEMTYPE_CONTAINER }
    expect(isContainerBlockedByAction(container, "fence-launder")).toBe(true)
    expect(isContainerBlockedByAction(container, "fence-sell")).toBe(true)
  })

  it("blocks stolen containers from a plain `sell` (addon redirects to fence)", () => {
    const stolenContainer = { itemType: ESO_ITEMTYPE_CONTAINER, stolen: true }
    const cleanContainer = { itemType: ESO_ITEMTYPE_CONTAINER, stolen: false }

    expect(isContainerBlockedByAction(stolenContainer, "sell")).toBe(true)
    expect(isContainerBlockedByAction(cleanContainer, "sell")).toBe(false)
  })

  it("does not block containers from non-fence actions", () => {
    const container = { itemType: ESO_ITEMTYPE_CONTAINER }
    expect(isContainerBlockedByAction(container, "lock")).toBe(false)
    expect(isContainerBlockedByAction(container, "move-to")).toBe(false)
    expect(isContainerBlockedByAction(container, "open")).toBe(false)
  })
})

describe("toAffectedItem", () => {
  it("preserves item identity, location, bag, and the alreadyAtDestination flag", () => {
    const ci = classified({
      item: { itemId: 42 },
      locationKey: "Bank",
      locationDisplayName: "Bank",
      bagId: 2,
    })

    expect(toAffectedItem(ci, true)).toEqual({
      item: ci.item,
      locationKey: "Bank",
      locationDisplayName: "Bank",
      bagId: 2,
      alreadyAtDestination: true,
    })
    expect(toAffectedItem(ci, false).alreadyAtDestination).toBe(false)
  })
})
