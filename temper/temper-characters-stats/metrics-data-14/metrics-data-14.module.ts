import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData14 = {
  id: "01a06131-abb6-760b-9ff9-fca6d3e9125f",
  pageTypeSlug: "module",
  slug: "metrics-data-14",
  definition: "character stats stamina-dodge-cost through sturdy",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
