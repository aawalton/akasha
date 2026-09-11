import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const ruleCardFilterText = {
  id: "01a0636c-5da1-769b-b67e-b3290a880057",
  type: "module",
  slug: "rule-card-filter-text",
  definition: "the text of a rule's filter, edited in place",
  code: "tsx",
  invariants: [
    {
      invariantKind: "absence",
      statement:
        "This cancel and the one in number-badge close over different setters and are not one rule.",
    },
  ],
} as const satisfies Module
