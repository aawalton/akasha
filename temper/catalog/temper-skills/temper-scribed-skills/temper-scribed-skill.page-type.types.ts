import type { Icon } from "../../../things/properties/icon.text-property.ts"
import type { FocusScriptId } from "../../temper-skill/properties/focus-script-id.text-property.ts"
import type { GrimoireId } from "../../temper-skill/properties/grimoire-id.text-property.ts"
import type { TemperSkill } from "../skills/temper-skill.page-type.types.ts"

export type TemperScribedSkill = TemperSkill & {
  icon: Icon
  focusScriptId: FocusScriptId
  grimoireId: GrimoireId
}
