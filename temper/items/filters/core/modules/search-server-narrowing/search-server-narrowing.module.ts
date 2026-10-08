import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const searchServerNarrowing = {
  id: "01a0613a-e0ae-75b0-9cbe-58f1edfb2323",
  type: "page-type/module",
  slug: "search-server-narrowing",
  definition:
    "the conversion of filter-bar selections into the exact terms and bands a trader search takes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A selection that is not an integer string is dropped from the server terms.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A threshold with the != operator yields no server band.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The open end of a server band is the sentinel 999999.",
    },
  ],
  createdAt: "2026-09-02T08:27:23.694Z",
  updatedAt: "2026-09-21T15:36:37.000Z",
} as const satisfies Module
