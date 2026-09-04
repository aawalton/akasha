import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rowGrouping = {
  id: "01a0609f-53fa-76c3-b842-f36808ca5db3",
  pageTypeSlug: "module",
  slug: "row-grouping",
  definition: "rows filed under a key, and rows counted by a key",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key is written out as text before a row is filed under that key.",
    },
    {
      invariantKind: "departure",
      statement: "A row the key extractor answers nothing for is left out of the counts.",
    },
    {
      invariantKind: "departure",
      statement: "The counts keep the order each key was first met in.",
    },
    {
      invariantKind: "departure",
      statement: "The later of two rows sharing a key is the row filed under that key.",
    },
  ],
} as const satisfies Module
