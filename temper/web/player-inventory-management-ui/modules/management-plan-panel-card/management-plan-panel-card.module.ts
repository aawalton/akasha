import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const managementPlanPanelCard = {
  id: "01a0636c-5d9b-7742-93e7-32210df60036",
  type: "page-type/module",
  slug: "management-plan-panel-card",
  definition: "the card drawing what the rules would do to a player's items",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The card's title, counts, total label and empty hints are web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gold amounts are worded by the gold amount module.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:58:24.000Z",
} as const satisfies Module
