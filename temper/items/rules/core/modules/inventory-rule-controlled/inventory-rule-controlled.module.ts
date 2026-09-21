import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleControlled = {
  id: "01a06100-3bee-7018-bc06-5cbc76e051f4",
  type: "page-type/module",
  slug: "inventory-rule-controlled",
  definition:
    "the rules the automation settings write for the player rather than the player writing them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A controlled rule is known by the shape of its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A controlled rule is rewritten from the automation settings on every build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved rule set with an older controlled rule is migrated to the current shape.",
    },
  ],
} as const satisfies Module
