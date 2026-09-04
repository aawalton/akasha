import type { Module } from "@akasha/code-system/module"

export const mapPinsSkyShards03 = {
  id: "01a06269-2af8-7683-9fa5-a64a094570a7",
  pageTypeSlug: "module",
  slug: "map-pins-sky-shards-03",
  definition: "one run of the skyshard places by zone",
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
