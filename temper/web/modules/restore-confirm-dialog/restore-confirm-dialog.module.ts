import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const restoreConfirmDialog = {
  id: "01a0641f-8bf0-7201-9eb5-41690b29ef6c",
  type: "page-type/module",
  slug: "restore-confirm-dialog",
  definition: "the dialog where a companion restore is confirmed",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T21:56:24.176Z",
  updatedAt: "2026-09-27T11:35:48.000Z",
} as const satisfies Module
