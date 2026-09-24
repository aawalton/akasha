import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData110 = {
  id: "01a061a3-982c-7bc1-a0a2-72f7d6c01168",
  type: "page-type/module",
  slug: "sets-data-110",
  definition: "part 110 of the gear set table, umbral-edge through undaunted-infiltrator",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
