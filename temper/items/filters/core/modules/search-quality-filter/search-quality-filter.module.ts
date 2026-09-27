import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchQualityFilter = {
  id: "01a0613a-e0ab-7528-b275-c36c451d9da6",
  type: "page-type/module",
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
      decisionKind: "decision-kind/departure",
      statement: "The options are the available quality pages, compiled in as the add-on compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option's value is the quality's game number and its label the game's name.",
    },
  ],
} as const satisfies Module
