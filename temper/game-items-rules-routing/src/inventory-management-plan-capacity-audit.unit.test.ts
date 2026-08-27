import { describe, expect, it } from "bun:test"
import { requireGet } from "../../../shared/utils-narrow/src/require-get"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeItem,
  makeLocation,
  makeRule,
} from "./inventory-management-plan.test-utils"
import { applyDestinationCapacityFilterWithAudit } from "./inventory-management-plan-capacity-filter"

function makeEquipItem(name: string, itemId: number): InventoryItemData {
  return { ...makeItem(name), itemId, equipType: 1, stackCount: 1 }
}

describe("applyDestinationCapacityFilterWithAudit", () => {
  it("reports the destination, free/needed slots, and dropped items when a bank overflows", () => {
    const charId = "1001"
    const item1 = makeEquipItem("Sword A", 101)
    const item2 = makeEquipItem("Sword B", 102)
    const item3 = makeEquipItem("Sword C", 103)

    const rule = { ...makeRule("r1", "move-to", "bank"), title: "Bank hoard" }
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

    const { filteredMap, audit } = applyDestinationCapacityFilterWithAudit(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )

    const fits = requireGet(filteredMap, "r1", "filtered").filter((i) => !i.alreadyAtDestination)
    expect(fits).toHaveLength(1)

    expect(audit.entries).toHaveLength(1)
    const entry = audit.entries[0]
    if (entry === undefined) throw new Error("expected an audit entry")
    expect(entry.destinationName).toBe("Bank")
    expect(entry.freeSlots).toBe(1)
    expect(entry.neededSlots).toBe(3)
    expect(entry.droppedStacks).toBe(2)
    expect(entry.droppedUnits).toBe(2)

    expect(entry.rules).toHaveLength(1)
    const ruleReport = entry.rules[0]
    if (ruleReport === undefined) throw new Error("expected a rule report")
    expect(ruleReport.ruleId).toBe("r1")
    expect(ruleReport.ruleTitle).toBe(null)
    expect(ruleReport.action).toBe("move-to")
    expect(ruleReport.droppedUnits).toBe(2)
    const droppedNames = ruleReport.items.map((i) => i.itemName).sort()
    expect(droppedNames).toEqual(["Sword B", "Sword C"])
  })

  it("is quiet (no audit entries) when every destination fits", () => {
    const charId = "1001"
    const item1 = makeEquipItem("Sword A", 101)
    const item2 = makeEquipItem("Sword B", 102)

    const rule = makeRule("r1", "move-to", "bank")
    const map = new Map([
      ["r1", [makeAffected(item1, charId, "Azara"), makeAffected(item2, charId, "Azara")]],
    ])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item1, 1: item2 } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 10 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const { filteredMap, audit } = applyDestinationCapacityFilterWithAudit(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    const fits = requireGet(filteredMap, "r1", "filtered").filter((i) => !i.alreadyAtDestination)
    expect(fits).toHaveLength(2)
    expect(audit.entries).toHaveLength(0)
  })

  it("aggregates per destination across multiple rules sharing the same budget", () => {
    const charId = "1001"
    const ruleA = { ...makeRule("rA", "move-to", "bank"), title: "Move A" }
    const ruleB = { ...makeRule("rB", "move-to", "bank"), title: "Move B" }
    const itemA1 = makeEquipItem("A1", 201)
    const itemA2 = makeEquipItem("A2", 202)
    const itemB1 = makeEquipItem("B1", 203)
    const itemB2 = makeEquipItem("B2", 204)

    const map = new Map([
      ["rA", [makeAffected(itemA1, charId, "Azara"), makeAffected(itemA2, charId, "Azara")]],
      ["rB", [makeAffected(itemB1, charId, "Azara"), makeAffected(itemB2, charId, "Azara")]],
    ])

    const bankBag: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 9; i++) bankBag[i] = makeItem(`Bank Item ${i}`)

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: itemA1, 1: itemA2, 2: itemB1, 3: itemB2 } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: bankBag }, { 6: 10 }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const { audit } = applyDestinationCapacityFilterWithAudit(
      [ruleA, ruleB].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )

    expect(audit.entries).toHaveLength(1)
    const entry = audit.entries[0]
    if (entry === undefined) throw new Error("expected an audit entry")
    expect(entry.freeSlots).toBe(1)
    expect(entry.neededSlots).toBe(4)
    expect(entry.droppedUnits).toBe(3)
    const ruleIds = entry.rules.map((r) => r.ruleId).sort()
    expect(ruleIds).toEqual(["rA", "rB"])
  })
})
