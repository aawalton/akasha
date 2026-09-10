import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const replacementValueFilter = {
  id: "01a06100-3bf8-79b5-9b75-c12a48c6385c",
  pageTypeSlug: "module",
  slug: "replacement-value-filter",
  definition: "the Replacement Value condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "This filter reads and writes the conditions `replacementValue` and `replacementValueOp`.",
    },
  ],
} as const satisfies Module
