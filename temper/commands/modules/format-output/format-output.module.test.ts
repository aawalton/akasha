import { expect, test } from "bun:test"
import {
  emitJson,
  emitTsv,
} from "akasha/temper/commands/modules/format-output/format-output.module.code.ts"

test("rows are drawn under the columns named, in the order named", () => {
  expect(emitTsv([{ b: 2, a: 1 }], ["a", "b"])).toBe("a\tb\n1\t2")
})

test("no row draws the header alone", () => {
  expect(emitTsv([], ["a", "b"])).toBe("a\tb")
})

test("a column a row says nothing of draws an empty cell", () => {
  expect(emitTsv([{ a: 1 }], ["a", "b"])).toBe("a\tb\n1\t")
})

test("a cell that is null says so rather than drawing empty", () => {
  expect(emitTsv([{ a: null }], ["a"])).toBe("a\nnull")
})

test("a tab or a newline in a cell is escaped, so one row stays one line", () => {
  expect(emitTsv([{ a: "one\ttwo\nthree" }], ["a"])).toBe("a\none\\ttwo\\nthree")
})

test("JSON is drawn indented", () => {
  expect(emitJson({ a: 1 })).toBe('{\n  "a": 1\n}')
})
