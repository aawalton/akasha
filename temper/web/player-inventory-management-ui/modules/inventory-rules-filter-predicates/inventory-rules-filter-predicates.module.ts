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
} as const satisfies Module
