import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleNotesDialog = {
  id: "01a0636c-5da1-74a8-917d-0d9daa47005e",
  type: "page-type/module",
  slug: "rule-notes-dialog",
  definition: "the dialog where a reader keeps notes on a rule",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The dialog's title and placeholder are read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:35:05.000Z",
} as const satisfies Module
