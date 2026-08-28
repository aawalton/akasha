import { afterAll, describe, expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { deriver } from "./page-derive.ts"
import type { Roots } from "../../page/page"

const front = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/page-type.page-type.md": front(["extends-slug: none"]),
  "pages/page-type/root.page-type.md": front(["extends-slug: none"]),
  "pages/page-type/leaf.page-type.md": front(["extends-slug: root"]),

  "pages/page-property-definition/page-type-properties.page-property-definition.md": front([
    "defined-on-slug: page-type",
    "key: properties",
    "type: list(relation-slug)",
    "computed: true",
  ]),
  "pages/page-property-definition/root-a.page-property-definition.md": front(["defined-on-slug: root", "key: a", "type: text"]),
  "pages/page-property-definition/root-b.page-property-definition.md": front(["defined-on-slug: root", "key: b", "type: text"]),
  "pages/page-property-definition/leaf-b.page-property-definition.md": front(["defined-on-slug: leaf", "key: b", "type: text"]),
  "pages/page-property-definition/leaf-c.page-property-definition.md": front(["defined-on-slug: leaf", "key: c", "type: text"]),
}

const root = mkdtempSync(join("/var/tmp", "page-type-properties-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const away = join(root, "no-such-repo")

const ROOTS: Roots = {
  akasha: root,
  books: away,
  code: away,
  "code-editor": away,
  instructions: away,
  memory: away,
  stories: away,
}

const propertiesOf = (named: string): unknown =>
  deriver(ROOTS)
    .rows("page-type")!
    .find((row) => row.at.endsWith(`/${named}.page-type.md`))!.values.properties

describe("the properties a page type carries", () => {
  test("is every property declared on it and every one up its extends chain, sorted", () => {
    expect(propertiesOf("leaf")).toEqual(["leaf-b", "leaf-c", "root-a"])
  })

  test("takes the nearest declaration of a key, so the one it narrows is left out", () => {
    expect(propertiesOf("leaf")).not.toContain("root-b")
  })

  test("is its own alone where the page type extends nothing", () => {
    expect(propertiesOf("root")).toEqual(["root-a", "root-b"])
  })

  test("reaches up the chain and never down it", () => {
    expect(propertiesOf("root")).not.toContain("leaf-b")
  })

  test("names the property answering it, a computed property being a property like any other", () => {
    expect(propertiesOf("page-type")).toEqual(["page-type-properties"])
  })
})
