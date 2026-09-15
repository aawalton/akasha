import type { Snapshots } from "akasha/temper/holdings/temper-net-worth-hour/properties/snapshots.page-property-entry.types.ts"
import type { TemperHoldingsThing } from "akasha/temper/holdings/thing/temper-holdings-thing.page-type.types.ts"

export type TemperNetWorthHour = TemperHoldingsThing & {
  snapshots: Snapshots
}
