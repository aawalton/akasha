import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Collectibles = "jsonl"

export const collectibles = {
  id: "01a06165-ae0e-7002-9050-a3edc1766aec",
  pageTypeSlug: "page-property-entry",
  slug: "collectibles",
  propertySlug: "collectibles",
  definition: "the collectibles a category holds, one collectible to a line",
  properties: [
    { pageProperty: "number-property/eso-collectible-id", required: true, many: false },
    { pageProperty: "text-property/collectible-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collectible here is filed by the game under the category with the file.",
    },
  ],
} as const satisfies PagePropertyEntry
