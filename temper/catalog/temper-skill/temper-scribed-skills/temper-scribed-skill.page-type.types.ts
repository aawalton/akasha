import type { Icon } from "../../../things/properties/icon.text-property.types.ts"
import type { FocusScriptId } from "../properties/focus-script-id.text-property.types.ts"
import type { GrimoireId } from "../properties/grimoire-id.text-property.types.ts"
import type { TemperSkill } from "../temper-skills/temper-skill.page-type.types.ts"

export type TemperScribedSkill = TemperSkill & {
  icon: Icon
  focusScriptId: FocusScriptId
  grimoireId: GrimoireId
}
