import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import type { SkillTemplate } from "../character-skill-template/character-skill-template.module.code.ts"
import type { GrimoireId } from "../scribing-grimoires/scribing-grimoires.module.code.ts"

export interface ScribedSkillTemplate extends SkillTemplate {
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  classId?: ClassId
}
