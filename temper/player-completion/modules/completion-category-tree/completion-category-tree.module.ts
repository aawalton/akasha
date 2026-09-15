import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCategoryTree = {
  id: "01a06103-0617-766d-bdde-4267ab606f55",
  type: "module",
  slug: "completion-category-tree",
  definition: "every card the completion window shows, under the tab and the parent that has it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This code is written out from the completion-category pages rather than by hand.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "The achievement children are hung by `completion-category-tree-composed` rather than here.",
    },
  ],
} as const satisfies Module
