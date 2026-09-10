import type { SkillLineId } from "../../../temper-catalog/things/properties/skill-line-id.text-property.ts"
import type { Icon } from "../../../things/properties/icon.text-property.ts"
import type { AbilityIcon } from "../properties/ability-icon.text-property.ts"
import type { AffixScripts } from "../properties/affix-scripts.page-property-entry.ts"
import type { FocusScripts } from "../properties/focus-scripts.text-property.ts"
import type { SignatureScripts } from "../properties/signature-scripts.page-property-entry.ts"
import type { TemperScribingThing } from "../temper-scribing-things/temper-scribing-thing.page-type.types.ts"

export type TemperGrimoire = TemperScribingThing & {
  icon: Icon
  abilityIcon: AbilityIcon
  skillLineId: SkillLineId
  focusScripts: FocusScripts
  affixScripts: AffixScripts
  signatureScripts: SignatureScripts
}
