import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useItemCategoryTree = {
  id: "01a0e0db-a703-7a94-a155-73ba17689053",
  type: "page-type/module",
  slug: "use-item-category-tree",
  definition: "the item category tree a screen reads from its branch pages",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A screen reads the branch pages only where it shows something the tree decides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A branch page changing while a screen is open reaches it with no refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that fails is thrown to the screen rather than shown as an empty tree.",
    },
  ],
} as const satisfies Module
