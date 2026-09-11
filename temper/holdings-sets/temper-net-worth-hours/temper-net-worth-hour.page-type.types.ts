import type { Snapshots } from "akasha/temper/holdings-sets/temper-net-worth-hours/properties/snapshots.page-property-entry.types.ts"
import type { TemperHoldingsThing } from "akasha/temper/holdings-sets/things/temper-holdings-thing.page-type.types.ts"

export type TemperNetWorthHour = TemperHoldingsThing & {
  snapshots: Snapshots
}
