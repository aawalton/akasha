import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchQualityFilter = {
  id: "01a0613a-e0ab-7528-b275-c36c451d9da6",
  type: "page-type/module",
  slug: "search-quality-filter",
  definition: "the item quality, narrowed by a multiselect of the quality tiers",
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
      statement: "The options are every quality page, compiled in as the add-on compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An option's value is the quality's game number and its label the game's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item matches where its display quality is one of the picked qualities.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved single quality reads back as a set of that one quality.",
    },
  ],
  createdAt: "2026-09-02T08:27:23.691Z",
  updatedAt: "2026-11-01T21:28:40.921Z",
} as const satisfies Module
