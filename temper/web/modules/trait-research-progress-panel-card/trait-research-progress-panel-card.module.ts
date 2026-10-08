import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const traitResearchProgressPanelCard = {
  id: "01a06421-f74b-7a5d-8386-b8848da70038",
  type: "page-type/module",
  slug: "trait-research-progress-panel-card",
  definition: "the crafting traits each selected character has researched",
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
