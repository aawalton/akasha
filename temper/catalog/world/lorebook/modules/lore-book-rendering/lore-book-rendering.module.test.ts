import { expect, test } from "bun:test"
import {
  assignedText,
  listSpreadText,
  literal,
  numeral,
  quoted,
  splitOver,
} from "akasha/temper/catalog/world/lorebook/modules/lore-book-rendering/lore-book-rendering.module.code.ts"

test("a string holding more double quotes than single is quoted with single quotes", () => {
  expect(quoted('Forged Letter from "Zali"')).toBe(`'Forged Letter from "Zali"'`)
  expect(quoted("Molag Mar\tTax")).toBe('"Molag Mar\\tTax"')
})

test("a number smaller than a ten-thousandth is written with an exponent", () => {
  expect(numeral(-0.0000728027)).toBe("-7.28027e-5")
  expect(numeral(0.3794)).toBe("0.3794")
})

test("an object is written a key to a line, and a list of numbers on one line", () => {
  expect(literal({ 20: { c: true, e: [], ld: [1, 2] } }, "")).toBe(
    "{\n  [20]: {\n    c: true,\n    e: [],\n    ld: [1, 2],\n  },\n}"
  )
})

test("a part closes before an entry would carry it past its ceiling", () => {
  expect(splitOver([4, 4, 4, 4], 10, 2, (one) => one)).toEqual([
    [4, 4],
    [4, 4],
  ])
})

test("assigning parts groups them, a group on one line where it fits", () => {
  expect(assignedText("T", ["A", "B", "C"], 2)).toBe("Object.assign(T, A, B)\nObject.assign(T, C)")
})

test("an assignment too long for one line takes no comma after its last part", () => {
  const long = Array.from({ length: 10 }, (_, at) => `BOOK_DATA_0${String(at)}`)
  expect(assignedText("BOOK_DATA", long, 10).endsWith("BOOK_DATA_09\n)")).toBe(true)
})

test("spread parts sit on one line where they fit", () => {
  expect(listSpreadText(["A", "B"], "    collections: ")).toBe("    collections: [...A, ...B],\n")
})
