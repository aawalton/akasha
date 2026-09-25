import type { TemperCatalogThing } from "akasha/temper/catalog/thing/temper-catalog-thing.page-type.types.ts"
import type { EsoZoneId } from "akasha/temper/catalog/world/zone/properties/eso-zone-id.number-property.types.ts"
import type { ItemBrowserPlaceKind } from "akasha/temper/catalog/world/zone/properties/item-browser-place-kind.number-property.types.ts"
import type { Pois } from "akasha/temper/catalog/world/zone/properties/pois.page-property-entry.types.ts"
import type { ZoneCompletionActivities } from "akasha/temper/catalog/world/zone/properties/zone-completion-activities.page-property-entry.types.ts"
import type { ZoneQuests } from "akasha/temper/catalog/world/zone/properties/zone-quests.page-property-entry.types.ts"

export type TemperWorldZone = TemperCatalogThing & {
  esoZoneId?: EsoZoneId
  zoneQuests?: ZoneQuests
  pois?: Pois
  zoneCompletionActivities?: ZoneCompletionActivities
  itemBrowserPlaceKind?: ItemBrowserPlaceKind
}
