import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const poiProgressPanelCard = {
  id: "01a06421-f74b-7495-9d7c-97bbda0a0031",
  type: "page-type/module",
  slug: "poi-progress-panel-card",
  definition: "the points of interest each selected character has discovered, by zone",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:30:53.000Z",
} as const satisfies Module
