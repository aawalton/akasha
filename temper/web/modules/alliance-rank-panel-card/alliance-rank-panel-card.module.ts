import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const allianceRankPanelCard = {
  id: "01a06421-f74b-7225-aa23-74e9044c000e",
  type: "page-type/module",
  slug: "alliance-rank-panel-card",
  definition: "each selected character's alliance rank against the highest there is",
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
