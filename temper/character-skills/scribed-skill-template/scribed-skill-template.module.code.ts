import type { ClassId } from "../../formula-framework/class-id/class-id.module.code.ts"
import type { FocusScriptId } from "../../skill-kinds/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import type { SkillTemplate } from "../character-skill-template/character-skill-template.module.code.ts"
import type { GrimoireId } from "../scribing-grimoires/scribing-grimoires.module.code.ts"

export interface ScribedSkillTemplate extends SkillTemplate {
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  classId?: ClassId
}
