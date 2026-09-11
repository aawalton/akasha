import type { Available } from "akasha/temper/catalog/things/properties/available.boolean-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperQuality = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  available: Available
}
