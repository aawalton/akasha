import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterLevelPanelCard = {
  id: "01a06421-f74b-7fa3-954a-6f7d00050015",
  type: "page-type/module",
  slug: "character-level-panel-card",
  definition: "each selected character's level against the cap",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Its title is its completion category page's, and its row label a web phrase page's.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:35:06.000Z",
} as const satisfies Module
