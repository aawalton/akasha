import type { Available } from "akasha/temper/catalog/thing/properties/available.boolean-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperQuality = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  available: Available
}
