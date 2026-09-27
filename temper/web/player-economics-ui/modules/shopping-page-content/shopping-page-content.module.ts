import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const shoppingPageContent = {
  id: "01a063a1-8cc1-700a-9a97-4a1b66cd2d05",
  type: "page-type/module",
  slug: "shopping-page-content",
  definition: "the shopping page a player opens",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page's title and tab names are read from phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Content that fails to load is worded by the Temper query error boundary.",
    },
  ],
} as const satisfies Module
