import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { answer, type Row, textOf } from "../lib/page-query.ts"
import type { Roots } from "../../page/page"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const STATED = "019ffc7b-4548-7003-bb59-10d047bdc78c"

const BARE = "instructions:pages/token/bare.md"
const ALSO_BARE = "instructions:pages/token/also-bare.md"
const STATES_ONE = "instructions:pages/token/stated.md"

const DERIVED: Readonly<Record<string, string>> = {
  [BARE]: "7cd59bbc-f20e-5c5b-ab47-8a26a1558c73",
  [ALSO_BARE]: "fcf079e2-67a1-5f9f-b9c2-45ae97794a1d",
  [STATES_ONE]: "d1508ff2-4810-5fb6-ae61-ce260246e0ac",
}

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/token.page-type.md": page(["extends-slug: none"]),
  "pages/page-property-definition/token-id.page-property-definition.md": page(["defined-on-slug: token", "key: id", "type: uuid"]),
  "pages/page-property-definition/token-title.page-property-definition.md": page(["defined-on-slug: token", "key: title", "type: text"]),
  "pages/token/bare.md": page(["title: Bare"]),
  "pages/token/also-bare.md": page(["title: Also bare"]),
  "pages/token/stated.md": page([`id: ${STATED}`, "title: Stated"]),
}

const root = mkdtempSync(join("/var/tmp", "page-query-derived-id-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const away = join(root, "no-such-repo")

const ROOTS: Roots = {
  instructions: root,
  code: away,
  memory: away,
  books: away,
  stories: away,
  "code-editor": away,
}

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
    const got = endingIn("a1558c73")
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
    expect(endingIn("7cd59bbc").n).toBe(0)
  })

  it("leaves `id` out of a query that never names it", () => {
    const rows = answer(ROOTS, { pageType: "token" })!.rows
    expect(rows.find((row) => row.at === BARE)?.values.id).toBeUndefined()
  })
})
