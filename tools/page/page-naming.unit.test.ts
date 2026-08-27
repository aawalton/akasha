import { expect, test } from "bun:test"
import { camelizeKey, constantHolesIn } from "./page-naming.ts"

test("a key spelled with separators camelizes", () => {
  expect(camelizeKey("created-at")).toBe("createdAt")
  expect(camelizeKey("")).toBe("")
})

test("only the holes a row settles are constant", () => {
  expect(constantHolesIn("{persona-slug}-{slug}")).toEqual([])
  expect(constantHolesIn("{created-at}-{slug}")).toEqual(["created-at"])
})
