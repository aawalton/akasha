import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statExplanationDialog = {
  id: "01a0642c-5bbc-747d-b3cb-8b0bd17e3786",
  type: "page-type/module",
  slug: "stat-explanation-dialog",
  definition: "the dialog explaining a stat",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.804Z",
  updatedAt: "2026-09-27T11:45:20.000Z",
} as const satisfies Module
