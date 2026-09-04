import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchFilterRegistry = {
  id: "01a0613a-e0a7-7fab-b39b-bff6d9ac4ec6",
  pageTypeSlug: "module",
  slug: "search-filter-registry",
  definition:
    "the list of every search filter the filter bar offers, in the order the filter bar shows them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "buildFilterIndex throws when two filters in the list carry the same filter id.",
    },
    {
      invariantKind: "departure",
      statement:
        "The filter bar order is the array order in TEMPER_FILTERS rather than an order worked out later.",
    },
    {
      invariantKind: "absence",
      statement: "No filter is added to the registry at run time by code outside this package.",
    },
  ],
} as const satisfies Module
