import type { Module } from "@akasha/code-system/module"

export const mapPinsLorebooks06 = {
  id: "01a06269-2add-7f60-888b-47da7ea3ec40",
  pageTypeSlug: "module",
  slug: "map-pins-lorebooks-06",
  definition: "one run of the lore book pin places by zone",
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
