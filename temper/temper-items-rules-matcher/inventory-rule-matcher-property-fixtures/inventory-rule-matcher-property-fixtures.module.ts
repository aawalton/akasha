import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleMatcherPropertyFixtures = {
  id: "01a06281-4830-72b8-a8a5-7323d4ed93c2",
  pageTypeSlug: "module",
  slug: "inventory-rule-matcher-property-fixtures",
  definition: "the generated rules and items the matcher's property tests are built from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A generated list of rules carries no two rules of one id.",
    },
    {
      invariantKind: "departure",
      statement: "An item rule is answered before any category rule.",
    },
    {
      invariantKind: "departure",
      statement: "An item no rule claims falls to the implicit terminal rule.",
    },
  ],
} as const satisfies Module
