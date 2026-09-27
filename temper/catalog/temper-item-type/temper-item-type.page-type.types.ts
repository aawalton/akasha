import type { EsoItemTypeNumber } from "akasha/temper/catalog/temper-item-type/properties/eso-item-type-number.number-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperItemType = TemperCatalogThing & {
  esoItemTypeNumber: EsoItemTypeNumber
}
