import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { ScribedSkillTemplate } from "../scribed-skill-template/scribed-skill-template.module.code.ts"
import { SCRIBED_SKILLS_00 } from "../scribed-skills-00/scribed-skills-00.module.code.ts"
import { SCRIBED_SKILLS_01 } from "../scribed-skills-01/scribed-skills-01.module.code.ts"
import { SCRIBED_SKILLS_02 } from "../scribed-skills-02/scribed-skills-02.module.code.ts"
import { SCRIBED_SKILLS_03 } from "../scribed-skills-03/scribed-skills-03.module.code.ts"
import { SCRIBED_SKILLS_04 } from "../scribed-skills-04/scribed-skills-04.module.code.ts"
import type { GrimoireId } from "../scribing-grimoires/scribing-grimoires.module.code.ts"

const SCRIBED_SKILLS_DATA = {
  ...SCRIBED_SKILLS_00,
  ...SCRIBED_SKILLS_01,
  ...SCRIBED_SKILLS_02,
  ...SCRIBED_SKILLS_03,
  ...SCRIBED_SKILLS_04,
} satisfies Record<string, ScribedSkillTemplate>

export const scribedSkills = createDataFile<ScribedSkillTemplate>()(SCRIBED_SKILLS_DATA)

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
