import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const bankTraceReading = {
  id: "01a06864-aa2b-7002-9f57-fb06fdfa105a",
  type: "module",
  slug: "bank-trace-reading",
  definition: "the timing traces the inventory addon records over visits to a banker or a vendor",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The trace is ruled on whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The visits are given most recent first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file keeping no ring of visits is read through its one last trace.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An unknown field refuses the read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A phase the addon did not reach is absent rather than zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One ruling covers the banker's ring and the vendor's ring alike.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A vendor ring the addon has not written yet reads as no visits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A banker's ring that is nowhere refuses the read, as it always has.",
    },
  ],
} as const satisfies Module
