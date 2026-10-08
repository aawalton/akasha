import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointsProgressPanelCard = {
  id: "01a06421-f74b-78a8-b600-7f8587eb0036",
  type: "page-type/module",
  slug: "skill-points-progress-panel-card",
  definition: "the skill points each selected character has earned, by source",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:33:40.000Z",
} as const satisfies Module
