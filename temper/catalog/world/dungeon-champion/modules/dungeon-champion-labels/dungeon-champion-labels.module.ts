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
  createdAt: "2026-09-02T07:16:14.147Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies Module
