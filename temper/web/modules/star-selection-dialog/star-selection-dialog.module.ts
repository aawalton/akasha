import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const starSelectionDialog = {
  id: "01a06432-b190-70ca-8fae-defba6b87018",
  type: "page-type/module",
  slug: "star-selection-dialog",
  definition: "the dialog for choosing a champion point star",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The stars offered are drawn again whenever the champion stars are read again.",
    },
  ],
} as const satisfies Module
