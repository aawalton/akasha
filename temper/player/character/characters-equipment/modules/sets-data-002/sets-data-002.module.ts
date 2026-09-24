import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData002 = {
  id: "01a0619f-59e0-7956-a49c-6d7ee46f218a",
  type: "page-type/module",
  slug: "sets-data-002",
  definition: "part 002 of the gear set table, aetheric-lancer through alessian-order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
