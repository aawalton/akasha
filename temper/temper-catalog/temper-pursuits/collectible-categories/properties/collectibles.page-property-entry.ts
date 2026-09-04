import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Collectibles = "jsonl"

export const collectibles = {
  id: "01a06165-ae0e-7002-9050-a3edc1766aec",
  pageTypeSlug: "page-property-entry",
  slug: "collectibles",
  propertySlug: "collectibles",
  definition: "the collectibles a category holds, one collectible to a line",
  properties: [
    { pagePropertySlug: "eso-collectible-id", required: true, many: false },
    { pagePropertySlug: "collectible-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collectible here is filed by the game under the category holding the file.",
    },
  ],
} as const satisfies PagePropertyEntry
