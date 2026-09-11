import type { Action } from "akasha/temper/progressions/temper-rules/properties/action.relation-property.types.ts"
import type { Active } from "akasha/temper/progressions/temper-rules/properties/active.boolean-property.types.ts"
import type { Conditions } from "akasha/temper/progressions/temper-rules/properties/conditions.page-property-entry.types.ts"
import type { Destination } from "akasha/temper/progressions/temper-rules/properties/destination.text-property.types.ts"
import type { Goal } from "akasha/temper/progressions/temper-rules/properties/goal.relation-property.types.ts"
import type { StockScope } from "akasha/temper/progressions/temper-rules/properties/stock-scope.select-property.types.ts"
import type { TemperProgressThing } from "akasha/temper/progressions/things/temper-progress-thing.page-type.types.ts"

export type TemperRule = TemperProgressThing & {
  action?: Action
  active?: Active
  goal?: Goal
  conditions?: Conditions
  destination?: Destination
  stockScope?: StockScope
}
