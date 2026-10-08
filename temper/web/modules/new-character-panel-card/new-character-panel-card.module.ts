import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const newCharacterPanelCard = {
  id: "01a0642c-5b9d-7261-813d-d7feb2384a8a",
  type: "page-type/module",
  slug: "new-character-panel-card",
  definition: "a panel card making a new character",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.773Z",
  updatedAt: "2026-09-27T11:30:47.000Z",
} as const satisfies Module
