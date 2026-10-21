import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readingLinePicking = {
  id: "01a15c22-e9f4-7536-8094-62240bbf9b61",
  type: "page-type/module",
  slug: "reading-line-picking",
  definition: "the one line of a character's readings a case is pinned from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line that does not read as a reading line is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is picked by the second it was captured or by the start of its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Of the lines left, the one captured last is taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is stamped with the day, hour and minute its line was captured, in UTC.",
    },
  ],
  createdAt: "2026-10-21T01:45:54.419Z",
  updatedAt: "2026-10-21T01:45:54.419Z",
} as const satisfies Module
