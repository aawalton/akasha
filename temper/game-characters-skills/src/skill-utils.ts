import type { Skill, SkillId } from "./skills-data"

export function findSkillById(
  id: SkillId,
  availableSkills: readonly Skill[],
  scribedSkillDefinitions: readonly Skill[]
): Skill | undefined {
  if (id === "no-skill") return undefined
  const regularSkill = availableSkills.find((s) => s.id === id)
  if (regularSkill) return regularSkill
  return scribedSkillDefinitions.find((s) => s.id === id)
}
