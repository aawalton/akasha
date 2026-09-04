import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleCompilerTypes = {
  id: "01a06100-3bed-76ca-b6bf-8886acaea7ea",
  pageTypeSlug: "module",
  slug: "inventory-rule-compiler-types",
  definition: "the shape a rule takes once compiled for the game addon and for the web matcher",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A compiled rule carries a scope rather than the destination text a saved rule holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "The terminal compiled rule closes the list and matches whatever the earlier rules left.",
    },
    {
      invariantKind: "departure",
      statement:
        "A wanted equipment signature says what a build asks for rather than what is held.",
    },
  ],
} as const satisfies Module
