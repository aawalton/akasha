import type { CapturedAt } from "akasha/temper/catalog/temper-world/properties/captured-at.instant-property.types.ts"
import type { TotalValue } from "akasha/temper/holdings-sets/things/properties/total-value.number-property.types.ts"
import type { TemperThing } from "akasha/temper/things/temper-thing.page-type.types.ts"

export type TemperHoldingsThing = TemperThing & {
  capturedAt?: CapturedAt
  totalValue?: TotalValue
}
