import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleMatcherContext = {
  id: "01a06281-4830-7015-96c4-299ce28f446e",
  type: "page-type/module",
  slug: "rule-matcher-context",
  definition: "everything a rule is judged against, put into one value",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The half derived from builds is gathered apart from the half read off inventory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The build-derived half is reusable across many inventory readings.",
    },
  ],
} as const satisfies Module
