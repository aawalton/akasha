import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsChronoglerTablet = {
  id: "01a06269-2aa6-7eea-8f15-d708ad431d24",
  type: "page-type/module",
  slug: "map-pins-chronogler-tablet",
  definition: "the chronogler tablet places",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
