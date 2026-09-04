import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleSettings = {
  id: "01a06100-3bef-7218-afac-34da69a03f7b",
  pageTypeSlug: "module",
  slug: "inventory-rule-settings",
  definition:
    "the whole saved rule set, and each way an agent adds, changes, moves or takes away a rule",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule set carries its rules in the order the rules are tried in.",
    },
    {
      invariantKind: "departure",
      statement: "A locked rule is changed by nothing until the lock comes off.",
    },
    {
      invariantKind: "departure",
      statement: "A rule added lands beside the anchor rule the caller named.",
    },
  ],
} as const satisfies Module
