import { describe, expect, test } from "bun:test"
import {
  COMPANION_RAPPORT_TIER_MAX,
  clampRapportProgress,
  heldCompanionRapport,
  MAX_COMPANION_RAPPORT,
  rawRapportToCompanionTier,
} from "akasha/temper/player/completion/temper-player-completion/modules/companion-rapport/companion-rapport.module.code.ts"

describe("the shared vocabulary of companion rapport", () => {
  test("max affinity is 4000 raw points and tier 8", () => {
    expect(MAX_COMPANION_RAPPORT).toBe(4000)
    expect(COMPANION_RAPPORT_TIER_MAX).toBe(8)
  })

  describe("clampRapportProgress", () => {
    test("a within-tier gain still increases progress", () => {
      const before = clampRapportProgress(1000)
      const after = clampRapportProgress(1145)
      expect(after).toBeGreaterThan(before)
      expect(after - before).toBe(145)
    })

    test("negative rapport from a disliking companion becomes 0 progress", () => {
      expect(clampRapportProgress(-2500)).toBe(0)
      expect(clampRapportProgress(-1)).toBe(0)
    })

    test("rapport beyond max affinity is capped at the max", () => {
      expect(clampRapportProgress(4000)).toBe(4000)
      expect(clampRapportProgress(5500)).toBe(4000)
    })

    test("a mid-range raw value comes back unchanged", () => {
      expect(clampRapportProgress(0)).toBe(0)
      expect(clampRapportProgress(2350)).toBe(2350)
    })
  })

  describe("heldCompanionRapport", () => {
    test("a companion at the ceiling with a quest left holds one short of it", () => {
      expect(heldCompanionRapport(4000, true)).toBe(3999)
      expect(heldCompanionRapport(5500, true)).toBe(3999)
    })

    test("a companion at the ceiling with every quest done holds the ceiling", () => {
      expect(heldCompanionRapport(4000, false)).toBe(4000)
    })

    test("a companion below the ceiling holds her rapport whether or not a quest is left", () => {
      expect(heldCompanionRapport(2350, true)).toBe(2350)
      expect(heldCompanionRapport(-10, true)).toBe(0)
    })
  })

  describe("rawRapportToCompanionTier", () => {
    test("the game's breakpoints map to tiers 1 through 8", () => {
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

    test("the quest-unlock thresholds of 1000, 2000 and 3000 points map to tiers 5, 6 and 7", () => {
      expect(rawRapportToCompanionTier(1000)).toBe(5)
      expect(rawRapportToCompanionTier(2000)).toBe(6)
      expect(rawRapportToCompanionTier(3000)).toBe(7)
    })
  })
})
