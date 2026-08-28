import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { diskFileTree } from "../../page/file-tree.ts"
import { uncommittedKeysFor } from "../lib/page-uncommitted-keys.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const kind = (extendsSlug: string): string => page([`extends-slug: ${extendsSlug}`])

const property = (on: string, key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: ${on}`, `key: ${key}`, ...lines])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/beast.page-type.md": kind("none"),
  "pages/page-type/hound.page-type.md": kind("beast"),
  "pages/page-type/pup.page-type.md": kind("hound"),

  "pages/page-property-definition/beast-seen-at.page-property-definition.md": property("beast", "seen-at", ["type: instant", "uncommitted: true"]),
  "pages/page-property-definition/beast-name.page-property-definition.md": property("beast", "name", ["type: text"]),
  "pages/page-property-definition/hound-scent.page-property-definition.md": property("hound", "scent", ["type: text", "uncommitted: true"]),
  "pages/page-property-definition/hound-collar.page-property-definition.md": property("hound", "collar", ["type: text"]),
  "pages/page-property-definition/pup-weight.page-property-definition.md": property("pup", "weight", ["type: number"]),
}

const root = mkdtempSync(join("/var/tmp", "page-uncommitted-keys-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => {
  rmSync(root, { recursive: true, force: true })
})

const ROOTS: Roots = { akasha: root }

const treeHere = () => ({ ...diskFileTree(ROOTS), pending: new Set(Object.keys(FILES)) })

const keysOf = (pageType: string): readonly string[] =>
  [...uncommittedKeysFor(treeHere(), pageType)].sort()

describe("the uncommitted keys of a page type", () => {
  it("names the keys its own properties declare uncommitted, and no key that is not", () => {
    expect(keysOf("beast")).toEqual(["seen-at"])
  })

  it("inherits every uncommitted key declared up its `extends-slug` chain", () => {
    expect(keysOf("hound")).toEqual(["scent", "seen-at"])
    expect(keysOf("pup")).toEqual(["scent", "seen-at"])
  })

  it("says nothing for a page type nothing declares against", () => {
    expect(keysOf("no-such-type")).toEqual([])
  })
})
