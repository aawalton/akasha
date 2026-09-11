import { expect, test } from "bun:test"
import { scalarText } from "akasha/utils/narrow/scalar-text/scalar-text.module.code.ts"

test("a string is answered as that string is written", () => {
  expect(scalarText("beside")).toBe("beside")
})

test("a number or a boolean is answered as the text of that value", () => {
  expect(scalarText(7)).toBe("7")
  expect(scalarText(false)).toBe("false")
})

test("every other value is nothing", () => {
  expect(scalarText(null)).toBeNull()
  expect(scalarText(undefined)).toBeNull()
  expect(scalarText({})).toBeNull()
  expect(scalarText([1])).toBeNull()
})

test("an empty string is answered rather than read as nothing", () => {
  expect(scalarText("")).toBe("")
})
