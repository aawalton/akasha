import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.types.ts"
import type { Action } from "./properties/action.relation-property.types.ts"
import type { Active } from "./properties/active.boolean-property.types.ts"
import type { Conditions } from "./properties/conditions.page-property-entry.types.ts"
import type { Destination } from "./properties/destination.text-property.ts"
import type { Goal } from "./properties/goal.relation-property.types.ts"
import type { StockScope } from "./properties/stock-scope.select-property.types.ts"

export type TemperRule = TemperProgressThing & {
  action?: Action
  active?: Active
  goal?: Goal
  conditions?: Conditions
  destination?: Destination
  stockScope?: StockScope
}
