import type { CycleLength } from "akasha/temper/catalog/temper-world/properties/cycle-length.number-property.types.ts"
import type { Epoch } from "akasha/temper/catalog/temper-world/properties/epoch.text-property.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"

export type TemperQuestGiver = TemperCatalogThing & {
  cycleLength: CycleLength
  epoch: Epoch
}
