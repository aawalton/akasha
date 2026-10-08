import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const unmappedItemsPanelCard = {
  id: "01a0636c-5da1-74af-90af-38a6f6d60061",
  type: "page-type/module",
  slug: "unmapped-items-panel-card",
  definition: "the card naming the items no rule reaches",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The card's title, total label and empty hints are read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gold amounts are worded by the gold amount module.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:58:24.000Z",
} as const satisfies Module
