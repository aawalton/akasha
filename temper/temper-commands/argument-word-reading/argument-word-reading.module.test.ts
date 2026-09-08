import { expect, test } from "bun:test"
import { namesIn, valuesOf } from "./argument-word-reading.module.code.ts"

const ROOT_FLAG = "--repo-root"

const OUT_FLAG = "--out"

test("a flag answers with every value said after that flag", () => {
  const said = [ROOT_FLAG, "one", OUT_FLAG, "two", ROOT_FLAG, "three"]
  expect(valuesOf(said, ROOT_FLAG)).toEqual(["one", "three"])
})

test("a flag the call does not carry answers with nothing", () => {
  expect(valuesOf(["one", "two"], ROOT_FLAG)).toEqual([])
})

test("a flag no word follows answers with nothing", () => {
  expect(valuesOf([OUT_FLAG, ROOT_FLAG], ROOT_FLAG)).toEqual([])
})

test("a word opening with a dash is no name", () => {
  expect(namesIn(["one", "--all", "two"], [])).toEqual(["one", "two"])
})

test("the word after a flag taking a value is no name", () => {
  expect(namesIn([ROOT_FLAG, "one", "two"], [ROOT_FLAG])).toEqual(["two"])
})
