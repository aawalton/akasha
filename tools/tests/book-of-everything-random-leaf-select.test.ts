import { describe, expect, test } from "bun:test"
import { filterByStatus, type Leaf, type Rng, selectWithoutReplacement } from "../lib/book-of-everything-random-leaf-select.ts"

const leaf = (path: string, status: Leaf["status"]): Leaf => ({ path, label: path, status })

function seededRng(seed: number): Rng {
  let s = seed >>> 0
  return (bound: number): number => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    const float = ((t ^ (t >>> 14)) >>> 0) / 4294967296
    return Math.floor(float * bound)
  }
}

const sample: readonly Leaf[] = [
  leaf("a", "unopened"),
  leaf("b", "resting"),
  leaf("c", "unopened"),
  leaf("d", "live"),
  leaf("e", "resting"),
]

describe("filterByStatus", () => {
  test("keeps only the matching status", () => {
    expect(filterByStatus(sample, "unopened").map((l) => l.path)).toEqual(["a", "c"])
    expect(filterByStatus(sample, "resting").map((l) => l.path)).toEqual(["b", "e"])
  })

  test('"any" keeps every leaf, including live', () => {
    expect(filterByStatus(sample, "any")).toEqual(sample)
  })
})

describe("selectWithoutReplacement", () => {
  const items = ["a", "b", "c", "d", "e", "f"] as const

  test("rng returning 0 picks the first count items in order (no-op swaps)", () => {
    const zero: Rng = () => 0
    expect(selectWithoutReplacement(items, 3, zero)).toEqual(["a", "b", "c"])
  })

  test("draws without replacement: unique, all drawn from the input", () => {
    const drawn = selectWithoutReplacement(items, 4, seededRng(42))
    expect(drawn).toHaveLength(4)
    expect(new Set(drawn).size).toBe(4)
    for (const x of drawn) expect(items).toContain(x)
  })

  test("count ≥ length returns a full permutation of every item", () => {
    const drawn = selectWithoutReplacement(items, 99, seededRng(7))
    expect(drawn).toHaveLength(items.length)
    expect([...drawn].sort()).toEqual([...items].sort())
  })

  test("count of 0 draws nothing", () => {
    expect(selectWithoutReplacement(items, 0, seededRng(1))).toEqual([])
  })

  test("reproducible: same seed yields the same draw", () => {
    expect(selectWithoutReplacement(items, 3, seededRng(123))).toEqual(
      selectWithoutReplacement(items, 3, seededRng(123))
    )
  })

  test("rejects a negative or non-integer count", () => {
    expect(() => selectWithoutReplacement(items, -1, seededRng(1))).toThrow()
    expect(() => selectWithoutReplacement(items, 1.5, seededRng(1))).toThrow()
  })
})
