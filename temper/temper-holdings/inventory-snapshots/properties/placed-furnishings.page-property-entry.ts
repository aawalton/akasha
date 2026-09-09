import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type PlacedFurnishings = "jsonl"

export const placedFurnishings = {
  id: "01a0675a-f185-72b3-a56a-b5708ff6924e",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "placed-furnishings",
  propertySlug: "placed-furnishings",
  definition: "what furnishing sits in each home and what it is worth, one furnishing to a line",
  properties: [
    { pageProperty: "text-property/location-id", required: true, many: false },
    { pageProperty: "text-property/furnishing-key", required: true, many: false },
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/item-quality", required: false, many: false },
    { pageProperty: "text-property/item-link", required: false, many: false },
    { pageProperty: "text-property/collectible-link", required: false, many: false },
    { pageProperty: "number-property/sale-avg", required: false, many: false },
    { pageProperty: "number-property/min-price", required: false, many: false },
    { pageProperty: "number-property/amount-count", required: false, many: false },
    { pageProperty: "number-property/sale-amount-count", required: false, many: false },
    { pageProperty: "number-property/suggested-price", required: false, many: false },
    { pageProperty: "number-property/estimated-value", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line is one furnishing placed in one home.",
    },
    {
      invariantKind: "departure",
      statement: "A price field is absent where the price source priced nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A furnishing is reached by an item link or by a collectible link.",
    },
  ],
} as const satisfies PagePropertyEntry
