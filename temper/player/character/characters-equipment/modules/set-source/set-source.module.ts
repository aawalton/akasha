import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setSource = {
  id: "01a061a4-18b1-7a6e-bc9b-94150a72e67b",
  type: "page-type/module",
  slug: "set-source",
  definition:
    "one effect source per gear set and piece count, scaled by the level and quality of the pieces worn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A source has the bonuses whose piece count the worn count reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each worn item has the worth level an armor piece of its level and quality has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A two-handed weapon counts as two pieces and as one item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set's worth level is the mean of its items' worth levels, rounded down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A set at a CP160 quality's worth level has that quality's share of each bonus line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set between two such worth levels has a share running straight between theirs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A set below normal at CP160 loses the set rule page's slope for each worth level under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bonus line scaled below legendary drops its fraction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sources run up to the most worn pieces the set rule page states.",
    },
  ],
  createdAt: "2026-09-02T10:22:19.313Z",
  updatedAt: "2026-10-20T18:40:53.204Z",
} as const satisfies Module
