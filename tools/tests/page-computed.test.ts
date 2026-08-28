import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { declarationsIn } from "../lib/page-declared.ts"
import type { Roots } from "../../page/page"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const kind = (): string => page(["extends-slug: none"])

const property = (on: string, key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: ${on}`, `key: ${key}`, ...lines])

const namedType = (slug: string, lines: readonly string[]): string =>
  page([`type-slug: ${slug}`, ...lines])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-property-type/number.page-property-type.md": namedType("number", ["kind: primitive"]),

  "pages/page-type/tree.page-type.md": kind(),

  "pages/page-property-definition/tree-fruit.page-property-definition.md": property("tree", "fruit", ["type: number"]),
  "pages/page-property-definition/tree-twice.page-property-definition.md": property("tree", "twice", ["type: number", "expression: fruit * 2"]),
  "pages/page-property-definition/tree-supplied.page-property-definition.md": property("tree", "supplied", ["type: number", "computed: true"]),
  "pages/page-property-definition/tree-plain.page-property-definition.md": property("tree", "plain", ["type: number"]),

  "pages/tree/one.tree.md": page(["slug: one", "fruit: 3"]),
}

const root = mkdtempSync(join("/var/tmp", "page-computed-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

// NAMED ONLY WHERE CLONED: every root named here is scanned, so a repo pointed at a path that is
// not there raises ENOENT rather than reading as a repository holding nothing.
const ROOTS: Roots = {
  akasha: root,
}

const computedOf = (slug: string): boolean | undefined => declarationsIn(ROOTS).bySlug.get(slug)?.computed

describe("whether a property is computed", () => {
  it("is answered by an expression, which is what says a property is worked out", () => {
    expect(computedOf("tree-twice")).toBe(true)
  })

  it("is answered no for a property stating only the type it holds", () => {
    expect(computedOf("tree-plain")).toBe(false)
  })

  it("is still stated for a value nothing in the declaration reaches", () => {
    expect(computedOf("tree-supplied")).toBe(true)
  })
})
