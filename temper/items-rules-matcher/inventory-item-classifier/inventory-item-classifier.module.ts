import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const inventoryItemClassifier = {
  id: "01a06151-370b-7703-ac80-b90c8331ef9a",
  type: "module",
  slug: "inventory-item-classifier",
  definition: "which category tree nodes one captured item falls under, and where the item lies",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item falls under every node the item's own type and traits reach.",
    },
  ],
} as const satisfies Module
