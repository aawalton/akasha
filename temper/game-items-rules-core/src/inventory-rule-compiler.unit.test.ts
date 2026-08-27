import { describe, expect, it } from "bun:test"
import { compileRules } from "./inventory-rule-compiler"
import type { CompiledOrderedRule, CompiledRuleConfig } from "./inventory-rule-compiler-types"
import { ALL_CATEGORIES_ID, type InventoryRuleSettings } from "./inventory-rule-types"

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
  it("produces a single-entry orderedRules (just the implicit terminal) for empty rules", () => {
    const compiled = compileRules(createSettings())

    expect(compiled.orderedRules).toHaveLength(1)
    expect(compiled.orderedRules[0]).toEqual({ categoryId: ALL_CATEGORIES_ID, action: "nothing" })
    expect(Object.keys(compiled.itemRules)).toHaveLength(0)
    expect(compiled.version).toBe(3)
  })

  it("places a leaf rule in orderedRules at its direct target", () => {
    const compiled = compileRules(
      createSettings({
        rules: [{ id: "r1", categoryId: "dagger", action: "sell" }],
      })
    )

    const rule = findRule(compiled, "dagger")
    expect(rule).toEqual({ id: "r1", categoryId: "dagger", action: "sell" })
    expect(compiled.orderedRules).toHaveLength(2)
  })

  it("places a parent rule in orderedRules at the parent node", () => {
    const compiled = compileRules(
      createSettings({
        rules: [{ id: "r1", categoryId: "equipment", action: "sell" }],
      })
    )

    const rule = findRule(compiled, "equipment")
    expect(rule).toEqual({ id: "r1", categoryId: "equipment", action: "sell" })
  })

  it("preserves user order: leaf rule appears before parent rule in orderedRules", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          { id: "r1", categoryId: "dagger", action: "nothing" },
          { id: "r2", categoryId: "equipment", action: "sell" },
        ],
      })
    )

    expect(compiled.orderedRules).toHaveLength(3)
    expect(compiled.orderedRules[0]).toEqual({ id: "r1", categoryId: "dagger", action: "nothing" })
    expect(compiled.orderedRules[1]).toEqual({ id: "r2", categoryId: "equipment", action: "sell" })
  })

  it("puts stolen condition inline on the rule entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "treasure",
            action: "fence-sell",
            conditions: { stolen: "stolen" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "treasure", { stolen: "stolen" })
    expect(rule).toBeDefined()
    expect(rule?.action).toBe("fence-sell")
    expect(rule?.stolen).toBe("stolen")
  })

  it("puts crafted condition inline on the rule entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "potions",
            action: "destroy",
            conditions: { crafted: "crafted" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "potions", { crafted: "crafted" })
    expect(rule).toBeDefined()
    expect(rule?.action).toBe("destroy")
    expect(rule?.crafted).toBe("crafted")
  })

  it("carries conditions (maxQuality, maxLevel, setSourceTypes) in entries", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "weapons",
            action: "sell",
            conditions: {
              maxQuality: 3,
              maxLevel: 50,
              setSourceTypes: ["overland", "crafted"],
            },
          },
        ],
      })
    )

    const rule = findRule(compiled, "weapons")
    expect(rule).toEqual({
      id: "r1",
      categoryId: "weapons",
      action: "sell",
      maxQuality: 3,
      maxLevel: 50,
      setSourceTypes: ["overland", "crafted"],
    })
  })

  it("puts traits condition inline on the rule entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "weapons",
            action: "sell",
            conditions: { traits: ["intricate", "ornate"] },
          },
        ],
      })
    )

    const rule = findRule(compiled, "weapons")
    expect(rule).toBeDefined()
    expect(rule?.traits).toEqual(["intricate", "ornate"])
    expect(rule?.action).toBe("sell")
  })

  it("destination is carried inline on the rule entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "trash",
            action: "move-to",
            destination: "bank",
          },
          {
            id: "r2",
            categoryId: "potions",
            action: "move-to",
            destination: "house-storage:12345",
            conditions: { stolen: "stolen" },
          },
        ],
      })
    )

    const trashRule = findRule(compiled, "trash")
    expect(trashRule?.destination).toBe("bank")

    const potionsRule = findRule(compiled, "potions", { stolen: "stolen" })
    expect(potionsRule?.destination).toBe("house-storage:12345")
  })

  it("compiles itemRules", () => {
    const compiled = compileRules(
      createSettings({
        itemRules: [
          {
            id: "ir1",
            itemId: 33235,
            itemName: "Wabbajack",
            action: "nothing",
          },
          {
            id: "ir2",
            itemId: 42878,
            itemName: "Used Bait",
            action: "sell",
          },
        ],
      })
    )

    expect(compiled.itemRules[33235]).toEqual({ action: "nothing" })
    expect(compiled.itemRules[42878]).toEqual({ action: "sell" })
  })

  it("carries comparison operators in compiled entries", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "weapons",
            action: "sell",
            conditions: { maxQuality: 3, qualityOp: ">=", maxLevel: 50, levelOp: "<" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "weapons")
    expect(rule).toBeDefined()
    expect(rule?.maxQuality).toBe(3)
    expect(rule?.qualityOp).toBe(">=")
    expect(rule?.maxLevel).toBe(50)
    expect(rule?.levelOp).toBe("<")
  })

  it("carries marketValue and marketValueOp in compiled entries", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "sell",
            conditions: { marketValue: 10000, marketValueOp: ">=" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment")
    expect(rule).toBeDefined()
    expect(rule?.marketValue).toBe(10000)
    expect(rule?.marketValueOp).toBe(">=")
    expect(rule?.maxValue).toBeUndefined()
    expect(rule?.minValue).toBeUndefined()
  })

  it("carries combined value and valueOp in compiled entries", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "nothing",
            conditions: { value: 5000, valueOp: ">=" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment")
    expect(rule).toBeDefined()
    expect(rule?.value).toBe(5000)
    expect(rule?.valueOp).toBe(">=")
    expect(rule?.marketValue).toBeUndefined()
    expect(rule?.maxValue).toBeUndefined()
  })

  it("carries keepQuantity in compiled entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "potions",
            action: "sell",
            conditions: { keepQuantity: 50 },
          },
        ],
      })
    )

    const rule = findRule(compiled, "potions")
    expect(rule).toBeDefined()
    expect(rule?.keepQuantity).toBe(50)
    expect(rule?.action).toBe("sell")
  })

  it("carries targetQuantity in compiled entry for move-to", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "crafting",
            action: "move-to",
            destination: "bank",
            conditions: { targetQuantity: 200 },
          },
        ],
      })
    )

    const rule = findRule(compiled, "crafting")
    expect(rule).toBeDefined()
    expect(rule?.targetQuantity).toBe(200)
    expect(rule?.action).toBe("move-to")
  })

  it("legacy maxValue propagates when value is absent", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "potions",
            action: "sell",
            conditions: { maxValue: 500 },
          },
        ],
      })
    )

    const rule = findRule(compiled, "potions")
    expect(rule).toBeDefined()
    expect(rule?.maxValue).toBe(500)
    expect(rule?.value).toBeUndefined()
  })

  it("cross-priority regression: nothing rule before stolen rule preserves order", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "nothing",
            conditions: { maxQuality: 5, qualityOp: ">=" },
          },
          {
            id: "r2",
            categoryId: "equipment",
            action: "sell",
            conditions: { stolen: "stolen" },
          },
        ],
      })
    )

    expect(compiled.orderedRules).toHaveLength(3)
    expect(compiled.orderedRules[0]?.action).toBe("nothing")
    expect(compiled.orderedRules[0]?.categoryId).toBe("equipment")
    expect(compiled.orderedRules[1]?.action).toBe("sell")
    expect(compiled.orderedRules[1]?.stolen).toBe("stolen")
  })
})

