import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemCategoryTreeGate = {
  id: "01a0e0db-a703-790c-b757-6b5db7ae0776",
  type: "page-type/module",
  slug: "item-category-tree-gate",
  definition: "what shows its content only once the item category tree is read",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the tree is read the screen shows what it is handed instead.",
    },
  ],
} as const satisfies Module
