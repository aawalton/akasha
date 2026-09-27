import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemCategoryTree = {
  id: "01a0e0da-65bc-7c91-9d83-4b317f58d18b",
  type: "page-type/module",
  slug: "item-category-tree",
  definition: "the item category tree as last read from its branch pages",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking for the tree before it is read is refused rather than answered empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One tree is held at a time, and a new reading replaces it whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tree is answered both as its roots in priority order and keyed by each root's id.",
    },
  ],
} as const satisfies Module
