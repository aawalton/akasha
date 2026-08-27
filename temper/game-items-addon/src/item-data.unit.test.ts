import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { lookupTtcPricing, resolvePriceSource } from "./item-data"

const GLOBAL_KEY = "TamrielTradeCentrePrice"

function stubTtc(priceInfo: TtcPriceInfo | undefined): undefined {
  Reflect.set(globalThis, GLOBAL_KEY, {
    GetPriceInfo: (_itemLink: string): TtcPriceInfo | undefined => priceInfo,
  })
}

let original: unknown

beforeEach(() => {
  original = Reflect.get(globalThis, GLOBAL_KEY)
})

afterEach(() => {
  Reflect.set(globalThis, GLOBAL_KEY, original)
})

describe("lookupTtcPricing", () => {
  test("returns empty when TTC global is undefined", () => {
    Reflect.set(globalThis, GLOBAL_KEY, undefined)
    expect(lookupTtcPricing("|H0:item:1|h|h")).toEqual({})
  })

  test("returns empty when GetPriceInfo yields undefined", () => {
    stubTtc(undefined)
    expect(lookupTtcPricing("|H0:item:1|h|h")).toEqual({})
  })

  test("uses SuggestedPrice as the estimatedValue when present", () => {
    stubTtc({ SuggestedPrice: 5877, SaleAvg: 4433, Min: 500, AmountCount: 9, SaleAmountCount: 2 })
    const result = lookupTtcPricing("|H0:item:1|h|h")
    expect(result.estimatedValue).toBe(5877)
    expect(result.suggestedPrice).toBe(5877)
    expect(result.saleAvg).toBe(4433)
    expect(result.minPrice).toBe(500)
    expect(result.amountCount).toBe(9)
    expect(result.saleAmountCount).toBe(2)
  })

  test("falls back to SaleAvg when SuggestedPrice is absent", () => {
    stubTtc({ SaleAvg: 4433, Min: 500, AmountCount: 9, SaleAmountCount: 2 })
    const result = lookupTtcPricing("|H0:item:1|h|h")
    expect(result.estimatedValue).toBe(4433)
    expect(result.suggestedPrice).toBeUndefined()
    expect(result.saleAvg).toBe(4433)
  })

  test("leaves estimatedValue undefined when neither SuggestedPrice nor SaleAvg exists", () => {
    stubTtc({ Min: 500, AmountCount: 9 })
    const result = lookupTtcPricing("|H0:item:1|h|h")
    expect(result.estimatedValue).toBeUndefined()
    expect(result.suggestedPrice).toBeUndefined()
    expect(result.saleAvg).toBeUndefined()
    expect(result.minPrice).toBe(500)
    expect(result.amountCount).toBe(9)
  })

  test("does not collapse toward Min for illiquid items (no blend)", () => {
    stubTtc({ SuggestedPrice: 5877, SaleAvg: 4433, Min: 500, AmountCount: 1, SaleAmountCount: 0 })
    expect(lookupTtcPricing("|H0:item:1|h|h").estimatedValue).toBe(5877)
  })
})

describe("resolvePriceSource", () => {
  test("reports 'none' when the price-source addon is not loaded", () => {
    Reflect.set(globalThis, GLOBAL_KEY, undefined)
    expect(resolvePriceSource()).toBe("none")
  })

  test("reports 'ttc' when the price-source addon is loaded", () => {
    stubTtc(undefined)
    expect(resolvePriceSource()).toBe("ttc")
  })

  test("reports 'ttc' even when the loaded addon has no row for an item", () => {
    stubTtc(undefined)
    expect(lookupTtcPricing("|H0:item:1|h|h")).toEqual({})
    expect(resolvePriceSource()).toBe("ttc")
  })
})
