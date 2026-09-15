import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricsData01 = {
  id: "01a06131-abae-79ee-aef9-9dc78243fd8c",
  type: "page-type/module",
  slug: "metrics-data-01",
  definition: "character stats alliance-points-gain through bloodthirsty-weapon-damage",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
