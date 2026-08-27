import { describe, expect, test } from "bun:test"
import { resolvePotionRestoreMetricIds } from "./potion-restore-resolve"

describe("resolvePotionRestoreMetricIds — crown/dropped (by itemId)", () => {
  test("crown tri-restoration (64710) → all three", () => {
    expect([...(resolvePotionRestoreMetricIds(64710, 0) ?? [])].sort()).toEqual([
      "health-restore",
      "magicka-restore",
      "stamina-restore",
    ])
  })

  test("essence of potent stamina (176042) → stamina only", () => {
    expect(resolvePotionRestoreMetricIds(176042, 0)).toEqual(["stamina-restore"])
  })

  test("essence of potent magicka (176040) → magicka only", () => {
    expect(resolvePotionRestoreMetricIds(176040, 0)).toEqual(["magicka-restore"])
  })

  test("essence of potent health (176041) → health + magicka", () => {
    expect([...(resolvePotionRestoreMetricIds(176041, 0) ?? [])].sort()).toEqual([
      "health-restore",
      "magicka-restore",
    ])
  })

  test("essence of health (27036) → health only", () => {
    expect(resolvePotionRestoreMetricIds(27036, 0)).toEqual(["health-restore"])
  })
})

describe("resolvePotionRestoreMetricIds — crafted (by encodedTraits)", () => {
  test("crafted tri-stat (encodedTraits 8454917) → all three", () => {
    expect([...(resolvePotionRestoreMetricIds(0, 8454917) ?? [])].sort()).toEqual([
      "health-restore",
      "magicka-restore",
      "stamina-restore",
    ])
  })
})

describe("resolvePotionRestoreMetricIds — fail-closed", () => {
  test("unknown itemId → undefined", () => {
    expect(resolvePotionRestoreMetricIds(999999, 0)).toBeUndefined()
  })

  test("reagent itemId (30148 Blue Entoloma) → undefined", () => {
    expect(resolvePotionRestoreMetricIds(30148, 0)).toBeUndefined()
  })

  test("unknown encodedTraits → undefined", () => {
    expect(resolvePotionRestoreMetricIds(0, 123)).toBeUndefined()
  })
})
