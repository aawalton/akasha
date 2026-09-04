import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type PlacedFurnishings = "jsonl"

export const placedFurnishings = {
  id: "01a0675a-f185-72b3-a56a-b5708ff6924e",
  pageTypeSlug: "page-property-entry",
  slug: "placed-furnishings",
  propertySlug: "placed-furnishings",
  definition: "what furnishing sits in each home and what it is worth, one furnishing to a line",
  properties: [
    { pagePropertySlug: "location-id", required: true, many: false },
    { pagePropertySlug: "furnishing-key", required: true, many: false },
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "item-quality", required: false, many: false },
    { pagePropertySlug: "item-link", required: false, many: false },
    { pagePropertySlug: "collectible-link", required: false, many: false },
    { pagePropertySlug: "sale-avg", required: false, many: false },
    { pagePropertySlug: "min-price", required: false, many: false },
    { pagePropertySlug: "amount-count", required: false, many: false },
    { pagePropertySlug: "sale-amount-count", required: false, many: false },
    { pagePropertySlug: "suggested-price", required: false, many: false },
    { pagePropertySlug: "estimated-value", required: false, many: false },
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
