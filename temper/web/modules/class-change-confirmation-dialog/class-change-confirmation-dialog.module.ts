import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const classChangeConfirmationDialog = {
  id: "01a0642c-5b79-7cc5-bfab-9daf17c01a1d",
  type: "page-type/module",
  slug: "class-change-confirmation-dialog",
  definition: "the dialog confirming a class change",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.737Z",
  updatedAt: "2026-09-27T11:40:02.000Z",
} as const satisfies Module
