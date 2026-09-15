import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingTabs = {
  id: "01a06128-d5d4-7fed-876f-4cd076587467",
  type: "page-type/module",
  slug: "housing-tabs",
  definition: "the four tabs across the top of the housing window",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Which tab opens first is a player setting.",
    },
  ],
} as const satisfies Module
