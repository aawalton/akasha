import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionOverallLeaderboardPanelCard = {
  id: "01a0641f-8bee-72e7-a4fe-7fb4c37b2268",
  type: "page-type/module",
  slug: "companion-overall-leaderboard-panel-card",
  definition: "a panel card ranking companions over every metric",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No role combination it ranks over is named on the card.",
    },
  ],
} as const satisfies Module
