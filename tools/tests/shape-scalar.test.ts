
import { describe, expect, test } from "bun:test"
import { shape as s } from "../lib/shape.ts"
import { accepts, refusal, refuses } from "./shape-fixture.ts"

describe("string", () => {
  test("refuses everything that is not a string", () => {
    for (const value of [1, 0, true, false, null, undefined, [], ["a"], {}, { a: 1 }, 1.5, Number.NaN]) {
      refuses(s.string(), value)
    }
  })

  test("names what it got in the refusal", () => {
    expect(refusal(s.string(), 1).message).toBe("Invalid input: expected string, received number")
    expect(refusal(s.string(), null).message).toBe("Invalid input: expected string, received null")
    expect(refusal(s.string(), undefined).message).toBe("Invalid input: expected string, received undefined")
    expect(refusal(s.string(), []).message).toBe("Invalid input: expected string, received array")
    expect(refusal(s.string(), {}).message).toBe("Invalid input: expected string, received object")
    expect(refusal(s.string(), true).message).toBe("Invalid input: expected string, received boolean")
  })

  test("accepts a string, the empty one included", () => {
    expect(accepts(s.string(), "")).toBe("")
    expect(accepts(s.string(), "x")).toBe("x")
  })

  test("min refuses the empty string and holds the boundary", () => {
    expect(refusal(s.string().min(1), "").message).toBe("Too small: expected string to have >=1 characters")
    expect(refusal(s.string().min(1), "").code).toBe("too_small")
    expect(accepts(s.string().min(1), "a")).toBe("a")
    refuses(s.string().min(3), "ab")
    expect(accepts(s.string().min(3), "abc")).toBe("abc")
  })

  test("regex refuses what the pattern does not match", () => {
    const digits = s.string().regex(/^\d+$/)
    for (const value of ["", "12a", "a12", " 1", "1 ", "1.5", "-1"]) refuses(digits, value)
    expect(accepts(digits, "123")).toBe("123")
    expect(refusal(digits, "12a").message).toBe("Invalid string: must match pattern /^\\d+$/")
  })

  test("a global pattern does not answer differently on the second look", () => {
    const sticky = s.string().regex(/^\d+$/g)
    expect(accepts(sticky, "123")).toBe("123")
    expect(accepts(sticky, "123")).toBe("123")
    expect(accepts(sticky, "123")).toBe("123")
  })

  test("uuid refuses a malformed one", () => {
    const uuid = s.string().uuid()
    for (const value of [
      "nope",
      "",
      "123e4567-e89b-12d3-a456",
      "123e4567-e89b-92d3-a456-426614174000",
      "123e4567-e89b-12d3-z456-426614174000",
      "00000000-0000-0000-0000-426614174000",
      "123e4567e89b12d3a456426614174000",
    ]) {
      refuses(uuid, value)
    }
    expect(refusal(uuid, "nope").message).toBe("Invalid UUID")
  })

  test("uuid accepts what zod accepts, including uppercase and the nil UUID", () => {
    const uuid = s.string().uuid()
    expect(accepts(uuid, "123e4567-e89b-12d3-a456-426614174000")).toBeTruthy()
    expect(accepts(uuid, "123E4567-E89B-12D3-A456-426614174000")).toBeTruthy()
    expect(accepts(uuid, "00000000-0000-0000-0000-000000000000")).toBeTruthy()
  })

  test("url refuses what is not one", () => {
    const url = s.string().url()
    for (const value of ["", "nope", "x.com", "https://", "http://a b", "//x.com"]) refuses(url, value)
    expect(refusal(url, "nope").message).toBe("Invalid URL")
  })

  test("url accepts any scheme, as zod does", () => {
    expect(accepts(s.string().url(), "https://x.example.com")).toBeTruthy()
    expect(accepts(s.string().url(), "ftp://x/y")).toBeTruthy()
    expect(accepts(s.string().url(), "postgres://u:p@h:5432/d")).toBeTruthy()
  })

  test("datetime refuses an offset, a bare date and an out-of-range field", () => {
    const when = s.string().datetime()
    for (const value of [
      "2026-08-12T00:00:00+01:00",
      "2026-08-12T00:00:00",
      "2026-08-12",
      "2026-13-12T00:00:00Z",
      "2026-12-32T00:00:00Z",
      "2026-12-12T99:00:00Z",
      "2026-12-12T00:60:00Z",
      "",
      "now",
    ]) {
      refuses(when, value)
    }
    expect(refusal(when, "2026-08-12").message).toBe("Invalid ISO datetime")
  })

  test("datetime accepts Z, with and without fractional seconds", () => {
    expect(accepts(s.string().datetime(), "2026-08-12T00:00:00Z")).toBeTruthy()
    expect(accepts(s.string().datetime(), "2026-08-12T00:00:00.123Z")).toBeTruthy()
  })
})

