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
      statement: "A total is keyed by the page type slug rather than by the accessor reading it.",
    },
    {
      invariantKind: "departure",
      statement: "A page type is named here whether or not a section renders anything from it.",
    },
    {
      invariantKind: "departure",
      statement: "Totals are printed in slug order rather than in the order they were gathered.",
    },
    {
      invariantKind: "departure",
      statement: "What is counted is how many rows came back rather than what the rows carry.",
    },
  ],
} as const satisfies Module
