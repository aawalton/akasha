import { describe, expect, test } from "bun:test"
import {
  EDGE_PRODUCER_PAGE_DIR,
  narrowedTo,
  PRODUCER_PAGE_DIR,
  type ReachTree,
  readProducerReach,
  REACHED_REPO,
  withinReach,
} from "../lib/graph/producer-reach.ts"

const SEEDED = [`${EDGE_PRODUCER_PAGE_DIR}/**`, `${PRODUCER_PAGE_DIR}/**`]

const page = (front: string): string => `---\n${front}---\n\n# Definition\n\n- **A** — a line.\n`

const plant = (files: Record<string, string>): ReachTree => ({
  files: Object.keys(files),
  read: (path) => files[path] ?? null,
})

const globsOf = (tree: ReachTree): readonly string[] =>
  readProducerReach(tree).get(REACHED_REPO) ?? []

describe("what a producer reads is read off its page rather than written in code", () => {
  test("the reach a producer page states stands in the reach", () => {
    const globs = globsOf(
      plant({
        [`${PRODUCER_PAGE_DIR}/one.md`]: page("reads-instructions-path: pages/cluster-check/**\n"),
      })
    )
    expect(globs).toContain("pages/cluster-check/**")
  })

  test("the pages stating the reach are inside it, so widening one is noticed", () => {
    expect(globsOf(plant({}))).toEqual(SEEDED)
  })

  test("an edge producer states a reach the same way a node producer does", () => {
    const globs = globsOf(
      plant({
        [`${EDGE_PRODUCER_PAGE_DIR}/one.md`]: page("reads-instructions-path: tools/**\n"),
      })
    )
    expect(globs).toContain("tools/**")
  })

  test("a producer stating several paths contributes every one", () => {
    const globs = globsOf(
      plant({
        [`${PRODUCER_PAGE_DIR}/one.md`]: page(
          "reads-instructions-path:\n  - pages/cluster-check/**\n  - pages/repo/**\n"
        ),
      })
    )
    expect(globs).toContain("pages/cluster-check/**")
    expect(globs).toContain("pages/repo/**")
  })

  test("two producers naming one path contribute it once", () => {
    const one = page("reads-instructions-path: pages/cluster-check/**\n")
    const globs = globsOf(
      plant({ [`${PRODUCER_PAGE_DIR}/one.md`]: one, [`${PRODUCER_PAGE_DIR}/two.md`]: one })
    )
    expect(globs.filter((glob) => glob === "pages/cluster-check/**")).toHaveLength(1)
  })

  test("a producer reading nothing in the instructions repository widens nothing", () => {
    expect(globsOf(plant({ [`${PRODUCER_PAGE_DIR}/one.md`]: page("code-name: one\n") }))).toEqual(
      SEEDED
    )
  })

  test("a page outside the producer folder states no reach, whatever it carries", () => {
    const globs = globsOf(
      plant({ "pages/domain/one.md": page("reads-instructions-path: pages/anything/**\n") })
    )
    expect(globs).not.toContain("pages/anything/**")
  })

  test("a producer page the snapshot carries no body for is refused", () => {
    const tree: ReachTree = { files: [`${PRODUCER_PAGE_DIR}/one.md`], read: () => null }
    expect(() => readProducerReach(tree)).toThrow(/carries no body/)
  })
})

describe("a reach decides which files a snapshot takes in", () => {
  test("a path inside a stated glob is taken and one outside is left", () => {
    expect(withinReach("pages/cluster-check/a.md", ["pages/cluster-check/**"])).toBe(true)
    expect(withinReach("pages/domain/a.md", ["pages/cluster-check/**"])).toBe(false)
  })

  test("a reach of nothing takes nothing, rather than everything", () => {
    expect(narrowedTo(["a.md", "b.md"], [])).toEqual([])
  })

  test("no reach at all leaves the files as they were", () => {
    expect(narrowedTo(["a.md", "b.md"], undefined)).toEqual(["a.md", "b.md"])
  })
})
