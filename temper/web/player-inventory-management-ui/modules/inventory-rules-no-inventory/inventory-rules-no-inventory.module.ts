import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesNoInventory = {
  id: "01a0e2a7-26a7-7a91-bd5f-a1a1812030cb",
  type: "page-type/module",
  slug: "inventory-rules-no-inventory",
  definition: "the alert shown on the rules tab when no inventory has arrived",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The alert's title, explanation and sync link are read from web phrase pages.",
    },
  ],
} as const satisfies Module
