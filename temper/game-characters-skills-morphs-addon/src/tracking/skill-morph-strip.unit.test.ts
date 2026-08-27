import { describe, expect, it } from "bun:test"
import { stripMorphVariantFields } from "./skill-morph-strip"

function legacyVariant(name: string, rank: number | undefined) {
  return { name, id: 4242, totalXPNeeded: 100, totalXPProgress: 50, rank }
}

function legacyProgress() {
  return {
    44: {
      currentRank: 3,
      currentXP: 10,
      nextRankXP: 20,
      skills: {
        1000: {
          base: legacyVariant("Base Skill", 4),
          morph1: legacyVariant("Morph One", 0),
          morph2: legacyVariant("Morph Two", undefined),
          currentMorph: 1,
          abilityIndex: 2,
          atMorph: true,
        },
      },
    },
  }
}

function strippedValues(
  progress: ReturnType<typeof legacyProgress>
): readonly (number | undefined)[] {
  const skill = progress[44].skills[1000]
  return [skill.base, skill.morph1, skill.morph2].flatMap((v) => [
    v.id,
    v.totalXPNeeded,
    v.totalXPProgress,
  ])
}

describe("stripMorphVariantFields (#12899 skill-morph-fields migration)", () => {
  it("clears id/totalXPNeeded/totalXPProgress on every variant", () => {
    const progress = legacyProgress()
    stripMorphVariantFields(progress)
    expect(strippedValues(progress).every((v) => v === undefined)).toBe(true)
  })

  it("preserves name and rank (including 0 and undefined)", () => {
    const progress = legacyProgress()
    stripMorphVariantFields(progress)
    const skill = progress[44].skills[1000]
    expect(skill.base.name).toBe("Base Skill")
    expect(skill.base.rank).toBe(4)
    expect(skill.morph1.rank).toBe(0)
    expect(skill.morph2.rank).toBeUndefined()
    expect(skill.currentMorph).toBe(1)
    expect(skill.abilityIndex).toBe(2)
    expect(skill.atMorph).toBe(true)
  })

  it("is idempotent (second pass keeps values cleared and name/rank intact)", () => {
    const progress = legacyProgress()
    stripMorphVariantFields(progress)
    stripMorphVariantFields(progress)
    const skill = progress[44].skills[1000]
    expect(strippedValues(progress).every((v) => v === undefined)).toBe(true)
    expect(skill.base.name).toBe("Base Skill")
    expect(skill.base.rank).toBe(4)
  })

  it("tolerates undefined progress and lines without skills", () => {
    expect(() => stripMorphVariantFields(undefined)).not.toThrow()
    expect(() =>
      stripMorphVariantFields({ 7: { currentRank: 1, currentXP: 0, nextRankXP: 1 } })
    ).not.toThrow()
  })
})
