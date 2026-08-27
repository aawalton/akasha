import { describe, expect, test } from "bun:test"
import {
  determinePotionResult,
  getReagentShortlist,
  solveReagentPairs,
} from "./writ-crafting-alchemy-solver"

describe("determinePotionResult", () => {
  test("two reagents sharing exactly one same-sign effect yield that single effect", () => {
    expect(determinePotionResult(30148, 30164)).toEqual({ effects: { 1: 1 }, count: 1 })
  })

  test("opposite-sign overlap cancels to no usable effect", () => {
    expect(determinePotionResult(30148, 30149)).toEqual({ effects: {}, count: 0 })
  })

  test("is symmetric in its two reagents", () => {
    expect(determinePotionResult(30164, 30148)).toEqual(determinePotionResult(30148, 30164))
  })

  test("unknown reagent ids contribute nothing", () => {
    expect(determinePotionResult(999999, 888888)).toEqual({ effects: {}, count: 0 })
  })
})

describe("getReagentShortlist", () => {
  test("odd effectId selects positive-parity reagents for that base effect", () => {
    const list = getReagentShortlist(1)
    expect(list[30148]).toBeDefined()
    expect(list[30164]).toBeDefined()
    expect(list[30149]).toBeUndefined()
  })

  test("even effectId selects negative-parity reagents for the base (odd) effect", () => {
    const list = getReagentShortlist(2)
    expect(list[30149]).toBeDefined()
    expect(list[30148]).toBeUndefined()
  })
})

describe("solveReagentPairs", () => {
  test("every returned pair actually produces exactly the requested single effect", () => {
    const pairs = solveReagentPairs(1)
    expect(pairs.length).toBeGreaterThan(0)
    for (const [r1, r2] of pairs) {
      const result = determinePotionResult(r1, r2)
      expect(result.count).toBe(1)
      expect(result.effects[1]).toBe(1)
    }
  })

  test("includes the known Entoloma+Wormwood pairing in both orderings", () => {
    const pairs = solveReagentPairs(1)
    const has = (a: number, b: number) => pairs.some(([x, y]) => x === a && y === b)
    expect(has(30148, 30164)).toBe(true)
    expect(has(30164, 30148)).toBe(true)
  })

  test("negative-parity request returns pairs producing the negative effect", () => {
    const pairs = solveReagentPairs(2)
    expect(pairs.length).toBeGreaterThan(0)
    for (const [r1, r2] of pairs) {
      const result = determinePotionResult(r1, r2)
      expect(result.count).toBe(1)
      expect(result.effects[1]).toBe(-1)
    }
  })
})
