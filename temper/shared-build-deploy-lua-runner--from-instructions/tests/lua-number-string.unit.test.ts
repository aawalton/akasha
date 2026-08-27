import { describe, expect, it } from "bun:test"
import { luaNumberString } from "../src/lua-number-string"

describe("luaNumberString", () => {
  it("prints safe-range integers with no decimal point", () => {
    expect(luaNumberString(0)).toBe("0")
    expect(luaNumberString(5)).toBe("5")
    expect(luaNumberString(-42)).toBe("-42")
    expect(luaNumberString(1_000_000)).toBe("1000000")
  })

  it("prints finite decimals with trailing zeros trimmed", () => {
    expect(luaNumberString(0.5)).toBe("0.5")
    expect(luaNumberString(-0.5)).toBe("-0.5")
    expect(luaNumberString(0.1)).toBe("0.1")
    expect(luaNumberString(123.456)).toBe("123.456")
  })

  it("uses %g exponent notation with a signed two-digit exponent for small magnitudes", () => {
    expect(luaNumberString(0.00001)).toBe("1e-05")
  })

  it("uses %g exponent notation for magnitudes past the safe integer range", () => {
    expect(luaNumberString(1e21)).toBe("1e+21")
  })
})
