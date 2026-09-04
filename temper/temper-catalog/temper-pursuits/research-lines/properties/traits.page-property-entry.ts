import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type Traits = "jsonl"

export const traits = {
  id: "01a0616b-2cdf-7004-88a2-5ab03de323e8",
  pageTypeSlug: "page-property-entry",
  slug: "traits",
  propertySlug: "traits",
  definition: "the traits a research line covers, one trait to a line",
  properties: [
    { pagePropertySlug: "trait-index", required: true, many: false },
    { pagePropertySlug: "trait-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trait here is one a player researches on the item a line names.",
    },
  ],
} as const satisfies PagePropertyEntry
