import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { deriver } from "../lib/page-derive.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const property = (key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: badge`, `key: ${key}`, ...lines])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/badge.page-type.md": page(["extends-slug: none"]),
  "pages/page-property-definition/badge-shape.page-property-definition.md": property("shape", ["type: text", "default: round"]),
  "pages/page-property-definition/badge-groups.page-property-definition.md": property("group-slugs", [
    "type: list(relation-slug)",
    "target-slug: badge",
    "default:\n  - every-badge",
  ]),
  "pages/page-property-definition/badge-quiet.page-property-definition.md": property("quiet", ["type: text"]),
  "pages/badge/plain.badge.md": page(["slug: plain"]),
  "pages/badge/stated.badge.md": page(["slug: stated", "group-slugs:\n  - its-own-group"]),
}

const root = mkdtempSync(join("/var/tmp", "page-derive-default-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const ROOTS: Roots = {
  akasha: root,
}

const held = (key: string): ReadonlyMap<string, unknown> =>
  new Map(
    [...deriver(ROOTS).rows("badge")!].map((row) => [
      row.at.replace(/^.*\/|\.badge\.md$/g, ""),
      row.values[key],
    ])
  )

describe("the default a property declaration states", () => {
  it("stands on a page stating no such key, whether the default is one value", () => {
    expect(held("shape").get("plain")).toBe("round")
  })

  it("stands on a page stating no such key where the default is a list", () => {
    expect(held("group-slugs").get("plain")).toEqual(["every-badge"])
  })

  it("gives way to what the page states, so a list default loses to a stated list", () => {
    expect(held("group-slugs").get("stated")).toEqual(["its-own-group"])
  })

  it("leaves a property declaring no default off the page entirely", () => {
    expect(held("quiet").get("plain")).toBeUndefined()
  })
})
