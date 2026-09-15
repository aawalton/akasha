import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleCompilerTypes = {
  id: "01a06100-3bed-76ca-b6bf-8886acaea7ea",
  type: "page-type/module",
  slug: "inventory-rule-compiler-types",
  definition: "the shape a rule takes once compiled for the game addon and for the web matcher",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A compiled rule has a scope rather than the destination text a saved rule holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The terminal compiled rule closes the list and matches whatever the earlier rules left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A wanted equipment signature says the gear a build asks for rather than the gear held.",
    },
  ],
} as const satisfies Module
