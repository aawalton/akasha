import type { Module } from "@akasha/code-system/module"

export const mapPinsPrecursorTooltip = {
  id: "01a06269-2ae6-7296-a8b5-f9f9d9ab737a",
  pageTypeSlug: "module",
  slug: "map-pins-precursor-tooltip",
  definition: "the tooltip of each precursor part",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
