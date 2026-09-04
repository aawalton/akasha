import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionAchievementIds = {
  id: "01a060f9-babd-7a01-b363-d7e4b686ba3b",
  pageTypeSlug: "module",
  slug: "dungeon-champion-achievement-ids",
  definition: "every achievement id a dungeon champion kill counts toward",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A pin refreshes only for an achievement id named here.",
    },
  ],
} as const satisfies Module
