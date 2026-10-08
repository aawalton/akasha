import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCompanionRapportPanelCard = {
  id: "01a06421-f74b-7b1b-9302-c4893adf0014",
  type: "page-type/module",
  slug: "character-companion-rapport-panel-card",
  definition: "each selected character's rapport with every companion",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from the companion rapport completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:35:06.000Z",
} as const satisfies Module
