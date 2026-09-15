import type { EsoTraitNum } from "akasha/temper/catalog/temper-gear/properties/eso-trait-num.number-property.types.ts"
import type { TraitFamily } from "akasha/temper/catalog/temper-gear/properties/trait-family.text-property.types.ts"
import type { TraitId } from "akasha/temper/catalog/temper-gear/properties/trait-id.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperEsoTraitMap = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  traitFamily: TraitFamily
  traitId: TraitId
  esoTraitNum: EsoTraitNum
}
