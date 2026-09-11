import type { EsoZoneId } from "akasha/temper/catalog/temper-world/zones/properties/eso-zone-id.number-property.types.ts"
import type { Pois } from "akasha/temper/catalog/temper-world/zones/properties/pois.page-property-entry.types.ts"
import type { ZoneCompletionActivities } from "akasha/temper/catalog/temper-world/zones/properties/zone-completion-activities.page-property-entry.types.ts"
import type { ZoneQuests } from "akasha/temper/catalog/temper-world/zones/properties/zone-quests.page-property-entry.types.ts"
import type { TemperCatalogThing } from "akasha/temper/catalog/things/temper-catalog-thing.page-type.types.ts"

export type TemperWorldZone = TemperCatalogThing & {
  esoZoneId?: EsoZoneId
  zoneQuests?: ZoneQuests
  pois?: Pois
  zoneCompletionActivities?: ZoneCompletionActivities
}
