import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleFilterTypes = {
  id: "01a06100-3bf9-77a0-a8e9-669771a20507",
  pageTypeSlug: "module",
  slug: "rule-filter-types",
  definition:
    "the shape of one condition a rule may carry, as the rule editor offers and clears it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every condition the editor offers is named once in this list of ids.",
    },
    {
      invariantKind: "departure",
      statement: "A filter names the categories the condition suits.",
    },
    {
      invariantKind: "departure",
      statement: "A filter's fingerprint tells two rules carrying that condition apart.",
    },
  ],
} as const satisfies Module
