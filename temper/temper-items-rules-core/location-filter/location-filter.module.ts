import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const locationFilter = {
  id: "01a06100-3bf2-77cf-bcc7-b09945beb2f9",
  pageTypeSlug: "module",
  slug: "location-filter",
  definition: "the Location condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `location` condition alone.",
    },
  ],
} as const satisfies Module
