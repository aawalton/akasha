import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buffOrDebuffExplanationDialog = {
  id: "01a0642c-5bb2-7415-9c78-954cf3005cf5",
  type: "page-type/module",
  slug: "buff-or-debuff-explanation-dialog",
  definition: "the dialog explaining a buff or a debuff",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.794Z",
  updatedAt: "2026-09-27T11:44:35.000Z",
} as const satisfies Module
