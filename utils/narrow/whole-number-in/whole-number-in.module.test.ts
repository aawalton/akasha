import { describe, expect, test } from "bun:test"
import { wholeNumberIn } from "akasha/utils/narrow/whole-number-in/whole-number-in.module.code.ts"

describe("wholeNumberIn", () => {
  test("answers the number digits spell", () => {
    expect(wholeNumberIn("0")).toBe(0)
    expect(wholeNumberIn("54321")).toBe(54321)
  })

  test("answers nothing for text that is not digits alone", () => {
    expect(wholeNumberIn("")).toBe(null)
    expect(wholeNumberIn("-1")).toBe(null)
    expect(wholeNumberIn("1.5")).toBe(null)
    expect(wholeNumberIn(" 7")).toBe(null)
    expect(wholeNumberIn("7px")).toBe(null)
  })

  test("answers nothing where the digits run past the largest number there is", () => {
    expect(wholeNumberIn("1".repeat(400))).toBe(null)
  })

  test("answers a number past the last exact one rounded", () => {
    expect(wholeNumberIn("9007199254740993")).toBe(9007199254740992)
  })
})
