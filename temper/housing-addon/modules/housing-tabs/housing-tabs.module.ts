import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const housingTabs = {
  id: "01a06128-d5d4-7fed-876f-4cd076587467",
  type: "module",
  slug: "housing-tabs",
  definition: "the four tabs across the top of the housing window",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which tab opens first is a player setting.",
    },
  ],
} as const satisfies Module
