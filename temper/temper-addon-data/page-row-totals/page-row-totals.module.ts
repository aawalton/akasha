import type { Module } from "@akasha/code-system/module"

export const pageRowTotals = {
  id: "01a06837-d6c9-77dc-8a16-d5a80b2b38cb",
  pageTypeSlug: "module",
  slug: "page-row-totals",
  definition: "how many rows each page type fed a run, and the lines a run prints for them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A total is keyed by the page type slug rather than by the accessor reading that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type is named here whether or not a section renders anything from that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "Totals are printed in slug order rather than in the order those totals were gathered.",
    },
    {
      invariantKind: "departure",
      statement: "Rows that came back are counted rather than the values those rows carry.",
    },
  ],
} as const satisfies Module
