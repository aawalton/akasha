import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionAchievementTally = {
  id: "01a0c97d-26ba-7368-9891-829c322ea135",
  type: "page-type/module",
  slug: "completion-achievement-tally",
  definition: "how far a character has come through one achievement or a category of them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An achievement is counted by its criteria where those criteria ask for more than one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An achievement asking for one thing is counted as done or not done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An achievement of many steps counts every step once that achievement is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An achievement the record does not name is counted as none of one.",
    },
  ],
} as const satisfies Module
