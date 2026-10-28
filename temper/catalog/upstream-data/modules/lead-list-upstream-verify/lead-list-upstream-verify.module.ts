import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadListUpstreamVerify = {
  id: "01a1836b-0298-7abf-aa6f-afe2d8e1b0de",
  type: "page-type/module",
  slug: "lead-list-upstream-verify",
  definition: "the ruling on whether the antiquity lead table still matches upstream Lead List",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The lead table is ruled on leaf for leaf against the rows Lead List carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every antiquity the game's antiquity capture names is owed a row in the lead table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An antiquity the lead table has no row for parts the table from upstream.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No antiquity capture to read parts the table rather than passing it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the lead table.",
    },
  ],
  createdAt: "2026-10-28T16:49:50.742Z",
  updatedAt: "2026-10-28T16:49:50.742Z",
} as const satisfies Module
