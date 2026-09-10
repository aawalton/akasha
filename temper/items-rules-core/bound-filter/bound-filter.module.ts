import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const boundFilter = {
  id: "01a06100-3be2-7f00-99b6-1c954caa2761",
  pageTypeSlug: "module",
  slug: "bound-filter",
  definition: "the Bound Status condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `bound` condition alone.",
    },
  ],
} as const satisfies Module
