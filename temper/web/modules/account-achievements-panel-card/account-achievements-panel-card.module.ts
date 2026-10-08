import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountAchievementsPanelCard = {
  id: "01a06421-f74a-73fe-b4ba-382bef140001",
  type: "page-type/module",
  slug: "account-achievements-panel-card",
  definition: "the achievements any character on the account has earned, by category",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from its completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.730Z",
  updatedAt: "2026-09-27T11:31:19.000Z",
} as const satisfies Module
