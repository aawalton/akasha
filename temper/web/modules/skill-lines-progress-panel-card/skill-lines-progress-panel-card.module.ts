import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillLinesProgressPanelCard = {
  id: "01a06421-f74b-752f-a6b5-360b99270035",
  type: "page-type/module",
  slug: "skill-lines-progress-panel-card",
  definition: "the skill lines each selected character has ranked up",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages and the skill line category pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:54:36.000Z",
} as const satisfies Module
