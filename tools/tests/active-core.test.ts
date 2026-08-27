
import { describe, expect, it } from "bun:test"
import { InputError, parseWindowDuration } from "../lib/active-core.ts"

describe("parseWindowDuration", () => {
  it("parses each unit to ms", () => {
    expect(parseWindowDuration("30s")).toBe(30_000)
    expect(parseWindowDuration("15m")).toBe(15 * 60_000)
    expect(parseWindowDuration("1h")).toBe(3_600_000)
    expect(parseWindowDuration("2d")).toBe(2 * 86_400_000)
  })

  it("tolerates whitespace between number and unit", () => {
    expect(parseWindowDuration("15 m")).toBe(15 * 60_000)
  })

  it.each(["garbage", "", "15", "15x", "m", "-5m", "1.5h"])("throws InputError on malformed %p", (bad) => {
    expect(() => parseWindowDuration(bad)).toThrow(/invalid duration/)
  })

  it("the refusal is an InputError carrying the input exit code", () => {
    let caught: unknown
    try {
      parseWindowDuration("garbage")
    } catch (error) {
      caught = error
    }
    expect(caught).toBeInstanceOf(InputError)
    expect(caught).toBeInstanceOf(Error)
    expect((caught as InputError).name).toBe("InputError")
    expect((caught as InputError).code).toBe(1)
  })

  it("names the offending flag, defaulting to --window", () => {
    expect(() => parseWindowDuration("garbage")).toThrow(/^--window: invalid duration/)
    expect(() => parseWindowDuration("garbage", "--grace")).toThrow(/^--grace: invalid duration/)
  })
})
