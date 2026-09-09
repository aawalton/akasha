import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleMatcherExclude = {
  id: "01a06151-370c-715e-8bd1-7789e3ac3132",
  pageTypeSlug: "module",
  slug: "inventory-rule-matcher-exclude",
  definition: "which matched items are set aside, and which already lie where the rule sends them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An item already at its destination is marked rather than moved.",
    },
    {
      invariantKind: "departure",
      statement: "A container the rule's action cannot open is set aside.",
    },
  ],
} as const satisfies Module
