import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchLockedFilter = {
  id: "01a0613a-e0aa-7943-ae0c-5c2ed6437954",
  type: "page-type/module",
  slug: "search-locked-filter",
  definition:
    "whether an item is locked against sale or destruction, narrowed by an include or exclude toggle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The locked filter reads the locked flag through the rule-editor flags checker.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
  createdAt: "2026-09-02T08:27:23.690Z",
  updatedAt: "2026-09-21T15:36:37.000Z",
} as const satisfies Module
