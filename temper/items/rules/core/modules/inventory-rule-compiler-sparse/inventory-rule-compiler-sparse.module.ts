import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleCompilerSparse = {
  id: "01a06100-3bed-7fbc-a172-772ac30b19bf",
  type: "page-type/module",
  slug: "inventory-rule-compiler-sparse",
  definition:
    "which characters or companions a rule reaches, read off the destination the rule names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A destination ending in `by-priority` reaches any character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A destination naming one character reaches that character alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule naming no destination reaches the character playing now.",
    },
  ],
  createdAt: "2026-09-02T07:23:20.429Z",
  updatedAt: "2026-09-21T15:44:44.000Z",
} as const satisfies Module
