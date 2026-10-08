import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionInfoPanelCard = {
  id: "01a06421-251d-7c67-a950-17b3265fa30f",
  type: "page-type/module",
  slug: "companion-info-panel-card",
  definition: "a panel card stating who a companion is",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:58:08.925Z",
  updatedAt: "2026-09-27T11:36:01.000Z",
} as const satisfies Module
