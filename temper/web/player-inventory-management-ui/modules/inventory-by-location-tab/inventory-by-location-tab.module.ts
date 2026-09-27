import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryByLocationTab = {
  id: "01a0636c-5d9a-7374-a500-82c80d66000f",
  type: "page-type/module",
  slug: "inventory-by-location-tab",
  definition: "the tab breaking an inventory down by where its items sit",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait filter is applied again whenever the traits are read again.",
    },
  ],
} as const satisfies Module
