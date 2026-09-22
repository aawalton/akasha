import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const browseListings = {
  id: "01a060a7-02f2-748c-b8d5-e1c65820155b",
  type: "page-type/module",
  slug: "browse-listings",
  definition: "how listings taken from a guild store are merged and ordered by price",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing arriving again replaces the listing of the same uid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Listings at the same unit price fall in uid order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sort answers with a fresh array rather than reordering the array handed in.",
    },
  ],
} as const satisfies Module
