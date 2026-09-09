import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleMatcherCache = {
  id: "01a06151-370c-7bba-9b75-347465f546d7",
  pageTypeSlug: "module",
  slug: "inventory-rule-matcher-cache",
  definition:
    "the matched items kept from an earlier run, and the fingerprint saying they still hold",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule whose fingerprint changed is matched again from scratch.",
    },
    {
      invariantKind: "departure",
      statement: "A residue is stored as entries so the cache survives being written out.",
    },
  ],
} as const satisfies Module
