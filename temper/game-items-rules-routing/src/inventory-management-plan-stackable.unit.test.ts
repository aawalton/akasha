import { describe, expect, it } from "bun:test"
import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeLocation,
  makeRule,
} from "./inventory-management-plan.test-utils"

function makeStackableItem(
  name: string,
  itemId: number,
  stackCount: number,
  quality = 2
): InventoryItemData {
  return {
    itemId,
    itemName: name,
    itemLink: "",
    quality,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount,
  }
}

function makeEquipmentItem(name: string, itemId: number, quality = 2): InventoryItemData {
  return {
    itemId,
    itemName: name,
    itemLink: "",
    quality,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    equipType: 1,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount: 1,
  }
}

describe("buildManagementPlan – stackable item merging", () => {
  it("merges same-char stackable deposits into 1 bank slot", () => {
    const charId = "1001"
    const ITEM_ID = 5000

    const stacks = [
      makeStackableItem("Iron Ore", ITEM_ID, 100),
      makeStackableItem("Iron Ore", ITEM_ID, 200),
      makeStackableItem("Iron Ore", ITEM_ID, 125),
    ]

    const rule = makeRule("r1", "move-to", "bank")
    const affected = stacks.map((item) => makeAffected(item, charId, "Azara", ESO_BAG_BACKPACK))
    const map = new Map([["r1", affected]])

    const backpackBag: Record<number, InventoryItemData> = {}
    for (const [i, stack] of stacks.entries()) backpackBag[i] = stack

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: backpackBag },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions).toHaveLength(1)

    const bankVenue = requireFirst(plan.sessions, "plan.sessions").venues.find(
      (v) => v.venue === "bank"
    )
    if (bankVenue === undefined) throw new Error("expected bankVenue to be defined")
    const allItems = bankVenue.actionGroups.flatMap((g) => g.items)
    expect(allItems).toHaveLength(1)
    expect(requireFirst(allItems, "allItems").stackCount).toBe(425)
    expect(bankVenue.slotCount).toBe(1)
  })

  it("merges cross-char stackable transfer into 1 bank slot", () => {
    const charA = "1001"
    const charB = "1002"
    const ITEM_ID = 5001

    const stacks = [
      makeStackableItem("Rubedite Ore", ITEM_ID, 50),
      makeStackableItem("Rubedite Ore", ITEM_ID, 75),
      makeStackableItem("Rubedite Ore", ITEM_ID, 100),
    ]

    const rule = makeRule("r1", "move-to", `character:${charB}`)
    const affected = stacks.map((item) => makeAffected(item, charA, "Azara", ESO_BAG_BACKPACK))
    const map = new Map([["r1", affected]])

    const backpackBag: Record<number, InventoryItemData> = {}
    for (const [i, stack] of stacks.entries()) backpackBag[i] = stack

    const inventory = makeInventory(
      {
        [charA]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: backpackBag },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)

    expect(plan.sessions.length).toBeGreaterThanOrEqual(2)

    const charASession = plan.sessions.find((s) => s.characterId === charA)
    if (charASession === undefined) throw new Error("expected charASession to be defined")
    const charABank = charASession.venues.find((v) => v.venue === "bank")
    if (charABank === undefined) throw new Error("expected charABank to be defined")
    expect(charABank.slotCount).toBe(1)

    const charBSession = plan.sessions.find((s) => s.characterId === charB)
    if (charBSession === undefined) throw new Error("expected charBSession to be defined")
    const charBBank = charBSession.venues.find((v) => v.venue === "bank")
    if (charBBank === undefined) throw new Error("expected charBBank to be defined")
    expect(charBBank.slotCount).toBe(1)
  })

  it("does not consume new bank slot when stackable item already exists in bank", () => {
    const charId = "1001"
    const ITEM_ID = 5002

    const bankItem = makeStackableItem("Iron Ore", ITEM_ID, 500)
    const bpItem = makeStackableItem("Iron Ore", ITEM_ID, 100)

    const rule = makeRule("r1", "move-to", "bank")
    const affected = [makeAffected(bpItem, charId, "Azara", ESO_BAG_BACKPACK)]
    const map = new Map([["r1", affected]])

    const bankBag: Record<number, InventoryItemData> = { 0: bankItem }

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: bpItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: bankBag }, { 6: 2 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions).toHaveLength(1)
    expect(plan.totalSlots).toBeGreaterThan(0)
  })

  it("handles mixed stackable and non-stackable items correctly", () => {
    const charId = "1001"
    const ORE_ID = 5003
    const SWORD_ID = 5004

    const oreStacks = [
      makeStackableItem("Iron Ore", ORE_ID, 100),
      makeStackableItem("Iron Ore", ORE_ID, 200),
    ]
    const sword = makeEquipmentItem("Iron Sword", SWORD_ID)

    const rule = makeRule("r1", "move-to", "bank")
    const affected = [
      ...oreStacks.map((item) => makeAffected(item, charId, "Azara", ESO_BAG_BACKPACK)),
      makeAffected(sword, charId, "Azara", ESO_BAG_BACKPACK),
    ]
    const map = new Map([["r1", affected]])

    const backpackBag: Record<number, InventoryItemData> = {
      0: requireFirst(oreStacks, "oreStacks"),
      1: requireFirst(oreStacks.slice(1), "oreStacks[1]"),
      2: sword,
    }

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: backpackBag },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions).toHaveLength(1)

    const bankVenue = requireFirst(plan.sessions, "plan.sessions").venues.find(
      (v) => v.venue === "bank"
    )
    if (bankVenue === undefined) throw new Error("expected bankVenue to be defined")
    const allItems = bankVenue.actionGroups.flatMap((g) => g.items)
    expect(allItems).toHaveLength(2)
    expect(bankVenue.slotCount).toBe(2)
  })

  it("does not merge different quality items with same itemId", () => {
    const charId = "1001"
    const ITEM_ID = 5005

    const normalQuality = makeStackableItem("Iron Ore", ITEM_ID, 100, 2)
    const fineQuality = makeStackableItem("Iron Ore", ITEM_ID, 50, 3)

    const rule = makeRule("r1", "move-to", "bank")
    const affected = [
      makeAffected(normalQuality, charId, "Azara", ESO_BAG_BACKPACK),
      makeAffected(fineQuality, charId, "Azara", ESO_BAG_BACKPACK),
    ]
    const map = new Map([["r1", affected]])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: normalQuality, 1: fineQuality } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    const bankVenue = requireFirst(plan.sessions, "plan.sessions").venues.find(
      (v) => v.venue === "bank"
    )
    if (bankVenue === undefined) throw new Error("expected bankVenue to be defined")
    const allItems = bankVenue.actionGroups.flatMap((g) => g.items)
    expect(allItems).toHaveLength(2)
    expect(allItems.find((i) => i.quality === 2)?.stackCount).toBe(100)
    expect(allItems.find((i) => i.quality === 3)?.stackCount).toBe(50)
  })

  it("does not merge stolen and non-stolen items with same itemId", () => {
    const charId = "1001"
    const ITEM_ID = 5006

    const normalItem = makeStackableItem("Iron Ore", ITEM_ID, 100)
    const stolenItem = { ...makeStackableItem("Iron Ore", ITEM_ID, 50), stolen: true }

    const bankRule = makeRule("r1", "move-to", "bank")
    const fenceRule = makeRule("r2", "fence-sell")

    const map = new Map([
      ["r1", [makeAffected(normalItem, charId, "Azara", ESO_BAG_BACKPACK)]],
      ["r2", [makeAffected(stolenItem, charId, "Azara", ESO_BAG_BACKPACK)]],
    ])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: normalItem, 1: stolenItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan(
      [bankRule, fenceRule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    expect(plan.sessions).toHaveLength(1)
    const venueTypes = requireFirst(plan.sessions, "plan.sessions").venues.map((v) => v.venue)
    expect(venueTypes).toContain("bank")
    expect(venueTypes).toContain("fence")
  })
})
