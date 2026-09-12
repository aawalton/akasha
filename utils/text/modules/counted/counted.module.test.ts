import { expect, test } from "bun:test"
import { counted } from "akasha/utils/text/modules/counted/counted.module.code.ts"

test("a count of one is said with the singular", () => {
  expect(counted(1, "file")).toBe("1 file")
})

test("every other count is said with the plural", () => {
  expect(counted(2, "file")).toBe("2 files")
})

test("a count of none is said with the plural", () => {
  expect(counted(0, "file")).toBe("0 files")
})

test("the plural is the singular with an `s` at its end", () => {
  expect(counted(11, "page")).toBe("11 pages")
})

test("a count is written as digits rather than as a word", () => {
  expect(counted(3, "edit")).toBe("3 edits")
})
