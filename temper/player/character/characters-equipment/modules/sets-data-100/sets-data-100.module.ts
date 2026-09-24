import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsData100 = {
  id: "01a061a3-9828-7640-998d-bf625eaac138",
  type: "page-type/module",
  slug: "sets-data-100",
  definition: "part 100 of the gear set table, syrabanes-grip through talfygs-treachery",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The sets are named here in the order the gathered table answers its ids in.",
    },
  ],
} as const satisfies Module
