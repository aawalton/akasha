import { expect, test } from "bun:test"
import { camelizeKey } from "./page-naming.ts"

test("a key spelled with separators camelizes", () => {
  expect(camelizeKey("created-at")).toBe("createdAt")
  expect(camelizeKey("")).toBe("")
})
