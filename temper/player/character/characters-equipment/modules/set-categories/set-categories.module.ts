import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setCategories = {
  id: "01a0616f-8e15-7812-a6e6-cca332a9a6e5",
  type: "page-type/module",
  slug: "set-categories",
  definition: "where a gear set is found, and the sets sorted under each",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Set category names and order come from the pages held with the set catalogue.",
    },
  ],
  createdAt: "2026-09-02T09:24:55.957Z",
  updatedAt: "2026-09-27T04:51:46.000Z",
} as const satisfies Module
