import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const buildLookup = {
  id: "01a06053-3636-7bdb-8f78-5302cab5662b",
  pageTypeSlug: "module",
  slug: "build-lookup",
  definition: "the place each choice sits in a list of choices, keyed by the choice",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A choice repeated keeps the last place that choice sits at.",
    },
    {
      invariantKind: "departure",
      statement: "A place counts up from the head of the list.",
    },
  ],
} as const satisfies Module
