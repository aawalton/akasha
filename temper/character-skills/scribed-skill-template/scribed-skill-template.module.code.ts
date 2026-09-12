import type { SkillTemplate } from "akasha/temper/character-skills/modules/character-skill-template/character-skill-template.module.code.ts"
import type { GrimoireId } from "akasha/temper/character-skills/scribing-grimoires/scribing-grimoires.module.code.ts"
import type { ClassId } from "akasha/temper/formula-framework/class-id/class-id.module.code.ts"
import type { FocusScriptId } from "akasha/temper/skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"

export interface ScribedSkillTemplate extends SkillTemplate {
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  classId?: ClassId
}
