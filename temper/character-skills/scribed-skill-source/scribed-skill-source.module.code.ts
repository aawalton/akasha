import type { ScribedSkill } from "akasha/temper/character-skills/scribed-skill-types/scribed-skill-types.module.code.ts"
import { getScribedSkillByGrimoireAndFocus } from "akasha/temper/character-skills/scribed-skills/scribed-skills.module.code.ts"
import { grimoires } from "akasha/temper/character-skills/scribing-grimoires/scribing-grimoires.module.code.ts"
import type { Effect } from "akasha/temper/formula-framework/effect/effect.module.code.ts"
import type { SkillSource } from "akasha/temper/skill-kinds/skills-source/skills-source.module.code.ts"

export function createScribedSkillSource(scribedSkill: ScribedSkill): SkillSource | null {
  const { skillId, grimoireId, focusScriptId } = scribedSkill

  const grimoire = grimoires.data[grimoireId]

  const skill = getScribedSkillByGrimoireAndFocus(grimoireId, focusScriptId)
  if (!skill) {
    return null
  }

  const effects: Effect[] = []

  return {
    id: skillId,
    categoryId: "skills",
    skillId,
    esoSkillId: skill.esoSkillId,
    skillName: skill.name,
    skillLineId: grimoire.skillLineId,
    skillType: "active",
    effects,
  }
}
