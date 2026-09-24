import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData090 = {
  id: "01a061a3-6219-7366-a208-39f360a55cc4",
  type: "page-type/module",
  slug: "sets-data-090",
  definition: "part 090 of the gear set table, sheer-venom through shroud-of-the-lich",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
