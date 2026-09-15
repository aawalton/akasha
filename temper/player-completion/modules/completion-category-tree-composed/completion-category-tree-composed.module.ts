import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCategoryTreeComposed = {
  id: "01a06408-dd2e-7659-95d6-455a9c29e7ff",
  type: "module",
  slug: "completion-category-tree-composed",
  definition: "the completion card tree with each achievement card's headings hung beneath it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The achievement headings arrive as an argument rather than as an imported table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An achievement heading and its subheading are each named by their own title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A card that is no achievement card crosses over unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The companions tab has no achievement card.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The companions tab is carried across whole.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Composing over the static tree leaves the static tree unchanged.",
    },
  ],
} as const satisfies Module
