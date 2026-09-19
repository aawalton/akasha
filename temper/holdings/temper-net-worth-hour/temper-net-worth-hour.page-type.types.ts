import type { Readings } from "akasha/temper/holdings/temper-net-worth-hour/properties/readings.page-property-entry.types.ts"
import type { TemperHoldingsThing } from "akasha/temper/holdings/thing/temper-holdings-thing.page-type.types.ts"

export type TemperNetWorthHour = TemperHoldingsThing & {
  readings: Readings
}
