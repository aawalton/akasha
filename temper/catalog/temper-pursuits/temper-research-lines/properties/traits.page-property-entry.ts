import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type Traits = "jsonl"

export const traits = {
  id: "01a0616b-2cdf-7004-88a2-5ab03de323e8",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "traits",
  propertySlug: "traits",
  definition: "the traits a research line covers, one trait to a line",
  properties: [
    { pageProperty: "number-property/trait-index", required: true, many: false },
    { pageProperty: "text-property/trait-name", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trait here is a trait a player researches on the item a line names.",
    },
  ],
} as const satisfies PagePropertyEntry
