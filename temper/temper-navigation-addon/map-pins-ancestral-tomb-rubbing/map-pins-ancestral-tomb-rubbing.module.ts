import type { Module } from "@akasha/code-system/module"

export const mapPinsAncestralTombRubbing = {
  id: "01a06269-2a45-78cb-b5fd-e25a668190c3",
  pageTypeSlug: "module",
  slug: "map-pins-ancestral-tomb-rubbing",
  definition: "the ancestral tomb rubbing places",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
