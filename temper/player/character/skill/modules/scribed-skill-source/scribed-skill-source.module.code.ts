import type { SkillSource } from "akasha/temper/catalog/skill-kind/modules/skills-source/skills-source.module.code.ts"
import type { Effect } from "akasha/temper/formula-framework/modules/effect/effect.module.code.ts"
import type { ScribedSkill } from "akasha/temper/player/character/skill/modules/scribed-skill-types/scribed-skill-types.module.code.ts"
import { getScribedSkillByGrimoireAndFocus } from "akasha/temper/player/character/skill/modules/scribed-skills/scribed-skills.module.code.ts"
import { grimoires } from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"

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
