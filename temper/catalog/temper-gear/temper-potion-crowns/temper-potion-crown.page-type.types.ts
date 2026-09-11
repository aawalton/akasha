import type { Description } from "../../../../pages/properties/description.text-property.ts"
import type { CategoryId } from "../../../things/properties/category-id.text-property.types.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.types.ts"
import type { Icon } from "../../../things/properties/icon.text-property.types.ts"
import type { Key } from "../../../things/properties/key.text-property.types.ts"
import type { ItemId } from "../../things/properties/item-id.number-property.types.ts"
import type { SubcategoryId } from "../../things/properties/subcategory-id.text-property.types.ts"
import type { ItemLevel } from "../properties/item-level.text-property.types.ts"
import type { PotionSeconds } from "../properties/potion-seconds.number-property.types.ts"
import type { TemperGearThing } from "../things/temper-gear-thing.page-type.types.ts"

export type TemperPotionCrown = TemperGearThing & {
  key: Key
  description: Description
  displayOrder: DisplayOrder
  icon: Icon
  itemId: ItemId
  categoryId: CategoryId
  subcategoryId: SubcategoryId
  level: ItemLevel
  seconds: PotionSeconds
}
