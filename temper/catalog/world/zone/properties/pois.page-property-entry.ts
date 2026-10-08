import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const pois = {
  id: "01a06167-3f9b-700b-ab48-cb7aa724cc9c",
  type: "page-type/page-property-entry",
  slug: "pois",
  propertySlug: "pois",
  definition: "the points of interest a zone holds, one place to a line",
  properties: [
    { pageProperty: "number-property/poi-type", required: true, many: false },
    { pageProperty: "text-property/poi-type-label", required: true, many: false },
    { pageProperty: "number-property/poi-index", required: true, many: false },
    { pageProperty: "text-property/poi-name", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A place here has the label of the kind of point of interest the place is.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T09:15:51.579Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies PagePropertyEntry
