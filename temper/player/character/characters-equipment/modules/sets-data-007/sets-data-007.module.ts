import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData007 = {
  id: "01a0619f-59e4-7446-aa7d-a88b18e74e8c",
  type: "page-type/module",
  slug: "sets-data-007",
  definition: "part 007 of the gear set table, ashen-grip through aurorans-thunder",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
