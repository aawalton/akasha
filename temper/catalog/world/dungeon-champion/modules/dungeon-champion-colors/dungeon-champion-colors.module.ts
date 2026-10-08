import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dungeonChampionColors = {
  id: "01a060f9-babe-7d15-8b17-8c3ff34e4b9a",
  type: "page-type/module",
  slug: "dungeon-champion-colors",
  definition:
    "a four-number color turned into the shapes the game's color picker and textures take",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A color with no fourth number is fully opaque.",
    },
  ],
  createdAt: "2026-09-02T07:16:14.142Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies Module
