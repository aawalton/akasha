import { expect, test } from "bun:test"
import { shortened } from "akasha/utils/text/shortened/shortened.module.code.ts"

const SIXTY = "0123456789".repeat(6)

test("text no longer than the length is written out whole", () => {
  expect(shortened(SIXTY)).toBe(SIXTY)
})

test("text longer than the length keeps that length and an ellipsis follows it", () => {
  expect(shortened(`${SIXTY}more`)).toBe(`${SIXTY}…`)
})

test("the ellipsis is the one character rather than three periods", () => {
  expect(shortened(`${SIXTY}more`).slice(SIXTY.length)).toBe("…")
})

test("the length is sixty characters", () => {
  expect(SIXTY).toHaveLength(60)
  expect(shortened(`${SIXTY}x`)).toHaveLength(61)
})
