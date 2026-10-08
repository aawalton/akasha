import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemSetsProgressPanelCard = {
  id: "01a06421-f74b-79e4-bc03-64247ee4002b",
  type: "page-type/module",
  slug: "item-sets-progress-panel-card",
  definition: "the item set pieces the account has collected, by category",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its title is read from the account item sets completion category page.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:34:26.000Z",
} as const satisfies Module
