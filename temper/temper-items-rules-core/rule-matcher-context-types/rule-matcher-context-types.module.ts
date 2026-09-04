import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleMatcherContextTypes = {
  id: "01a06100-3bfb-733c-9d6f-e271da93d557",
  pageTypeSlug: "module",
  slug: "rule-matcher-context-types",
  definition: "everything a matcher is given to read about the account before judging an item",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A matcher reads the account through this context alone.",
    },
    {
      invariantKind: "departure",
      statement: "A reader absent from the context leaves the matching condition unjudged.",
    },
  ],
} as const satisfies Module
