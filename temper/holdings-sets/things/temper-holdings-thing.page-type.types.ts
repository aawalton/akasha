import type { CapturedAt } from "../../catalog/temper-world/properties/captured-at.instant-property.types.ts"
import type { TemperThing } from "../../things/temper-thing.page-type.types.ts"
import type { TotalValue } from "./properties/total-value.number-property.ts"

export type TemperHoldingsThing = TemperThing & {
  capturedAt?: CapturedAt
  totalValue?: TotalValue
}
