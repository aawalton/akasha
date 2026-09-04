import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const canOpenFilter = {
  id: "01a06100-3be7-790f-abc4-c36218af0bc4",
  pageTypeSlug: "module",
  slug: "can-open-filter",
  definition: "the Can Open condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `canOpen` condition alone.",
    },
  ],
} as const satisfies Module
