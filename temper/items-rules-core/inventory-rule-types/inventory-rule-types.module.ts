import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleTypes = {
  id: "01a06100-3bf0-749b-95b7-3cb94c47a425",
  pageTypeSlug: "module",
  slug: "inventory-rule-types",
  definition: "the shape of an item rule and the names of every action a rule may give an item",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An action a rule may give an item is named once here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A currency category is named by a prefix and by the key the currency banks under.",
    },
    {
      invariantKind: "departure",
      statement: "The category id `all` reaches every item.",
    },
  ],
} as const satisfies Module
