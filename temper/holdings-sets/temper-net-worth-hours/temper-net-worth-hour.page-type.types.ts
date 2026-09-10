import type { TemperHoldingsThing } from "../things/temper-holdings-thing.page-type.types.ts"
import type { Snapshots } from "./properties/snapshots.page-property-entry.ts"

export type TemperNetWorthHour = TemperHoldingsThing & {
  snapshots: Snapshots
}
