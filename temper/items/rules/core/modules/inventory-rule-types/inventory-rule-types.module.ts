import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleTypes = {
  id: "01a06100-3bf0-749b-95b7-3cb94c47a425",
  type: "page-type/module",
  slug: "inventory-rule-types",
  definition: "the shape of an item rule and the names of every action a rule may give an item",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The actions a rule may give an item are the slugs of the item action pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A currency category is named by a prefix and by the key the currency banks under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The category id `all` reaches every item.",
    },
  ],
} as const satisfies Module
