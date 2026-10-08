import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionLevelPanelCard = {
  id: "01a06421-f74b-7f48-b945-356672f5001a",
  type: "page-type/module",
  slug: "companion-level-panel-card",
  definition: "each companion's level against the cap",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Its title is its completion category page's, and its row label a web phrase page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:50:28.000Z",
} as const satisfies Module
