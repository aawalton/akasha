import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryCurrencyPanelCard = {
  id: "01a0636c-5d9a-7c12-8136-543b0fa20013",
  type: "page-type/module",
  slug: "inventory-currency-panel-card",
  definition: "the card drawing what currency a player has",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bank row is named by the bank venue page; other words are web phrase pages.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.370Z",
  updatedAt: "2026-09-27T11:37:52.000Z",
} as const satisfies Module
