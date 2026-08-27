import { describe, expect, test } from "bun:test"
import {
  COMPANION_RAPPORT_TIER_MAX,
  clampRapportProgress,
  MAX_COMPANION_RAPPORT,
  rawRapportToCompanionTier,
} from "./companion-rapport"

describe("companion rapport shared vocabulary", () => {
  test("max affinity is 4000 raw points and tier 8", () => {
    expect(MAX_COMPANION_RAPPORT).toBe(4000)
    expect(COMPANION_RAPPORT_TIER_MAX).toBe(8)
  })

  describe("clampRapportProgress", () => {
    test("a within-tier gain still increases progress (the bug this fixes)", () => {
      const before = clampRapportProgress(1000)
      const after = clampRapportProgress(1145)
      expect(after).toBeGreaterThan(before)
      expect(after - before).toBe(145)
    })

    test("floors negative (disliked) rapport to 0 progress", () => {
      expect(clampRapportProgress(-2500)).toBe(0)
      expect(clampRapportProgress(-1)).toBe(0)
    })

    test("caps rapport beyond max affinity at the max", () => {
      expect(clampRapportProgress(4000)).toBe(4000)
      expect(clampRapportProgress(5500)).toBe(4000)
    })

    test("passes through mid-range raw values unchanged", () => {
      expect(clampRapportProgress(0)).toBe(0)
      expect(clampRapportProgress(2350)).toBe(2350)
    })
  })

  describe("rawRapportToCompanionTier", () => {
    test("maps the ESO breakpoints to 1-8", () => {
      expect(rawRapportToCompanionTier(4000)).toBe(8)
      expect(rawRapportToCompanionTier(4200)).toBe(8)
      expect(rawRapportToCompanionTier(3000)).toBe(7)
      expect(rawRapportToCompanionTier(2000)).toBe(6)
      expect(rawRapportToCompanionTier(1000)).toBe(5)
      expect(rawRapportToCompanionTier(750)).toBe(4)
      expect(rawRapportToCompanionTier(0)).toBe(3)
      expect(rawRapportToCompanionTier(-3000)).toBe(2)
      expect(rawRapportToCompanionTier(-4000)).toBe(1)
    })

    test("quest-unlock thresholds (1000/2000/3000 pts) map to tiers 5/6/7", () => {
      expect(rawRapportToCompanionTier(1000)).toBe(5)
      expect(rawRapportToCompanionTier(2000)).toBe(6)
      expect(rawRapportToCompanionTier(3000)).toBe(7)
    })
  })
})
