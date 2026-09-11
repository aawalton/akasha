import type { AbilityIcon } from "akasha/temper/catalog/temper-skill/properties/ability-icon.text-property.types.ts"
import type { AffixScripts } from "akasha/temper/catalog/temper-skill/properties/affix-scripts.page-property-entry.types.ts"
import type { FocusScripts } from "akasha/temper/catalog/temper-skill/properties/focus-scripts.text-property.types.ts"
import type { SignatureScripts } from "akasha/temper/catalog/temper-skill/properties/signature-scripts.page-property-entry.types.ts"
import type { TemperScribingThing } from "akasha/temper/catalog/temper-skill/temper-scribing-things/temper-scribing-thing.page-type.types.ts"
import type { SkillLineId } from "akasha/temper/catalog/things/properties/skill-line-id.text-property.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"

export type TemperGrimoire = TemperScribingThing & {
  icon: Icon
  abilityIcon: AbilityIcon
  skillLineId: SkillLineId
  focusScripts: FocusScripts
  affixScripts: AffixScripts
  signatureScripts: SignatureScripts
}
