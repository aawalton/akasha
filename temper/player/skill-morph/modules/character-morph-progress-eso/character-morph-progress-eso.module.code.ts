import {
  type MorphRanks,
  morphMost,
  morphPoints,
  morphRanksOf,
} from "akasha/temper/player/skill-morph/modules/morph-ranks/morph-ranks.module.code.ts"

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

interface CharacterMorphProgressByEsoIdInput {
  applicableEsoLineIds: ReadonlySet<number>
  expectedSkillsByEsoLineId: ReadonlyMap<number, ReadonlyArray<ExpectedMorphableSkill>>
  skillLineProgress: MorphSkillLineProgressMap | null | undefined
  morphRankMost: number
}

export function computeCharacterMorphProgressByEsoId(input: CharacterMorphProgressByEsoIdInput): {
  current: number
  total: number
} {
  const { applicableEsoLineIds, expectedSkillsByEsoLineId, skillLineProgress, morphRankMost } =
    input

  let current = 0
  let total = 0

  for (const esoLineId of applicableEsoLineIds) {
    const expectedSkills = expectedSkillsByEsoLineId.get(esoLineId)
    if (expectedSkills === undefined) continue

    const sl = skillLineProgress?.[esoLineId]
    if (!sl?.skills) continue

    const addonLookup = new Map<string, MorphRanks>()
    for (const morphData of Object.values(sl.skills)) {
      addonLookup.set(morphData.base.name, morphRanksOf(morphData, morphRankMost))
    }

    for (const expected of expectedSkills) {
      total += morphMost(morphRankMost)
      const addon = addonLookup.get(expected.baseName)
      if (addon !== undefined) current += morphPoints(addon)
    }
  }

  return { current, total }
}
