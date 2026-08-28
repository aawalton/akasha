import { afterAll, describe, expect, it } from "bun:test"
import { rmSync } from "node:fs"
import { deriver } from "../lib/page-derive.ts"
import { type Values } from "../lib/page-file-values"
import { answer } from "../lib/page-query.ts"
import { plantPages } from "./page-derive-fixture.ts"

const { root, roots: ROOTS } = plantPages()

afterAll(() => rmSync(root, { recursive: true, force: true }))

describe("a large property, which is loaded only where it is asked for by name", () => {
  it("is carried where `keys` names it", () => {
    const got = answer(ROOTS, { pageType: "scroll", keys: ["words"] })
    expect(got?.rows[0]?.values.words).toBe("the words the page does not carry\n")
    expect(got?.omitted).toEqual([])
  })

  it("is left behind where the query names no `keys`, and the answer says which", () => {
    const got = answer(ROOTS, { pageType: "scroll" })
    expect(got?.rows[0]?.values.words).toBeUndefined()
    expect(got?.omitted).toEqual(["words"])
  })

  it("names only the large keys, never a value the answer did carry", () => {
    const got = answer(ROOTS, { pageType: "scroll" })
    expect(got?.rows[0]?.values.keeper).toBe("ada")
    expect(got?.omitted).not.toContain("keeper")
  })
})

const site = (named: string, carries?: { readonly body: boolean }): Values =>
  [...deriver(ROOTS, carries).rows("site")!].find((row) => row.at.endsWith(`/${named}.site.md`))!
    .values

describe("a page's body", () => {
  it("is carried where it is asked for, a body being a property like any other", () => {
    expect(site("bodied", { body: true }).body).toContain("something under its frontmatter")
  })

  it("is left where it is not, so no answer carries every document it could have", () => {
    expect(site("bodied").body).toBeUndefined()
  })

  it("is nothing where the file holds only frontmatter, rather than an empty string", () => {
    expect(site("here", { body: true }).body).toBeNull()
  })

  it("reaches a query naming it among its keys, which is how a product asks for one", () => {
    const found = answer(ROOTS, { pageType: "site", keys: ["body"] })!
    const one = found.rows.find((row) => row.at.endsWith("/bodied.site.md"))!
    expect(one.values.body).toContain("something under its frontmatter")
  })

  it("is absent from a query not naming it, however the pages were read", () => {
    const found = answer(ROOTS, { pageType: "site", keys: ["slug"] })!
    expect(found.rows.every((row) => row.values.body === undefined)).toBe(true)
  })
})
