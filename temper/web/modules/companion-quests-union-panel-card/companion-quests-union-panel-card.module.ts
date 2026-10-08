import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQuestsUnionPanelCard = {
  id: "01a06421-f74b-7675-b6fd-69c40e07001d",
  type: "page-type/module",
  slug: "companion-quests-union-panel-card",
  definition: "the companion quests any character on the account has finished",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is its completion category page's.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:50:28.000Z",
} as const satisfies Module
