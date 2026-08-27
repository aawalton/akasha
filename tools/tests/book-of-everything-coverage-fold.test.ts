import { describe, expect, test } from "bun:test"
import { type CoverageNode, computeCoverage, formatScore, round2 } from "../lib/book-of-everything-coverage-fold.ts"

const leaf = (d: number): CoverageNode => ({ d, children: [] })
const parent = (d: number, children: readonly CoverageNode[]): CoverageNode => ({ d, children })

describe("computeCoverage — the propagation rule", () => {
  test("a leaf takes C = D", () => {
    for (let d = 0; d <= 7; d++) {
      expect(computeCoverage(leaf(d)).c).toBe(d)
    }
  })

  test("a parent blends ½·D with ½·mean(children C)", () => {
    expect(computeCoverage(parent(2, [leaf(1), leaf(3)])).c).toBe(2)
    expect(computeCoverage(parent(4, [leaf(2)])).c).toBe(3)
    expect(computeCoverage(parent(0, [leaf(6), leaf(0), leaf(0)])).c).toBe(1)
  })

  test("recurses bottom-up through multiple levels", () => {
    const tree = parent(2, [parent(2, [leaf(4), leaf(4)]), leaf(1)])
    const folded = computeCoverage(tree)
    expect(folded.children[0]?.c).toBe(3)
    expect(folded.children[1]?.c).toBe(1)
    expect(folded.c).toBe(2)
  })

  test("all-unopened tree (every D=0) folds to C=0 at the root", () => {
    const allZero = parent(0, [parent(0, [leaf(0), leaf(0)]), parent(0, [leaf(0)])])
    expect(computeCoverage(allZero).c).toBe(0)
    expect(formatScore(computeCoverage(allZero).c)).toBe("0.00")
  })

  test("axiom: adding a child equal to the children mean does not change the parent", () => {
    const before = computeCoverage(parent(3, [leaf(2), leaf(4)]))
    const after = computeCoverage(parent(3, [leaf(2), leaf(4), leaf(3)]))
    expect(after.c).toBe(before.c)
  })

  test("axiom: raising a child's mastery strictly raises the parent C", () => {
    const lo = computeCoverage(parent(1, [leaf(2), leaf(2)])).c
    const hi = computeCoverage(parent(1, [leaf(2), leaf(5)])).c
    expect(hi).toBeGreaterThan(lo)
  })

  test("expanding a high node with weaker children lowers its C (false compactness)", () => {
    const compact = computeCoverage(leaf(6)).c
    const expanded = computeCoverage(parent(6, [leaf(2), leaf(2)])).c
    expect(expanded).toBeLessThan(compact)
    expect(expanded).toBe(4)
  })
})

describe("formatScore / round2", () => {
  test("round2 rounds to two decimals", () => {
    expect(round2(2.8449)).toBe(2.84)
    expect(round2(2.845)).toBe(2.85)
    expect(round2(0)).toBe(0)
  })

  test("formatScore always shows two decimals", () => {
    expect(formatScore(0)).toBe("0.00")
    expect(formatScore(7)).toBe("7.00")
    expect(formatScore(2.8)).toBe("2.80")
  })
})
