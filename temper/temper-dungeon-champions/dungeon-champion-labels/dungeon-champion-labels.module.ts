import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionLabels = {
  id: "01a060f9-bac3-7d62-84b5-57fdb312f3dc",
  pageTypeSlug: "module",
  slug: "dungeon-champion-labels",
  definition: "every label this addon shows a player, reached by key",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The labels here are English alone.",
    },
    {
      invariantKind: "departure",
      statement: "A key no label answers to reads back as the empty string.",
    },
  ],
} as const satisfies Module
