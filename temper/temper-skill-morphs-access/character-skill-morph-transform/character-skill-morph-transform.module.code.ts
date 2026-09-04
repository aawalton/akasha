import type {
  CharacterSkillMorphProgress,
  MorphableSkillDetail,
  SkillMorphProgressEntry,
} from "@akasha/temper-skill-morphs/morph-progress-types"
import { morphableSkillsByLine } from "@akasha/temper-skill-morphs/morphable-skills"
import { ESO_SKILL_LINE_ID_TO_SKILL_LINE_ID } from "../eso-id-helpers/eso-id-helpers.module.code.ts"
import type { MorphCharacterRow } from "../morph-completion-shapes/morph-completion-shapes.module.code.ts"

export function transformSkillMorphProgress(
  rows: readonly MorphCharacterRow[]
): readonly CharacterSkillMorphProgress[] {
  const morphProgress: CharacterSkillMorphProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion) continue

    const morphEntries: SkillMorphProgressEntry[] = []
    const skillLineProgress = completion.skillLineProgress
    if (skillLineProgress) {
      for (const [esoIdStr, slProgress] of Object.entries(skillLineProgress)) {
        const esoId = Number(esoIdStr)
        const skillLineId = ESO_SKILL_LINE_ID_TO_SKILL_LINE_ID.get(esoId)
        if (skillLineId == null) continue

        const expectedSkills = morphableSkillsByLine.get(skillLineId)
        if (!expectedSkills) continue

        const addonLookup = new Map<
          string,
          { baseRank: number; morph1Rank: number; morph2Rank: number }
        >()
        if (slProgress.skills) {
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
          return {
            abilityIndex: index,
            baseName: expected.baseName,
            baseRank: addon?.baseRank ?? 0,
            morph1Name: expected.morph1Name,
            morph1Rank: addon?.morph1Rank ?? 0,
            morph2Name: expected.morph2Name,
            morph2Rank: addon?.morph2Rank ?? 0,
            skillType: expected.skillType,
          }
        })

        morphEntries.push({
          skillLineId,
          skills,
        })
      }
    }

    morphProgress.push({ characterId: row.id, entries: morphEntries })
  }

  return morphProgress
}
