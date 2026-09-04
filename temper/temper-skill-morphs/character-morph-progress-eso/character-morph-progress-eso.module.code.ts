interface MorphVariantProgress {
  name: string
  rank: number | undefined
}

interface MorphSkillProgress {
  base: MorphVariantProgress
  morph1: MorphVariantProgress
  morph2: MorphVariantProgress
}

interface MorphSkillLineEntry {
  skills?: Record<number, MorphSkillProgress>
}

export type MorphSkillLineProgressMap = Record<number, MorphSkillLineEntry>

export interface ExpectedMorphableSkill {
  baseName: string
  morph1Name: string
  morph2Name: string
  skillType: "active" | "ultimate"
  lineRankNeeded: number
}

export interface CharacterMorphProgressByEsoIdInput {
  applicableEsoLineIds: ReadonlySet<number>
  expectedSkillsByEsoLineId: ReadonlyMap<number, ReadonlyArray<ExpectedMorphableSkill>>
  skillLineProgress: MorphSkillLineProgressMap | null | undefined
}

export function computeCharacterMorphProgressByEsoId(input: CharacterMorphProgressByEsoIdInput): {
  current: number
  total: number
} {
  const { applicableEsoLineIds, expectedSkillsByEsoLineId, skillLineProgress } = input

  let current = 0
  let total = 0

  for (const esoLineId of applicableEsoLineIds) {
    const expectedSkills = expectedSkillsByEsoLineId.get(esoLineId)
    if (expectedSkills === undefined) continue

    const sl = skillLineProgress?.[esoLineId]
    if (!sl?.skills) continue

    const addonLookup = new Map<
      string,
      { baseRank: number; morph1Rank: number; morph2Rank: number }
    >()
    for (const morphData of Object.values(sl.skills)) {
      addonLookup.set(morphData.base.name, {
        baseRank: Math.min(morphData.base.rank ?? 0, 4),
        morph1Rank: Math.min(morphData.morph1.rank ?? 0, 4),
        morph2Rank: Math.min(morphData.morph2.rank ?? 0, 4),
      })
    }

    for (const expected of expectedSkills) {
      total += 12
      const addon = addonLookup.get(expected.baseName)
      if (addon !== undefined) {
        current += addon.baseRank + addon.morph1Rank + addon.morph2Rank
      }
    }
  }

  return { current, total }
}
