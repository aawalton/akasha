import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsLeaderboardTab = {
  id: "01a06421-2527-75e7-b164-c11779b96bfc",
  type: "page-type/module",
  slug: "companions-leaderboard-tab",
  definition: "the tab holding companion leaderboards",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:58:08.935Z",
  updatedAt: "2026-09-27T11:59:43.000Z",
} as const satisfies Module
