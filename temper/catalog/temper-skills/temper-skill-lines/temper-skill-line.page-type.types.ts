import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { EsoSkillLineId } from "../../temper-skill/properties/eso-skill-line-id.number-property.ts"
import type { MaxRank } from "../../temper-skill/properties/max-rank.number-property.ts"
import type { SkillLineClass } from "../../temper-skill/properties/skill-line-class.text-property.ts"
import type { SubcategoryId } from "../../things/properties/subcategory-id.text-property.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperSkillLine = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoSkillLineId: EsoSkillLineId
  maxRank: MaxRank
  subcategoryId: SubcategoryId
  class?: SkillLineClass
}
