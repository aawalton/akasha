import type { JewelryTypeId } from "akasha/temper/catalog/temper-gear/properties/jewelry-type-id.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperJewelrySlot = TemperCatalogThing & {
  key: Key
  displayOrder: DisplayOrder
  icon: Icon
  typeId: JewelryTypeId
}
