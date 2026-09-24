import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData010 = {
  id: "01a0619f-59e6-7e98-8091-1da5b237100f",
  type: "page-type/module",
  slug: "sets-data-010",
  definition: "part 010 of the gear set table, baron-thirsk through bastion-of-the-heartland",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
