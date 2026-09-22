import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsData1 = {
  id: "01a061a8-9c64-77cf-97d8-cfdbc73036ab",
  type: "page-type/module",
  slug: "skyshards-data-1",
  definition: "a set of the zones of the skyshard table, gathered from its maps' sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These zones are one unbroken run of the whole table's order.",
    },
  ],
} as const satisfies Module
