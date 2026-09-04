import type { Module } from "@akasha/code-system/module"

export const mapPinsSkyShards = {
  id: "01a06269-2af9-7142-81f1-8d855a272c28",
  pageTypeSlug: "module",
  slug: "map-pins-sky-shards",
  definition: "the skyshard places by zone, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
