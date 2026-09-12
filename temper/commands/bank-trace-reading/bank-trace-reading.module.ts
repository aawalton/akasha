import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const bankTraceReading = {
  id: "01a06864-aa2b-7002-9f57-fb06fdfa105a",
  type: "module",
  slug: "bank-trace-reading",
  definition: "the timing traces the inventory addon records over visits to a banker",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trace is ruled on whole.",
    },
    {
      invariantKind: "departure",
      statement: "The visits are given most recent first.",
    },
    {
      invariantKind: "departure",
      statement: "A file keeping no ring of visits is read through its one last trace.",
    },
    {
      invariantKind: "departure",
      statement: "An unknown field refuses the read.",
    },
    {
      invariantKind: "departure",
      statement: "A phase the addon did not reach is absent rather than zero.",
    },
  ],
} as const satisfies Module
