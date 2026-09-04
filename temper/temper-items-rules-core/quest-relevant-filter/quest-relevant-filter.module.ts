import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const questRelevantFilter = {
  id: "01a06100-3bf7-7a6c-b39b-787d502ef6cf",
  pageTypeSlug: "module",
  slug: "quest-relevant-filter",
  definition: "the Quest-Relevant Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `questRelevant` condition alone.",
    },
  ],
} as const satisfies Module
