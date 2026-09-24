import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData009 = {
  id: "01a0619f-59e6-7f83-8977-e17ef5e528d2",
  type: "page-type/module",
  slug: "sets-data-009",
  definition: "part 009 of the gear set table, bahrahas-curse through barkskin",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
