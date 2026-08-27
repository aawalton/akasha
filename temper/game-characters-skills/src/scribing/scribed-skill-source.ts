import type { Effect } from "@temper/shared-formula-framework/effects-types"
import type { SkillSource } from "../skills-source"
import { grimoires } from "./grimoires-data"
import type { ScribedSkill } from "./scribed-skill-types"
import { getScribedSkillByGrimoireAndFocus } from "./scribed-skills-data"

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
