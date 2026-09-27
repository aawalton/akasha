import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const affectedItemsTreeBuilder = {
  id: "01a06276-e3e7-7896-a7ba-97936d3ea281",
  type: "page-type/module",
  slug: "affected-items-tree-builder",
  definition: "the items a rule reaches, folded into a tree by type or by where they sit",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's worn items are kept apart from that character's backpack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A location type with one location is drawn without a level for the location.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A guild is drawn with its own level even where only one guild has items.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The worn and backpack levels are named by the bag pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type level is keyed by its tree slug and named by its tree page's title.",
    },
  ],
} as const satisfies Module
