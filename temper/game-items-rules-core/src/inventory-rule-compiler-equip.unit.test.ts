import { describe, expect, it } from "bun:test"
import { classifyItem } from "@temper/game-items-core/classify-item"
import type { ClassifiableItem } from "@temper/game-items-core/item-category-tree-types"
import { compileRules } from "./inventory-rule-compiler"
import type { CompiledOrderedRule, CompiledRuleConfig } from "./inventory-rule-compiler-types"
import type { InventoryRuleSettings } from "./inventory-rule-types"

function createSettings(overrides: Partial<InventoryRuleSettings> = {}): InventoryRuleSettings {
  return { version: 2, rules: [], ...overrides }
}

function findRule(
  compiled: CompiledRuleConfig,
  categoryId: string,
  conditions?: Partial<CompiledOrderedRule>
): CompiledOrderedRule | undefined {
  return compiled.orderedRules.find((r) => {
    if (r.categoryId !== categoryId) return false
    if (conditions) {
      let key: keyof CompiledOrderedRule
      for (key in conditions) {
        if (r[key] !== conditions[key]) return false
      }
    }
    return true
  })
}

describe("compileRules", () => {
  it("preserves character-equip action in compiled output", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "character-equip",
            destination: "character-worn:1001",
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment")
    expect(rule).toEqual({
      id: "r1",
      categoryId: "equipment",
      action: "character-equip",
      destination: "character-worn:1001",
    })
  })

  it("preserves companion-equip action in compiled output", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "armor",
            action: "companion-equip",
            destination: "companion-worn:Mirri",
          },
        ],
      })
    )

    const rule = findRule(compiled, "armor")
    expect(rule).toEqual({
      id: "r1",
      categoryId: "armor",
      action: "companion-equip",
      destination: "companion-worn:Mirri",
    })
  })

  it("destination is carried inline on character-equip and companion-equip rule entries", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "weapons",
            action: "character-equip",
            destination: "character-worn:1001",
          },
          {
            id: "r2",
            categoryId: "armor",
            action: "companion-equip",
            destination: "companion-worn:Mirri",
            conditions: { stolen: "stolen" },
          },
        ],
      })
    )

    const weaponsRule = findRule(compiled, "weapons")
    expect(weaponsRule?.destination).toBe("character-worn:1001")

    const armorRule = findRule(compiled, "armor", { stolen: "stolen" })
    expect(armorRule?.destination).toBe("companion-worn:Mirri")
  })

  it("preserves equip actions in itemRules", () => {
    const compiled = compileRules(
      createSettings({
        itemRules: [
          {
            id: "ir1",
            itemId: 99999,
            itemName: "Test Sword",
            action: "character-equip",
            destination: "character-worn:1001",
          },
        ],
      })
    )

    expect(compiled.itemRules[99999]).toEqual({
      action: "character-equip",
      destination: "character-worn:1001",
    })
  })

  it("is-target-equip rule carries isTargetEquip and targetEquipScope inline", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "character-equip",
            destination: "character-worn:by-priority",
            conditions: { isTargetEquip: "is-target-equip" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { isTargetEquip: "is-target-equip" })
    expect(rule).toEqual({
      id: "r1",
      categoryId: "equipment",
      action: "character-equip",
      destination: "character-worn:by-priority",
      isTargetEquip: "is-target-equip",
      targetEquipScope: "any-character",
    })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "equipment" && !r.isTargetEquip)
    ).toHaveLength(0)
  })

  it("not-target-equip rule carries isTargetEquip and targetEquipScope inline", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "sell",
            conditions: { isTargetEquip: "not-target-equip" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { isTargetEquip: "not-target-equip" })
    expect(rule).toEqual({
      id: "r1",
      categoryId: "equipment",
      action: "sell",
      isTargetEquip: "not-target-equip",
      targetEquipScope: "current-character",
    })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "equipment" && !r.isTargetEquip)
    ).toHaveLength(0)
  })

  it("derives targetEquipScope from destination on isTargetEquip entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "weapons",
            action: "character-equip",
            destination: "character-worn:by-priority",
            conditions: {
              isTargetEquip: "is-target-equip",
            },
          },
        ],
      })
    )

    const rule = findRule(compiled, "weapons", { isTargetEquip: "is-target-equip" })
    expect(rule).toBeDefined()
    expect(rule?.isTargetEquip).toBe("is-target-equip")
    expect(rule?.targetEquipScope).toBe("any-character")
  })

  it("isTargetCompanionEquip rule carries condition and targetCompanionEquipScope inline", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "companion-equip",
            destination: "companion-worn:by-priority",
            conditions: { isTargetCompanionEquip: "is-target-companion-equip" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", {
      isTargetCompanionEquip: "is-target-companion-equip",
    })
    expect(rule).toEqual({
      id: "r1",
      categoryId: "equipment",
      action: "companion-equip",
      destination: "companion-worn:by-priority",
      isTargetCompanionEquip: "is-target-companion-equip",
      targetCompanionEquipScope: "any-companion",
    })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "equipment" && !r.isTargetCompanionEquip)
    ).toHaveLength(0)
  })

  it("destination is carried inline on isTargetEquip rule entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "move-to",
            destination: "character-worn:by-priority",
            conditions: { isTargetEquip: "is-target-equip" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { isTargetEquip: "is-target-equip" })
    expect(rule?.destination).toBe("character-worn:by-priority")
  })

  it("produces no isTargetEquip entries in orderedRules for empty rules", () => {
    const compiled = compileRules(createSettings())

    expect(compiled.orderedRules.filter((r) => r.isTargetEquip)).toHaveLength(0)
    expect(compiled.orderedRules.filter((r) => r.isTargetCompanionEquip)).toHaveLength(0)
  })
})

