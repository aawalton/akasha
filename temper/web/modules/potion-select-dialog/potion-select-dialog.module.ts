import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const potionSelectDialog = {
  id: "01a0642c-5b80-79bd-844f-1e5f34463bdf",
  type: "page-type/module",
  slug: "potion-select-dialog",
  definition: "the dialog selecting a potion",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.744Z",
  updatedAt: "2026-09-27T11:32:26.000Z",
} as const satisfies Module
