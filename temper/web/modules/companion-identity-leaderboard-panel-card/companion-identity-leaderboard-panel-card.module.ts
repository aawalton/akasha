import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionIdentityLeaderboardPanelCard = {
  id: "01a06421-2525-7a15-9328-ce677eec2a58",
  type: "page-type/module",
  slug: "companion-identity-leaderboard-panel-card",
  definition: "a panel card ranking companions by who they are",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:58:08.933Z",
  updatedAt: "2026-09-27T11:35:15.000Z",
} as const satisfies Module
