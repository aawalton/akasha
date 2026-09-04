import type { Module } from "@akasha/code-system/module"

export const mapPinsChronoglerTablet = {
  id: "01a06269-2aa6-7eea-8f15-d708ad431d24",
  pageTypeSlug: "module",
  slug: "map-pins-chronogler-tablet",
  definition: "the chronogler tablet places",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
