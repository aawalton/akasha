import type { FocusScriptId } from "akasha/temper/catalog/temper-skill/temper-scribed-skill/properties/focus-script-id.text-property.types.ts"
import type { GrimoireId } from "akasha/temper/catalog/temper-skill/temper-scribed-skill/properties/grimoire-id.text-property.types.ts"
import type { TemperSkill } from "akasha/temper/catalog/temper-skill/temper-skill.page-type.types.ts"
import type { Icon } from "akasha/temper/thing/properties/icon.text-property.types.ts"

export type TemperScribedSkill = TemperSkill & {
  icon: Icon
  focusScriptId: FocusScriptId
  grimoireId: GrimoireId
}
