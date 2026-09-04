import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const lockedFilter = {
  id: "01a06100-3bf2-73c8-8184-8789e0df7124",
  pageTypeSlug: "module",
  slug: "locked-filter",
  definition: "the Lock Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `locked` condition alone.",
    },
  ],
} as const satisfies Module
