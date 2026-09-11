import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const metricsData10 = {
  id: "01a06131-abb5-74cb-a910-f47e6f95261d",
  pageTypeSlug: "module",
  type: "module",
  slug: "metrics-data-10",
  definition: "character stats la-shock-staff through magicka-ability-cost",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
