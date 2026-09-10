import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const setSourcesFilter = {
  id: "01a06276-e3e6-7c64-8c97-3ce008f60697",
  pageTypeSlug: "module",
  slug: "set-sources-filter",
  definition: "the Set Sources condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `setSourceTypes` condition alone.",
    },
    {
      invariantKind: "departure",
      statement: "The set category representing no set is not offered.",
    },
  ],
} as const satisfies Module
