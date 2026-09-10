import type { Available } from "../../../temper-catalog/things/properties/available.boolean-property.ts"
import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"

export type TemperQuality = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  available: Available
}
