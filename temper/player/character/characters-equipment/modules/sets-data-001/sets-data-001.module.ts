import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData001 = {
  id: "01a0619d-2cab-7b93-87c5-42809f64fbbf",
  type: "page-type/module",
  slug: "sets-data-001",
  definition: "part 001 of the gear set table, aegis-of-galenwe through aetherial-ascension",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
