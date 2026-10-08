import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCategoryRulesPanel = {
  id: "01a0636c-5d9a-7de9-b294-e95e566d0010",
  type: "page-type/module",
  slug: "inventory-category-rules-panel",
  definition: "the panel holding the category rules",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panel's wording is web phrase pages, and its rule status labels are rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.370Z",
  updatedAt: "2026-09-27T11:32:34.000Z",
} as const satisfies Module
