import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesFilterItems = {
  id: "01a0636c-5d9b-73c6-bfb7-eb8dab480021",
  type: "page-type/module",
  slug: "inventory-rules-filter-items",
  definition: "the choices the rules filter bar offers",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Filter labels are web phrases and status labels rule card phrases, read as held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Goal choices are named by the held rule goal page titles.",
    },
  ],
} as const satisfies Module
