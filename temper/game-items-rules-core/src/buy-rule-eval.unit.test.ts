import { describe, expect, it } from "bun:test"
import { computeBuyShortfall, evaluateBuyRules } from "./buy-rule-eval"
import type { BuyRule } from "./buy-rule-types"

function buyRule(overrides: Partial<BuyRule> = {}): BuyRule {
  return {
    id: "rule-1",
    itemId: 4000,
    itemName: "Lockpick",
    targetQuantity: 4000,
    source: "merchant",
    ...overrides,
  }
}

describe("computeBuyShortfall", () => {
  it("returns the gap when under target", () => {
    expect(computeBuyShortfall(4000, 3200)).toBe(800)
  })

  it("returns 0 at exactly target", () => {
    expect(computeBuyShortfall(4000, 4000)).toBe(0)
  })

  it("clamps to 0 when over target (never negative)", () => {
    expect(computeBuyShortfall(4000, 5000)).toBe(0)
  })
})

describe("evaluateBuyRules", () => {
  it("evaluates active rules and excludes inactive ones", () => {
    const active = buyRule({ id: "active", itemId: 4000, targetQuantity: 4000, active: true })
    const inactive = buyRule({ id: "inactive", itemId: 5000, targetQuantity: 100, active: false })

    const result = evaluateBuyRules([active, inactive], new Map([[4000, 3200]]))

    expect(result).toHaveLength(1)
    expect(result[0]?.rule.id).toBe("active")
    expect(result[0]?.currentTotal).toBe(3200)
    expect(result[0]?.shortfall).toBe(800)
  })

  it("treats an itemId absent from totals as currentTotal 0 (full-target shortfall)", () => {
    const rule = buyRule({ id: "missing", itemId: 7777, targetQuantity: 250, active: true })
    const result = evaluateBuyRules([rule], new Map())

    expect(result).toHaveLength(1)
    expect(result[0]?.currentTotal).toBe(0)
    expect(result[0]?.shortfall).toBe(250)
  })
})
