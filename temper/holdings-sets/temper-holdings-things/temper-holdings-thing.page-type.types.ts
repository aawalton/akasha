import type { CapturedAt } from "../../catalogs/temper-world/properties/captured-at.instant-property.ts"
import type { TemperThing } from "../../things/temper-thing.page-type.ts"
import type { TotalValue } from "./properties/total-value.number-property.ts"

export type TemperHoldingsThing = TemperThing & {
  capturedAt?: CapturedAt
  totalValue?: TotalValue
}
