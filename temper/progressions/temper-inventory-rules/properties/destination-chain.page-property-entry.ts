import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type DestinationChain = "jsonl"

export const destinationChain = {
  id: "01a07283-f299-71ac-b104-933518a6706d",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "destination-chain",
  propertySlug: "destination-chain",
  definition: "where a rule puts an item, one leg to a line",
  properties: [
    { pageProperty: "text-property/destination", required: true, many: false },
    { pageProperty: "number-property/target-quantity", required: false, many: false },
    { pageProperty: "text-property/char-eligibility", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The order the legs are written in is the order the legs are tried.",
    },
    {
      invariantKind: "departure",
      statement: "An item goes to the first leg that will take that item.",
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
