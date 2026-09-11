import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const valueFilter = {
  id: "01a06100-3c02-7e7f-8b1b-d2db429f456f",
  pageTypeSlug: "module",
  type: "module",
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
