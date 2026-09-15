import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { ItemLevel } from "akasha/temper/catalog/temper-gear/properties/item-level.text-property.types.ts"
import type { PotionSeconds } from "akasha/temper/catalog/temper-gear/properties/potion-seconds.number-property.types.ts"
import type { TemperGearThing } from "akasha/temper/catalog/temper-gear/thing/temper-gear-thing.page-type.types.ts"
import type { ItemId } from "akasha/temper/catalog/thing/properties/item-id.number-property.types.ts"
import type { SubcategoryId } from "akasha/temper/catalog/thing/properties/subcategory-id.text-property.types.ts"
import type { CategoryId } from "akasha/temper/thing/properties/category-id.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/thing/properties/display-order.number-property.types.ts"
import type { Icon } from "akasha/temper/thing/properties/icon.text-property.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

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
