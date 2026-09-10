import type { Key } from "../../../things/properties/key.text-property.ts"
import type { SkillLineId } from "../../things/properties/skill-line-id.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { ArmorBaseValue } from "../properties/armor-base-value.number-property.types.ts"
import type { IsStandard } from "../properties/is-standard.boolean-property.types.ts"

export type TemperArmorWeight = TemperCatalogThing & {
  key: Key
  baseValue: ArmorBaseValue
  isStandard: IsStandard
  skillLineId: SkillLineId
}
