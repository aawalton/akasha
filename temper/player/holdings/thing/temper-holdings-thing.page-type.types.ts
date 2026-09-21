import type { CapturedAt } from "akasha/temper/catalog/world/properties/captured-at.instant-property.types.ts"
import type { TotalValue } from "akasha/temper/player/holdings/thing/properties/total-value.number-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperHoldingsThing = TemperThing & {
  capturedAt?: CapturedAt
  totalValue?: TotalValue
}
