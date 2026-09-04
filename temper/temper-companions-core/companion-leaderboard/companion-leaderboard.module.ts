import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionLeaderboard = {
  id: "01a06152-c2ca-7bf7-a6bf-86af486302c4",
  pageTypeSlug: "module",
  slug: "companion-leaderboard",
  definition: "ranking of companion builds by score across base role combinations",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A build scores through the support optimizer when its base roles include support.",
    },
    {
      invariantKind: "constraint",
      statement: "A build ranks only when its visibility is public.",
    },
    {
      invariantKind: "gap",
      statement: "Target filters apply only to combinations that include the damage role.",
    },
  ],
} as const satisfies Module
