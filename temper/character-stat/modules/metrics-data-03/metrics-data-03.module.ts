import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricsData03 = {
  id: "01a06131-abb0-7811-9515-8fb8732c9d8b",
  type: "page-type/module",
  slug: "metrics-data-03",
  definition: "character stats damage-done-dot through defense-physical-aoe-mitigation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
