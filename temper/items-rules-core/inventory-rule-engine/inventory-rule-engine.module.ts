import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleEngine = {
  id: "01a06100-3bee-7b0c-8fa1-7837c3bf430b",
  pageTypeSlug: "module",
  slug: "inventory-rule-engine",
  definition: "the action every category tree node resolves to, given the rules and the tree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A node takes the action of the first rule matching the node.",
    },
    {
      invariantKind: "departure",
      statement: "A rule on a category reaches every node beneath that category.",
    },
    {
      invariantKind: "departure",
      statement: "A node no rule matches resolves to nothing.",
    },
  ],
} as const satisfies Module
