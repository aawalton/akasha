import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Cards = "jsonl"

export const cards = {
  id: "01a06153-0ea9-7007-944b-5acfb4c2daa1",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "cards",
  propertySlug: "cards",
  definition: "the cards a patron hands out, one card to a line",
  properties: [
    { pageProperty: "number-property/card-index", required: true, many: false },
    { pageProperty: "text-property/base-card-name", required: true, many: false },
    { pageProperty: "text-property/upgrade-card-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A card here is a card a patron lets a player upgrade.",
    },
  ],
} as const satisfies PagePropertyEntry
