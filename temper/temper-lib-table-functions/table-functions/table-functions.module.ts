import type { Module } from "@akasha/code-system/module"

export const tableFunctions = {
  id: "01a06052-2ca4-7874-a41d-3892986d9cdd",
  pageTypeSlug: "module",
  slug: "table-functions",
  definition: "searching, copying, printing, sorting and resetting a Lua table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A search reaching a nested table searches that table too.",
    },
    {
      invariantKind: "departure",
      statement: "A search asked for keys searches the keys rather than the values.",
    },
    {
      invariantKind: "departure",
      statement: "A copy carries the metatable of every table copied.",
    },
    {
      invariantKind: "departure",
      statement: "A printed key that is no number is wrapped in quotes.",
    },
    {
      invariantKind: "departure",
      statement: "A sort orders rows of equal width by one column of numbers.",
    },
    {
      invariantKind: "departure",
      statement: "A sort hands back a copy where the rows are ragged.",
    },
    {
      invariantKind: "departure",
      statement: "A sort hands back a copy where a row holds a nested table.",
    },
    {
      invariantKind: "departure",
      statement: "A reset keeps the shape of the table handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A reset puts a stated value at every leaf.",
    },
    {
      invariantKind: "departure",
      statement: "A reset by type chooses the value from the Lua type of the leaf.",
    },
    {
      invariantKind: "constraint",
      statement: "A helper handed nothing answers as though handed an empty table.",
    },
  ],
} as const satisfies Module
