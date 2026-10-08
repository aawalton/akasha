import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dungeonChampionSlash = {
  id: "01a060f9-badb-75b9-a0c4-24413a5ab8d1",
  type: "page-type/module",
  slug: "dungeon-champion-slash",
  definition: "two slash commands that print where the player is on the open map",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A position prints as hundredths of a percent.",
    },
  ],
  createdAt: "2026-09-02T07:16:14.171Z",
  updatedAt: "2026-09-21T15:28:00.000Z",
} as const satisfies Module
