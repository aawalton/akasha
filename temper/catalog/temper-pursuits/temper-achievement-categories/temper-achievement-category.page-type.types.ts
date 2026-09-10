import type { Category } from "../../../things/properties/category.text-property.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.types.ts"
import type { Achievements } from "./properties/achievements.page-property-entry.ts"

export type TemperAchievementCategory = TemperPursuitThing & {
  category: Category
  displayOrder: DisplayOrder
  achievements?: Achievements
}
