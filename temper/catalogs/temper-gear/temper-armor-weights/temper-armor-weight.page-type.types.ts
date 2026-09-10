import type { SkillLineId } from "../../../temper-catalog/things/properties/skill-line-id.text-property.ts"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ArmorBaseValue } from "../properties/armor-base-value.number-property.ts"
import type { IsStandard } from "../properties/is-standard.boolean-property.ts"

export type TemperArmorWeight = TemperCatalogThing & {
  key: Key
  baseValue: ArmorBaseValue
  isStandard: IsStandard
  skillLineId: SkillLineId
}
