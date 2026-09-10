import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Icon } from "../../../things/properties/icon.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { JewelryTypeId } from "../properties/jewelry-type-id.text-property.ts"

export type TemperJewelrySlot = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  icon: Icon
  typeId: JewelryTypeId
}
