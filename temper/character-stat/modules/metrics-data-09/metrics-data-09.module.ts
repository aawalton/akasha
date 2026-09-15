import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const metricsData09 = {
  id: "01a06131-abb4-7f53-a545-eaf53fac53c5",
  type: "page-type/module",
  slug: "metrics-data-09",
  definition: "character stats la-flame-staff through la-shock-spell-damage",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The stats are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
