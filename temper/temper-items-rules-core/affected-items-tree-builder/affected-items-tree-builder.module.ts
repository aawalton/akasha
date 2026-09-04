import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const affectedItemsTreeBuilder = {
  id: "01a06276-e3e7-7896-a7ba-97936d3ea281",
  pageTypeSlug: "module",
  slug: "affected-items-tree-builder",
  definition: "the items a rule reaches, folded into a tree by type or by where they sit",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character's worn items are kept apart from that character's backpack.",
    },
    {
      invariantKind: "departure",
      statement: "A location type holding one location is drawn without a level for the location.",
    },
    {
      invariantKind: "departure",
      statement: "A guild is drawn with its own level even where only one guild holds items.",
    },
  ],
} as const satisfies Module
