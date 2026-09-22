import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionCompanionRow = {
  id: "01a06332-d9df-7ff9-a491-b8f04b2e9e67",
  type: "page-type/module",
  slug: "completion-companion-row",
  definition: "a companion of a player's roster as the completion store keeps it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion row has the same fields a character row has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader wanting only the companion and its completion takes this row as that row is.",
    },
  ],
} as const satisfies Module