describe("number", () => {
  test("refuses everything that is not a number", () => {
    for (const value of ["1", "", true, false, null, undefined, [], [1], {}]) refuses(s.number(), value)
  })

  test("refuses NaN and both infinities before any chained check", () => {
    expect(refusal(s.number(), Number.NaN).message).toBe("Invalid input: expected number, received NaN")
    expect(refusal(s.number(), Number.POSITIVE_INFINITY).message).toBe(
      "Invalid input: expected number, received number"
    )
    refuses(s.number(), Number.NEGATIVE_INFINITY)
  })

  test("accepts ordinary numbers including zero and negatives", () => {
    for (const value of [0, 1, -1, 1.5, -0.5, 65535]) expect(accepts(s.number(), value)).toBe(value)
  })

  test("int refuses a fraction", () => {
    expect(refusal(s.number().int(), 1.5).message).toBe("Invalid input: expected int, received number")
    refuses(s.number().int(), -1.5)
    expect(accepts(s.number().int(), 2)).toBe(2)
    expect(accepts(s.number().int(), -2)).toBe(-2)
  })

  test("positive refuses zero, nonnegative does not", () => {
    expect(refusal(s.number().positive(), 0).message).toBe("Too small: expected number to be >0")
    refuses(s.number().positive(), -1)
    expect(accepts(s.number().nonnegative(), 0)).toBe(0)
    expect(refusal(s.number().nonnegative(), -1).message).toBe("Too small: expected number to be >=0")
  })

  test("min and max hold their boundaries", () => {
    const port = s.number().int().min(1).max(65535)
    refuses(port, 0)
    refuses(port, 65536)
    refuses(port, -1)
    expect(refusal(port, 0).message).toBe("Too small: expected number to be >=1")
    expect(refusal(port, 70000).message).toBe("Too big: expected number to be <=65535")
    expect(accepts(port, 1)).toBe(1)
    expect(accepts(port, 65535)).toBe(65535)
  })
})

describe("boolean", () => {
  test("refuses the things that read as booleans and are not", () => {
    for (const value of ["true", "false", "", 0, 1, null, undefined, [], {}]) refuses(s.boolean(), value)
    expect(refusal(s.boolean(), "true").message).toBe("Invalid input: expected boolean, received string")
  })

  test("accepts both booleans", () => {
    expect(accepts(s.boolean(), true)).toBe(true)
    expect(accepts(s.boolean(), false)).toBe(false)
  })
})

describe("optional, nullable, default and catch", () => {
  test("optional does not admit null, and nullable does not admit absent", () => {
    refuses(s.string().optional(), null)
    expect(accepts(s.string().optional(), undefined)).toBeUndefined()
    refuses(s.string().nullable(), undefined)
    expect(accepts(s.string().nullable(), null)).toBeNull()
    refuses(s.string().optional(), 1)
    refuses(s.string().nullable(), 1)
  })

  test("default fills for absent only and still refuses null", () => {
    const home = s.string().default("/home/walton")
    expect(accepts(home, undefined)).toBe("/home/walton")
    expect(accepts(home, "/elsewhere")).toBe("/elsewhere")
    refuses(home, null)
    refuses(home, 1)
  })

  test("catch swallows a refusal without widening what parses", () => {
    const agentId = s.string().min(1).optional().catch(undefined)
    expect(accepts(agentId, "a")).toBe("a")
    expect(accepts(agentId, undefined)).toBeUndefined()
    expect(accepts(agentId, "")).toBeUndefined()
    expect(accepts(agentId, 5)).toBeUndefined()
    expect(accepts(agentId, null)).toBeUndefined()
  })
})

describe("enum and literal", () => {
  test("enum refuses an unlisted option and a non-string", () => {
    const fire = s.enum(["idle", "stale-wedge", "ceiling"])
    for (const value of ["", "IDLE", "other", null, undefined, 1, [], {}]) refuses(fire, value)
    expect(refusal(fire, "other").message).toBe('Invalid option: expected one of "idle"|"stale-wedge"|"ceiling"')
    expect(accepts(fire, "idle")).toBe("idle")
  })

  test("literal refuses anything else", () => {
    const nudge = s.literal("nudge")
    for (const value of ["", "Nudge", "wait", null, undefined, 1]) refuses(nudge, value)
    expect(refusal(nudge, "wait").message).toBe('Invalid input: expected "nudge"')
    expect(accepts(nudge, "nudge")).toBe("nudge")
  })
})

describe("coerce.number", () => {
  const positiveInt = s.coerce.number().int().positive()

  test("refuses absent, unparseable and non-integer input", () => {
    for (const value of [undefined, "abc", "", "0", "5.5", {}, [1, 2], false, null, " ", Symbol("s")]) {
      refuses(positiveInt, value)
    }
  })

  test("says what it could not turn into a number", () => {
    expect(refusal(positiveInt, undefined).message).toBe("Invalid input: expected number, received NaN")
    expect(refusal(positiveInt, "abc").message).toBe("Invalid input: expected number, received NaN")
    expect(refusal(positiveInt, Symbol("s")).message).toBe("Invalid input: expected number, received symbol")
  })

  test("the empty string and null coerce to zero and are stopped by positive, not by the coercion", () => {
    expect(refusal(positiveInt, "").message).toBe("Too small: expected number to be >0")
    expect(refusal(positiveInt, null).message).toBe("Too small: expected number to be >0")
    expect(accepts(s.coerce.number(), "")).toBe(0)
  })

  test("accepts what Number accepts", () => {
    expect(accepts(positiveInt, "5")).toBe(5)
    expect(accepts(positiveInt, "  7 ")).toBe(7)
    expect(accepts(positiveInt, 5)).toBe(5)
    expect(accepts(positiveInt, true)).toBe(1)
  })

  test("a positive finite chain refuses an infinity written as text", () => {
    const positiveNumber = s.coerce.number().positive().finite()
    refuses(positiveNumber, "Infinity")
    refuses(positiveNumber, "-Infinity")
    expect(accepts(positiveNumber, "1.5")).toBe(1.5)
  })
})
