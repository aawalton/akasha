import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleMatcherContext = {
  id: "01a06281-4830-7015-96c4-299ce28f446e",
  pageTypeSlug: "module",
  slug: "rule-matcher-context",
  definition: "everything a rule is judged against, gathered into one value",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The half derived from builds is gathered apart from the half read off inventory.",
    },
    {
      invariantKind: "departure",
      statement: "The build-derived half is reusable across many inventory readings.",
    },
  ],
} as const satisfies Module
