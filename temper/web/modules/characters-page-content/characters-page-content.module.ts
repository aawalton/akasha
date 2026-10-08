import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersPageContent = {
  id: "01a0642c-5b93-7865-a089-1fc284f52edb",
  type: "page-type/module",
  slug: "characters-page-content",
  definition: "what the characters page has",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content that fails to load is worded by the Temper query error boundary.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.763Z",
  updatedAt: "2026-09-27T12:55:59.000Z",
} as const satisfies Module
