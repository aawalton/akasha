import type { Description } from "akasha/pages/properties/description.text-property.ts"
import type { CastConditions } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/cast-conditions.page-property-entry.types.ts"
import type { SkillEffects } from "akasha/temper/catalog/temper-companions/temper-companion-skills/properties/skill-effects.page-property-entry.types.ts"
import type { AbilityId } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/ability-id.number-property.types.ts"
import type { AlternateAbilityIds } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/alternate-ability-ids.number-property.types.ts"
import type { Tags } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/tags.text-property.types.ts"
import type { ValidRoles } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/valid-roles.text-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { SkillLineId } from "akasha/temper/catalog/things/properties/skill-line-id.text-property.types.ts"
import type { SkillType } from "akasha/temper/catalog/things/properties/skill-type.text-property.types.ts"
import type { CompanionId } from "akasha/temper/things/properties/companion-id.text-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperCompanionSkill = TemperCompanionThing & {
  key: Key
  companionId: CompanionId
  abilityId: AbilityId
  skillLineId: SkillLineId
  skillType: SkillType
  description: Description
  validRoles?: ValidRoles
  tags?: Tags
  alternateAbilityIds?: AlternateAbilityIds
  skillEffects?: SkillEffects
  castConditions?: CastConditions
}
