import { describe, expect, it } from "bun:test"
import type { BuyRule } from "./buy-rule-types"
import { compileRules } from "./inventory-rule-compiler"
import type { InventoryRuleSettings } from "./inventory-rule-types"

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

describe("compileRules — buyRules", () => {
  it("emits buyRules keyed by itemId for the active rule only", () => {
    const settings: InventoryRuleSettings = {
      version: 2,
      rules: [],
      buyRules: [
        buyRule({ id: "active", itemId: 4000, targetQuantity: 4000, active: true }),
        buyRule({ id: "inactive", itemId: 5000, targetQuantity: 100, active: false }),
      ],
    }

    const compiled = compileRules(settings)
    const buyRules = compiled.buyRules

    expect(buyRules).toBeDefined()
    expect(buyRules?.[4000]).toEqual({ targetQuantity: 4000, source: "merchant" })
    expect(buyRules?.[5000]).toBeUndefined()
  })
})
