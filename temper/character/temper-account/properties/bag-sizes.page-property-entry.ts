import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const bagSizes = {
  id: "01a0675a-f185-72e7-ad66-35247edba53b",
  type: "page-type/page-property-entry",
  slug: "bag-sizes",
  propertySlug: "bag-sizes",
  definition: "how many slots each bag of each holder has, one bag to a line",
  properties: [
    { pageProperty: "text-property/location-id", required: true, many: false },
    { pageProperty: "number-property/bag", required: true, many: false },
    { pageProperty: "number-property/bag-size", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one bag of one holder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holder with no bag of a kind has no line for that kind.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
