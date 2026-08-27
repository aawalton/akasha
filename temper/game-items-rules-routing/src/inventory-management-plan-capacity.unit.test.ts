import { describe, expect, it } from "bun:test"
import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeItem,
  makeLocation,
  makeRule,
} from "./inventory-management-plan.test-utils"

function requireAt<T>(arr: readonly T[], i: number, label?: string): T {
  return requireFirst(arr.slice(i, i + 1), label ?? `index ${i}`)
}

describe("buildManagementPlan – storage capacity", () => {
  it("blocks deposits when bank has zero free slots", () => {
    const charId = "1001"
    const item = makeItem("Deposit Me")

    const rule = makeRule("r1", "move-to", "bank")
    const affected = makeAffected(item, charId, "Azara", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const bankBag: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 10; i++) bankBag[i] = makeItem(`Bank Item ${i}`)

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: bankBag }, { 6: 10 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.totalSlots).toBe(0)
    expect(plan.sessions).toHaveLength(0)
  })

  it("orders withdrawals before deposits when bank is full (cross-character)", () => {
    const charA = "1001"
    const charB = "1002"

    const depositItem = makeItem("To Bank")
    const bankItem = makeItem("From Bank")

    const depositRule = makeRule("r-deposit", "move-to", "bank")
    const withdrawRule = makeRule("r-withdraw", "move-to", `character:${charB}`)
    const depositAffected = makeAffected(depositItem, charA, "Azara", ESO_BAG_BACKPACK)
    const withdrawAffected = makeAffected(bankItem, "Bank", "Bank", 6)
    const map = new Map([
      ["r-deposit", [depositAffected]],
      ["r-withdraw", [withdrawAffected]],
    ])

    const inventory = makeInventory(
      {
        [charA]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: depositItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 6: { 0: bankItem } }, { 6: 1 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan(
      [depositRule, withdrawRule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )

    expect(plan.sessions.length).toBeGreaterThanOrEqual(2)

    expect(requireAt(plan.sessions, 0).characterId).toBe(charB)
    expect(requireAt(plan.sessions, 1).characterId).toBe(charA)
  })

  it("handles same-character bank swap (withdraw then deposit)", () => {
    const charId = "1001"

    const depositItem = makeItem("To Bank")
    const bankItem = makeItem("From Bank")

    const depositRule = makeRule("r-deposit", "move-to", "bank")
    const sellRule = makeRule("r-sell", "sell")
    const depositAffected = makeAffected(depositItem, charId, "Azara", ESO_BAG_BACKPACK)
    const sellAffected = makeAffected(bankItem, "Bank", "Bank", 6)
    const map = new Map([
      ["r-deposit", [depositAffected]],
      ["r-sell", [sellAffected]],
    ])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: depositItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: { 0: bankItem } }, { 6: 1 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan(
      [depositRule, sellRule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )

    expect(plan.totalSlots).toBeGreaterThan(0)

    const bankVenues = plan.sessions.flatMap((s) => s.venues.filter((v) => v.venue === "bank"))
    expect(bankVenues.length).toBeGreaterThanOrEqual(1)
  })

  it("treats missing bagSizes as zero capacity (not unlimited)", () => {
    const charId = "1001"
    const item = makeItem("Deposit Me")

    const rule = makeRule("r1", "move-to", "bank")
    const affected = makeAffected(item, charId, "Azara", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.totalSlots).toBe(0)
    expect(plan.sessions).toHaveLength(0)
  })

  it("respects house storage capacity", () => {
    const charId = "1001"
    const item = makeItem("Store Me")
    const chestKey = "HouseBank:42:99"

    const rule = makeRule("r1", "move-to", "house-storage:99")
    const affected = makeAffected(item, charId, "Azara", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const chestBag: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 5; i++) chestBag[i] = makeItem(`Stored ${i}`)

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [chestKey]: makeLocation("My Chest", { 1: chestBag }, { 1: 5 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.totalSlots).toBe(0)
    expect(plan.sessions).toHaveLength(0)
  })

  it("respects guild bank capacity", () => {
    const charId = "1001"
    const guildKey = "Fighters Guild"
    const item = makeItem("Guild Deposit")

    const rule = makeRule("r1", "move-to", `guild-bank:${guildKey}`)
    const affected = makeAffected(item, charId, "Azara", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const guildBag: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 3; i++) guildBag[i] = makeItem(`Guild Item ${i}`)

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [guildKey]: makeLocation("Fighters Guild", { 1: guildBag }, { 1: 3 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.totalSlots).toBe(0)
    expect(plan.sessions).toHaveLength(0)
  })
})
