import type { Module } from "@akasha/code-system/module"

export const mapPinsChests04 = {
  id: "01a06269-2a88-7914-8598-6989a40c6342",
  pageTypeSlug: "module",
  slug: "map-pins-chests-04",
  definition: "one run of the treasure chest places by zone",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
