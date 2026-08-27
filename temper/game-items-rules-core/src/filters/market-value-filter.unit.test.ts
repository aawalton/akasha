import { describe, expect, it } from "bun:test"
import { marketValueFilter } from "./market-value-filter"

describe("marketValueFilter.isPresent — multi-field fallback", () => {
  it("is present when marketValue is set", () => {
    expect(marketValueFilter.isPresent({ marketValue: 500 })).toBe(true)
  })

  it("is present when only the legacy maxValue is set", () => {
    expect(marketValueFilter.isPresent({ maxValue: 500 })).toBe(true)
  })

  it("is present when only the legacy minValue is set", () => {
    expect(marketValueFilter.isPresent({ minValue: 100 })).toBe(true)
  })

  it("is absent when no value field is set", () => {
    expect(marketValueFilter.isPresent({})).toBe(false)
  })

  it("prefers marketValue when multiple legacy fields are set", () => {
    expect(marketValueFilter.fingerprint({ marketValue: 500, maxValue: 1000 })).toBe("500")
  })
})

describe("marketValueFilter.fingerprint — operator inference", () => {
  it("infers '>=' when only legacy minValue is present", () => {
    expect(marketValueFilter.fingerprint({ minValue: 100 })).toBe("100(>=)")
  })

  it("does not annotate with '<=' (the canonical default operator)", () => {
    expect(marketValueFilter.fingerprint({ marketValue: 500 })).toBe("500")
    expect(marketValueFilter.fingerprint({ marketValue: 500, marketValueOp: "<=" })).toBe("500")
  })

  it("does not infer an operator when marketValue is set alongside legacy minValue", () => {
    expect(marketValueFilter.fingerprint({ marketValue: 500, minValue: 100 })).toBe("500")
  })

  it("annotates with explicit operator when not the default", () => {
    expect(marketValueFilter.fingerprint({ marketValue: 500, marketValueOp: ">=" })).toBe("500(>=)")
    expect(marketValueFilter.fingerprint({ marketValue: 500, marketValueOp: ">" })).toBe("500(>)")
  })

  it("returns undefined when no value field is set", () => {
    expect(marketValueFilter.fingerprint({})).toBeUndefined()
  })
})

describe("marketValueFilter.transferToCategory — normalizes legacy fields", () => {
  it("rewrites legacy minValue into canonical marketValue + inferred op", () => {
    expect(marketValueFilter.transferToCategory({ minValue: 100 }, "a", "b", {})).toEqual({
      marketValue: 100,
      marketValueOp: ">=",
      maxValue: undefined,
      minValue: undefined,
    })
  })

  it("rewrites legacy maxValue into canonical marketValue (no op)", () => {
    expect(marketValueFilter.transferToCategory({ maxValue: 500 }, "a", "b", {})).toEqual({
      marketValue: 500,
      maxValue: undefined,
      minValue: undefined,
    })
  })

  it("returns empty patch when no value is set", () => {
    expect(marketValueFilter.transferToCategory({}, "a", "b", {})).toEqual({})
  })
})

describe("marketValueFilter.applyDefault — clears legacy fields", () => {
  it("seeds canonical marketValue and explicitly clears the legacy fields", () => {
    const def = marketValueFilter.applyDefault()
    expect(def.marketValue).toBe(500)
    expect(def.maxValue).toBeUndefined()
    expect(def.minValue).toBeUndefined()
    expect("maxValue" in def).toBe(true)
    expect("minValue" in def).toBe(true)
  })
})
