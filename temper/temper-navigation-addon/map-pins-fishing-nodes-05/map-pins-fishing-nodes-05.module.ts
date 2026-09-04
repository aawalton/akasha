import type { Module } from "@akasha/code-system/module"

export const mapPinsFishingNodes05 = {
  id: "01a06269-2ac2-7596-9e39-264078ab9293",
  pageTypeSlug: "module",
  slug: "map-pins-fishing-nodes-05",
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
