import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData111 = {
  id: "01a061a3-982c-7db9-9f95-3f611e443ee7",
  type: "page-type/module",
  slug: "sets-data-111",
  definition: "part 111 of the gear set table, undaunted-unweaver through unleashed-terror",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
