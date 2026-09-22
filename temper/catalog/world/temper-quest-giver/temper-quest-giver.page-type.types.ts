import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { CycleLength } from "akasha/temper/catalog/world/temper-quest-giver/properties/cycle-length.number-property.types.ts"
import type { Epoch } from "akasha/temper/catalog/world/temper-quest-giver/properties/epoch.calendar-date-property.types.ts"

export type TemperQuestGiver = TemperCatalogThing & {
  cycleLength: CycleLength
  epoch: Epoch
}
