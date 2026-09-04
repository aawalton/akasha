import { type SkillLineId, skillLines } from "@akasha/temper-skill-lines/skill-lines"
import {
  computeCharacterMorphProgressByEsoId,
  type ExpectedMorphableSkill,
  type MorphSkillLineProgressMap,
} from "../character-morph-progress-eso/character-morph-progress-eso.module.code.ts"
import { morphableSkillsByLine } from "../morphable-skills/morphable-skills.module.code.ts"

export interface CharacterMorphProgressInput {
  applicableLines: ReadonlySet<SkillLineId>
  skillLineProgress: MorphSkillLineProgressMap | null | undefined
}

export function computeCharacterMorphProgress(input: CharacterMorphProgressInput): {
  current: number
  total: number
} {
  const applicableEsoLineIds = new Set<number>()
  const expectedSkillsByEsoLineId = new Map<number, ReadonlyArray<ExpectedMorphableSkill>>()

  for (const skillLineId of input.applicableLines) {
    const esoId = skillLines.data[skillLineId]?.esoSkillLineId
    if (esoId === undefined || esoId === 0) continue
    applicableEsoLineIds.add(esoId)
    const expected = morphableSkillsByLine.get(skillLineId)
    if (expected !== undefined) {
      expectedSkillsByEsoLineId.set(
        esoId,
        expected.map((m) => ({
          baseName: m.baseName,
          morph1Name: m.morph1Name,
          morph2Name: m.morph2Name,
          skillType: m.skillType,
          lineRankNeeded: m.lineRankNeeded,
        }))
      )
    }
  }

  return computeCharacterMorphProgressByEsoId({
    applicableEsoLineIds,
    expectedSkillsByEsoLineId,
    skillLineProgress: input.skillLineProgress,
  })
}
