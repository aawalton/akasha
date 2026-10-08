import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterListPanelCard = {
  id: "01a0642c-5b8b-7971-a7c4-bf6ce0ed0da9",
  type: "page-type/module",
  slug: "character-list-panel-card",
  definition: "a panel card listing characters",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.755Z",
  updatedAt: "2026-09-27T11:42:09.000Z",
} as const satisfies Module
