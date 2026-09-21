import type { FocusScriptId } from "akasha/temper/catalog/skill-kind/modules/scribing-focus-scripts/scribing-focus-scripts.module.code.ts"
import type { ClassId } from "akasha/temper/formula-framework/modules/class-id/class-id.module.code.ts"
import type { SkillTemplate } from "akasha/temper/player/character/skill/modules/character-skill-template/character-skill-template.module.code.ts"
import type { GrimoireId } from "akasha/temper/player/character/skill/modules/scribing-grimoires/scribing-grimoires.module.code.ts"

export interface ScribedSkillTemplate extends SkillTemplate {
  grimoireId: GrimoireId
  focusScriptId: FocusScriptId
  classId?: ClassId
}
