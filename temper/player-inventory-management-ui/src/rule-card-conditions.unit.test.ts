import { describe, expect, test } from "bun:test"
import { deriveConditionValues } from "./rule-card-conditions/derive"

const MIN_LISTING_VALUE_RESOLVED = "5000"

describe("deriveConditionValues — RuleConstantKey thresholds resolve to numbers", () => {
  test("value: constant key resolves to its number, not the raw key string", () => {
    expect(deriveConditionValues({ value: "MIN_LISTING_VALUE" }).valueValue).toBe(
      MIN_LISTING_VALUE_RESOLVED
    )
  })

  test("marketValue: constant key resolves", () => {
    expect(deriveConditionValues({ marketValue: "MIN_LISTING_VALUE" }).marketValueValue).toBe(
      MIN_LISTING_VALUE_RESOLVED
    )
  })

  test("merchantValue: constant key resolves", () => {
    expect(deriveConditionValues({ merchantValue: "MIN_LISTING_VALUE" }).merchantValueValue).toBe(
      MIN_LISTING_VALUE_RESOLVED
    )
  })

  test("replacementValue: constant key resolves", () => {
    expect(
      deriveConditionValues({ replacementValue: "MIN_LISTING_VALUE" }).replacementValueValue
    ).toBe(MIN_LISTING_VALUE_RESOLVED)
  })

  test("raw numeric thresholds pass through unchanged", () => {
    const derived = deriveConditionValues({
      value: 750,
      marketValue: 800,
      merchantValue: 60,
      replacementValue: 900,
    })
    expect(derived.valueValue).toBe("750")
    expect(derived.marketValueValue).toBe("800")
    expect(derived.merchantValueValue).toBe("60")
    expect(derived.replacementValueValue).toBe("900")
  })

  test("legacy maxValue/minValue (plain numbers) still feed marketValue", () => {
    expect(deriveConditionValues({ maxValue: 300 }).marketValueValue).toBe("300")
    expect(deriveConditionValues({ minValue: 250 }).marketValueValue).toBe("250")
  })
})
