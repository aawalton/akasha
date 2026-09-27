import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import type { MorphSkillLineProgressMap } from "akasha/temper/player/skill-morph/modules/character-morph-progress-eso/character-morph-progress-eso.module.code.ts"
import type {
  MorphableSkillDetail,
  SkillMorphProgressEntry,
} from "akasha/temper/player/skill-morph/modules/morph-progress-types/morph-progress-types.module.code.ts"
import {
  heldMorphRankMost,
  type MorphRanks,
  morphMost,
  morphRanksOf,
} from "akasha/temper/player/skill-morph/modules/morph-ranks/morph-ranks.module.code.ts"
import { morphableSkillsByLine } from "akasha/temper/player/skill-morph/modules/morphable-skills/morphable-skills.module.code.ts"

export interface SubclassingSkillMorphProgressResult {
  entries: readonly SkillMorphProgressEntry[]
  totalMorphRank: number
  totalMorphMax: number
}

interface SubclassingMorphProgressInput {
  subclassingSkillLineProgress: MorphSkillLineProgressMap | null | undefined
}

export function transformSubclassingSkillMorphProgress(
  input: SubclassingMorphProgressInput
): SubclassingSkillMorphProgressResult {
  const subclassingSkillLineProgress = input.subclassingSkillLineProgress
  const entries: SkillMorphProgressEntry[] = []
  let totalMorphRank = 0
  let totalMorphMax = 0
  const rankMost = heldMorphRankMost()

  for (const sl of skillLines.list) {
    if (sl.subcategoryId !== "class") continue
    const skillLineId = sl.id
    const esoId = sl.esoSkillLineId
    const expectedSkills = morphableSkillsByLine().get(skillLineId)
    if (!expectedSkills) continue

    const slProgress = subclassingSkillLineProgress?.[esoId]

    const addonLookup = new Map<string, MorphRanks>()
    if (slProgress?.skills) {
      for (const morphData of Object.values(slProgress.skills)) {
        addonLookup.set(morphData.base.name, morphRanksOf(morphData, rankMost))
      }
    }

    const skills: MorphableSkillDetail[] = expectedSkills.map((expected, index) => {
      const addon = addonLookup.get(expected.baseName)
      const baseRank = addon?.baseRank ?? 0
      const morph1Rank = addon?.morph1Rank ?? 0
      const morph2Rank = addon?.morph2Rank ?? 0
      totalMorphRank += baseRank + morph1Rank + morph2Rank
      totalMorphMax += morphMost(rankMost)
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
