import { expect, test } from "bun:test"
import {
  parseStringArray,
  parseStringArrayOrOne,
} from "akasha/temper/items/filters/core/modules/search-string-array-parse/search-string-array-parse.module.code.ts"

test("a list of strings reads back as that list", () => {
  expect(parseStringArray(["4", "5"])).toEqual(["4", "5"])
  expect(parseStringArrayOrOne(["4", "5"])).toEqual(["4", "5"])
})

test("a single value is no list, unless read as one-or-many", () => {
  expect(parseStringArray("4")).toBeUndefined()
  expect(parseStringArrayOrOne("4")).toEqual(["4"])
  expect(parseStringArrayOrOne(4)).toEqual(["4"])
})

test("a list holding a non-string entry is no value", () => {
  expect(parseStringArray(["4", 5])).toBeUndefined()
  expect(parseStringArrayOrOne(["4", 5])).toBeUndefined()
  expect(parseStringArrayOrOne(undefined)).toBeUndefined()
})
