import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBuyRulesPanel = {
  id: "01a0636c-5d97-7495-be04-eff90cab000e",
  type: "page-type/module",
  slug: "inventory-buy-rules-panel",
  definition: "the panel holding the buy rules",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel's title, empty state and add button are worded by web phrase pages.",
    },
  ],
} as const satisfies Module
