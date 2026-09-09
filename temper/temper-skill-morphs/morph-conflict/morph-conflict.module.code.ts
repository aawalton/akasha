import type {
  Skill,
  SkillId,
} from "akasha/temper/temper-character-skills/character-skills/character-skills.module.code.ts"
import { findSkillById } from "akasha/temper/temper-character-skills/find-skill-by-id/find-skill-by-id.module.code.ts"

function getBaseNameForSkillId(
  id: SkillId,
  availableSkills: readonly Skill[],
  scribedSkillDefinitions: readonly Skill[]
): string | null {
  if (id === "no-skill") return null
  const skill = findSkillById(id, availableSkills, scribedSkillDefinitions)
  return skill?.baseName ?? null
}

export function areConflictingMorphs(
  id1: SkillId,
  id2: SkillId,
  availableSkills: readonly Skill[],
  scribedSkillDefinitions: readonly Skill[]
): boolean {
  if (id1 === "no-skill" || id2 === "no-skill") return false
  if (id1 === id2) return false

  const baseName1 = getBaseNameForSkillId(id1, availableSkills, scribedSkillDefinitions)
  const baseName2 = getBaseNameForSkillId(id2, availableSkills, scribedSkillDefinitions)

  return baseName1 !== null && baseName1 === baseName2
}
