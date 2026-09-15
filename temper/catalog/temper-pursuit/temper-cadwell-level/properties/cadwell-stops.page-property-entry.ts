import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const cadwellStops = {
  id: "01a0616b-2cde-7000-91a1-a666b77645cd",
  type: "page-type/page-property-entry",
  slug: "cadwell-stops",
  propertySlug: "cadwell-stops",
  definition: "the points of interest Cadwell names in a level, one point to a line",
  properties: [
    { pageProperty: "number-property/zone-index", required: true, many: false },
    { pageProperty: "text-property/zone-name", required: true, many: false },
    { pageProperty: "number-property/stop-index", required: true, many: false },
    { pageProperty: "text-property/poi-name", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stop here is one point of interest Cadwell sends a player to.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
