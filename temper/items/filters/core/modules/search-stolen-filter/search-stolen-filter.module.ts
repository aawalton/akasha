import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchStolenFilter = {
  id: "01a0613a-e0af-7ce5-8230-7715b4ff868d",
  type: "page-type/module",
  slug: "search-stolen-filter",
  definition: "whether an item is stolen, narrowed by an include or exclude toggle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The stolen filter reads the stolen flag through the rule-editor flags checker.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
  createdAt: "2026-09-02T08:27:23.695Z",
  updatedAt: "2026-09-21T15:36:37.000Z",
} as const satisfies Module
