import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryFilterBar = {
  id: "01a0636c-5d9a-79fc-a37c-848e4d600014",
  type: "page-type/module",
  slug: "inventory-filter-bar",
  definition: "the bar narrowing which inventory items a reader sees",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Filter names, sort names and the search placeholder are web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.370Z",
  updatedAt: "2026-09-27T11:43:09.000Z",
} as const satisfies Module
