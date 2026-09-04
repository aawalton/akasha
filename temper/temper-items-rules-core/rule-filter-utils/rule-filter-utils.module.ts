import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleFilterUtils = {
  id: "01a06100-3bfa-7c59-bbd4-bfdee7444bab",
  pageTypeSlug: "module",
  slug: "rule-filter-utils",
  definition:
    "the two readings every condition filter shares, of a threshold and of a category's roots",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A threshold named by key is shown beside the number the key resolves to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category is judged by the roots above the category rather than by the category id.",
    },
  ],
} as const satisfies Module
