import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type CadwellStops = "jsonl"

export const cadwellStops = {
  id: "01a0616b-2cde-7000-91a1-a666b77645cd",
  pageTypeSlug: "page-property-entry",
  slug: "cadwell-stops",
  propertySlug: "cadwell-stops",
  definition: "the points of interest Cadwell names in a level, one point to a line",
  properties: [
    { pageProperty: "number-property/zone-index", required: true, many: false },
    { pageProperty: "text-property/zone-name", required: true, many: false },
    { pageProperty: "number-property/stop-index", required: true, many: false },
    { pageProperty: "text-property/poi-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stop here is one point of interest Cadwell sends a player to.",
    },
  ],
} as const satisfies PagePropertyEntry
