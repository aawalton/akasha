import { skillLines } from "@akasha/temper-skill-lines/skill-lines"
import type { MorphSkillLineProgressMap } from "../character-morph-progress-eso/character-morph-progress-eso.module.code.ts"
import type {
  MorphableSkillDetail,
  SkillMorphProgressEntry,
} from "../morph-progress-types/morph-progress-types.module.code.ts"
import { morphableSkillsByLine } from "../morphable-skills/morphable-skills.module.code.ts"

const classSkillLineIds = skillLines.list
  .filter((sl) => sl.subcategoryId === "class")
  .map((sl) => sl.id)

export interface SubclassingSkillMorphProgressResult {
  entries: readonly SkillMorphProgressEntry[]
  totalMorphRank: number
  totalMorphMax: number
}

export interface SubclassingMorphProgressInput {
  subclassingSkillLineProgress: MorphSkillLineProgressMap | null | undefined
}

export function transformSubclassingSkillMorphProgress(
  input: SubclassingMorphProgressInput
): SubclassingSkillMorphProgressResult {
  const subclassingSkillLineProgress = input.subclassingSkillLineProgress
  const entries: SkillMorphProgressEntry[] = []
  let totalMorphRank = 0
  let totalMorphMax = 0

  for (const skillLineId of classSkillLineIds) {
    const sl = skillLines.data[skillLineId]
    const esoId = sl.esoSkillLineId
    const expectedSkills = morphableSkillsByLine.get(skillLineId)
    if (!expectedSkills) continue

    const slProgress = subclassingSkillLineProgress?.[esoId]

    const addonLookup = new Map<
      string,
      { baseRank: number; morph1Rank: number; morph2Rank: number }
    >()
    if (slProgress?.skills) {
      for (const morphData of Object.values(slProgress.skills)) {
        addonLookup.set(morphData.base.name, {
          baseRank: Math.min(morphData.base.rank ?? 0, 4),
          morph1Rank: Math.min(morphData.morph1.rank ?? 0, 4),
          morph2Rank: Math.min(morphData.morph2.rank ?? 0, 4),
        })
      }
    }

    const skills: MorphableSkillDetail[] = expectedSkills.map((expected, index) => {
      const addon = addonLookup.get(expected.baseName)
      const baseRank = addon?.baseRank ?? 0
      const morph1Rank = addon?.morph1Rank ?? 0
      const morph2Rank = addon?.morph2Rank ?? 0
      totalMorphRank += baseRank + morph1Rank + morph2Rank
      totalMorphMax += 12
      return {
        abilityIndex: index,
        baseName: expected.baseName,
        baseRank,
        morph1Name: expected.morph1Name,
        morph1Rank,
        morph2Name: expected.morph2Name,
        morph2Rank,
        skillType: expected.skillType,
      }
    })

    entries.push({ skillLineId, skills })
  }

  return { entries, totalMorphRank, totalMorphMax }
}
