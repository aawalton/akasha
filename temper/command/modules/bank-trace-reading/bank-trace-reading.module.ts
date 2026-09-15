import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bankTraceReading = {
  id: "01a06864-aa2b-7002-9f57-fb06fdfa105a",
  type: "module",
  slug: "bank-trace-reading",
  definition: "the timing traces the inventory addon records over visits to a banker or a vendor",
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
    {
      invariantKind: "departure",
      statement: "One ruling covers the banker's ring and the vendor's ring alike.",
    },
    {
      invariantKind: "departure",
      statement: "A vendor ring the addon has not written yet reads as no visits.",
    },
    {
      invariantKind: "departure",
      statement: "A banker's ring that is nowhere refuses the read, as it always has.",
    },
  ],
} as const satisfies Module
