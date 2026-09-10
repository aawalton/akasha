import type { Domain } from "../../domains/domain.page-type.types.ts"

export const temperTradingListings = {
  id: "01a060a7-02f1-7930-8d6d-b218c9feb9ff",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "temper-trading-listings",
  definition: "guild store listings gathered one store at a time",
  parts: [
    "module/browse-listings",
    "module/browse-state",
    "module/listing-entry-schema",
    "module/listing-types",
    "module/sell-pricing",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A listing is known by its uid from the game.",
    },
    {
      invariantKind: "departure",
      statement: "Which guild store to search next is decided here and acted on by the add-on.",
    },
    {
      invariantKind: "absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies Domain
