import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const temperTradingListing = {
  id: "01a060a7-02f1-7930-8d6d-b218c9feb9ff",
  type: "page-type/domain",
  slug: "temper-trading-listing",
  definition: "guild store listings taken one store at a time",
  parts: [
    "module/browse-listings",
    "module/browse-state",
    "module/listing-types",
    "module/sell-pricing",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing is known by its uid from the game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which guild store to search next is decided here and acted on by the add-on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No code here reaches the game.",
    },
  ],
} as const satisfies Domain
