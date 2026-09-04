import type { Module } from "@akasha/code-system/module"

export const mapPinsChests19 = {
  id: "01a06269-2a99-710f-8da2-c6fde8cd4ddc",
  pageTypeSlug: "module",
  slug: "map-pins-chests-19",
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
