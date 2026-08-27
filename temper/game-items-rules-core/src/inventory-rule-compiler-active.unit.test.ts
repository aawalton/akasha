import { describe, expect, it } from "bun:test"
import { compileCategoryRuleToOrdered } from "./inventory-rule-compiler"
import type { CategoryRule } from "./inventory-rule-types"

describe("compileCategoryRuleToOrdered — active propagation", () => {
  it("omits `active` when the rule is active (active: true)", () => {
    const rule: CategoryRule = { id: "r1", categoryId: "dagger", action: "sell", active: true }
    const compiled = compileCategoryRuleToOrdered(rule)
    expect("active" in compiled).toBe(false)
  })

  it("omits `active` when the rule leaves active undefined (default-active)", () => {
    const rule: CategoryRule = { id: "r1", categoryId: "dagger", action: "sell" }
    const compiled = compileCategoryRuleToOrdered(rule)
    expect("active" in compiled).toBe(false)
  })

  it("propagates `active: false` for an inactive rule (shown-not-claimed)", () => {
    const rule: CategoryRule = { id: "r1", categoryId: "dagger", action: "sell", active: false }
    const compiled = compileCategoryRuleToOrdered(rule)
    expect(compiled.active).toBe(false)
  })
})
