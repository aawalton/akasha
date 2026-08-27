import { describe, expect, it } from "bun:test"
import {
  computeCharacterMorphProgressByEsoId,
  type ExpectedMorphableSkill,
  type MorphSkillLineProgressMap,
} from "./character-morph-progress-eso"

const expectedSkillsByEsoLineId = new Map<number, ReadonlyArray<ExpectedMorphableSkill>>([
  [35, [{ baseName: "Lava Whip" }, { baseName: "Searing Strike" }, { baseName: "Inferno" }]],
  [22, [{ baseName: "Puncturing Strikes" }, { baseName: "Piercing Javelin" }]],
  [51, [{ baseName: "Drain Vigor" }]],
])

const slpFullArdent: MorphSkillLineProgressMap = {
  35: {
    skills: {
      0: {
        base: { name: "Lava Whip", rank: 4 },
        morph1: { name: "Molten Whip", rank: 4 },
        morph2: { name: "Flame Lash", rank: 4 },
      },
      1: {
        base: { name: "Searing Strike", rank: 2 },
        morph1: { name: "Burning Embers", rank: 1 },
        morph2: { name: "Venomous Claw", rank: 0 },
      },
    },
  },
}

describe("computeCharacterMorphProgressByEsoId", () => {
  it("sums clamped variant ranks per expected skill, total = 12 × expected count", () => {
    const result = computeCharacterMorphProgressByEsoId({
      applicableEsoLineIds: new Set([35]),
      expectedSkillsByEsoLineId,
      skillLineProgress: slpFullArdent,
    })
    expect(result).toEqual({ current: 15, total: 36 })
  })

  it("clamps per-variant rank at 4 even if SavedVariables reports 5+", () => {
    const slp: MorphSkillLineProgressMap = {
      35: {
        skills: {
          0: {
            base: { name: "Lava Whip", rank: 7 },
            morph1: { name: "Molten Whip", rank: 5 },
            morph2: { name: "Flame Lash", rank: 99 },
          },
        },
      },
    }
    const result = computeCharacterMorphProgressByEsoId({
      applicableEsoLineIds: new Set([35]),
      expectedSkillsByEsoLineId: new Map([[35, [{ baseName: "Lava Whip" }]]]),
      skillLineProgress: slp,
    })
    expect(result).toEqual({ current: 12, total: 12 })
  })

  it("skips applicable lines with no expected morphable skills", () => {
    const result = computeCharacterMorphProgressByEsoId({
      applicableEsoLineIds: new Set([35, 999]),
      expectedSkillsByEsoLineId,
      skillLineProgress: slpFullArdent,
    })
    expect(result.total).toBe(36)
  })

  it("skips undiscovered applicable lines (no slp entry)", () => {
    const result = computeCharacterMorphProgressByEsoId({
      applicableEsoLineIds: new Set([35, 22]),
      expectedSkillsByEsoLineId,
      skillLineProgress: slpFullArdent,
    })
    expect(result.total).toBe(36)
  })

  it("skips lines whose slp entry has no skills sub-record", () => {
    const slp: MorphSkillLineProgressMap = {
      35: {},
    }
    const result = computeCharacterMorphProgressByEsoId({
      applicableEsoLineIds: new Set([35]),
      expectedSkillsByEsoLineId,
      skillLineProgress: slp,
    })
    expect(result).toEqual({ current: 0, total: 0 })
  })

  it("treats null/undefined skillLineProgress as undiscovered everywhere", () => {
    const result = computeCharacterMorphProgressByEsoId({
      applicableEsoLineIds: new Set([35, 22]),
      expectedSkillsByEsoLineId,
      skillLineProgress: null,
    })
    expect(result).toEqual({ current: 0, total: 0 })
  })

  it("ignores slp entries whose base.name is not in the expected list", () => {
    const slp: MorphSkillLineProgressMap = {
      35: {
        skills: {
          0: {
            base: { name: "Some Removed Skill", rank: 4 },
            morph1: { name: "x", rank: 4 },
            morph2: { name: "y", rank: 4 },
          },
        },
      },
    }
    const result = computeCharacterMorphProgressByEsoId({
      applicableEsoLineIds: new Set([35]),
      expectedSkillsByEsoLineId,
      skillLineProgress: slp,
    })
    expect(result).toEqual({ current: 0, total: 36 })
  })
})
