import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTabPanels = {
  id: "01a06421-f74b-7bd9-bd47-bf63d6f70019",
  type: "page-type/module",
  slug: "characters-tab-panels",
  definition: "the panel cards the characters tab lays out, each handed what it draws",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:59:02.731Z",
  updatedAt: "2026-09-27T11:38:50.000Z",
} as const satisfies Module
