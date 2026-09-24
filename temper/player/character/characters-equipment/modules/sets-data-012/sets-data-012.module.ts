import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData012 = {
  id: "01a0619f-59e8-7142-ba08-72302a34dffc",
  type: "page-type/module",
  slug: "sets-data-012",
  definition: "part 012 of the gear set table, berserking-warrior through black-rose",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
