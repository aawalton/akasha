import { describe, expect, it } from "bun:test"
import { valueFilter } from "./value-filter"

describe("valueFilter.fingerprint", () => {
  it("returns just the value when op is unset (defaults to '<=')", () => {
    expect(valueFilter.fingerprint({ value: 500 })).toBe("500")
  })

  it("treats explicit '<=' as identical to no operator", () => {
    expect(valueFilter.fingerprint({ value: 500, valueOp: "<=" })).toBe("500")
  })

  it("annotates non-default operators in parens", () => {
    expect(valueFilter.fingerprint({ value: 500, valueOp: ">=" })).toBe("500(>=)")
    expect(valueFilter.fingerprint({ value: 500, valueOp: ">" })).toBe("500(>)")
    expect(valueFilter.fingerprint({ value: 500, valueOp: "<" })).toBe("500(<)")
  })

  it("returns undefined when no value is set", () => {
    expect(valueFilter.fingerprint({})).toBeUndefined()
  })
})

describe("valueFilter.transferToCategory", () => {
  it("carries value alone when no operator is set", () => {
    expect(valueFilter.transferToCategory({ value: 500 }, "a", "b", {})).toEqual({ value: 500 })
  })

  it("carries value + op together when an operator is set", () => {
    expect(valueFilter.transferToCategory({ value: 500, valueOp: ">=" }, "a", "b", {})).toEqual({
      value: 500,
      valueOp: ">=",
    })
  })

  it("returns empty patch when no value is set", () => {
    expect(valueFilter.transferToCategory({}, "a", "b", {})).toEqual({})
    expect(valueFilter.transferToCategory({ valueOp: ">=" }, "a", "b", {})).toEqual({})
  })
})
