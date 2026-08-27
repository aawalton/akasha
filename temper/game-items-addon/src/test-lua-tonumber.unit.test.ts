import { describe, expect, it } from "bun:test"
import { luaToNumber } from "./test-lua-tonumber"

const NUMERIC: readonly string[] = [
  "1337",
  "0",
  "00",
  "17825800",
  "  42",
  "1337 ",
  "0x1F",
  "0X10",
  "-0x10",
  "1e5",
  "1E5",
  "1e-3",
  "3.14",
  ".5",
  "5.",
  "+5",
  "-7",
]

const NOT_NUMERIC: readonly string[] = [
  "",
  "  ",
  "0x",
  "1337a",
  "a1337",
  "My Trading Guild",
  "1337 Blades",
  "Guild1337",
  "1,337",
  "1_337",
  "--5",
  "++5",
  "5e",
  ".",
  "-",
  "+",
  "Legion XIII",
]

describe("luaToNumber", () => {
  it("accepts every spelling Lua accepts", () => {
    for (const s of NUMERIC) {
      expect(luaToNumber(s), `expected ${JSON.stringify(s)} to be numeric`).not.toBeUndefined()
    }
  })

  it("rejects every spelling Lua rejects", () => {
    for (const s of NOT_NUMERIC) {
      expect(luaToNumber(s), `expected ${JSON.stringify(s)} to be nil`).toBeUndefined()
    }
  })

  it("treats the empty string as nil, where Number() would give 0", () => {
    expect(luaToNumber("")).toBeUndefined()
    expect(Number("")).toBe(0)
  })

  it("accepts the strtod specials Lua 5.1 accepts, which have no digits at all", () => {
    for (const s of ["inf", "Inf", "INF", "infinity", "Infinity", "nan", "NaN"]) {
      expect(luaToNumber(s), `expected ${JSON.stringify(s)} to be numeric`).not.toBeUndefined()
    }
  })

  it("passes numbers through and rejects other types", () => {
    expect(luaToNumber(42)).toBe(42)
    expect(luaToNumber(undefined)).toBeUndefined()
    expect(luaToNumber(true)).toBeUndefined()
  })
})
