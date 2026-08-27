import { describe, expect, it } from "bun:test"
import { requireGet } from "../../../shared/utils-narrow/src/require-get"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeItem,
  makeLocation,
  makeRule,
} from "./inventory-management-plan.test-utils"
import { applyDestinationCapacityFilter } from "./inventory-management-plan-capacity-filter"

function makeStackableItem(name: string, itemId: number, stackCount = 1): InventoryItemData {
  return { ...makeItem(name), itemId, stackCount }
}

function makeEquipItem(name: string, itemId: number): InventoryItemData {
  return { ...makeItem(name), itemId, equipType: 1 }
}

describe("applyDestinationCapacityFilter", () => {
  it("caps items when bank has limited free slots", () => {
    const charId = "1001"
    const item1 = makeEquipItem("Sword A", 101)
    const item2 = makeEquipItem("Sword B", 102)
    const item3 = makeEquipItem("Sword C", 103)

    const rule = makeRule("r1", "move-to", "bank")
    const affected: AffectedItem[] = [
      makeAffected(item1, charId, "Azara"),
      makeAffected(item2, charId, "Azara"),
      makeAffected(item3, charId, "Azara"),
    ]
    const map = new Map([["r1", affected]])

    const bankBag: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 8; i++) bankBag[i] = makeItem(`Bank Item ${i}`)

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item1, 1: item2, 2: item3 } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: bankBag }, { 6: 10 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const filtered = applyDestinationCapacityFilter(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    const result = requireGet(filtered, "r1", "filtered")
    const actionable = result.filter((i) => !i.alreadyAtDestination)
    expect(actionable).toHaveLength(2)
  })

  it("allows stackable items to bypass capacity when already in bank", () => {
    const charId = "1001"
    const existingBankItem = makeStackableItem("Potion", 200, 5)
    const newItem1 = makeStackableItem("Potion", 200, 3)
    const newItem2 = makeStackableItem("Potion", 200, 2)

    const rule = makeRule("r1", "move-to", "bank")
    const affected: AffectedItem[] = [
      makeAffected(newItem1, charId, "Azara"),
      makeAffected(newItem2, charId, "Azara"),
    ]
    const map = new Map([["r1", affected]])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: newItem1, 1: newItem2 } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: { 0: existingBankItem } }, { 6: 1 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const filtered = applyDestinationCapacityFilter(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    const result = requireGet(filtered, "r1", "filtered")
    const actionable = result.filter((i) => !i.alreadyAtDestination)
    expect(actionable).toHaveLength(2)
  })

  it("removes excess items from later rules", () => {
    const charId = "1001"
    const item1 = makeEquipItem("Sword A", 101)
    const item2 = makeEquipItem("Sword B", 102)
    const item3 = makeEquipItem("Sword C", 103)
    const item4 = makeEquipItem("Sword D", 104)
    const item5 = makeEquipItem("Sword E", 105)

    const moveRule = makeRule("r1", "move-to", "bank")
    const sellRule = makeRule("r2", "sell")

    const moveAffected: AffectedItem[] = [
      makeAffected(item1, charId, "Azara"),
      makeAffected(item2, charId, "Azara"),
      makeAffected(item3, charId, "Azara"),
      makeAffected(item4, charId, "Azara"),
      makeAffected(item5, charId, "Azara"),
    ]
    const sellAffected: AffectedItem[] = [
      makeAffected(item3, charId, "Azara"),
      makeAffected(item4, charId, "Azara"),
      makeAffected(item5, charId, "Azara"),
    ]
    const map = new Map([
      ["r1", moveAffected],
      ["r2", sellAffected],
    ])

    const bankBag: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 8; i++) bankBag[i] = makeItem(`Bank Item ${i}`)

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          {
            [ESO_BAG_BACKPACK]: {
              0: item1,
              1: item2,
              2: item3,
              3: item4,
              4: item5,
            },
          },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: bankBag }, { 6: 10 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const filtered = applyDestinationCapacityFilter(
      [moveRule, sellRule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )

    const moveResult = requireGet(filtered, "r1", "filtered").filter((i) => !i.alreadyAtDestination)
    expect(moveResult).toHaveLength(2)

    const sellResult = requireGet(filtered, "r2", "filtered")
    expect(sellResult).toHaveLength(0)
  })

  it("shares capacity budget across multiple rules targeting same destination", () => {
    const charId = "1001"
    const item1 = makeEquipItem("Item A", 201)
    const item2 = makeEquipItem("Item B", 202)
    const item3 = makeEquipItem("Item C", 203)
    const ruleA = makeRule("rA", "move-to", "bank")
    const ruleB = makeRule("rB", "move-to", "bank")

    const itemD = makeEquipItem("Item D", 204)
    const itemE = makeEquipItem("Item E", 205)

    const map = new Map([
      [
        "rA",
        [
          makeAffected(item1, charId, "Azara"),
          makeAffected(item2, charId, "Azara"),
          makeAffected(item3, charId, "Azara"),
        ],
      ],
      ["rB", [makeAffected(itemD, charId, "Azara"), makeAffected(itemE, charId, "Azara")]],
    ])

    const bankBag: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 6; i++) bankBag[i] = makeItem(`Bank Item ${i}`)

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          {
            [ESO_BAG_BACKPACK]: {
              0: item1,
              1: item2,
              2: item3,
              3: itemD,
              4: itemE,
            },
          },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: bankBag }, { 6: 10 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const filtered = applyDestinationCapacityFilter(
      [ruleA, ruleB].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )

    const resultA = requireGet(filtered, "rA", "filtered").filter((i) => !i.alreadyAtDestination)
    expect(resultA).toHaveLength(3)

    const resultB = requireGet(filtered, "rB", "filtered").filter((i) => !i.alreadyAtDestination)
    expect(resultB).toHaveLength(1)
  })

  it("treats unknown storageKey as unconstrained (skips filtering)", () => {
    const charId = "1001"
    const item1 = makeEquipItem("Item A", 301)
    const item2 = makeEquipItem("Item B", 302)

    const rule = makeRule("r1", "move-to", `character:${charId}`)

    const map = new Map([
      ["r1", [makeAffected(item1, "Bank", "Bank", 6), makeAffected(item2, "Bank", "Bank", 6)]],
    ])

    const inventory = makeInventory(
      {
        [charId]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 6: { 0: item1, 1: item2 } }, { 6: 10 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const filtered = applyDestinationCapacityFilter(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    const result = requireGet(filtered, "r1", "filtered").filter((i) => !i.alreadyAtDestination)
    expect(result).toHaveLength(2)
  })

  it("handles mixed stackable and non-stackable items", () => {
    const charId = "1001"
    const stackableItem = makeStackableItem("Potion", 400, 10)
    const equipItem1 = makeEquipItem("Sword A", 401)
    const equipItem2 = makeEquipItem("Sword B", 402)

    const rule = makeRule("r1", "move-to", "bank")
    const map = new Map([
      [
        "r1",
        [
          makeAffected(stackableItem, charId, "Azara"),
          makeAffected(equipItem1, charId, "Azara"),
          makeAffected(equipItem2, charId, "Azara"),
        ],
      ],
    ])

    const existingPotion = makeStackableItem("Potion", 400, 5)
    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          {
            [ESO_BAG_BACKPACK]: { 0: stackableItem, 1: equipItem1, 2: equipItem2 },
          },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: { 0: existingPotion } }, { 6: 2 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const filtered = applyDestinationCapacityFilter(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    const result = requireGet(filtered, "r1", "filtered").filter((i) => !i.alreadyAtDestination)
    expect(result).toHaveLength(2)
    expect(result.some((r) => r.item.itemId === 400)).toBe(true)
  })

  it("applies same capacity logic for stock action", () => {
    const charId = "1001"
    const item1 = makeEquipItem("Item A", 501)
    const item2 = makeEquipItem("Item B", 502)
    const item3 = makeEquipItem("Item C", 503)

    const rule = makeRule("r1", "stock", "bank")
    const map = new Map([
      [
        "r1",
        [
          makeAffected(item1, charId, "Azara"),
          makeAffected(item2, charId, "Azara"),
          makeAffected(item3, charId, "Azara"),
        ],
      ],
    ])

    const bankBag: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 9; i++) bankBag[i] = makeItem(`Bank Item ${i}`)

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item1, 1: item2, 2: item3 } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: bankBag }, { 6: 10 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const filtered = applyDestinationCapacityFilter(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    const result = requireGet(filtered, "r1", "filtered").filter((i) => !i.alreadyAtDestination)
    expect(result).toHaveLength(1)
  })

  it("does not create phantom sessions from excess items", () => {
    const charId = "1001"
    const item1 = makeEquipItem("Sword A", 601)
    const item2 = makeEquipItem("Sword B", 602)
    const item3 = makeEquipItem("Sword C", 603)

    const rule = makeRule("r1", "move-to", "bank")
    const affected: AffectedItem[] = [
      makeAffected(item1, charId, "Azara"),
      makeAffected(item2, charId, "Azara"),
      makeAffected(item3, charId, "Azara"),
    ]
    const map = new Map([["r1", affected]])

    const bankBag: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 9; i++) bankBag[i] = makeItem(`Bank Item ${i}`)

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item1, 1: item2, 2: item3 } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: bankBag }, { 6: 10 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const filtered = applyDestinationCapacityFilter(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      filtered,
      inventory
    )

    expect(plan.totalSlots).toBe(1)
    expect(plan.sessions).toHaveLength(1)
  })
})
