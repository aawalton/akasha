import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleMatcherTypes = {
  id: "01a06100-3bef-716e-8a17-b2edb1a2dc74",
  pageTypeSlug: "module",
  slug: "inventory-rule-matcher-types",
  definition: "the shape of an item a rule was found to affect, and of the map from rule to items",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An affected item carries where the item lies as well as what the item is.",
    },
    {
      invariantKind: "departure",
      statement: "An item already at the destination is marked rather than dropped.",
    },
  ],
} as const satisfies Module
