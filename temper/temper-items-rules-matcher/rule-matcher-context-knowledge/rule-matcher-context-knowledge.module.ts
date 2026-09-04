import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleMatcherContextKnowledge = {
  id: "01a06281-4830-7a5f-998e-b9cc4662de7e",
  pageTypeSlug: "module",
  slug: "rule-matcher-context-knowledge",
  definition: "what each character knows and what the account holds of what they want",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A trait a character has yet to research is recorded as unknown.",
    },
    {
      invariantKind: "departure",
      statement: "Only a location keyed by digits alone counts as a character for stock.",
    },
    {
      invariantKind: "departure",
      statement: "A script is recorded by the item id its name resolves to.",
    },
  ],
} as const satisfies Module
