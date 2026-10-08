import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersFilterTypes = {
  id: "01a0642c-5b92-7b84-b68b-7c30a2e454c0",
  type: "page-type/module",
  slug: "characters-filter-types",
  definition: "the types writing a characters filter",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A role no role page names is read as no role, and the list filters on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its tab and sort wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:10:23.762Z",
  updatedAt: "2026-09-27T11:34:37.000Z",
} as const satisfies Module
