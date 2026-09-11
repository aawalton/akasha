import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { CompanionId } from "../../../things/properties/companion-id.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { SkillLineId } from "../../things/properties/skill-line-id.text-property.types.ts"
import type { SkillType } from "../../things/properties/skill-type.text-property.types.ts"
import type { AbilityId } from "../temper-companion-things/properties/ability-id.number-property.types.ts"
import type { AlternateAbilityIds } from "../temper-companion-things/properties/alternate-ability-ids.number-property.types.ts"
import type { Tags } from "../temper-companion-things/properties/tags.text-property.types.ts"
import type { ValidRoles } from "../temper-companion-things/properties/valid-roles.text-property.types.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { CastConditions } from "./properties/cast-conditions.page-property-entry.types.ts"
import type { SkillEffects } from "./properties/skill-effects.page-property-entry.types.ts"

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
