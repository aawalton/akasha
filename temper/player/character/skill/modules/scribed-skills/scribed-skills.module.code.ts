import type { FocusScriptId } from "akasha/temper/catalog/skill-kind/modules/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import {
  type SkillTable,
  skillCatalog,
  tableView,
} from "akasha/temper/player/character/skill/modules/held-skill-catalog/held-skill-catalog.module.code.ts"
import type { ScribedSkillTemplate } from "akasha/temper/player/character/skill/modules/scribed-skill-template/scribed-skill-template.module.code.ts"
import type { GrimoireId } from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"

export const scribedSkills: SkillTable<ScribedSkillTemplate> = tableView(
  () => skillCatalog().scribedSkills
)

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
