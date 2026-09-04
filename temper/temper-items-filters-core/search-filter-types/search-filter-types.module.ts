import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchFilterTypes = {
  id: "01a0613a-e0a8-75a6-a3ee-c8d3942a94c3",
  pageTypeSlug: "module",
  slug: "search-filter-types",
  definition:
    "the contract every item search filter satisfies, from editor spec through saved form",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "defineFilter re-narrows the raw value on every call so a matcher never sees a wrong type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A filter declares applyToSearch only when the trader server can narrow on that property.",
    },
    {
      invariantKind: "departure",
      statement:
        "createSearchRequestCollector drops a term number already added for that server field.",
    },
  ],
} as const satisfies Module
