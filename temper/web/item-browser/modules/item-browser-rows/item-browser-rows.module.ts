import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemBrowserRows = {
  id: "01a0ddf7-6eb6-7352-8d1c-4678bd60e564",
  type: "page-type/module",
  slug: "item-browser-rows",
  definition: "the item browser's row for each set",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each row is worked out from its set's page, which the compiler writes in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set has a row only where its page names the row's item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set whose sources cannot be read as places has no row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crafted row's extra number is the traits its set needs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows are in the order of their sets' ids.",
    },
  ],
} as const satisfies Module
