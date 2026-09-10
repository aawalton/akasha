import type { SubcategoryId } from "../../../temper-catalog/things/properties/subcategory-id.text-property.ts"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { EsoSkillLineId } from "../properties/eso-skill-line-id.number-property.ts"
import type { MaxRank } from "../properties/max-rank.number-property.ts"
import type { SkillLineClass } from "../properties/skill-line-class.text-property.ts"

export type TemperSkillLine = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoSkillLineId: EsoSkillLineId
  maxRank: MaxRank
  subcategoryId: SubcategoryId
  class?: SkillLineClass
}
