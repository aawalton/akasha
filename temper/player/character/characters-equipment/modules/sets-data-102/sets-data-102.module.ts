import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData102 = {
  id: "01a061a3-9829-7fdb-a123-0a23f5013d14",
  type: "page-type/module",
  slug: "sets-data-102",
  definition: "part 102 of the gear set table, test-of-resolve through the-ice-furnace",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
