import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData006 = {
  id: "01a0619f-59e3-7312-9043-152fb7857819",
  type: "page-type/module",
  slug: "sets-data-006",
  definition: "part 006 of the gear set table, armor-of-the-trainee through arms-of-the-ancestors",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
