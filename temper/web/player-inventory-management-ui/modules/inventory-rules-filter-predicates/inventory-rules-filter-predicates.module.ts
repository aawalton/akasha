import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesFilterPredicates = {
  id: "01a0636c-5d9b-7c1d-a603-5cb03c7d0022",
  type: "page-type/module",
  slug: "inventory-rules-filter-predicates",
  definition: "what decides whether a rule matches a reader's filter",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule over every category is searched by the item category tree's all page title.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:56:54.000Z",
} as const satisfies Module
