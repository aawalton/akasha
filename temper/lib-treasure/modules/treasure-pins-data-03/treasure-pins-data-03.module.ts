import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treasurePinsData03 = {
  id: "01a061d5-d0bc-7fec-a1f4-90a1ae3ec44e",
  type: "page-type/module",
  slug: "treasure-pins-data-03",
  definition: "part 03 of the pins each map has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These rows are the rows upstream LibTreasure v24 states.",
    },
  ],
} as const satisfies Module
