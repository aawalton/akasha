import { describe, expect, test } from "bun:test"
import { textIn } from "akasha/utils/narrow/text-in/text-in.module.code.ts"

describe("textIn", () => {
  test("answers the text a value holds", () => {
    expect(textIn("thea")).toBe("thea")
  })

  test("answers nothing for empty text", () => {
    expect(textIn("")).toBe(null)
  })

  test("answers a space, because a space was written", () => {
    expect(textIn(" ")).toBe(" ")
  })

  test("answers nothing for a value that is no text", () => {
    expect(textIn(null)).toBe(null)
    expect(textIn(undefined)).toBe(null)
    expect(textIn(0)).toBe(null)
    expect(textIn(false)).toBe(null)
    expect(textIn(["thea"])).toBe(null)
  })
})
