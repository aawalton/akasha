import { expect, test } from "bun:test"
import { oneLine } from "akasha/utils/text/one-line/one-line.module.code.ts"

test("a break inside the text becomes one space, so a sentence over two lines reads as one", () => {
  expect(oneLine("Expected identifier\n  but found end of file")).toBe(
    "Expected identifier but found end of file"
  )
})

test("whitespace at either end goes", () => {
  expect(oneLine("  a b  ")).toBe("a b")
})

test("the text is held to no length, so a long line arrives entire", () => {
  expect(oneLine("held ".repeat(200)).length).toBe(999)
})
