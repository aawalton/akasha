import type { Module } from "@akasha/code-system/module"

export const housingVisitCardSend = {
  id: "01a06128-d5d5-707b-9cdc-4653373a3019",
  pageTypeSlug: "module",
  slug: "housing-visit-card-send",
  definition: "sending a visit card to a friend, a guild or a zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A card is sent as an ordinary chat line carrying the agreed key word.",
    },
  ],
} as const satisfies Module
