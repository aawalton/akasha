import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const inventoryRuleCompilerSparse = {
  id: "01a06100-3bed-7fbc-a172-772ac30b19bf",
  type: "module",
  slug: "inventory-rule-compiler-sparse",
  definition:
    "which characters or companions a rule reaches, read off the destination the rule names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A destination ending in `by-priority` reaches any character.",
    },
    {
      invariantKind: "departure",
      statement: "A destination naming one character reaches that character alone.",
    },
    {
      invariantKind: "departure",
      statement: "A rule naming no destination reaches the character playing now.",
    },
  ],
} as const satisfies Module
