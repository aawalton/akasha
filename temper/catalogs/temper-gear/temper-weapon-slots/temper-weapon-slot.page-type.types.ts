import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"

export type TemperWeaponSlot = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
}
