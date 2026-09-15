import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchQualityFilter = {
  id: "01a0613a-e0ab-7528-b275-c36c451d9da6",
  type: "module",
  slug: "search-quality-filter",
  definition: "the item quality, narrowed by a multiselect of the six quality tiers",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The quality filter also adds the selected quality numbers to the server request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty selection matches every item.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The option values are the client quality numbers 0 through 5.",
    },
  ],
} as const satisfies Module
