import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesTab = {
  id: "01a0636c-5d9b-769d-a667-dbb5d8d60026",
  type: "page-type/module",
  slug: "inventory-rules-tab",
  definition: "the tab where a reader keeps every inventory rule",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The no-inventory alert is its own module, worded by web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:36:47.000Z",
} as const satisfies Module
