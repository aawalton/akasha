import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import { TEMPER_SCRIBED_SKILLS } from "../generated/temper-scribed-skill.generated"
import type { SkillTemplate } from "../skills-data"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import type { GrimoireId } from "./grimoires-data"

export interface ScribedSkillTemplate extends SkillTemplate {
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  classId?: ClassId
}

export const scribedSkills = createDataFile<ScribedSkillTemplate>()(TEMPER_SCRIBED_SKILLS)

export type ScribedSkillId = (typeof scribedSkills.ids)[number]

export function getScribedSkillId(
  grimoireId: GrimoireId,
  focusScriptId: FocusScriptId
): ScribedSkillId | null {
  const expectedId: string = `scribed-${grimoireId}-${focusScriptId}`
  if (scribedSkills.has(expectedId)) {
    return expectedId
  }
  return null
}

export function getScribedSkillByGrimoireAndFocus(
  grimoireId: GrimoireId,
  focusScriptId: FocusScriptId
): ScribedSkillTemplate | undefined {
  const skillId = getScribedSkillId(grimoireId, focusScriptId)
  if (skillId == null) return undefined
  return scribedSkills.data[skillId]
}

export function getScribedSkillName(grimoireId: GrimoireId, focusScriptId: FocusScriptId): string {
  const skill = getScribedSkillByGrimoireAndFocus(grimoireId, focusScriptId)
  return skill?.name ?? "Unknown Scribed Skill"
}
