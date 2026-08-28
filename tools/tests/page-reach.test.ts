import { afterAll, describe, expect, it } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { deriver } from "../lib/page-derive.ts"
import { answer } from "../lib/page-query.ts"
import type { Roots } from "../../page/page.ts"

const page = (lines: readonly string[]): string => `---\n${lines.join("\n")}\n---\n`

const kind = (): string => page(["extends-slug: none"])

const under = (above: string): string => page([`extends-slug: ${above}`])

const property = (on: string, key: string, lines: readonly string[]): string =>
  page([`defined-on-slug: ${on}`, `key: ${key}`, ...lines])

const FILES: Readonly<Record<string, string>> = {
  "pages/page-type/plant.page-type.md": kind(),
  "pages/page-type/tree.page-type.md": under("plant"),
  "pages/page-type/orchard.page-type.md": kind(),
  "pages/page-type/grove.page-type.md": kind(),

  "pages/page-property-definition/tree-fruit.page-property-definition.md": property("tree", "fruit", ["type: number"]),
  "pages/page-property-definition/plant-name.page-property-definition.md": property("plant", "name", ["type: text"]),

  "pages/page-property-definition/orchard-trees.page-property-definition.md": property("orchard", "trees", [
    "type: list(relation-slug)",
    "target-slug: tree",
  ]),
  "pages/page-property-definition/orchard-fruit.page-property-definition.md": property("orchard", "fruit", [
    "type: number",
    "relation: trees",
    "function: sum",
    "target: fruit",
  ]),
  "pages/page-property-definition/orchard-tally.page-property-definition.md": property("orchard", "tally", [
    "type: number",
    "relation: trees",
    "function: count",
  ]),
  "pages/page-property-definition/orchard-first-name.page-property-definition.md": property("orchard", "first-name", [
    "type: text",
    "relation: trees",
    "target: name",
  ]),

  "pages/page-property-definition/grove-trees.page-property-definition.md": property("grove", "trees", [
    "type: list(relation-slug)",
    "target-slug: tree",
  ]),
  "pages/page-property-definition/grove-fruit.page-property-definition.md": property("grove", "fruit", [
    "type: number",
    "relation: trees",
    "function: sum",
    "target: fruit",
  ]),
  "pages/page-property-definition/grove-tally.page-property-definition.md": property("grove", "tally", ["type: number", "relation: trees"]),
  "pages/page-property-definition/grove-first-name.page-property-definition.md": property("grove", "first-name", [
    "type: number",
    "relation: trees",
    "target: name",
  ]),

  "pages/tree/one.tree.md": page(["slug: one", "fruit: 3", "name: Ash"]),
  "pages/tree/two.tree.md": page(["slug: two", "fruit: 4.5", "name: Birch"]),
  "pages/tree/three.tree.md": page(["slug: three", "name: Cedar"]),

  "pages/orchard/north.orchard.md": page(["slug: north", "trees:\n  - one\n  - two\n  - three"]),
  "pages/orchard/bare.orchard.md": page(["slug: bare"]),

  "pages/grove/west.grove.md": page(["slug: west", "trees: one"]),
}

const root = mkdtempSync(join("/var/tmp", "page-reach-"))

for (const [relPath, text] of Object.entries(FILES)) {
  mkdirSync(join(root, relPath, ".."), { recursive: true })
  writeFileSync(join(root, relPath), text)
}

afterAll(() => rmSync(root, { recursive: true, force: true }))

const ROOTS: Roots = { akasha: root }

const held = (pageType: string, key: string): ReadonlyMap<string, unknown> =>
  new Map([...deriver(ROOTS).rows(pageType)!].map((row) => [row.values.slug as string, row.values[key]]))

const faultsOf = (pageType: string): readonly string[] => {
  const found = deriver(ROOTS)
  Array.from(found.rows(pageType) ?? [])
  return found.faults()
}

describe("an aggregate, which reduces one property across the pages a relation reaches", () => {
  it("adds the target up over every page reached, passing over one carrying no value", () => {
    expect(held("orchard", "fruit").get("north")).toBe("7.5")
  })

  it("counts the pages reached where it states `function: count`", () => {
    expect(held("orchard", "tally").get("north")).toBe("3")
  })

  it("answers nothing where the relation reaches no page, rather than zero", () => {
    expect(held("orchard", "fruit").get("bare")).toBeNull()
  })

  it("counts nothing as none where the relation reaches no page", () => {
    expect(held("orchard", "tally").get("bare")).toBe("0")
  })

  it("answers to the type its sum has, so a query may reduce it", () => {
    expect(deriver(ROOTS).typeOf("orchard", "fruit")).toBe("number")
  })

  it("reduces where the property states the type it holds beside the relation it walks", () => {
    expect(held("grove", "fruit").get("west")).toBe("3")
  })

  it("reports no fault where every page it reaches is there", () => {
    expect(faultsOf("orchard")).toEqual([])
  })
})

describe("a rollup, which reads one property from a page a relation reaches", () => {
  it("takes the value from the first page reached that carries one", () => {
    expect(held("orchard", "first-name").get("north")).toBe("Ash")
  })

  it("answers nothing where the relation reaches no page", () => {
    expect(held("orchard", "first-name").get("bare")).toBeNull()
  })

  it("passes a stated type its target holds only by inheriting it from a page type above", () => {
    expect(faultsOf("orchard")).toEqual([])
  })
})

describe("a property the deriver cannot work out, which refuses rather than reading as empty", () => {
  it("names a relation walked for a property that says nothing about what it reads", () => {
    expect(faultsOf("grove")).toContain(
      "`grove-tally` states `relation` and no `target`, so nothing says which property it reads " +
        "on each page it reaches"
    )
  })

  it("names both types and the target where a rollup states one its target does not hold", () => {
    expect(faultsOf("grove")).toContain(
      "`grove-first-name` states `type: number` and reads `target: name` on `tree`, which holds " +
        "`text`, so a reader of this property is told it holds one type and handed another"
    )
  })

  it("answers nothing for the property it could not work out", () => {
    expect(held("grove", "tally").get("west")).toBeNull()
  })
})

describe("what a query reducing a property it cannot reach reports", () => {
  it("reduces an aggregate the same as any other number", () => {
    const got = answer(ROOTS, { pageType: "orchard", function: "sum", target: "fruit" })
    expect(got!.value).toBe(7.5)
    expect(got!.over).toBe(1)
  })

  it("names a target no property declares, rather than answering null over nothing", () => {
    const got = answer(ROOTS, { pageType: "orchard", function: "sum", target: "no-such-key" })
    expect(got!.faults).toContain(
      "`no-such-key` is the property this query reduces and no property declares it on " +
        "`orchard`, so a number here would have been reduced over nothing"
    )
  })

  it("names a target declared as something that does not add up", () => {
    const got = answer(ROOTS, { pageType: "tree", function: "sum", target: "name" })
    expect(got!.faults).toContain(
      "`name` is the property this query reduces and it is declared `text` rather " +
        "than `number`, so there is nothing here to add up"
    )
  })
})
