import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData123 = {
  id: "01a061a4-18b0-7f37-89cc-e3646ca45a3c",
  type: "page-type/module",
  slug: "sets-data-123",
  definition: "part 123 of the gear set table, zens-redress through zoal-the-ever-wakeful",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
