import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dungeonChampionLabels = {
  id: "01a060f9-bac3-7d62-84b5-57fdb312f3dc",
  type: "page-type/module",
  slug: "dungeon-champion-labels",
  definition: "every label this addon shows a player, reached by key",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key no label answers to reads back as the empty string.",
    },
  ],
} as const satisfies Module
