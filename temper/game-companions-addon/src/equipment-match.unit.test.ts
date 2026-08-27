import { describe, expect, test } from "bun:test"
import type { CompanionBuildData } from "./codec/companion-codec"
import { describeMismatch, EQUIPMENT_SLOT_COUNT, evaluateEquipmentMatch } from "./equipment-match"

const UNSPECIFIED = 0
const WHITE = 1
const GOLD = 5
const MYTHIC = 6

function makeBuild(qualityIndex: number): CompanionBuildData {
  return {
    companionIndex: 0,
    armor: Array.from({ length: 7 }, (_unused, i) => ({
      isEmpty: false,
      weightIndex: 1,
      traitIndex: i + 1,
      qualityIndex,
    })),
    jewelry: Array.from({ length: 3 }, (_unused, i) => ({
      isEmpty: false,
      traitIndex: i + 1,
      qualityIndex,
    })),
    weapons: Array.from({ length: 2 }, (_unused, i) => ({
      isEmpty: false,
      typeIndex: i + 1,
      traitIndex: i + 1,
      qualityIndex,
    })),
    skills: [1, 2, 3, 4, 5, 6],
    targetArmorIndex: 0,
    targetHealthIndex: 0,
  }
}

describe("evaluateEquipmentMatch — quality is part of the match", () => {
  test("twelve white pieces against a twelve-gold target do not count as matches", () => {
    const result = evaluateEquipmentMatch(makeBuild(WHITE), makeBuild(GOLD))

    expect(result.matchedCount).toBe(0)
    expect(result.mismatches).toHaveLength(EQUIPMENT_SLOT_COUNT)
    for (const mismatch of result.mismatches) {
      expect(mismatch.dimensions).toContain("quality")
    }
  })

  test("a build meeting its target exactly matches on all twelve slots", () => {
    const result = evaluateEquipmentMatch(makeBuild(GOLD), makeBuild(GOLD))

    expect(result.matchedCount).toBe(EQUIPMENT_SLOT_COUNT)
    expect(result.mismatches).toHaveLength(0)
  })

  test("quality above the target satisfies it — the comparison is at-or-above, not equality", () => {
    const result = evaluateEquipmentMatch(makeBuild(MYTHIC), makeBuild(GOLD))

    expect(result.matchedCount).toBe(EQUIPMENT_SLOT_COUNT)
    expect(result.mismatches).toHaveLength(0)
  })

  test("an unspecified target quality constrains nothing", () => {
    const result = evaluateEquipmentMatch(makeBuild(WHITE), makeBuild(UNSPECIFIED))

    expect(result.matchedCount).toBe(EQUIPMENT_SLOT_COUNT)
    expect(result.mismatches).toHaveLength(0)
  })

  test("a slot short on two dimensions names both", () => {
    const current = makeBuild(GOLD)
    const optimal = makeBuild(GOLD)
    current.armor[2] = { isEmpty: false, weightIndex: 3, traitIndex: 3, qualityIndex: WHITE }
    optimal.armor[2] = { isEmpty: false, weightIndex: 1, traitIndex: 3, qualityIndex: GOLD }

    const result = evaluateEquipmentMatch(current, optimal)
    const chest = result.mismatches.find((m) => m.group === "armor" && m.indexInGroup === 2)

    expect(chest?.dimensions).toContain("weight")
    expect(chest?.dimensions).toContain("quality")
  })
})

describe("evaluateEquipmentMatch — reachability", () => {
  test("every unmatched slot is accounted for by at least one named dimension", () => {
    const current = makeBuild(WHITE)
    const optimal = makeBuild(GOLD)
    current.armor[0] = { isEmpty: true, weightIndex: 0, traitIndex: 0, qualityIndex: 0 }
    current.weapons[1] = { isEmpty: false, typeIndex: 9, traitIndex: 4, qualityIndex: WHITE }

    const result = evaluateEquipmentMatch(current, optimal)

    expect(result.matchedCount + result.mismatches.length).toBe(EQUIPMENT_SLOT_COUNT)
    for (const mismatch of result.mismatches) {
      expect(mismatch.dimensions.length).toBeGreaterThan(0)
    }
  })

  test("an equipped slot against an empty target falls short on presence", () => {
    const current = makeBuild(GOLD)
    const optimal = makeBuild(GOLD)
    current.armor[4] = { isEmpty: true, weightIndex: 0, traitIndex: 0, qualityIndex: 0 }

    const result = evaluateEquipmentMatch(current, optimal)
    const waist = result.mismatches.find((m) => m.group === "armor" && m.indexInGroup === 4)

    expect(waist?.dimensions).toEqual(["presence"])
  })

  test("a slot empty on both sides is a match", () => {
    const current = makeBuild(GOLD)
    const optimal = makeBuild(GOLD)
    current.jewelry[1] = { isEmpty: true, traitIndex: 0, qualityIndex: 0 }
    optimal.jewelry[1] = { isEmpty: true, traitIndex: 0, qualityIndex: 0 }

    const result = evaluateEquipmentMatch(current, optimal)

    expect(result.matchedCount).toBe(EQUIPMENT_SLOT_COUNT)
  })
})

describe("describeMismatch", () => {
  test("names the slot and every dimension that falls short", () => {
    expect(describeMismatch("Chest", ["weight", "quality"])).toBe("Chest: weight, quality")
  })

  test("a lone dimension reads without a separator", () => {
    expect(describeMismatch("Off Hand", ["presence"])).toBe("Off Hand: presence")
  })
})
