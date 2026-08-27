import { describe, expect, it } from "bun:test"
import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import type { CategoryRule } from "@temper/game-items-rules-core/inventory-rule-types"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeItem,
  makeItemRule,
  makeLocation,
  makeRule,
} from "./inventory-management-plan.test-utils"

function requireAt<T>(arr: readonly T[], i: number, label?: string): T {
  return requireFirst(arr.slice(i, i + 1), label ?? `index ${i}`)
}

describe("buildManagementPlan – basic", () => {
  it("returns empty plan when affectedItemsMap is null", () => {
    const plan = buildManagementPlan([], [], null, null)
    expect(plan.sessions).toHaveLength(0)
    expect(plan.totalSlots).toBe(0)
  })

  it("returns empty plan when no rules have affected items", () => {
    const plan = buildManagementPlan([], [], new Map(), null)
    expect(plan.sessions).toHaveLength(0)
  })

  it("produces a simple single-character sell plan", () => {
    const charId = "1001"
    const item = makeItem("Iron Sword")
    const rule = makeRule("r1", "sell")
    const affected = makeAffected(item, charId, "Azara", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      { [charId]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: { 0: item } }) },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions).toHaveLength(1)
    expect(requireAt(plan.sessions, 0).characterName).toBe("Azara")
    expect(requireAt(plan.sessions, 0).venues).toHaveLength(1)
    expect(requireAt(requireAt(plan.sessions, 0).venues, 0).venue).toBe("vendor")
    expect(plan.totalSlots).toBe(1)
  })

  it("handles bank retrieval + sell in correct venue order", () => {
    const charId = "1001"
    const bankItem = makeItem("Silver Ring")
    const rule = makeRule("r1", "sell")
    const affected = makeAffected(bankItem, "Bank", "Bank", 2)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charId]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 2: { 0: bankItem } }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions).toHaveLength(1)

    const venues = requireAt(plan.sessions, 0).venues
    expect(venues.length).toBeGreaterThanOrEqual(1)
    const venueTypes = venues.map((v) => v.venue)
    const bankIdx = venueTypes.indexOf("bank")
    const vendorIdx = venueTypes.indexOf("vendor")
    if (bankIdx >= 0 && vendorIdx >= 0) {
      expect(bankIdx).toBeLessThan(vendorIdx)
    }
  })

  it("splits retrieval into multiple venue trips when backpack is constrained", () => {
    const charId = "1001"
    const backpackItems: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 198; i++) {
      backpackItems[i] = makeItem(`Filler ${i}`)
    }

    const bankItems: AffectedItem[] = []
    for (let i = 0; i < 5; i++) {
      const bankItem = makeItem(`Bank Item ${i}`)
      bankItems.push(makeAffected(bankItem, "Bank", "Bank", 2))
    }

    const rule = makeRule("r1", "sell")
    const map = new Map([["r1", bankItems]])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: backpackItems },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 2: {} }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions).toHaveLength(1)

    const venues = requireAt(plan.sessions, 0).venues
    expect(venues.length).toBeGreaterThan(2)

    expect(plan.totalSlots).toBe(10)
  })

  it("is unconstrained when bagSizes is missing (backward compat)", () => {
    const charId = "1001"
    const bankItems: AffectedItem[] = []
    for (let i = 0; i < 50; i++) {
      bankItems.push(makeAffected(makeItem(`Item ${i}`), "Bank", "Bank", 2))
    }

    const rule = makeRule("r1", "sell")
    const map = new Map([["r1", bankItems]])

    const inventory = makeInventory(
      {
        [charId]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }),
        Bank: makeLocation("Bank", { 2: {} }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions).toHaveLength(1)
    expect(requireAt(plan.sessions, 0).venues).toHaveLength(2)
    expect(requireAt(requireAt(plan.sessions, 0).venues, 0).venue).toBe("bank")
    expect(requireAt(requireAt(plan.sessions, 0).venues, 1).venue).toBe("vendor")
  })

  it("processes deposits before retrievals to free backpack slots", () => {
    const charId = "1001"
    const backpackItem = makeItem("Deposit Me")
    const backpackItems: Record<number, InventoryItemData> = {}
    for (let i = 0; i < 199; i++) {
      backpackItems[i] = i === 0 ? backpackItem : makeItem(`Filler ${i}`)
    }

    const depositAffected = makeAffected(backpackItem, charId, "Azara", ESO_BAG_BACKPACK)
    const bankAffected: AffectedItem[] = []
    for (let i = 0; i < 3; i++) {
      bankAffected.push(makeAffected(makeItem(`Retrieve ${i}`), "Bank", "Bank", 2))
    }

    const depositRule = makeRule("r-deposit", "move-to", "bank")
    const sellRule = makeRule("r-sell", "sell")
    const map = new Map([
      ["r-deposit", [depositAffected]],
      ["r-sell", bankAffected],
    ])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: backpackItems },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 2: {} }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan(
      [depositRule, sellRule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    expect(plan.sessions).toHaveLength(1)
    expect(plan.totalSlots).toBeGreaterThan(0)
  })

  it("handles cross-character transfers with source first", () => {
    const charA = "1001"
    const charB = "1002"
    const item = makeItem("Transfer Sword")

    const rule = makeRule("r1", "move-to", `character:${charB}`)
    const affected = makeAffected(item, charA, "Azara", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions.length).toBeGreaterThanOrEqual(2)
    expect(requireAt(plan.sessions, 0).characterId).toBe(charA)
    expect(requireAt(plan.sessions, 1).characterId).toBe(charB)
  })

  it("assigns incrementing visitNumber for repeated character sessions", () => {
    const charId = "1001"
    const backpackSellItems: AffectedItem[] = []
    const bankRetrieveItems: AffectedItem[] = []
    const backpackBag: Record<number, InventoryItemData> = {}

    for (let i = 0; i < 10; i++) {
      const itm = makeItem(`Backpack ${i}`)
      backpackBag[i] = itm
      if (i < 2) {
        backpackSellItems.push(makeAffected(itm, charId, "Azara", ESO_BAG_BACKPACK))
      }
    }
    for (let i = 0; i < 4; i++) {
      bankRetrieveItems.push(makeAffected(makeItem(`Bank ${i}`), "Bank", "Bank", 2))
    }

    const sellRule = makeRule("r-sell", "sell")
    const retrieveSellRule = makeRule("r-bank-sell", "sell")
    const map = new Map([
      ["r-sell", backpackSellItems],
      ["r-bank-sell", bankRetrieveItems],
    ])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: backpackBag },
          { [ESO_BAG_BACKPACK]: 10 }
        ),
        Bank: makeLocation("Bank", { 2: {} }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan(
      [sellRule, retrieveSellRule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory
    )
    for (let i = 0; i < plan.sessions.length; i++) {
      expect(requireAt(plan.sessions, i).visitNumber).toBe(i + 1)
    }
  })

  it("processes item rules alongside category rules", () => {
    const charId = "1001"
    const specificItem = makeItem("Special Sword")
    specificItem.itemId = 42

    const catRule = makeRule("r-cat", "sell")
    const itemRule = makeItemRule("r-item", 42, "Special Sword", "deconstruct")

    const catAffected = makeAffected(makeItem("Generic Item"), charId, "Azara", ESO_BAG_BACKPACK)
    const itemAffected = makeAffected(specificItem, charId, "Azara", ESO_BAG_BACKPACK)

    const map = new Map([
      ["r-cat", [catAffected]],
      ["r-item", [itemAffected]],
    ])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: catAffected.item, 1: specificItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan(
      [catRule].map(compileCategoryRuleToOrdered),
      [itemRule],
      map,
      inventory
    )
    expect(plan.sessions).toHaveLength(1)
    const venueTypes = requireAt(plan.sessions, 0).venues.map((v) => v.venue)
    expect(venueTypes).toContain("vendor")
    expect(venueTypes).toContain("crafting-station")
  })

  it("skips inactive rules and non-physical actions", () => {
    const charId = "1001"
    const item1 = makeItem("Item A")
    const item2 = makeItem("Item B")
    const item3 = makeItem("Item C")

    const rules: CategoryRule[] = [
      { ...makeRule("r1", "sell"), active: false },
      makeRule("r2", "nothing"),
      makeRule("r3", "lock"),
      makeRule("r4", "sell"),
    ]

    const map = new Map([
      ["r1", [makeAffected(item1, charId, "Azara", ESO_BAG_BACKPACK)]],
      ["r2", [makeAffected(item2, charId, "Azara", ESO_BAG_BACKPACK)]],
      ["r3", [makeAffected(item3, charId, "Azara", ESO_BAG_BACKPACK)]],
      ["r4", [makeAffected(makeItem("Item D"), charId, "Azara", ESO_BAG_BACKPACK)]],
    ])

    const inventory = makeInventory(
      { [charId]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }) },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan(rules.map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.totalSlots).toBe(1)
  })

  it("skips already-at-destination items", () => {
    const charId = "1001"
    const item = makeItem("Already There")
    const affected: AffectedItem = {
      ...makeAffected(item, charId, "Azara", ESO_BAG_BACKPACK),
      alreadyAtDestination: true,
    }
    const rule = makeRule("r1", "sell")
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      { [charId]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }) },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions).toHaveLength(0)
  })

  it("excludes house-storage items already at destination from move-to house-storage", () => {
    const charId = "1001"
    const vaultItem = makeItem("Stored Motif")
    const backpackItem = makeItem("Loose Motif")

    const rule = makeRule("r1", "move-to", "house-storage")

    const vaultAffected: AffectedItem = {
      ...makeAffected(vaultItem, "HouseBank:House1:Chest1", "Furniture Vault", 0),
      alreadyAtDestination: true,
    }
    const backpackAffected = makeAffected(backpackItem, charId, "Azara", ESO_BAG_BACKPACK)

    const map = new Map([["r1", [vaultAffected, backpackAffected]]])

    const inventory = makeInventory(
      {
        [charId]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: backpackItem } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        "HouseBank:House1:Chest1": makeLocation("Furniture Vault", { 0: { 0: vaultItem } }),
      },
      { [charId]: { displayName: "Azara" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.totalSlots).toBe(1)
    expect(plan.sessions).toHaveLength(1)
    expect(requireAt(requireAt(plan.sessions, 0).venues, 0).venue).toBe("house-storage")
  })
})
