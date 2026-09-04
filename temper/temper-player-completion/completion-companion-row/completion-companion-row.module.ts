import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCompanionRow = {
  id: "01a06332-d9df-7ff9-a491-b8f04b2e9e67",
  pageTypeSlug: "module",
  slug: "completion-companion-row",
  definition: "one companion of a player's roster as the completion store keeps it",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
    {
      invariantKind: "departure",
      statement: "A companion row carries the same fields a character row carries.",
    },
    {
      invariantKind: "departure",
      statement: "A reader wanting only the companion and its completion takes this row as it is.",
    },
  ],
} as const satisfies Module
