import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemCategoryTreeReading = {
  id: "01a0e0da-65bb-74c7-9f9e-05cb3d50596c",
  type: "page-type/module",
  slug: "item-category-tree-reading",
  definition: "the item category tree built from its branch pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A branch's id is its slug and its name is its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A branch's children are the branches naming it as parent, in display order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The roots are the branches naming no parent, in priority order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A root stating no test and holding no child takes every item, so the tree leaves it out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The addon compiles this module, so it reads a list of rows rather than asking for pages.",
    },
  ],
} as const satisfies Module
