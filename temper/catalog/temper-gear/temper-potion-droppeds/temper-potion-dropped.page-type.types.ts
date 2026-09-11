import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { ItemLevel } from "akasha/temper/catalog/temper-gear/properties/item-level.text-property.types.ts"
import type { PotionSeconds } from "akasha/temper/catalog/temper-gear/properties/potion-seconds.number-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/temper-gear/things/temper-gear-thing.page-type.types.ts"
import type { ItemId } from "akasha/temper/catalog/things/properties/item-id.number-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Icon } from "akasha/temper/things/properties/icon.text-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperPotionDropped = TemperGearThing & {
  key: Key
  description: Description
  displayOrder: DisplayOrder
  icon: Icon
  itemId: ItemId
  level: ItemLevel
  seconds: PotionSeconds
}
