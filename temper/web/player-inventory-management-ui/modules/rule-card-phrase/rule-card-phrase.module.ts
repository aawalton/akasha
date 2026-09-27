import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleCardPhrase = {
  id: "01a0e275-9aa4-7173-8a5e-3b4452151fd9",
  type: "page-type/module",
  slug: "rule-card-phrase",
  definition: "the rule card phrases as a browser reads them, with their names in braces filled",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Until the pages are read there are no phrases rather than empty ones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name in braces the caller does not fill is left as written.",
    },
  ],
} as const satisfies Module
