import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const underConstructionDialog = {
  id: "01a06432-b190-752f-9687-9eb4441d0c29",
  type: "page-type/module",
  slug: "under-construction-dialog",
  definition: "the notice shown where a feature is not built yet",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T11:47:37.000Z",
} as const satisfies Module
