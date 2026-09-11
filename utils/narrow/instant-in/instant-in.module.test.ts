import { expect, test } from "bun:test"
import { instantIn } from "akasha/utils/narrow/instant-in/instant-in.module.code.ts"

test("a number is the milliseconds that number already counts", () => {
  expect(instantIn(1700)).toBe(1700)
  expect(instantIn(0)).toBe(0)
})

test("text is the moment that text spells", () => {
  expect(instantIn("2024-01-01T00:00:00.000Z")).toBe(Date.parse("2024-01-01T00:00:00.000Z"))
})

test("a value holding no moment is nothing rather than the epoch", () => {
  expect(instantIn("not a time")).toBeNull()
  expect(instantIn(Number.NaN)).toBeNull()
})

test("a value that is neither a number nor text holds no moment", () => {
  expect(instantIn(null)).toBeNull()
  expect(instantIn(undefined)).toBeNull()
  expect(instantIn({})).toBeNull()
})
