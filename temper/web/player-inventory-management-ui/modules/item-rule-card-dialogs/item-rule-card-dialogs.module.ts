import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemRuleCardDialogs = {
  id: "01a0636c-5d9b-7338-8553-c55a9e9f0032",
  type: "page-type/module",
  slug: "item-rule-card-dialogs",
  definition: "the dialogs an item rule card opens",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The delete dialog's title, warning, summary and buttons are rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:44:30.000Z",
} as const satisfies Module
