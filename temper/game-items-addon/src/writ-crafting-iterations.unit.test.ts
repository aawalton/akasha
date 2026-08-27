import { describe, expect, test } from "bun:test"
import { computeCraftIterations } from "./writ-crafting-iterations"

describe("computeCraftIterations", () => {
  test("one item, one-per-iteration → one craft", () => {
    expect(computeCraftIterations(1, 1, 10)).toBe(1)
  })

  test("N items, one-per-iteration → N crafts", () => {
    expect(computeCraftIterations(4, 1, 10)).toBe(4)
  })

  test("yield exactly covers the need in a single iteration", () => {
    expect(computeCraftIterations(4, 4, 10)).toBe(1)
  })

  test("partial final iteration rounds up", () => {
    expect(computeCraftIterations(5, 4, 10)).toBe(2)
    expect(computeCraftIterations(10, 3, 10)).toBe(4)
  })

  test("clamps to the ingredient-bounded maximum", () => {
    expect(computeCraftIterations(8, 4, 1)).toBe(1)
  })

  test("non-positive need crafts nothing", () => {
    expect(computeCraftIterations(0, 4, 10)).toBe(0)
    expect(computeCraftIterations(-3, 4, 10)).toBe(0)
  })

  test("invalid yield or zero capacity crafts nothing", () => {
    expect(computeCraftIterations(4, 0, 10)).toBe(0)
    expect(computeCraftIterations(4, 4, 0)).toBe(0)
  })
})
