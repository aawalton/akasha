import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { SubcategoryId } from "../../things/properties/subcategory-id.text-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"
import type { EsoSkillLineId } from "../properties/eso-skill-line-id.number-property.types.ts"
import type { MaxRank } from "../properties/max-rank.number-property.types.ts"
import type { SkillLineClass } from "../properties/skill-line-class.text-property.types.ts"

export type TemperSkillLine = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  esoSkillLineId: EsoSkillLineId
  maxRank: MaxRank
  subcategoryId: SubcategoryId
  class?: SkillLineClass
}
