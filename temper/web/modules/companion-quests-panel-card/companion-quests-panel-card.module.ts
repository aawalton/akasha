import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQuestsPanelCard = {
  id: "01a06421-f74b-7597-8fcf-caafacef001c",
  type: "page-type/module",
  slug: "companion-quests-panel-card",
  definition: "the companion quests each selected character has finished",
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
