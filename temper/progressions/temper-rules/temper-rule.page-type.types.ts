import type { TemperProgressThing } from "../things/temper-progress-thing.page-type.ts"
import type { Action } from "./properties/action.relation-property.ts"
import type { Active } from "./properties/active.boolean-property.ts"
import type { Conditions } from "./properties/conditions.page-property-entry.ts"
import type { Destination } from "./properties/destination.text-property.ts"
import type { Goal } from "./properties/goal.relation-property.ts"
import type { StockScope } from "./properties/stock-scope.select-property.ts"

export type TemperRule = TemperProgressThing & {
  action?: Action
  active?: Active
  goal?: Goal
  conditions?: Conditions
  destination?: Destination
  stockScope?: StockScope
}
