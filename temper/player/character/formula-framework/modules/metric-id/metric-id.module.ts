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
  createdAt: "2026-09-02T04:46:21.410Z",
  updatedAt: "2026-09-26T18:26:30.000Z",
} as const satisfies Module
