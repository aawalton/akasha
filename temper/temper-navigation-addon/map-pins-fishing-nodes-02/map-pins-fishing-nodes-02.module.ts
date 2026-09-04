import type { Module } from "@akasha/code-system/module"

export const mapPinsFishingNodes02 = {
  id: "01a06269-2abf-7c49-b1af-874a60d281c4",
  pageTypeSlug: "module",
  slug: "map-pins-fishing-nodes-02",
  definition: "one run of the fishing hole places by zone",
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
