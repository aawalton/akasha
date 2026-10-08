import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterEntityPanelCard = {
  id: "01a0642c-5b89-7569-8055-280e439c99a1",
  type: "page-type/module",
  slug: "character-entity-panel-card",
  definition: "a panel card naming a character",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.753Z",
  updatedAt: "2026-09-27T11:41:38.000Z",
} as const satisfies Module
