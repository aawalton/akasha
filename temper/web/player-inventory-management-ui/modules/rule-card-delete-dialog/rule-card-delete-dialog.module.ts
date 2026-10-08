import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardDeleteDialog = {
  id: "01a0636c-5d9b-78ef-b4d7-86e55d060044",
  type: "page-type/module",
  slug: "rule-card-delete-dialog",
  definition: "the dialog asking whether a rule goes",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The dialog's title, warning, summary and buttons are rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:43:15.000Z",
} as const satisfies Module
