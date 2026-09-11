import { describe, expect, test } from "bun:test"
import { stringIn } from "./string-in.module.code.ts"

describe("stringIn", () => {
  test("answers the string a value holds", () => {
    expect(stringIn("thea")).toBe("thea")
  })

  test("answers empty text as empty text rather than as nothing", () => {
    expect(stringIn("")).toBe("")
  })

  test("answers nothing for a value that is no string", () => {
    expect(stringIn(null)).toBe(null)
    expect(stringIn(undefined)).toBe(null)
    expect(stringIn(0)).toBe(null)
    expect(stringIn(false)).toBe(null)
    expect(stringIn(["thea"])).toBe(null)
  })
})
