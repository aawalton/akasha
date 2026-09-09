import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData15 = {
  id: "01a06131-abb7-7d2a-add2-d2b2070af2f2",
  pageTypeSlug: "module",
  slug: "metrics-data-15",
  definition: "character stats sundered-damage through training",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
