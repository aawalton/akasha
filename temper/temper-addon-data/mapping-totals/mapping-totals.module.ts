import type { Module } from "@akasha/code-system/module"

export const mappingTotals = {
  id: "01a06837-d6c9-7395-b513-0aa2bf21e2a4",
  pageTypeSlug: "module",
  slug: "mapping-totals",
  definition: "how many rows each rendered mapping carries, said for a run to print",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A total is counted from what temper holds rather than from the file rendered.",
    },
    {
      invariantKind: "departure",
      statement: "A row whose id stands at zero is no row the game knows and is not counted.",
    },
    {
      invariantKind: "departure",
      statement: "A mapping with nothing worth counting says an empty total rather than none.",
    },
    {
      invariantKind: "departure",
      statement: "A total is prose for a reader rather than a number for a check.",
    },
  ],
} as const satisfies Module
