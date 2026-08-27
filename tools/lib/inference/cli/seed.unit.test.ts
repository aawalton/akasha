import { describe, expect, test } from "bun:test"
import { drawSeed, resolveSeed, SEED_MAX } from "./seed"

describe("resolveSeed", () => {
  test("an explicit seed wins and the random source is never consulted", () => {
    const explode = () => {
      throw new Error("random source must not be called")
    }
    expect(resolveSeed(42, explode)).toBe(42)
  })

  test("seed 0 is explicit (no truthiness foot-gun)", () => {
    const explode = () => {
      throw new Error("random source must not be called")
    }
    expect(resolveSeed(0, explode)).toBe(0)
  })

  test("an omitted seed draws from the random source", () => {
    expect(resolveSeed(undefined, () => 7)).toBe(7)
  })
})

describe("drawSeed", () => {
  test("returns an integer in [0, 2^31 - 1]", () => {
    for (let i = 0; i < 100; i++) {
      const seed = drawSeed()
      expect(Number.isInteger(seed)).toBe(true)
      expect(seed).toBeGreaterThanOrEqual(0)
      expect(seed).toBeLessThanOrEqual(SEED_MAX)
    }
  })
})
