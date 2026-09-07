import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sortedOnce = {
  id: "01a079ad-7822-7000-a707-78723d52e222",
  pageTypeSlug: "module",
  slug: "sorted-once",
  definition: "values given back in sorted order, each one once",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value given more than once comes back once.",
    },
    {
      invariantKind: "departure",
      statement: "The order is the one sorting puts the values in rather than the order given.",
    },
  ],
} as const satisfies Module
