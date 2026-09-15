import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleMatcherContextCurseState = {
  id: "01a06151-370d-745a-96d3-e57c7a242777",
  type: "module",
  slug: "rule-matcher-context-curse-state",
  definition:
    "which characters are vampires or werewolves, compiled into a reader the matcher calls",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A curse the game named is kept under the character bearing it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character with neither curse answers as nothing.",
    },
  ],
} as const satisfies Module
