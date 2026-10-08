import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryItemRulesPanel = {
  id: "01a0636c-5d9b-7967-9dae-4d19bdf90017",
  type: "page-type/module",
  slug: "inventory-item-rules-panel",
  definition: "the panel where a reader keeps the item rules",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The panel's wording is web phrase pages, and its rule status labels are rule card phrases.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.371Z",
  updatedAt: "2026-09-27T11:36:34.000Z",
} as const satisfies Module
