import { expect, test } from "bun:test"
import { sortedOnce } from "./sorted-once.module.code.ts"

test("a value given more than once comes back once", () => {
  expect(sortedOnce(["b", "a", "b"])).toEqual(["a", "b"])
})

test("the order is the one sorting puts the values in rather than the order given", () => {
  expect(sortedOnce(["c", "a", "b"])).toEqual(["a", "b", "c"])
})

test("nothing given comes back as nothing", () => {
  expect(sortedOnce([])).toEqual([])
})
