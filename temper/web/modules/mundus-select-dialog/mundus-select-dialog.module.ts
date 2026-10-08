import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mundusSelectDialog = {
  id: "01a0642c-5b7e-73e5-82b3-b4a417f524d1",
  type: "page-type/module",
  slug: "mundus-select-dialog",
  definition: "the dialog selecting a mundus stone",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The stones offered are drawn again whenever the mundus stones are read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.742Z",
  updatedAt: "2026-09-27T11:30:47.000Z",
} as const satisfies Module
