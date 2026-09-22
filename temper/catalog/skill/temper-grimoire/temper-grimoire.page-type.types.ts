import type { AbilityIcon } from "akasha/temper/catalog/skill/temper-grimoire/properties/ability-icon.text-property.types.ts"
import type { AffixScripts } from "akasha/temper/catalog/skill/temper-grimoire/properties/affix-scripts.page-property-entry.types.ts"
import type { FocusScripts } from "akasha/temper/catalog/skill/temper-grimoire/properties/focus-scripts.multi-relation-property.types.ts"
import type { SignatureScripts } from "akasha/temper/catalog/skill/temper-grimoire/properties/signature-scripts.page-property-entry.types.ts"
import type { TemperScribingThing } from "akasha/temper/catalog/skill/temper-scribing-thing/temper-scribing-thing.page-type.types.ts"
import type { SkillLine } from "akasha/temper/catalog/thing/properties/skill-line.relation-property.types.ts"
import type { Icon } from "akasha/temper/thing/properties/icon.text-property.types.ts"

export type TemperGrimoire = TemperScribingThing & {
  icon: Icon
  abilityIcon: AbilityIcon
  focusScripts: FocusScripts
  affixScripts: AffixScripts
  signatureScripts: SignatureScripts
  skillLineId: SkillLine
}
