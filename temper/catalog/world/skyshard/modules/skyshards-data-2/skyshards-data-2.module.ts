import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsData2 = {
  id: "01a061a8-9c64-7729-aae4-bba854813fa0",
  type: "page-type/module",
  slug: "skyshards-data-2",
  definition: "a set of the zones of the skyshard table, gathered from the sets its maps sit in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These zones are one unbroken run of the whole table's order.",
    },
  ],
} as const satisfies Module
