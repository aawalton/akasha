import type { Icon } from "akasha/page/properties/icon.text-property.types.ts"
import type { FocusScriptId } from "akasha/temper/catalog/skill/temper-scribed-skill/properties/focus-script-id.relation-property.types.ts"
import type { GrimoireId } from "akasha/temper/catalog/skill/temper-scribed-skill/properties/grimoire-id.relation-property.types.ts"
import type { TemperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.types.ts"

export type TemperScribedSkill = TemperSkill & {
  icon: Icon
  focusScriptId: FocusScriptId
  grimoireId: GrimoireId
}
