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
    if (!conditions) return true
    return matchesConditions(r, conditions)
  })
}

function matchesConditions(
  rule: CompiledOrderedRule,
  conditions: Partial<CompiledOrderedRule>
): boolean {
  let key: keyof CompiledOrderedRule
  for (key in conditions) {
    if (rule[key] !== conditions[key]) return false
  }
  return true
}

describe("compiled config lookups", () => {
  it("ancestor chain walk inherits parent rule to child", () => {
    const compiled = compileRules(
      createSettings({
        rules: [{ id: "r1", categoryId: "equipment", action: "sell" }],
      })
    )

    const item: ClassifiableItem = {
      filterType: 1,
      itemType: 1,
      equipType: 5,
      weaponType: 11,
      traitType: 1,
    }
    const path = classifyItem(item)
    expect(path[path.length - 1]).toBe("Dagger")

    const chain = new Set(["dagger", "one-handed", "weapons", "equipment"])
    let result: CompiledOrderedRule | undefined
    for (const r of compiled.orderedRules) {
      if (chain.has(r.categoryId)) {
        result = r
        break
      }
    }

    expect(result).toBeDefined()
    expect(result?.action).toBe("sell")
  })

  it("leaf rule overrides parent rule — user order determines priority", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          { id: "r1", categoryId: "dagger", action: "nothing" },
          { id: "r2", categoryId: "equipment", action: "sell" },
        ],
      })
    )

    const chain = new Set(["dagger", "one-handed", "weapons", "equipment"])
    let result: CompiledOrderedRule | undefined
    for (const r of compiled.orderedRules) {
      if (chain.has(r.categoryId)) {
        result = r
        break
      }
    }

    expect(result?.action).toBe("nothing")
  })

  it("stolen rule appears inline in orderedRules alongside base rule", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "treasure",
            action: "fence-sell",
            conditions: { stolen: "stolen" },
          },
          { id: "r2", categoryId: "treasure", action: "sell" },
        ],
      })
    )

    const stolenRule = findRule(compiled, "treasure", { stolen: "stolen" })
    expect(stolenRule?.action).toBe("fence-sell")

    const unconditionalRule = compiled.orderedRules.find(
      (r) => r.categoryId === "treasure" && !r.stolen
    )
    expect(unconditionalRule?.action).toBe("sell")
  })

  it("maxQuality condition is stored inline in compiled entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "weapons",
            action: "sell",
            conditions: { maxQuality: 2 },
          },
        ],
      })
    )

    const rule = findRule(compiled, "weapons")
    expect(rule).toBeDefined()
    expect(rule?.maxQuality).toBe(2)
  })

  it("item rule takes priority over category rule", () => {
    const compiled = compileRules(
      createSettings({
        rules: [{ id: "r1", categoryId: "consumables", action: "sell" }],
        itemRules: [
          {
            id: "ir1",
            itemId: 71073,
            itemName: "AvA Stamina Potion",
            action: "nothing",
          },
        ],
      })
    )

    expect(compiled.itemRules[71073]?.action).toBe("nothing")
    const categoryRule = findRule(compiled, "consumables")
    expect(categoryRule?.action).toBe("sell")
  })
})
