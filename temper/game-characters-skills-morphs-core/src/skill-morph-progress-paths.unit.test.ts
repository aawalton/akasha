import { describe, expect, it } from "bun:test"
import type { MorphSkillLineProgressMap } from "./character-morph-progress-eso"
import { resolveSkillMorphProgressByPath } from "./skill-morph-progress-paths"

const expectedSkillsForLine = [
  { baseName: "Lava Whip" },
  { baseName: "Searing Strike" },
  { baseName: "Inferno" },
]

const slp: MorphSkillLineProgressMap = {
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

describe("resolveSkillMorphProgressByPath", () => {
  describe("[lineId] form", () => {
    it("sums across expected skills, total = 12 × expected count", () => {
      const result = resolveSkillMorphProgressByPath({
        esoLineId: 35,
        expectedSkillsForLine,
        skillLineProgress: slp,
      })
      expect(result).toEqual({ current: 15, total: 36 })
    })

    it("returns undefined when expectedSkillsForLine is undefined", () => {
      const result = resolveSkillMorphProgressByPath({
        esoLineId: 35,
        expectedSkillsForLine: undefined,
        skillLineProgress: slp,
      })
      expect(result).toBeUndefined()
    })

    it("returns undefined when the line is undiscovered", () => {
      const result = resolveSkillMorphProgressByPath({
        esoLineId: 22,
        expectedSkillsForLine,
        skillLineProgress: slp,
      })
      expect(result).toBeUndefined()
    })
  })

  describe("[lineId, skillId] form", () => {
    it("returns clamped points / 12 for an expected discovered skill", () => {
      const result = resolveSkillMorphProgressByPath({
        esoLineId: 35,
        skillBaseName: "Lava Whip",
        expectedSkillsForLine,
        skillLineProgress: slp,
      })
      expect(result).toEqual({ current: 12, total: 12 })
    })

    it("returns 0/12 when the skill is expected but not discovered", () => {
      const result = resolveSkillMorphProgressByPath({
        esoLineId: 35,
        skillBaseName: "Inferno",
        expectedSkillsForLine,
        skillLineProgress: slp,
      })
      expect(result).toEqual({ current: 0, total: 12 })
    })

    it("returns 0/12 when the line itself is undiscovered", () => {
      const result = resolveSkillMorphProgressByPath({
        esoLineId: 22,
        skillBaseName: "Lava Whip",
        expectedSkillsForLine,
        skillLineProgress: slp,
      })
      expect(result).toEqual({ current: 0, total: 12 })
    })

    it("returns undefined when the skill is not in the expected list", () => {
      const result = resolveSkillMorphProgressByPath({
        esoLineId: 35,
        skillBaseName: "Some Removed Skill",
        expectedSkillsForLine,
        skillLineProgress: slp,
      })
      expect(result).toBeUndefined()
    })

    it("clamps per-variant rank at 4 even if SavedVariables reports 5+", () => {
      const slpHigh: MorphSkillLineProgressMap = {
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
      const result = resolveSkillMorphProgressByPath({
        esoLineId: 35,
        skillBaseName: "Lava Whip",
        expectedSkillsForLine,
        skillLineProgress: slpHigh,
      })
      expect(result).toEqual({ current: 12, total: 12 })
    })
  })
})
