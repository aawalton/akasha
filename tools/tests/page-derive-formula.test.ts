import { afterAll, describe, expect, it } from "bun:test"
import { rmSync } from "node:fs"
import { deriver } from "../lib/page-derive.ts"
import { answer, NOW } from "../lib/page-query.ts"
import { plantPages } from "./page-derive-fixture.ts"

const { root, roots: ROOTS } = plantPages()

afterAll(() => rmSync(root, { recursive: true, force: true }))

describe("the type a property declared as a formula answers to", () => {
  it("is the return type the formula states, rather than the word `formula`", () => {
    expect(deriver(ROOTS).typeOf("gauge", "charged")).toBe("number")
  })

  it("is nothing where the formula states no return type, rather than a guess at one", () => {
    expect(deriver(ROOTS).typeOf("gauge", "unstated")).toBeNull()
  })

  it("is the stated type itself where the property is no formula", () => {
    expect(deriver(ROOTS).typeOf("gauge", "used")).toBe("number")
  })
})

describe("a formula read through every operator that turns on its type", () => {
  it("means a formula returning a number over the pages carrying it", () => {
    const got = answer(ROOTS, { pageType: "gauge", function: "mean", target: "charged" })
    expect(got!.value).toBe(9)
    expect(got!.over).toBe(3)
  })

  it("reads a `where` bound on a formula returning an instant as a moment", () => {
    const at = Date.parse("2026-06-01T00:00:00Z")
    const got = answer(ROOTS, { pageType: "gauge", where: [{ key: "seen", atOrAfter: NOW }] }, at)
    expect(got!.n).toBe(1)
  })

  it("orders a `sort-by` on a formula returning an instant by moment", () => {
    const sorted = answer(ROOTS, { pageType: "gauge", sortBy: "seen", descending: true, limit: 1 })
    expect(sorted!.rows[0]?.values.seen).toBe("10 Feb 2027")
  })
})
