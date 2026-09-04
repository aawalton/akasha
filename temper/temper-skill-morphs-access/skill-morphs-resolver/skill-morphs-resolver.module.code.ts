import { computeCharacterMorphProgress } from "@akasha/temper-skill-morphs/character-morph-progress"
import { morphableSkillsByLine } from "@akasha/temper-skill-morphs/morphable-skills"
import { resolveSkillMorphProgressByPath } from "@akasha/temper-skill-morphs/skill-morph-progress-paths"
import {
  ESO_CLASS_ID_TO_CLASS_ID,
  ESO_RACE_ID_TO_RACE_ID,
  ESO_SKILL_LINE_ID_TO_SKILL_LINE_ID,
  getApplicableSkillLineIds,
} from "../eso-id-helpers/eso-id-helpers.module.code.ts"
import type { MorphCharacterRow } from "../morph-completion-shapes/morph-completion-shapes.module.code.ts"

interface TaskProgress {
  current: number
  total: number
}

export function resolveSkillMorphs(
  charRow: MorphCharacterRow | null | undefined,
  itemPath: readonly (string | number)[] | undefined
): TaskProgress | undefined {
  const completion = charRow?.completion
  if (!completion) return undefined

  if (itemPath && itemPath.length > 0) {
    const esoLineId = itemPath[0]
    if (typeof esoLineId !== "number") return undefined
    const skillLineId = ESO_SKILL_LINE_ID_TO_SKILL_LINE_ID.get(esoLineId)
    if (skillLineId == null) return undefined
    const expected = morphableSkillsByLine.get(skillLineId)
    if (expected === undefined) return undefined
    const expectedSkillsForLine = expected.map((m) => ({
      baseName: m.baseName,
      morph1Name: m.morph1Name,
      morph2Name: m.morph2Name,
      skillType: m.skillType,
      lineRankNeeded: m.lineRankNeeded,
    }))

    let skillBaseName: string | undefined
    if (itemPath.length > 1) {
      const skillId = itemPath[1]
      if (typeof skillId !== "number") return undefined
      const baseName = completion.skillLineProgress?.[esoLineId]?.skills?.[skillId]?.base.name
      if (baseName == null) return undefined
      skillBaseName = baseName
    }

    return resolveSkillMorphProgressByPath({
      esoLineId,
      skillBaseName,
      expectedSkillsForLine,
      skillLineProgress: completion.skillLineProgress,
    })
  }

  const classId = ESO_CLASS_ID_TO_CLASS_ID.get(completion.classId ?? 0) ?? "no-class"
  const raceId = ESO_RACE_ID_TO_RACE_ID.get(completion.raceId ?? 0) ?? "no-race"
  const applicableLines = getApplicableSkillLineIds(classId, raceId)
  const { current, total } = computeCharacterMorphProgress({
    applicableLines,
    skillLineProgress: completion.skillLineProgress,
  })
  return total > 0 ? { current, total } : undefined
}
