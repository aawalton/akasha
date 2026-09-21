import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleMatcherCache = {
  id: "01a06151-370c-7bba-9b75-347465f546d7",
  type: "page-type/module",
  slug: "inventory-rule-matcher-cache",
  definition:
    "the matched items kept from an earlier run, and the fingerprint saying they still hold",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule whose fingerprint changed is matched again from scratch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A residue is stored as entries so the cache survives being written out.",
    },
  ],
} as const satisfies Module
