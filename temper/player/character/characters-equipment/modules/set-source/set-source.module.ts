import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setSource = {
  id: "01a061a4-18b1-7a6e-bc9b-94150a72e67b",
  type: "page-type/module",
  slug: "set-source",
  definition:
    "one effect source per gear set and piece count, scaled by the quality of the pieces worn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A source has the bonuses whose piece count the worn count reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What each worn piece's quality counts for is read from its quality page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pieces' average is read down to the set bonus step pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus line scaled below legendary drops its fraction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An average under every step is read down to the best quality among the pieces at or under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sources run up to the most worn pieces the set rule page states.",
    },
  ],
  createdAt: "2026-09-02T10:22:19.313Z",
  updatedAt: "2026-10-20T16:13:42.689Z",
} as const satisfies Module
