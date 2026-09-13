import { describe, expect, test } from "bun:test"
import {
  ESO_BAG_BACKPACK,
  ESO_BAG_WORN,
} from "akasha/temper/items-core/modules/eso-bag-constants/eso-bag-constants.module.code.ts"
import {
  ESO_ITEMTYPE_CONTAINER,
  type InventoryItemData,
} from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import type { ClassifiedInventoryItem } from "akasha/temper/items-rules-core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { makeItem } from "akasha/temper/items-rules-core/modules/inventory-rule-test-utils/inventory-rule-test-utils.module.code.ts"
import type { CategoryRule } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  getExcludeLocation,
  isAlreadyAtDestination,
  isContainerBlockedByAction,
  toAffectedItem,
} from "akasha/temper/items-rules-matcher/modules/inventory-rule-matcher-exclude/inventory-rule-matcher-exclude.module.code.ts"

type Overrides = Partial<Omit<ClassifiedInventoryItem, "item">> & {
  readonly item?: Partial<InventoryItemData>
}

function classified(overrides: Overrides = {}): ClassifiedInventoryItem {
  return {
    item: makeItem(overrides.item ?? {}),
    locationKey: overrides.locationKey ?? "1001",
    locationDisplayName: overrides.locationDisplayName ?? "Azara",
    nodeIds: overrides.nodeIds ?? ["miscellaneous", "other"],
    bagId: overrides.bagId ?? ESO_BAG_BACKPACK,
  }
}

describe("Where a rule sends an item is read off that rule's action and destination.", () => {
  test("a rule naming no destination sends the item nowhere", () => {
    const rule: Pick<CategoryRule, "action" | "destination"> = { action: "sell" }

    expect(getExcludeLocation(rule)).toBeUndefined()
  })

  test("equipping by priority names no one character to exclude", () => {
    expect(
      getExcludeLocation({ action: "character-equip", destination: "character-worn:by-priority" })
    ).toBeUndefined()
  })

  test("equipping a named character targets that character's worn bag", () => {
    expect(
      getExcludeLocation({ action: "character-equip", destination: "character-worn:1001" })
    ).toEqual({ locationKey: "1001", bagId: ESO_BAG_WORN })
  })

  test("moving to the bank targets the Bank", () => {
    expect(getExcludeLocation({ action: "move-to", destination: "bank" })).toEqual({
      locationKey: "Bank",
    })
  })

  test("a guild bank with no guild named targets nothing", () => {
    expect(getExcludeLocation({ action: "move-to", destination: "guild-bank" })).toBeUndefined()
  })

  test("a guild bank with a guild named targets that guild", () => {
    expect(getExcludeLocation({ action: "move-to", destination: "guild-bank:My Guild" })).toEqual({
      locationKey: "My Guild",
    })
  })

  test("an action that sends an item nowhere targets nothing", () => {
    expect(getExcludeLocation({ action: "sell", destination: "bank" })).toBeUndefined()
    expect(getExcludeLocation({ action: "deconstruct", destination: "bank" })).toBeUndefined()
  })
})

describe("An item already at its destination is marked rather than moved.", () => {
  test("an item whose location is the target and no bag is asked for is already there", () => {
    const banked = classified({ locationKey: "Bank", bagId: 2 })

    expect(isAlreadyAtDestination(banked, { locationKey: "Bank" })).toBe(true)
  })

  test("an item somewhere else is not already there", () => {
    const held = classified({ locationKey: "1001", bagId: ESO_BAG_BACKPACK })

    expect(isAlreadyAtDestination(held, { locationKey: "Bank" })).toBe(false)
  })

  test("a target naming a bag wants the location and the bag both", () => {
    const worn = classified({ locationKey: "1001", bagId: ESO_BAG_WORN })
    const carried = classified({ locationKey: "1001", bagId: ESO_BAG_BACKPACK })
    const exclude = { locationKey: "1001", bagId: ESO_BAG_WORN }

    expect(isAlreadyAtDestination(worn, exclude)).toBe(true)
    expect(isAlreadyAtDestination(carried, exclude)).toBe(false)
  })

  test("a target naming a kind of place takes any location of that kind", () => {
    const exclude = { locationType: "housing-storage" as const }
    const vault = classified({ locationKey: "FurnitureVault" })
    const bank = classified({ locationKey: "Bank" })

    expect(isAlreadyAtDestination(vault, exclude)).toBe(true)
    expect(isAlreadyAtDestination(bank, exclude)).toBe(false)
  })

  test("a target naming one chest takes the house bank coffer that chest closes", () => {
    const exclude = { locationKeyEndsWith: ":42" }
    const asked = classified({ locationKey: "HouseBank:42" })
    const other = classified({ locationKey: "HouseBank:99" })

    expect(isAlreadyAtDestination(asked, exclude)).toBe(true)
    expect(isAlreadyAtDestination(other, exclude)).toBe(false)
  })
})

describe("A container the rule's action cannot open is set aside.", () => {
  test("an item that is no container is never set aside", () => {
    const sword = { itemType: 2 }

    expect(isContainerBlockedByAction(sword, "fence-launder")).toBe(false)
    expect(isContainerBlockedByAction(sword, "fence-sell")).toBe(false)
  })

  test("a container is set aside from laundering and from fencing", () => {
    const container = { itemType: ESO_ITEMTYPE_CONTAINER }

    expect(isContainerBlockedByAction(container, "fence-launder")).toBe(true)
    expect(isContainerBlockedByAction(container, "fence-sell")).toBe(true)
  })

  test("a stolen container is set aside from a plain sale the addon sends to the fence", () => {
    const stolen = { itemType: ESO_ITEMTYPE_CONTAINER, stolen: true }
    const clean = { itemType: ESO_ITEMTYPE_CONTAINER, stolen: false }

    expect(isContainerBlockedByAction(stolen, "sell")).toBe(true)
    expect(isContainerBlockedByAction(clean, "sell")).toBe(false)
  })

  test("a container is left alone by an action that opens nothing", () => {
    const container = { itemType: ESO_ITEMTYPE_CONTAINER }

    expect(isContainerBlockedByAction(container, "lock")).toBe(false)
    expect(isContainerBlockedByAction(container, "move-to")).toBe(false)
    expect(isContainerBlockedByAction(container, "open")).toBe(false)
  })
})

describe("An affected item carries the item, where it lies, and whether it is there.", () => {
  test("the item, its location, its bag and the flag all come through", () => {
    const held = classified({
      item: { itemId: 42 },
      locationKey: "Bank",
      locationDisplayName: "Bank",
      bagId: 2,
    })

    expect(toAffectedItem(held, true)).toEqual({
      item: held.item,
      locationKey: "Bank",
      locationDisplayName: "Bank",
      bagId: 2,
      alreadyAtDestination: true,
    })
    expect(toAffectedItem(held, false).alreadyAtDestination).toBe(false)
  })
})
