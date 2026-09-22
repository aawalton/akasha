import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsData3 = {
  id: "01a061a8-9c64-7084-a3ab-9f45e86c6e59",
  type: "page-type/module",
  slug: "skyshards-data-3",
  definition: "a set of the zones of the skyshard table, gathered from the sets holding its maps",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "These zones are one unbroken run of the whole table's order.",
    },
  ],
} as const satisfies Module
