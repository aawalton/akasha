import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData11 = {
  id: "01a06131-abb5-7ab1-ae64-ff8dbbc7b0f3",
  pageTypeSlug: "module",
  slug: "metrics-data-11",
  definition: "character stats magicka-maximum through movement-walk-speed",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
