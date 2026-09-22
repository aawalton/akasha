import type { Action } from "akasha/temper/player/progress/temper-rule/properties/action.relation-property.types.ts"
import type { Active } from "akasha/temper/player/progress/temper-rule/properties/active.boolean-property.types.ts"
import type { Conditions } from "akasha/temper/player/progress/temper-rule/properties/conditions.page-property-entry.types.ts"
import type { Destination } from "akasha/temper/player/progress/temper-rule/properties/destination.text-property.types.ts"
import type { Goal } from "akasha/temper/player/progress/temper-rule/properties/goal.relation-property.types.ts"
import type { ItemCategory } from "akasha/temper/player/progress/temper-rule/properties/item-category.relation-property.types.ts"
import type { StockScope } from "akasha/temper/player/progress/temper-rule/properties/stock-scope.select-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/player/progress/thing/temper-progress-thing.page-type.types.ts"

export type TemperRule = TemperProgressThing & {
  action?: Action
  active?: Active
  goal?: Goal
  conditions?: Conditions
  destination?: Destination
  stockScope?: StockScope
  categoryId?: ItemCategory
}
