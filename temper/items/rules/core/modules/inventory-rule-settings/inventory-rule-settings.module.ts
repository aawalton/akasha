import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleSettings = {
  id: "01a06100-3bef-7218-afac-34da69a03f7b",
  type: "page-type/module",
  slug: "inventory-rule-settings",
  definition:
    "the whole saved rule set, and each way an agent adds, changes, moves or takes away a rule",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change naming a chain drops the rule's destination, and one naming a destination drops its chain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule set has its rules in the order the rules are tried in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A locked rule is changed by nothing until the lock comes off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule added lands beside the anchor rule the caller named.",
    },
  ],
} as const satisfies Module
