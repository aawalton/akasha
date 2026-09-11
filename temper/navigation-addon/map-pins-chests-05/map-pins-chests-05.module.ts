import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const mapPinsChests05 = {
  id: "01a06269-2a89-7249-838d-2d3974f0318b",
  pageTypeSlug: "module",
  type: "module",
  slug: "map-pins-chests-05",
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
