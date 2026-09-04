import type { Module } from "@akasha/code-system/module"

export const tradingListingFacts = {
  id: "01a06160-2a5b-7607-af63-bd5291e11a17",
  pageTypeSlug: "module",
  slug: "trading-listing-facts",
  definition: "reading one guild store result row into the facts a filter judges",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row the game cannot describe is read as nothing rather than as a guess.",
    },
  ],
} as const satisfies Module
