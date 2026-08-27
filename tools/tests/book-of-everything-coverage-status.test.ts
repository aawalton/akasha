import { describe, expect, test } from "bun:test"
import {
  buildCoverageReport,
  CANONICAL_DIVISIONS,
  CANONICAL_PARTS,
  CANONICAL_SECTIONS,
  countMaterialized,
  countMeasuredSections,
  coveragePercent,
  flattenLeaves,
  isMeasured,
  type StatusNode,
} from "../lib/book-of-everything-coverage-status.ts"
import type { ProfileStatus } from "../lib/book-of-everything-profile.ts"

const node = (status: ProfileStatus, ...children: readonly StatusNode[]): StatusNode => ({
  path: status,
  label: status,
  title: status,
  status,
  children,
})

describe("isMeasured — the discriminator is status, never D", () => {
  test('only "unopened" is unmeasured; live and resting are measured', () => {
    expect(isMeasured("unopened")).toBe(false)
    expect(isMeasured("live")).toBe(true)
    expect(isMeasured("resting")).toBe(true)
  })
})

describe("countMaterialized", () => {
  test("counts every node in the subtree incl. self, measured vs total", () => {
    const tree = node("live", node("unopened"), node("resting", node("unopened")))
    expect(countMaterialized(tree)).toEqual({ measured: 2, total: 4 })
  })

  test("a single unopened node is 0/1", () => {
    expect(countMaterialized(node("unopened"))).toEqual({ measured: 0, total: 1 })
  })
})

describe("flattenLeaves", () => {
  test("returns only childless nodes, in pre-order", () => {
    const a = node("unopened")
    const b = node("live")
    const c = node("resting")
    const tree = node("unopened", node("live", a, b), c)
    expect(flattenLeaves(tree)).toEqual([a, b, c])
  })

  test("a leaf is its own only leaf", () => {
    const leaf = node("resting")
    expect(flattenLeaves(leaf)).toEqual([leaf])
  })
})

describe("countMeasuredSections — sections are the depth-3 nodes", () => {
  const tree = node(
    "live",
    node(
      "resting",
      node(
        "unopened",
        node("live"),
        node("unopened"),
        node("resting", node("unopened"))
      )
    )
  )

  test("counts only measured depth-3 nodes, ignoring shallower and deeper", () => {
    expect(countMeasuredSections(tree, 0)).toBe(2)
  })

  test("starting the walk at a Part (depth 1) reaches the same sections", () => {
    const part = tree.children[0]
    expect(part).toBeDefined()
    if (part === undefined) return
    expect(countMeasuredSections(part, 1)).toBe(2)
  })
})

describe("buildCoverageReport — both denominators, canonical wiring", () => {
  test("an empty root yields canonical denominators and zero numerators", () => {
    const report = buildCoverageReport(node("unopened"))
    expect(report.sectionHeadline).toEqual({ measured: 0, total: CANONICAL_SECTIONS })
    expect(report.materializedDetail).toEqual({ measured: 0, total: 1 })
    expect(report.parts).toHaveLength(CANONICAL_PARTS)
    expect(report.divisions).toHaveLength(CANONICAL_DIVISIONS)
  })

  test("section denominators are canonical; numerators come from the disk tree", () => {
    const root = node("unopened", node("resting", node("unopened", node("live"), node("unopened"))))
    const report = buildCoverageReport(root)
    expect(report.sectionHeadline.measured).toBe(1)
    const part1 = report.parts[0]
    expect(part1).toBeDefined()
    if (part1 === undefined) return
    expect(part1.sections.measured).toBe(1)
    const div11 = report.divisions[0]
    expect(div11).toBeDefined()
    if (div11 === undefined) return
    expect(div11.sections.measured).toBe(1)
  })

  test("section headline is monotonic-up: opening a section only raises the numerator", () => {
    const closed = buildCoverageReport(
      node("unopened", node("unopened", node("unopened", node("unopened"))))
    )
    const opened = buildCoverageReport(
      node("unopened", node("unopened", node("unopened", node("live"))))
    )
    expect(opened.sectionHeadline.measured).toBeGreaterThan(closed.sectionHeadline.measured)
    expect(opened.sectionHeadline.total).toBe(closed.sectionHeadline.total)
  })
})

describe("coveragePercent", () => {
  test("0/0 reads as 0%, not NaN", () => {
    expect(coveragePercent({ measured: 0, total: 0 })).toBe(0)
  })

  test("reaches exactly 100 when fully measured", () => {
    expect(coveragePercent({ measured: 177, total: 177 })).toBe(100)
  })

  test("a fraction renders as the expected percentage", () => {
    expect(coveragePercent({ measured: 1, total: 4 })).toBe(25)
  })
})