describe("ALL_CATEGORIES_ID", () => {
  it("compiles to an orderedRules entry with categoryId 'all'", () => {
    const compiled = compileRules(
      createSettings({
        rules: [{ id: "r1", categoryId: ALL_CATEGORIES_ID, action: "sell" }],
      })
    )

    const rule = findRule(compiled, ALL_CATEGORIES_ID)
    expect(rule).toEqual({ id: "r1", categoryId: ALL_CATEGORIES_ID, action: "sell" })
  })

  it("more specific leaf rule appears before all-categories rule when ordered first", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          { id: "r1", categoryId: "dagger", action: "nothing" },
          { id: "r2", categoryId: ALL_CATEGORIES_ID, action: "sell" },
        ],
      })
    )

    expect(compiled.orderedRules).toHaveLength(3)
    expect(compiled.orderedRules[0]).toEqual({ id: "r1", categoryId: "dagger", action: "nothing" })
    expect(compiled.orderedRules[1]).toEqual({
      id: "r2",
      categoryId: ALL_CATEGORIES_ID,
      action: "sell",
    })
  })

  it("parent rule appears before all-categories rule when ordered first", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          { id: "r1", categoryId: "equipment", action: "nothing" },
          { id: "r2", categoryId: ALL_CATEGORIES_ID, action: "sell" },
        ],
      })
    )

    expect(compiled.orderedRules[0]).toEqual({
      id: "r1",
      categoryId: "equipment",
      action: "nothing",
    })
    expect(compiled.orderedRules[1]).toEqual({
      id: "r2",
      categoryId: ALL_CATEGORIES_ID,
      action: "sell",
    })
  })
})
