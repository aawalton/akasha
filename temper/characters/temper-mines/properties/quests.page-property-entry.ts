import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Quests = "jsonl"

export const quests = {
  id: "01a05fcd-f553-7ed3-91d3-7f2ba2527f00",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "quests",
  propertySlug: "quests",
  definition: "every quest a sweep read out of the game, one quest to a line",
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "instant-property/mined-at", required: true, many: false },
    { pageProperty: "number-property/quest-id", required: true, many: false },
    { pageProperty: "number-property/quest-type", required: true, many: false },
    { pageProperty: "number-property/repeatable-type", required: true, many: false },
    { pageProperty: "number-property/zone-id", required: true, many: false },
    { pageProperty: "text-property/zone-name", required: true, many: false },
  ],
} as const satisfies PagePropertyEntry
