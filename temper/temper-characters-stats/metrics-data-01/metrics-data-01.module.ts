import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const metricsData01 = {
  id: "01a06131-abae-79ee-aef9-9dc78243fd8c",
  pageTypeSlug: "module",
  slug: "metrics-data-01",
  definition: "character stats alliance-points-gain through bloodthirsty-weapon-damage",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
