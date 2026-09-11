import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { Available } from "../../things/properties/available.boolean-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperQuality = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  available: Available
}
