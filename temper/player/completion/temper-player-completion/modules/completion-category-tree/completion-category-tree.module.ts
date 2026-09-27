import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCategoryTree = {
  id: "01a06103-0617-766d-bdde-4267ab606f55",
  type: "page-type/module",
  slug: "completion-category-tree",
  definition: "every completion card, under the tab and the parent that has it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree's names, order and nesting are read from the completion category pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The card ids stay in code, because a checker answers to each by name.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Pages naming other cards under a tab than the code names are refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is held with the skill catalogue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card's cap, where the game has one, is read from its category page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card the completion window never shows hangs under the tasks tab.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "The achievement children are hung by `completion-category-tree-composed` rather than here.",
    },
  ],
} as const satisfies Module
