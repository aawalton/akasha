import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Pois = "jsonl"

export const pois = {
  id: "01a06167-3f9b-700b-ab48-cb7aa724cc9c",
  pageTypeSlug: "page-property-entry",
  slug: "pois",
  propertySlug: "pois",
  definition: "the points of interest a zone holds, one place to a line",
  properties: [
    { pageProperty: "number-property/poi-type", required: true, many: false },
    { pageProperty: "text-property/poi-type-label", required: true, many: false },
    { pageProperty: "number-property/poi-index", required: true, many: false },
    { pageProperty: "text-property/poi-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A place here has the label of the kind of point of interest the place is.",
    },
  ],
} as const satisfies PagePropertyEntry
