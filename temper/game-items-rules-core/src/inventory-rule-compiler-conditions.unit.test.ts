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
  it("splits bound rules into orderedRules with bound condition inline", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "potions",
            action: "nothing",
            conditions: { bound: "bound" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "potions", { bound: "bound" })
    expect(rule).toEqual({ id: "r1", categoryId: "potions", action: "nothing", bound: "bound" })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "potions" && !r.bound)
    ).toHaveLength(0)
  })

  it("splits not-bound rules into orderedRules with not-bound condition inline", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "sell",
            conditions: { bound: "not-bound" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { bound: "not-bound" })
    expect(rule).toEqual({ id: "r1", categoryId: "equipment", action: "sell", bound: "not-bound" })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "equipment" && !r.bound)
    ).toHaveLength(0)
  })

  it("stolen+bound: single rule carries both conditions inline", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "sell",
            conditions: { stolen: "stolen", bound: "bound" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { stolen: "stolen", bound: "bound" })
    expect(rule).toBeDefined()
    expect(rule?.action).toBe("sell")
    expect(rule?.stolen).toBe("stolen")
    expect(rule?.bound).toBe("bound")
    expect(compiled.orderedRules).toHaveLength(2)
  })

  it("destination is carried inline on bound rule entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "move-to",
            destination: "bank",
            conditions: { bound: "not-bound" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { bound: "not-bound" })
    expect(rule?.destination).toBe("bank")
  })

  it("splits known rules into orderedRules with known condition inline", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "recipes",
            action: "sell",
            conditions: { known: "known" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "recipes", { known: "known" })
    expect(rule).toEqual({ id: "r1", categoryId: "recipes", action: "sell", known: "known" })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "recipes" && !r.known)
    ).toHaveLength(0)
  })

  it("splits not-known rules into orderedRules with not-known condition inline", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "monster-trophies",
            action: "nothing",
            conditions: { known: "not-known" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "monster-trophies", { known: "not-known" })
    expect(rule).toEqual({
      id: "r1",
      categoryId: "monster-trophies",
      action: "nothing",
      known: "not-known",
    })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "monster-trophies" && !r.known)
    ).toHaveLength(0)
  })

  it("stolen+known: single rule carries both conditions inline", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "recipes",
            action: "sell",
            conditions: { stolen: "stolen", known: "known" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "recipes", { stolen: "stolen", known: "known" })
    expect(rule).toBeDefined()
    expect(rule?.action).toBe("sell")
    expect(rule?.stolen).toBe("stolen")
    expect(rule?.known).toBe("known")
    expect(compiled.orderedRules).toHaveLength(2)
  })

  it("destination is carried inline on known rule entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "recipes",
            action: "move-to",
            destination: "bank",
            conditions: { known: "known" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "recipes", { known: "known" })
    expect(rule?.destination).toBe("bank")
  })

  it("produces a single-entry orderedRules (just the implicit terminal) for empty rules", () => {
    const compiled = compileRules(createSettings())

    expect(compiled.orderedRules).toHaveLength(1)
    expect(compiled.orderedRules[0]).toEqual({ categoryId: ALL_CATEGORIES_ID, action: "nothing" })
  })

  it("can-inspire rule carries canInspire and inspireScope derived from destination", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "deconstruct",
            destination: "character:by-priority",
            conditions: { canInspire: "can-inspire" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { canInspire: "can-inspire" })
    expect(rule).toEqual({
      id: "r1",
      categoryId: "equipment",
      action: "deconstruct",
      destination: "character:by-priority",
      canInspire: "can-inspire",
      inspireScope: "any-character",
    })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "equipment" && !r.canInspire)
    ).toHaveLength(0)
  })

  it("cannot-inspire rule carries canInspire and inspireScope", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "glyphs",
            action: "sell",
            conditions: { canInspire: "cannot-inspire" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "glyphs", { canInspire: "cannot-inspire" })
    expect(rule).toEqual({
      id: "r1",
      categoryId: "glyphs",
      action: "sell",
      canInspire: "cannot-inspire",
      inspireScope: "current-character",
    })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "glyphs" && !r.canInspire)
    ).toHaveLength(0)
  })

  it("cannot-inspire destination is carried inline on rule entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "move-to",
            destination: "bank",
            conditions: { canInspire: "cannot-inspire" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { canInspire: "cannot-inspire" })
    expect(rule?.destination).toBe("bank")
  })

  it("produces empty orderedRules for canInspire when no rules", () => {
    const compiled = compileRules(createSettings())

    const withCanInspire = compiled.orderedRules.filter((r) => r.canInspire)
    expect(withCanInspire).toHaveLength(0)
  })

  it("can-research rule carries canResearch and researchScope derived from destination", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "weapons",
            action: "move-to",
            destination: "bank",
            conditions: { canResearch: "can-research" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "weapons", { canResearch: "can-research" })
    expect(rule).toEqual({
      id: "r1",
      categoryId: "weapons",
      action: "move-to",
      destination: "bank",
      canResearch: "can-research",
      researchScope: "current-character",
    })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "weapons" && !r.canResearch)
    ).toHaveLength(0)
  })

  it("cannot-research rule carries canResearch and researchScope", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "deconstruct",
            conditions: { canResearch: "cannot-research" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { canResearch: "cannot-research" })
    expect(rule).toEqual({
      id: "r1",
      categoryId: "equipment",
      action: "deconstruct",
      canResearch: "cannot-research",
      researchScope: "current-character",
    })
    expect(
      compiled.orderedRules.filter((r) => r.categoryId === "equipment" && !r.canResearch)
    ).toHaveLength(0)
  })

  it("derives researchScope from destination on compiled entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "armor",
            action: "research",
            destination: "character:by-priority",
            conditions: { canResearch: "can-research" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "armor", { canResearch: "can-research" })
    expect(rule).toBeDefined()
    expect(rule?.canResearch).toBe("can-research")
    expect(rule?.researchScope).toBe("any-character")
  })

  it("can-research destination is carried inline on rule entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "jewelry",
            action: "move-to",
            destination: "bank",
            conditions: { canResearch: "can-research" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "jewelry", { canResearch: "can-research" })
    expect(rule?.destination).toBe("bank")
  })

  it("produces no canResearch entries in orderedRules for empty rules", () => {
    const compiled = compileRules(createSettings())

    const withCanResearch = compiled.orderedRules.filter((r) => r.canResearch)
    expect(withCanResearch).toHaveLength(0)
  })

  it("carries combined value condition (value/valueOp) through to compiled entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "all",
            action: "nothing",
            conditions: { value: 5000, valueOp: ">=" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "all", { value: 5000 })
    expect(rule).toBeDefined()
    expect(rule?.value).toBe(5000)
    expect(rule?.valueOp).toBe(">=")
    expect(rule?.marketValue).toBeUndefined()
    expect(rule?.maxValue).toBeUndefined()
  })

  it("carries marketValue and marketValueOp through to compiled entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "sell",
            conditions: { marketValue: 1000, marketValueOp: "<=" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment")
    expect(rule).toBeDefined()
    expect(rule?.marketValue).toBe(1000)
    expect(rule?.marketValueOp).toBe("<=")
    expect(rule?.value).toBeUndefined()
    expect(rule?.maxValue).toBeUndefined()
  })

  it("carries replacementValue and replacementValueOp through to compiled entry", () => {
    const compiled = compileRules(
      createSettings({
        rules: [
          {
            id: "r1",
            categoryId: "equipment",
            action: "nothing",
            conditions: { bound: "bound", replacementValue: 10000, replacementValueOp: ">=" },
          },
        ],
      })
    )

    const rule = findRule(compiled, "equipment", { bound: "bound" })
    expect(rule).toBeDefined()
    expect(rule?.replacementValue).toBe(10000)
    expect(rule?.replacementValueOp).toBe(">=")
  })
})
