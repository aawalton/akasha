import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchCraftedFilter = {
  id: "01a0613a-e0a6-7788-9b2c-3aeaec9aea07",
  type: "page-type/module",
  slug: "search-crafted-filter",
  definition: "whether an item was crafted by a player, narrowed by an include or exclude toggle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The crafted filter reads the crafted flag through the rule-editor flags checker.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
  createdAt: "2026-09-02T08:27:23.686Z",
  updatedAt: "2026-09-21T15:36:37.000Z",
} as const satisfies Module
