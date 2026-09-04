import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchServerNarrowing = {
  id: "01a0613a-e0ae-75b0-9cbe-58f1edfb2323",
  pageTypeSlug: "module",
  slug: "search-server-narrowing",
  definition:
    "the conversion of filter-bar selections into the exact terms and bands a trader search takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A selection that is not an integer string is dropped from the server terms.",
    },
    {
      invariantKind: "departure",
      statement: "A threshold carrying the != operator yields no server band.",
    },
    {
      invariantKind: "constraint",
      statement: "The open end of a server band is the sentinel 999999.",
    },
  ],
} as const satisfies Module
