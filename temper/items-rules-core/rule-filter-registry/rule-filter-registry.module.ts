import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleFilterRegistry = {
  id: "01a06276-e3e6-7e70-9bbc-90a25d75294c",
  pageTypeSlug: "module",
  slug: "rule-filter-registry",
  definition: "every condition a rule may carry, in the order they are offered",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A filter reaches a rule only by being in this list.",
    },
    {
      invariantKind: "departure",
      statement: "The order here is the order the rule editor offers the conditions in.",
    },
  ],
} as const satisfies Module
