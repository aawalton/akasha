import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleActionLabels = {
  id: "01a06100-3bec-73b4-afa8-f71d8f0a648e",
  type: "page-type/module",
  slug: "inventory-rule-action-labels",
  definition:
    "the words shown for an action, and the whole sentence shown for an action with a destination",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every action has a verb shown to a reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An action with a destination is shown with the destination named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stocked item's destination takes the surplus rather than the stock, and is shown that way.",
    },
  ],
} as const satisfies Module
