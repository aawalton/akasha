import type { Module } from "@akasha/code-system/module"

export const mapPinsChests00 = {
  id: "01a06269-2a84-7065-897a-75e89e3eea38",
  pageTypeSlug: "module",
  slug: "map-pins-chests-00",
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
