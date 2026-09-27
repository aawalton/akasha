import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemCategoryTreeLoading = {
  id: "01a0e0da-fccf-71f1-9a8a-9f3c03f4bc9b",
  type: "page-type/module",
  slug: "item-category-tree-loading",
  definition: "the read that fills the held item category tree from its pages on a server",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree already held is answered rather than read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a branch page reads the tree again.",
    },
  ],
} as const satisfies Module
