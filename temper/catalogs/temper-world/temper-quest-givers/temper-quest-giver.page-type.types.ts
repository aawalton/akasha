import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { CycleLength } from "../properties/cycle-length.number-property.ts"
import type { Epoch } from "../properties/epoch.text-property.ts"

export type TemperQuestGiver = TemperCatalogThing & {
  cycleLength: CycleLength
  epoch: Epoch
}
