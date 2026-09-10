import type { PageType } from "@akasha/pages/page-type"

export const temperWorldZone = {
  id: "01a06167-3f9b-700d-bf56-54687a9f3c3a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-world-zone",
  definition: "a region of the game world a player is shown completion against",
  pluralSlug: "temper-world-zones",
  extends: ["page-type/temper-catalog-thing"],
  parts: [
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
    { pageProperty: "number-property/eso-zone-id", required: false, many: false },
    { pageProperty: "page-property-entry/zone-quests", required: false, many: false },
    { pageProperty: "page-property-entry/pois", required: false, many: false },
    {
      pageProperty: "page-property-entry/zone-completion-activities",
      required: false,
      many: false,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A zone states an eso zone id only where the capture reports an id for that zone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A zone states an entry property only where the zone has rows under that property.",
    },
  ],
  types: "ts",
} as const satisfies PageType
