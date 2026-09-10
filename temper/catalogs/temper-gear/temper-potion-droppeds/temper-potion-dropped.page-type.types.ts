import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { ItemId } from "../../../temper-catalog/things/properties/item-id.number-property.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Icon } from "../../../things/properties/icon.text-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { ItemLevel } from "../properties/item-level.text-property.ts"
import type { PotionSeconds } from "../properties/potion-seconds.number-property.ts"
import type { TemperGearThing } from "../temper-gear-things/temper-gear-thing.page-type.types.ts"

export type TemperPotionDropped = TemperGearThing & {
  key: Key
  description: Description
  displayOrder: DisplayOrder
  icon: Icon
  itemId: ItemId
  level: ItemLevel
  seconds: PotionSeconds
}
