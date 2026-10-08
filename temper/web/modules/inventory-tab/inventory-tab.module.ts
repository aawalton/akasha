import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTab = {
  id: "01a06432-b190-70c4-8e3b-869ad26735ea",
  type: "page-type/module",
  slug: "inventory-tab",
  definition: "the inventory tab of settings, where logging and safety are set",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T22:17:18.992Z",
  updatedAt: "2026-09-27T11:35:19.000Z",
} as const satisfies Module
