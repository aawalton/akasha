import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const questProgressPanelCard = {
  id: "01a06421-f74b-72c5-93d8-9217e0e80032",
  type: "page-type/module",
  slug: "quest-progress-panel-card",
  definition: "the quests each selected character has completed",
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
