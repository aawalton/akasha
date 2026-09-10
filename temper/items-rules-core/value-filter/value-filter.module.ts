import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const valueFilter = {
  id: "01a06100-3c02-7e7f-8b1b-d2db429f456f",
  pageTypeSlug: "module",
  slug: "value-filter",
  definition: "the Value condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the conditions `value` and `valueOp`.",
    },
  ],
} as const satisfies Module
