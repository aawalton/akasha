import type { TemperCatalogThing } from "../../../temper-catalog/things/temper-catalog-thing.page-type.types.ts"
import type { EsoZoneId } from "./properties/eso-zone-id.number-property.ts"
import type { Pois } from "./properties/pois.page-property-entry.ts"
import type { ZoneCompletionActivities } from "./properties/zone-completion-activities.page-property-entry.ts"
import type { ZoneQuests } from "./properties/zone-quests.page-property-entry.ts"

export type TemperWorldZone = TemperCatalogThing & {
  esoZoneId?: EsoZoneId
  zoneQuests?: ZoneQuests
  pois?: Pois
  zoneCompletionActivities?: ZoneCompletionActivities
}
