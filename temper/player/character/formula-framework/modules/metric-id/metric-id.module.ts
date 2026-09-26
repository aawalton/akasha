import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricId = {
  id: "01a06070-82e2-7238-b411-953800ec8442",
  type: "page-type/module",
  slug: "metric-id",
  definition: "the name of every number measuring a character build",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The names are the slugs of the stat pages, as the metric-ids table holds them.",
    },
  ],
} as const satisfies Module
