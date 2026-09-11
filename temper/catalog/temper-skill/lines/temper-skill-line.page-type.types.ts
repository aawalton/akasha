import type { EsoSkillLineId } from "akasha/temper/catalog/temper-skill/properties/eso-skill-line-id.number-property.types.ts"
import type { MaxRank } from "akasha/temper/catalog/temper-skill/properties/max-rank.number-property.types.ts"
import type { SkillLineClass } from "akasha/temper/catalog/temper-skill/properties/skill-line-class.text-property.types.ts"
import type { SubcategoryId } from "akasha/temper/catalog/things/properties/subcategory-id.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperSkillLine = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoSkillLineId: EsoSkillLineId
  maxRank: MaxRank
  subcategoryId: SubcategoryId
  class?: SkillLineClass
}
