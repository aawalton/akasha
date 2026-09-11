import type { ArmorBaseValue } from "akasha/temper/catalog/temper-gear/properties/armor-base-value.number-property.types.ts"
import type { IsStandard } from "akasha/temper/catalog/temper-gear/properties/is-standard.boolean-property.types.ts"
import type { SkillLineId } from "akasha/temper/catalog/things/properties/skill-line-id.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperArmorWeight = TemperCatalogThing & {
  key: Key
  baseValue: ArmorBaseValue
  isStandard: IsStandard
  skillLineId: SkillLineId
}
