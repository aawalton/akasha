import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { answer } from "../lib/page-query.ts"
import { textOf } from "../lib/page-query-values.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/window.page-type.md": page(["extends-slug: none"]),

  "pages/page-property-definition/window-resets-at.page-property-definition.md": page([
    "defined-on-slug: window",
    "key: resets-at",
    "type: instant",
  ]),
  "pages/page-property-definition/window-spelled-at.page-property-definition.md": page([
    "defined-on-slug: window",
    "key: spelled-at",
    "type: text",
  ]),

  "pages/window/offset.window.md": page([
    "resets-at: 2026-08-19T05:00:00+02:00",
    "spelled-at: 2026-08-19T05:00:00+02:00",
  ]),
  "pages/window/zulu.window.md": page(["resets-at: 2026-08-19T04:00:00Z", "spelled-at: 2026-08-19T04:00:00Z"]),
  "pages/window/gone.window.md": page(["resets-at: 2026-08-01T00:00:00Z", "spelled-at: 2026-08-01T00:00:00Z"]),
}

const root = mkdtempSync(join("/var/tmp", "page-query-instant-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const ROOTS: Roots = { akasha: root }

const NOON = Date.parse("2026-08-19T02:30:00Z")

const named = (key: string, rows: readonly { readonly values: Record<string, unknown> }[]): string[] =>
  rows.map((row) => textOf(row.values as never, key) ?? "")

describe("a page query sorting on a property declared `instant`", () => {
  it("orders by the moment rather than by the spelling", () => {
    const got = answer(ROOTS, { pageType: "window", sortBy: "resets-at" }, NOON)
    expect(named("resets-at", got!.rows)).toEqual([
      "2026-08-01T00:00:00Z",
      "2026-08-19T05:00:00+02:00",
      "2026-08-19T04:00:00Z",
    ])
  })

  it("orders the same values by their text where the property is not an instant", () => {
    const got = answer(ROOTS, { pageType: "window", sortBy: "spelled-at" }, NOON)
    expect(named("spelled-at", got!.rows)).toEqual([
      "2026-08-01T00:00:00Z",
      "2026-08-19T04:00:00Z",
      "2026-08-19T05:00:00+02:00",
    ])
  })
})

describe("a page query testing an instant against `now`", () => {
  it("keeps what is still ahead of the moment the query is answered", () => {
    const got = answer(
      ROOTS,
      { pageType: "window", where: [{ key: "resets-at", atOrAfter: "now" }], sortBy: "resets-at" },
      NOON
    )
    expect(named("resets-at", got!.rows)).toEqual([
      "2026-08-19T05:00:00+02:00",
      "2026-08-19T04:00:00Z",
    ])
  })

  it("moves with the moment, so the same query answers differently later", () => {
    const later = Date.parse("2026-08-19T03:30:00Z")
    const got = answer(
      ROOTS,
      { pageType: "window", where: [{ key: "resets-at", atOrAfter: "now" }] },
      later
    )
    expect(named("resets-at", got!.rows)).toEqual(["2026-08-19T04:00:00Z"])
  })

  it("keeps what the moment has already passed, on the other side of the same bound", () => {
    const got = answer(ROOTS, { pageType: "window", where: [{ key: "resets-at", before: "now" }] }, NOON)
    expect(named("resets-at", got!.rows)).toEqual(["2026-08-01T00:00:00Z"])
  })

  it("compares a stated instant by its moment too, whichever way each side is spelled", () => {
    const got = answer(
      ROOTS,
      {
        pageType: "window",
        where: [{ key: "resets-at", atOrAfter: "2026-08-19T02:15:00Z" }],
        sortBy: "resets-at",
      },
      NOON
    )
    expect(named("resets-at", got!.rows)).toEqual([
      "2026-08-19T05:00:00+02:00",
      "2026-08-19T04:00:00Z",
    ])
  })
})
