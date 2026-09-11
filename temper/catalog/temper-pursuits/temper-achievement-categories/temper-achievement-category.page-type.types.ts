import type { Achievements } from "akasha/temper/catalog/temper-pursuits/temper-achievement-categories/properties/achievements.page-property-entry.types.ts"
import type { TemperPursuitThing } from "akasha/temper/catalog/temper-pursuits/temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Category } from "akasha/temper/things/properties/category.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"

export type TemperAchievementCategory = TemperPursuitThing & {
  category: Category
  displayOrder: DisplayOrder
  achievements?: Achievements
}
