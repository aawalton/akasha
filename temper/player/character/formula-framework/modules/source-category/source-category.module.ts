import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sourceCategory = {
  id: "01a06070-82e4-7b83-980a-be8cb831e18a",
  type: "page-type/module",
  slug: "source-category",
  definition: "the kinds of thing behind a character's numbers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The categories are read from the source category pages, in their display order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Asking for the categories before anything has held them is refused.",
    },
  ],
} as const satisfies Module
