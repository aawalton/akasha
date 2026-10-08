import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const accountQuestsPanelCard = {
  id: "01a06421-f74b-7ec3-8872-aa39e4d60007",
  type: "page-type/module",
  slug: "account-quests-panel-card",
  definition: "the quests any character on the account has completed",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from its completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:31:19.000Z",
} as const satisfies Module
