import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const effectsPanelCard = {
  id: "01a0642c-5bb3-7bdb-83ac-f01c253585a7",
  type: "page-type/module",
  slug: "effects-panel-card",
  definition: "a panel card listing the effects on a character",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.795Z",
  updatedAt: "2026-09-27T11:30:37.000Z",
} as const satisfies Module
