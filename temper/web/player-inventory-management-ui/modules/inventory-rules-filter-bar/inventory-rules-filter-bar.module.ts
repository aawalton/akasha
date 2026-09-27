import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesFilterBar = {
  id: "01a0636c-5d9b-787b-969d-ef633ca20020",
  type: "page-type/module",
  slug: "inventory-rules-filter-bar",
  definition: "the bar narrowing which rules a reader sees",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar's title and search placeholder are read from web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sort names are web phrase pages the filter types read.",
    },
  ],
} as const satisfies Module
