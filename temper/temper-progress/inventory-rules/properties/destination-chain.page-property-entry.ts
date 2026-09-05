import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type DestinationChain = "jsonl"

export const destinationChain = {
  id: "01a07283-f299-71ac-b104-933518a6706d",
  pageTypeSlug: "page-property-entry",
  slug: "destination-chain",
  propertySlug: "destination-chain",
  definition: "where a rule puts an item, one leg to a line",
  properties: [
    { pagePropertySlug: "destination", required: true, many: false },
    { pagePropertySlug: "target-quantity", required: false, many: false },
    { pagePropertySlug: "char-eligibility", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The order the legs are written in is the order the legs are tried.",
    },
    {
      invariantKind: "departure",
      statement: "An item goes to the first leg that will take it.",
    },
    {
      invariantKind: "departure",
      statement: "A leg taking every item is the last leg worth writing.",
    },
    {
      invariantKind: "departure",
      statement: "A rule stating a chain states where the chain ends.",
    },
  ],
} as const satisfies PagePropertyEntry
