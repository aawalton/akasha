import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryTypeTreeBuilder = {
  id: "01a0626e-3e05-7472-a932-18d141f849b6",
  type: "page-type/module",
  slug: "inventory-type-tree-builder",
  definition: "a category's items folded into the tree a reader walks",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Slots of one name fold into one leaf only where they hold the same item link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folded leaf opens the tooltip of the item its slots hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Slots of one name holding different items are a branch of a leaf for each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is found in the tree by its slug.",
    },
  ],
} as const satisfies Module