describe("classifyItem parity", () => {
  const fixtures: Array<{ name: string; item: ClassifiableItem; expectedLeaf: string }> = [
    {
      name: "iron dagger (weapon, 1H, dagger)",
      item: {
        filterType: 1,
        itemType: 1,
        equipType: 5,
        weaponType: 11,
        traitType: 1,
      },
      expectedLeaf: "Dagger",
    },
    {
      name: "iron sword (weapon, 1H, sword)",
      item: {
        filterType: 1,
        itemType: 1,
        equipType: 5,
        weaponType: 3,
        traitType: 1,
      },
      expectedLeaf: "Sword",
    },
    {
      name: "light robe (armor, light, chest)",
      item: {
        filterType: 2,
        itemType: 2,
        equipType: 3,
        armorType: 1,
      },
      expectedLeaf: "Robe / Jerkin",
    },
    {
      name: "necklace (jewelry)",
      item: {
        filterType: 25,
        itemType: 2,
        equipType: 2,
      },
      expectedLeaf: "Necklace",
    },
    {
      name: "trash item",
      item: {
        filterType: 9,
        itemType: 48,
      },
      expectedLeaf: "Trash",
    },
    {
      name: "companion sword (filterType 27, weaponType 3)",
      item: {
        filterType: 27,
        itemType: 1,
        equipType: 5,
        weaponType: 3,
        traitType: 34,
      },
      expectedLeaf: "Sword",
    },
    {
      name: "food recipe",
      item: {
        filterType: 3,
        itemType: 29,
        specializedItemType: 170,
      },
      expectedLeaf: "Food Recipes",
    },
    {
      name: "blacksmithing raw material",
      item: {
        filterType: 13,
        itemType: 35,
      },
      expectedLeaf: "Raw Materials",
    },
    {
      name: "potion",
      item: {
        filterType: 3,
        itemType: 7,
      },
      expectedLeaf: "Potions",
    },
  ]

  for (const { name, item, expectedLeaf } of fixtures) {
    it(`classifies "${name}" to path ending with "${expectedLeaf}"`, () => {
      const path = classifyItem(item)
      expect(path[path.length - 1]).toBe(expectedLeaf)
    })
  }
})
