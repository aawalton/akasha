import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
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

export const temperWorldZone = {
  id: "01a06167-3f9b-700d-bf56-54687a9f3c3a",
  pageTypeSlug: "page-type",
  slug: "temper-world-zone",
  definition: "a region of the game world a player is shown completion against",
  pluralSlug: "temper-world-zones",
  extendsSlug: ["page-type/temper-catalog-thing"],
  partSlugs: [
    "number-property/activity-index",
    "number-property/completion-type",
    "number-property/eso-activity-id",
    "number-property/eso-quest-id",
    "number-property/eso-zone-id",
    "number-property/poi-index",
    "number-property/poi-type",
    "page-property-entry/pois",
    "page-property-entry/zone-completion-activities",
    "page-property-entry/zone-quests",
    "text-property/activity-name",
    "text-property/completion-type-label",
    "text-property/poi-type-label",
    "text-property/quest-name",
  ],
  properties: [
    { pagePropertySlug: "eso-zone-id", required: false, many: false },
    { pagePropertySlug: "zone-quests", required: false, many: false },
    { pagePropertySlug: "pois", required: false, many: false },
    { pagePropertySlug: "zone-completion-activities", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A zone states an eso zone id only where the capture reports an id for that zone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A zone states an entry property only where the zone holds rows under that property.",
    },
  ],
} as const satisfies PageType
