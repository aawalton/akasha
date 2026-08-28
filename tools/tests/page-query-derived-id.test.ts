import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { answer } from "../lib/page-query.ts"
import { type Row } from "../lib/page-derive-shape.ts"
import { textOf } from "../lib/page-query-values.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const STATED = "019ffc7b-4548-7003-bb59-10d047bdc78c"

const BARE = "akasha:pages/token/bare.token.md"
const ALSO_BARE = "akasha:pages/token/also-bare.token.md"
const STATES_ONE = "akasha:pages/token/stated.token.md"

const DERIVED: Readonly<Record<string, string>> = {
  [BARE]: "ee70b17a-ae4d-590a-9818-9a001ded21e7",
  [ALSO_BARE]: "4b924347-cbb3-578e-bb03-54901be7c984",
  [STATES_ONE]: "9cc90e0c-8d2d-5fbb-b8e1-25f61ce62616",
}

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/token.page-type.md": page(["extends-slug: none"]),
  "pages/page-property-definition/token-id.page-property-definition.md": page(["defined-on-slug: token", "key: id", "type: uuid"]),
  "pages/page-property-definition/token-title.page-property-definition.md": page(["defined-on-slug: token", "key: title", "type: text"]),
  "pages/token/bare.token.md": page(["title: Bare"]),
  "pages/token/also-bare.token.md": page(["title: Also bare"]),
  "pages/token/stated.token.md": page([`id: ${STATED}`, "title: Stated"]),
}

const root = mkdtempSync(join("/var/tmp", "page-query-derived-id-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const ROOTS: Roots = { akasha: root }

const idOf = (row: Row): string => textOf(row.values, "id") ?? ""

const everyToken = (): readonly Row[] => answer(ROOTS, { pageType: "token", keys: ["id"] })!.rows

const oneBy = (id: string) => answer(ROOTS, { pageType: "token", where: [{ key: "id", is: id }] })!

const endingIn = (suffix: string) =>
  answer(ROOTS, { pageType: "token", where: [{ key: "id", endsWith: suffix }] })!

describe("a page query narrowing on `id`", () => {
  it("carries the uuid the page's own path names where its file states none", () => {
    const found = Object.fromEntries(everyToken().map((row) => [row.at, idOf(row)]))
    expect(found).toEqual({
      [BARE]: DERIVED[BARE],
      [ALSO_BARE]: DERIVED[ALSO_BARE],
      [STATES_ONE]: STATED,
    })
  })

  it("finds every page by the id it reads back with", () => {
    for (const row of everyToken()) {
      const got = oneBy(idOf(row))
      expect(got.n).toBe(1)
      expect(got.rows[0]?.at).toBe(row.at)
    }
  })

  it("answers an id nothing carries with no rows rather than with every row", () => {
    const got = oneBy("00000000-dead-7000-8000-000000000000")
    expect(got.n).toBe(0)
    expect(got.absent).toEqual([])
  })

  it("takes the id a file states over the one its path would name", () => {
    expect(oneBy(STATED).rows[0]?.at).toBe(STATES_ONE)
    expect(oneBy(DERIVED[STATES_ONE] ?? "").n).toBe(0)
  })

  it("narrows on `id` beside another key rather than either alone", () => {
    const both = answer(ROOTS, {
      pageType: "token",
      where: [{ key: "id", is: DERIVED[BARE] ?? "" }, { key: "title", is: "Also bare" }],
    })!
    expect(both.n).toBe(0)
  })

  it("finds a page by the last eight of the uuid its path names", () => {
    const got = endingIn("1ded21e7")
    expect(got.n).toBe(1)
    expect(got.rows[0]?.at).toBe(BARE)
  })

  it("finds a page by the last eight of the uuid its file states", () => {
    const got = endingIn("47bdc78c")
    expect(got.n).toBe(1)
    expect(got.rows[0]?.at).toBe(STATES_ONE)
  })

  it("answers no rows for an ending nothing carries", () => {
    expect(endingIn("deadbeef").n).toBe(0)
  })

  it("reads the ending as the end, so text standing elsewhere in an id does not match", () => {
    expect(endingIn("ee70b17a").n).toBe(0)
  })

  it("leaves `id` out of a query that never names it", () => {
    const rows = answer(ROOTS, { pageType: "token" })!.rows
    expect(rows.find((row) => row.at === BARE)?.values.id).toBeUndefined()
  })
})
