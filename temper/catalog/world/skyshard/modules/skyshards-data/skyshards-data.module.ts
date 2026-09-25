import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skyshardsData = {
  id: "01a061a8-9c65-7706-be69-f1c06fb7d9c0",
  type: "page-type/module",
  slug: "skyshards-data",
  definition: "every map the add-on shows a skyshard on, gathered from the skyshard pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The runs of skyshard pages are read in their own order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A map lists its skyshards in the order of their achievement and then their number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The maps are gathered once, as the add-on loads.",
    },
  ],
} as const satisfies Module
