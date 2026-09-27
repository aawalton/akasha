import type { EsoSpecializedItemTypeNumber } from "akasha/temper/catalog/temper-specialized-item-type/properties/eso-specialized-item-type-number.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperSpecializedItemType = TemperCatalogThing & {
  esoSpecializedItemTypeNumber: EsoSpecializedItemTypeNumber
}
