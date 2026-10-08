import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statsToolbar = {
  id: "01a0642c-5bb9-7cc8-9782-2ee1c065d7b4",
  type: "page-type/module",
  slug: "stats-toolbar",
  definition: "the toolbar a character's stats carry",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.801Z",
  updatedAt: "2026-09-27T11:45:20.000Z",
} as const satisfies Module
