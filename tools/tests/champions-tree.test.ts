
import { describe, expect, test } from "bun:test"
import { countNodes, type DomainRow, championTree, treeLines, treeRecord } from "../lib/champions-tree.ts"

function row(
  slug: string,
  parent: string | null,
  persona: string | null = "aine",
  sequence: readonly string[] = []
): DomainRow {
  return { slug, relPath: `pages/domain/${slug}.domain.md`, persona, parent, sequence }
}

describe("ownershipTree", () => {
  test("a domain naming itself as its parent is the root rather than its own child", () => {
    const tree = championTree([row("global", "global"), row("person", "global")])
    expect(tree.roots.map((one) => one.slug)).toEqual(["global"])
    expect(tree.roots[0]?.children.map((one) => one.slug)).toEqual(["person"])
    expect(tree.unreached).toEqual([])
  })

  test("every domain appears exactly once, however many parents the DAG gave it", () => {
    const rows = [
      row("global", "global"),
      row("project", "global"),
      row("task", "global"),
      row("build-singleton-commit", "project"),
    ]
    const tree = championTree(rows)
    expect(countNodes(tree.roots)).toBe(rows.length)
    const under = (slug: string) =>
      treeLines(tree).filter((line) => line.trim().startsWith(`${slug}  `)).length
    expect(under("build-singleton-commit")).toBe(1)
  })

  test("children stand in alphabetical order at every level", () => {
    const tree = championTree([row("global", null), row("zeta", "global"), row("alpha", "global")])
    expect(tree.roots[0]?.children.map((one) => one.slug)).toEqual(["alpha", "zeta"])
  })

  test("a domain's sequence members stand first, in the order it named them", () => {
    const tree = championTree([
      row("global", null),
      row("foundational-layers", "global", "aine", ["work-system", "pages-system"]),
      row("pages-system", "foundational-layers"),
      row("work-system", "foundational-layers"),
    ])
    const layers = tree.roots[0]?.children[0]
    expect(layers?.children.map((one) => one.slug)).toEqual(["work-system", "pages-system"])
  })

  test("a child the sequence does not name follows it alphabetically", () => {
    const tree = championTree([
      row("global", null, "aine", ["zeta", "yankee"]),
      row("zeta", "global"),
      row("yankee", "global"),
      row("bravo", "global"),
      row("alpha", "global"),
    ])
    const drawn = tree.roots[0]?.children.map((one) => one.slug)
    expect(drawn).toEqual(["zeta", "yankee", "alpha", "bravo"])
  })

  test("a sequence entry naming no child of this domain is passed over rather than refused", () => {
    const tree = championTree([
      row("global", null, "aine", ["elsewhere", "zeta"]),
      row("zeta", "global"),
      row("alpha", "global"),
    ])
    expect(tree.roots[0]?.children.map((one) => one.slug)).toEqual(["zeta", "alpha"])
  })

  test("a slug a sequence names twice is placed once, rather than drawn twice", () => {
    const tree = championTree([
      row("global", null, "aine", ["zeta", "zeta"]),
      row("zeta", "global"),
      row("alpha", "global"),
    ])
    expect(tree.roots[0]?.children.map((one) => one.slug)).toEqual(["zeta", "alpha"])
    expect(countNodes(tree.roots)).toBe(3)
  })

  test("a sequenced child carries its 1-based place, and an unsequenced one carries none", () => {
    const tree = championTree([
      row("global", null, "aine", ["zeta", "yankee"]),
      row("zeta", "global"),
      row("yankee", "global"),
      row("alpha", "global"),
    ])
    const drawn = tree.roots[0]?.children.map((one) => [one.slug, one.position])
    expect(drawn).toEqual([
      ["zeta", 1],
      ["yankee", 2],
      ["alpha", null],
    ])
  })

  test("a place counts the children actually placed, not the entries the sequence held", () => {
    const tree = championTree([
      row("global", null, "aine", ["elsewhere", "zeta", "elsewhere-too", "alpha"]),
      row("zeta", "global"),
      row("alpha", "global"),
    ])
    const drawn = tree.roots[0]?.children.map((one) => [one.slug, one.position])
    expect(drawn).toEqual([
      ["zeta", 1],
      ["alpha", 2],
    ])
  })

  test("a root carries no place, having no parent to have sequenced it", () => {
    const tree = championTree([row("global", null), row("orphan", "nobody")])
    expect(tree.roots.map((one) => one.position)).toEqual([null, null])
  })

  test("a parent no row declares leaves its domain a root rather than dropping it", () => {
    const tree = championTree([row("global", null), row("orphan", "nobody")])
    expect(tree.roots.map((one) => one.slug)).toEqual(["global", "orphan"])
    expect(countNodes(tree.roots)).toBe(2)
  })

  test("a cycle is reported as unreached rather than looping or vanishing silently", () => {
    const tree = championTree([row("global", null), row("a", "b"), row("b", "a")])
    expect(tree.roots.map((one) => one.slug)).toEqual(["global"])
    expect(tree.unreached).toEqual(["a", "b"])
    expect(treeLines(tree).at(-1)).toContain("2 domain(s) no root reaches: a, b")
  })

  test("a persona the descent never reaches is said rather than left blank", () => {
    const tree = championTree([row("global", null, null)])
    expect(tree.roots[0]?.persona).toBeNull()
    expect(treeLines(tree)[0]).toContain("no persona")
  })
})

describe("treeLines", () => {
  test("a line's indentation is its distance from the root along the ownership edge", () => {
    const chain = ["global", "foundational-layers", "agent-harness", "role", "task"]
    const tree = championTree(chain.map((slug, at) => row(slug, chain[at - 1] ?? "global")))
    const depths = treeLines(tree).map((line) => (line.length - line.trimStart().length) / 2)
    expect(depths).toEqual([0, 1, 2, 3, 4])
  })

  test("every domain given gets exactly one line, whatever the shape above it", () => {
    const rows = [row("global", "global"), row("a", "global"), row("b", "a"), row("c", "global")]
    expect(treeLines(championTree(rows))).toHaveLength(rows.length)
  })
})

describe("treeRecord", () => {
  test("carries the repo root, because every path in it is relative to one", () => {
    const record = treeRecord(championTree([row("global", null)]), "/home/walton/instructions")
    expect(record.repo).toBe("/home/walton/instructions")
    expect(JSON.parse(JSON.stringify(record))).toEqual({
      repo: "/home/walton/instructions",
      roots: [
        {
          slug: "global",
          relPath: "pages/domain/global.domain.md",
          persona: "aine",
          position: null,
          children: [],
        },
      ],
      unreached: [],
    })
  })
})
