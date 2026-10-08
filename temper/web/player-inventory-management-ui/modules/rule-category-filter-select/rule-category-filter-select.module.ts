import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCategoryFilterSelect = {
  id: "01a0636c-5da1-7e06-bb03-84a15644005c",
  type: "page-type/module",
  slug: "rule-category-filter-select",
  definition: "the select narrowing rules by the category they cover",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The choice of a whole category is worded by a web phrase page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The every-category choice is named by the item category tree's all page.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:56:54.000Z",
} as const satisfies Module
