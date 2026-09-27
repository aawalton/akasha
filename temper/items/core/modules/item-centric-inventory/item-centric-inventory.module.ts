import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemCentricInventory = {
  id: "01a060d9-498d-7a88-8425-e671811fadae",
  type: "page-type/module",
  slug: "item-centric-inventory",
  definition: "every place an item is held, filed under the item",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item's places are ordered by kind in the order the caller hands in.",
    },
  ],
} as const satisfies Module
