import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipesProgressPanelCard = {
  id: "01a06421-f74b-7fd7-9a00-13680c630033",
  type: "page-type/module",
  slug: "recipes-progress-panel-card",
  definition: "the crafting recipes each selected character knows",
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
