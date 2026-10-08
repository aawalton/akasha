import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchTransmutedFilter = {
  id: "01a0613a-e0b1-73d3-90ad-04d99f112113",
  type: "page-type/module",
  slug: "search-transmuted-filter",
  definition: "whether an item trait was transmuted, narrowed by an include or exclude toggle",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The transmuted filter reads the transmuted flag through the rule-editor flags checker.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
  createdAt: "2026-09-02T08:27:23.697Z",
  updatedAt: "2026-09-21T15:36:37.000Z",
} as const satisfies Module
