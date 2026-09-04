import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionSummaries = {
  id: "01a0640a-3feb-7f15-b727-f3394d3cb2ff",
  pageTypeSlug: "module",
  slug: "completion-summaries",
  definition:
    "the account, character and companion summaries folded together from one player's rows",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A player's summaries are folded in one call rather than in a call for each scope.",
    },
    {
      invariantKind: "departure",
      statement: "The rows and the catalogs arrive in one bundle rather than as loose arguments.",
    },
    {
      invariantKind: "departure",
      statement: "A catalog is handed to this fold rather than read at module level.",
    },
    {
      invariantKind: "departure",
      statement: "A player with no rows and no account folds to summaries scoring zero.",
    },
  ],
} as const satisfies Module
