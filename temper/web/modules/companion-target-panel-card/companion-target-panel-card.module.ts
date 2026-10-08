import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionTargetPanelCard = {
  id: "01a06421-2528-75a3-8d13-1cd777feca6f",
  type: "page-type/module",
  slug: "companion-target-panel-card",
  definition: "a panel card stating a companion's target",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:58:08.936Z",
  updatedAt: "2026-09-27T11:51:50.000Z",
} as const satisfies Module
