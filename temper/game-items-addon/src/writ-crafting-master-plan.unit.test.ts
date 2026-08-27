import { describe, expect, test } from "bun:test"
import {
  MASTER_WRIT_BASE_QUALITY,
  planMasterConsumableNeeded,
  planMasterWritSteps,
} from "./writ-crafting-master-plan"

const WHITE = 1
const GREEN = 2
const BLUE = 3
const PURPLE = 4
const GOLD = 5

describe("planMasterWritSteps", () => {
  test("base craft quality is NORMAL (white)", () => {
    expect(MASTER_WRIT_BASE_QUALITY).toBe(WHITE)
  })

  test("no spec-matched item, gold target → craft then four improves", () => {
    expect(planMasterWritSteps(undefined, GOLD)).toEqual([
      "craft",
      "improve",
      "improve",
      "improve",
      "improve",
    ])
  })

  test("no spec-matched item, purple target → craft then three improves", () => {
    expect(planMasterWritSteps(undefined, PURPLE)).toEqual([
      "craft",
      "improve",
      "improve",
      "improve",
    ])
  })

  test("white base already in bag, gold target → improve only, NEVER re-craft", () => {
    const steps = planMasterWritSteps(WHITE, GOLD)
    expect(steps).not.toContain("craft")
    expect(steps).toEqual(["improve", "improve", "improve", "improve"])
  })

  test("purple base already in bag, gold target → single improve, no re-craft", () => {
    expect(planMasterWritSteps(PURPLE, GOLD)).toEqual(["improve"])
  })

  test("blue base in bag, gold target → two improves", () => {
    expect(planMasterWritSteps(BLUE, GOLD)).toEqual(["improve", "improve"])
  })

  test("finished gold item already in bag, gold target → empty plan (no material waste)", () => {
    expect(planMasterWritSteps(GOLD, GOLD)).toEqual([])
  })

  test("spec-matched item already exceeds target → empty plan", () => {
    expect(planMasterWritSteps(GOLD, PURPLE)).toEqual([])
  })

  test("white target with no base → craft only, no improves", () => {
    expect(planMasterWritSteps(undefined, WHITE)).toEqual(["craft"])
  })

  test("green base, green target → empty plan", () => {
    expect(planMasterWritSteps(GREEN, GREEN)).toEqual([])
  })

  test("re-sweep idempotency: plan length strictly shrinks as quality rises", () => {
    const fresh = planMasterWritSteps(undefined, GOLD).length
    const afterCraft = planMasterWritSteps(WHITE, GOLD).length
    const afterGreen = planMasterWritSteps(GREEN, GOLD).length
    const afterBlue = planMasterWritSteps(BLUE, GOLD).length
    const afterPurple = planMasterWritSteps(PURPLE, GOLD).length
    const afterGold = planMasterWritSteps(GOLD, GOLD).length
    expect([fresh, afterCraft, afterGreen, afterBlue, afterPurple, afterGold]).toEqual([
      5, 4, 3, 2, 1, 0,
    ])
  })

  test("every step strictly reduces distance-to-done (no step both crafts and re-crafts)", () => {
    for (const q of [WHITE, GREEN, BLUE, PURPLE, GOLD]) {
      expect(planMasterWritSteps(q, GOLD)).not.toContain("craft")
    }
  })
})

describe("planMasterConsumableNeeded", () => {
  test("fresh step (0/8) → craft the full required amount", () => {
    expect(planMasterConsumableNeeded(0, 8)).toBe(8)
  })

  test("the '4/8' stall case → craft exactly the remaining 4, not 1", () => {
    expect(planMasterConsumableNeeded(4, 8)).toBe(4)
  })

  test("multi-item step requiring two (0/2) → craft two, not one (the reported defect)", () => {
    expect(planMasterConsumableNeeded(0, 2)).toBe(2)
  })

  test("complete step (8/8) → craft nothing (idempotent re-open, no re-craft)", () => {
    expect(planMasterConsumableNeeded(8, 8)).toBe(0)
  })

  test("over-complete (current > max) clamps to 0, never negative", () => {
    expect(planMasterConsumableNeeded(9, 8)).toBe(0)
  })

  test("only ever returns the remainder — material-safe, never over-crafts", () => {
    for (let max = 0; max <= 20; max++) {
      for (let current = 0; current <= 20; current++) {
        const needed = planMasterConsumableNeeded(current, max)
        expect(needed).toBeGreaterThanOrEqual(0)
        expect(needed).toBeLessThanOrEqual(Math.max(0, max - current))
      }
    }
  })
})
