import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAccountTraitUnion = {
  id: "01a06358-4f7c-76c9-ae33-27a581dd7401",
  type: "page-type/module",
  slug: "completion-account-trait-union",
  definition: "the item traits any character of an account has researched, counted by line",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait researched by one character counts as researched for the account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The craft type catalog and the research line catalog arrive as arguments.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait is matched across characters by the craft and the line and the number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft type is ordered by the game number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A research line is ordered by the display order.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An empty list of character progress answers an empty progress.",
    },
  ],
} as const satisfies Module
