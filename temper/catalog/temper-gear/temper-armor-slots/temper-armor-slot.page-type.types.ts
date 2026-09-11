import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Icon } from "../../../things/properties/icon.text-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { TemperCatalogThing } from "../../things/temper-catalog-thing.page-type.types.ts"

export type TemperArmorSlot = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  icon: Icon
}
