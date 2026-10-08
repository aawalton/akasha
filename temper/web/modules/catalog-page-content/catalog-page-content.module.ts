import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const catalogPageContent = {
  id: "01a06432-b190-782b-8618-ba15af2e1097",
  type: "page-type/module",
  slug: "catalog-page-content",
  definition: "the catalog page and its tabs",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T11:46:37.000Z",
} as const satisfies Module
