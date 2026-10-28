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
    {
      decisionKind: "decision-kind/departure",
      statement: "The `all` category's name is its item category tree page's title, not held here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rule settings hold the rules alone, and no item rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player's inventory rules are the rules and the item rules together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain's `vendor` leg sells the items at a merchant rather than moving them.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.432Z",
  updatedAt: "2026-10-28T21:21:27.333Z",
} as const satisfies Module
