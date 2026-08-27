import { skillLines } from "@temper/game-characters-skill-lines/generated/temper-skill-line.generated"
import { computeCharacterMorphProgress } from "@temper/game-characters-skills-morphs-core/character-morph-progress"
import { morphableSkillsByLine } from "@temper/game-characters-skills-morphs-core/morphable-skills"
import {
  esoClassIdToClassId,
  esoRaceIdToRaceId,
  esoSkillLineIdToSkillLineId,
  getApplicableSkillLineIds,
} from "./eso-id-helpers"
import type { MorphCardChecker, MorphCharacterRow } from "./morph-completion-shapes"

export const skillMorphsChecker: MorphCardChecker = {
  isCardComplete(completion) {
    if (!completion) return false
    const classId = esoClassIdToClassId.get(completion.classId ?? 0) ?? "no-class"
    const raceId = esoRaceIdToRaceId.get(completion.raceId ?? 0) ?? "no-race"
    const applicableLines = getApplicableSkillLineIds(classId, raceId)
    const { current, total } = computeCharacterMorphProgress({
      applicableLines,
      skillLineProgress: completion.skillLineProgress,
    })
    return total > 0 && current === total
  },
  isItemComplete(completion, itemPath) {
    if (!completion || itemPath.length === 0) return false
    const slp = completion.skillLineProgress
    if (!slp) return false
    const [rawLineId, rawSkillId] = itemPath
    const lineId = Number(rawLineId)
    const sl = slp[lineId]
    if (!sl?.skills) return false
    if (rawSkillId !== undefined) {
      const skill = sl.skills[Number(rawSkillId)]
      if (!skill) return false
      return (
        Math.min(skill.base.rank ?? 0, 4) +
          Math.min(skill.morph1.rank ?? 0, 4) +
          Math.min(skill.morph2.rank ?? 0, 4) >=
        12
      )
    }
    const skillLineId = esoSkillLineIdToSkillLineId.get(lineId)
    if (skillLineId == null) return false
    const expectedSkills = morphableSkillsByLine.get(skillLineId)
    if (!expectedSkills) return false
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
    return expectedSkills.every((expected) => {
      const addon = addonLookup.get(expected.baseName)
      if (!addon) return false
      return addon.baseRank + addon.morph1Rank + addon.morph2Rank >= 12
    })
  },
  getItemPickerLevels(completions, currentPath) {
    if (currentPath.length === 0) {
      const lineIds = new Set<number>()
      for (const c of completions) {
        if (!c.skillLineProgress) continue
        for (const [id, sl] of Object.entries(c.skillLineProgress)) {
          if (sl.skills && Object.keys(sl.skills).length > 0) {
            lineIds.add(Number(id))
          }
        }
      }
      if (lineIds.size === 0) return null
      const options: { value: number; label: string }[] = []
      for (const esoId of lineIds) {
        const line = skillLines.list.find((l) => l.esoSkillLineId === esoId)
        options.push({ value: esoId, label: line?.name ?? `Skill Line ${esoId}` })
      }
      return { label: "Skill Line", options }
    }

    if (currentPath.length === 1) {
      const lineId = Number(currentPath[0])
      const skillIds = new Map<number, string>()
      for (const c of completions) {
        const sl = c.skillLineProgress?.[lineId]
        if (!sl?.skills) continue
        for (const [id, skill] of Object.entries(sl.skills)) {
          skillIds.set(Number(id), skill.base.name)
        }
      }
      if (skillIds.size === 0) return null
      return {
        label: "Skill",
        options: Array.from(skillIds.entries()).map(([id, name]) => ({ value: id, label: name })),
      }
    }

    return null
  },
}

export function computeCharacterCanLevelMorphs(charRow: MorphCharacterRow): boolean {
  const completion = charRow.completion
  if (!completion) return false
  const classId = esoClassIdToClassId.get(completion.classId ?? 0) ?? "no-class"
  const raceId = esoRaceIdToRaceId.get(completion.raceId ?? 0) ?? "no-race"
  const applicableLines = getApplicableSkillLineIds(classId, raceId)
  const { current, total } = computeCharacterMorphProgress({
    applicableLines,
    skillLineProgress: completion.skillLineProgress,
  })
  return total > 0 && current < total
}
